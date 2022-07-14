import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onOverlay, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [isNameInputValid, setIsNameInputValid] = useState(true);
  const [isDescriptionInputValid, setIsDescriptionInputValid] = useState(true);

  const [nameInputError, setNameInputError] = useState("");
  const [descriptionInputError, setDescriptionInputError] = useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
    setIsNameInputValid(evt.target.validity.valid);
    if (!isNameInputValid) {
      setNameInputError(evt.target.validationMessage)
    } else {
      setNameInputError("")
    }
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
    setIsDescriptionInputValid(evt.target.validity.valid);
    if (!isDescriptionInputValid) {
      setDescriptionInputError(evt.target.validationMessage)
    } else {
      setDescriptionInputError("")
    }
  }
  
  useEffect(() => {
    if ((currentUser !== null) && isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setNameInputError("");
      setDescriptionInputError("");
    }
  }, [isOpen])

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonContent={!isLoading ? "Сохранить" : "Сохранение..."}
      isOpen={isOpen}
      onClose={onClose}
      onOverlay={onOverlay}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isButtonEnabled={isNameInputValid && isDescriptionInputValid} 
    >
      <input
        onChange={handleNameChange}
        value={currentUser !== null ? name : ""}
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
        <span className="popup__input-error" id="username-input-error">{nameInputError}</span>
      </div>
      <input
        onChange={handleDescriptionChange}
        value={currentUser !== null ? description : ""}
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
        <span className="popup__input-error" id="userinfo-input-error">{descriptionInputError}</span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
