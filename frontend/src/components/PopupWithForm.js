import buttonClose from "../images/image-button-close.png";

import { useEffect } from "react";

export function PopupWithForm({
  title,
  name,
  submit,
  children,
  isOpen,
  onClose,
  onSubmit
}) {
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains(`popup`)) {
        onClose();
      }
    });
  }, []);
  return (
    <>
      <section className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <button type="button" className="button-close-popup">
            <img
              className="button-close-popup__image popup__close"
              src={buttonClose}
              alt="grande icone em 'x' para usado para fechar o popup"
              onClick={onClose}
            />
          </button>
          <div className="popup__form-container">
            <form className="popup__form" noValidate="" onSubmit={onSubmit}>
              <h2 className="popup__title">{title}</h2>
              <fieldset className="popup__set">
                {children}
                <button className="button-submit" type="submit">
                  {submit}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
