function ImagePopup({ name, link, isOpen, onClose }) {
  return (
    <section
      className={`popup popup_style_view-image popup_role_view-image ${
        isOpen && "popup_status_show"
      }`}
    >
      <div className="popup__image-container">
        <img
          className="popup__image"
          alt={name}
          src={link}
        />
        <p className="popup__caption">{name}</p>
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
