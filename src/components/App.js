import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isImagePopupOpen: false,
    name: "",
    link: "",
  });

  const handleCardClick = (card) => {
    setSelectedCard({
      isImagePopupOpen: true,
      name: card.name,
      link: card.link,
    });
  };

  const handleEditAvatarClick = () =>
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);

  const handleEditProfileClick = () =>
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);

  const handleAddPlaceClick = () =>
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ isImagePopupOpen: false, name: "", link: "" });
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          name="name"
          id="username-input"
          type="text"
          className="popup__input-form popup__input-form_type_username"
          placeholder="Как вас зовут?"
          minLength="2"
          maxLength="40"
          required
        />
        <div className="popup__input-error-container">
          <span className="popup__input-error" id="username-input-error"></span>
        </div>
        <input
          name="about"
          id="userinfo-input"
          type="text"
          className="popup__input-form popup__input-form_type_userinfo"
          placeholder="Кто вы?"
          minLength="2"
          maxLength="200"
          required
        />
        <div className="popup__input-error-container">
          <span className="popup__input-error" id="userinfo-input-error"></span>
        </div>
        <button type="submit" className="popup__save-btn">
          Сохранить
        </button>
      </PopupWithForm>

      <PopupWithForm
        name="add-card"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
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
        <button type="submit" className="popup__save-btn">
          Создать
        </button>
      </PopupWithForm>

      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        onClose={closeAllPopups}
      >
        <button className="popup__save-btn" type="submit">
          Да
        </button>
      </PopupWithForm>

      <PopupWithForm
        name="change-avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
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
        <button type="submit" className="popup__save-btn">
          Сохранить
        </button>
      </PopupWithForm>

      <ImagePopup
        name={selectedCard.name}
        link={selectedCard.link}
        isOpen={selectedCard.isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
