import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onOverlay, onAddPlace, isLoading }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const [isTitleInputValid, setIsTitleInputValid] = useState(false);
  const [isLinkInputValid, setIsLinkInputValid] = useState(false);

  const [titleInputError, setTitleInputError] = useState("");
  const [linkInputError, setLinkInputError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTitleInputError("");
      setLinkInputError("");
      setTitle("");
      setLink("");
    }
  }, [isOpen])

  function handleTitleChange(evt) {
    setTitle(evt.target.value);
    setIsTitleInputValid(evt.target.validity.valid);
    if (!isTitleInputValid) {
      setTitleInputError(evt.target.validationMessage)
    } else {
      setTitleInputError("")
    }
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
    setIsLinkInputValid(evt.target.validity.valid);
    if (!isLinkInputValid) {
      setLinkInputError(evt.target.validationMessage)
    } else {
      setLinkInputError("")
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      link,
      name: title
    });
    setTitle("");
    setLink("");
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonContent={!isLoading ? "Создать" : "Сохранение..."}
      isOpen={isOpen}
      onClose={onClose}
      onOverlay={onOverlay}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isButtonEnabled={isTitleInputValid && isLinkInputValid}
    >
      <input
        onChange={handleTitleChange}
        value={title}
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
        <span className="popup__input-error" id="cardName-input-error">{titleInputError}</span>
      </div>
      <input
        onChange={handleLinkChange}
        value={link}
        name="link"
        id="cardLink-input"
        type="url"
        className="popup__input-form popup__input-form_type_card-link"
        placeholder="Ссылка на картинку"
        required
      />
      <div className="popup__input-error-container">
        <span className="popup__input-error" id="cardLink-input-error">{linkInputError}</span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
