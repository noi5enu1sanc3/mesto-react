import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ConfirmationPopup from "./ConfirmationPopup";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null); //TODO верно ли дефолтное состояние null? мб пустой объект?

  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.toggleLike(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(err));
  }

  function handleCardDelete(id) {
    setIsLoading(true);
    api.deleteCard(id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== id));
      closeAllPopups();
    })
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    api.getInitialCards()
    .then((res) => {
      setCards(res);
    })
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
  }, []);

  useEffect(() => {
    api.getUserInfo()
    .then(res => setCurrentUser({
      name: res.name,
      about: res.about,
      avatar: res.avatar,
      _id: res._id
    }))
  }, [] //TODO верная ли тут зависимость? когда происходит обновление юзера?
  )

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard({
      isImagePopupOpen: true,
      name: card.name,
      link: card.link,
    });
  };

  const hadleCardDeleteClick = (card) => {
    setCardToDelete({
      isConfirmationPopupOpen: true,
      id: card._id
    })
  }

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);

  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setCardToDelete(null);
    setSelectedCard(null);
  };

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  const closeOnEsc = (evt) => {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  };

  useEffect(() => {
    if (
      isEditAvatarPopupOpen === true ||
      isEditProfilePopupOpen === true ||
      isAddPlacePopupOpen === true ||
      (cardToDelete !== null && cardToDelete.isConfirmationPopupOpen === true) ||
      (selectedCard !== null && selectedCard.isImagePopupOpen === true)
    ) {
      document.addEventListener("keydown", closeOnEsc);
      return () => document.removeEventListener("keydown", closeOnEsc);
    }
  }, [
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    cardToDelete,
    selectedCard,
  ]);

  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api.setUserInfo({ name, about })
    .then(res => {
      setCurrentUser(prevState => ({
        ...prevState,
        name: res.name,
        about: res.about
      }));
      closeAllPopups();
    })
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false));
  }

  const handleUpdateAvatar = ({ avatar }) => {
    setIsLoading(true);
    api.changeAvatar({ avatar })
    .then(res => {
      setCurrentUser(prevState => ({
        ...prevState,
        avatar: res.avatar
      }));
      closeAllPopups();
    })
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false));
  }

  const handleAddPlaceSubmit = ({ name, link }) => {
    setIsLoading(true);
    api.uploadNewCard({ name, link })
    .then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={hadleCardDeleteClick}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onOverlay={handleOverlayClick}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onOverlay={handleOverlayClick}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ConfirmationPopup 
          isOpen={cardToDelete !== null ? cardToDelete.isConfirmationPopupOpen : ""}
          onClose={closeAllPopups}
          onOverlay={handleOverlayClick}
          onCardDelete={handleCardDelete}
          cardId={cardToDelete !== null ? cardToDelete.id : ""}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onOverlay={handleOverlayClick}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <ImagePopup
          name={selectedCard !== null ? selectedCard.name : ""}
          link={selectedCard !== null ? selectedCard.link : ""}
          isOpen={selectedCard !== null ? selectedCard.isImagePopupOpen : ""}
          onClose={closeAllPopups}
          onOverlay={handleOverlayClick}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
