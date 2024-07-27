import { PopupWithForm } from "./PopupWithForm";
import { useRef } from "react";

export const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
      avatarRef.current.value = "";
  }
  return (
    <PopupWithForm
      title="Alterar a foto do perfil"
      name="popup"
      submit="Salvar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <label>
          <input
            className="input input-avatar"
            id="avatar-input"
            type="url"
            name="link"
            placeholder="Link de imagem"
            required
            minLength={2}
            maxlenght={40}
            ref={avatarRef}
          />

        </label>
      </>
    </PopupWithForm>
  );
};
