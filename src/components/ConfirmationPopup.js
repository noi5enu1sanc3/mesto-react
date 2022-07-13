import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ isOpen, onClose, onOverlay, onCardDelete }) {
  function handleSubmit(evt) {
    evt.preventDefault();

    onCardDelete()
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonContent={"Да"}
      isOpen={isOpen}
      onClose={onClose}
      onOverlay={onOverlay}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  )
}

export default ConfirmationPopup;
