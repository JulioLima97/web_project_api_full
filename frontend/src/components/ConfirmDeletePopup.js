import { PopupWithForm } from "./PopupWithForm";

export const ConfirmDeletePopup = ({ cardId, onClose, onCardDelete }) => {
  function handleSubmit(e) {
    e.preventDefault();
    if (cardId) { // Verifica se cardId é válido antes de chamar onCardDelete
      onCardDelete(cardId);
    }
  }
  return (
    <>
      <PopupWithForm
        title="Tem certeza?"
        name="popup"
        submit="Sim"
        isOpen={cardId}
        onClose={onClose}
        onSubmit={handleSubmit}
      ></PopupWithForm>
    </>
  );
};
