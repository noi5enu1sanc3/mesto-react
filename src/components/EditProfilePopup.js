import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onOverlay, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  const user = useContext(CurrentUserContext);

  useEffect(() => {
    if (user !== null) {
      setName(user.name);
      setDescription(user.about);
    }
  }, [user]);

  function handleSubmit(evt) {
    evt.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonContent="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onOverlay={onOverlay}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleNameChange}
        value={user !== null ? name : ""}
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
        onChange={handleDescriptionChange}
        value={user !== null ? description : ""}
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
    </PopupWithForm>
  );
}

export default EditProfilePopup;
