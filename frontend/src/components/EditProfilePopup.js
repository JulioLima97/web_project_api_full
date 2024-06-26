import { useContext, useEffect, useState } from "react";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const currentUser = useContext(CurrentUserContext);
    useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser]);
  
    function handleSubmit(e) {
      e.preventDefault();
  
      onUpdateUser({
        name,
        about: description,
      });
    }

    return (
        <PopupWithForm
        title="Editar perfil"
        name="popup"
        submit="Salvar"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <>
          <label>
            <input
              className="input input-name"
              id="name-input"
              type="text"
              name="name"
              placeholder="Nome"
              required
              minLength={2}
              maxlenght={40}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="name-input-error" />
          </label>
          <label>
            <input
              className="input input-description"
              id="description-input"
              type="text"
              name="about"
              placeholder="Sobre mim"
              required
              minLength={2}
              maxlenght={40}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="description-input-error" />
          </label>
        </>
      </PopupWithForm>
    );
}