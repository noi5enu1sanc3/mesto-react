function PopupWithForm(props) {

  return (
      <section className={`popup popup_role_${props.name}`}>
        <div className="popup__container">
          <h2 className="popup__heading">{props.title}</h2>
          <form name={`${props.name}`} className="popup__form" noValidate>
            {props.children}
          </form>
          <button type="button" className="popup__close-btn"></button>
        </div>
      </section>
  )
}

export default PopupWithForm;
