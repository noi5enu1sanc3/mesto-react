import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null); //TODO верно ли дефолтное состояние null? мб пустой объект?

  useEffect(() => {
    api.getUserInfo()
    .then(res => setCurrentUser({
      id: res._id,
      name: res.name,
      about: res.about,
      avatar: res.avatar
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onOverlay={handleOverlayClick}
        />

        <PopupWithForm
          name="add-card"
          title="Новое место"
          buttonContent={"Создать"}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onOverlay={handleOverlayClick}
        >
          <input
            name="name"
            id="cardName-input"
            type="text"
            className="popup__input-form popup__input-form_type_card-name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <div className="popup__input-error-container">
            <span className="popup__input-error" id="cardName-input-error"></span>
          </div>
          <input
            name="link"
            id="cardLink-input"
            type="url"
            className="popup__input-form popup__input-form_type_card-link"
            placeholder="Ссылка на картинку"
            required
          />
          <div className="popup__input-error-container">
            <span className="popup__input-error" id="cardLink-input-error"></span>
          </div>
        </PopupWithForm>

        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          buttonContent={"Да"}
          onClose={closeAllPopups}
          onOverlay={handleOverlayClick}
        ></PopupWithForm>

        <PopupWithForm
          name="change-avatar"
          title="Обновить аватар"
          buttonContent={"Сохранить"}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onOverlay={handleOverlayClick}
        >
          <input
            name="avatar"
            id="avatarLink-input"
            type="url"
            className="popup__input-form popup__input-form_type_avatar-link"
            placeholder="Ссылка на аватар"
            required
          />
          <div className="popup__input-error-container">
            <span
              className="popup__input-error"
              id="avatarLink-input-error"
            ></span>
          </div>
        </PopupWithForm>

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
