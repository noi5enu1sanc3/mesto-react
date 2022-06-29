function ImagePopup() {
  return (
    <section className="popup popup_style_view-image popup_role_view-image">
      <div className="popup__image-container">
        <img className="popup__image" alt="" />
        <p className="popup__caption"></p>
        <button type="button" className="popup__close-btn"></button>
      </div>
    </section>
  )
}

export default ImagePopup;
