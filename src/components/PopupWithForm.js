function PopupWithForm({ name, isOpen, title, onClose, children }) {
  return (
    <section
      className={`popup popup_role_${name} ${
        isOpen && "popup_status_show"
      }`}
    >
      <div className="popup__container">
        <h2 className="popup__heading">{title}</h2>
        <form
          name={name}
          className="popup__form"
          noValidate>
          {children}
        </form>
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
