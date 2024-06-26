import cardRemove from '../images/card__remove.png'

import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ productData, onCardClick, onCardDelete, onCardLike, onConfirmClick }) {

  const { link, name, _id, likes } = productData;

  const currentUser = useContext(CurrentUserContext);

  const isOwn = productData._id === currentUser._id;
  const cardDeleteButtonClassName = `card__remove-button ${
    isOwn ? "card__remove-button_hidden" : "card__remove-button"
  }`;

  const isLiked = productData.likes.includes(currentUser._id);
  
  const cardLikeButtonClassName = `card__image ${
    isLiked ? "card__image-click" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(productData);
  };

  const handleLike = () => {
    onCardLike(productData);
  };


  return (
    <>
      <li className="card__places">
        <button type="button" className={cardDeleteButtonClassName} onClick={() => onConfirmClick(_id)}>
          <img
            className="card__remove"
            src={cardRemove}
            alt="imagem pequena de uma lixeira"
          />
        </button>
        <img
          className="card__photo"
          src={link}
          alt={name}
          onClick={handleCardClick}
        />
        <div className="card__info">
          <h2 className="card__title">{name}</h2>
          <div className="card__like">
            <button
              type="button"
              className={cardLikeButtonClassName}
              name="like"
              id="buttonLike"
              onClick={handleLike}
            ></button>
            <span className="span-like">{likes.length}</span>
          </div>
        </div>
      </li>
    </>
  );
}
