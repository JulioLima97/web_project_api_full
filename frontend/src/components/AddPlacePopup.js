import { PopupWithForm } from "./PopupWithForm";
import { useRef } from "react";

export const AddPlacePopup = ({ isOpen, onClose, onAddPlaceSubmit }) => {
  const name = useRef();
  const link = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({ name: name.current.value, link: link.current.value });
    name.current.value = "";
    link.current.value = "";
  }

  return (
    <>
    <PopupWithForm
      title="Novo Local"
      name="popup"
      submit="Criar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <label>
          <input
            className="input input-título"
            type="text"
            name="name"
            id="title-input"
            placeholder="Título"
            required
            minLength={2}
            maxlenght={40}
            ref={name}
          />
          <span className="span" />
        </label>
        <label>
          <input
            className="input input-link"
            type="url"
            name="link"
            id="image-input"
            placeholder="Link de imagem"
            required
            minLength={2}
            maxlenght={40}
            ref={link}
          />
          <span className="span" />
        </label>
      </>
    </PopupWithForm>
    </>
  );
};
