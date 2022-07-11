import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onOverlay, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    avatarRef.current.value = "";
  }

  return (
    <PopupWithForm
          name="change-avatar"
          title="Обновить аватар"
          buttonContent={"Сохранить"}
          isOpen={isOpen}
          onClose={onClose}
          onOverlay={onOverlay}
          onSubmit={handleSubmit}
        >
          <input
            ref={avatarRef}
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
  )
}

export default EditAvatarPopup;
