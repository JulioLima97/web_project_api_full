import buttonClose from "../images/image-button-close.png";

export default function ImagePopup({ card, onClose }) {
  return (
    <>
      <section
        className={`popup popup-screen ${card && card.link ? "popup_opened" : ""}`}
      >
        <div className="popup-screen-card">
          <button
            type="button"
            className="button-close-popup"
            onClick={onClose}
          >
            <img
              className="button-close-popup__image popup__close-zoom"
              src={buttonClose}
              alt="grande icone em 'x' para usado para fechar o popup"
            />
          </button>
          {card && card.link && (
            <>
              <img src={card.link} alt={card.name} className="popup-screen-image" />
              <h2 className="popup-screen-title">{card.name}</h2>
            </>
          )}
        </div>
      </section>
    </>
  );
}
