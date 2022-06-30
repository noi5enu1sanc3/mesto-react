function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_role_${props.name} ${
        props.isOpen && "popup_status_show"
      }`}
    >
      <div className="popup__container">
        <h2 className="popup__heading">{props.title}</h2>
        <form name={`${props.name}`} className="popup__form" noValidate>
          {props.children}
        </form>
        <button type="button" className="popup__close-btn" onClick={props.onClose}></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
