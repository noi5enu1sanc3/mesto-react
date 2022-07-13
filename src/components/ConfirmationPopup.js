import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ isOpen, onClose, onOverlay, onCardDelete, cardId }) {
  function handleSubmit(evt) {
    evt.preventDefault();

    onCardDelete(cardId);
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
      cardId={cardId}
    ></PopupWithForm>
  )
}

export default ConfirmationPopup;
