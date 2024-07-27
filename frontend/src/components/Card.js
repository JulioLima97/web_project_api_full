import cardRemove from '../images/card__remove.png'

import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ productData, onCardClick, onCardDelete, onCardLike, onConfirmClick }) {

  const { link, name, likes, _id } = productData;

  const currentUser = useContext(CurrentUserContext);

  const isOwn = productData.owner === currentUser._id;
  const cardDeleteButtonClassName = `card__remove-button ${
    isOwn ? 'card__remove-button_hidden' : 'card__remove-button'
  }`;

  const isLiked = productData.likes.includes(currentUser._id);
  
  const cardLikeButtonClassName = `card__image ${
    isLiked ? 'card__image-click' : ''
  }`;

  const handleCardClick = () => {
    onCardLike(productData);
  };

  const handleLike = () => {
    onCardClick(productData);
  };


  return (
    <>
      <li className="card__places">
        <div className='card__figure-container'>
          <button type="button" className={cardDeleteButtonClassName} onClick={() => onConfirmClick(_id)}>
            <img
              src={cardRemove}
              alt="imagem pequena de uma lixeira"
            />
          </button>
        <figure className='card__figure'>
          <img
            className="card__photo"
            src={link}
            alt={name}
            onClick={handleLike}
          />
        </figure>
        </div>
        <div className="card__info">
          <h2 className="card__title block">{name}</h2>
          <div className="card__like">
            <button
              type="button"
              className={cardLikeButtonClassName}
              name="like"
              onClick={handleCardClick}
            ></button>
            <p className="span-like">{likes.length}</p>
          </div>
        </div>
      </li>
    </>
  );
}
