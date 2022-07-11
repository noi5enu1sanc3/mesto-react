import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null); //TODO верно ли дефолтное состояние null? мб пустой объект?

  const [cards, setCards] = useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    console.log(currentUser)
    api.toggleLike(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch(err => console.log(err));
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

  const handleCardClick = (card) => {
    setSelectedCard({
      isImagePopupOpen: true,
      name: card.name,
      link: card.link,
    });
  };

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);

  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
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
      (selectedCard !== null && selectedCard.isImagePopupOpen === true)
    ) {
      document.addEventListener("keydown", closeOnEsc);
      return () => document.removeEventListener("keydown", closeOnEsc);
    }
  }, [
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    selectedCard,
  ]);

  const handleUpdateUser = ({ name, about }) => {
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
  }

  const handleUpdateAvatar = ({ avatar }) => {
    api.changeAvatar({ avatar })
    .then(res => {
      setCurrentUser(prevState => ({
        ...prevState,
        avatar: res.avatar
      }));
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  const handleAddPlaceSubmit = ({ name, link }) => {
    api.uploadNewCard({ name, link })
    .then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => console.log(err))
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
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onOverlay={handleOverlayClick}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onOverlay={handleOverlayClick}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          buttonContent={"Да"}
          onClose={closeAllPopups}
          onOverlay={handleOverlayClick}
        ></PopupWithForm>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onOverlay={handleOverlayClick}
          onUpdateAvatar={handleUpdateAvatar}
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
