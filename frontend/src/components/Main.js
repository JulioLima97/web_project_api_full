import buttonEdit from '../images/image-button-edit.png'
import buttonAdd from '../images/image-button-add.png'

import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from './Header';

function Main({
  onClick,
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  onCardLike,
  onCardDelete,
  onConfirmClick,
  cardsApp,
  handleLogout,
  userEmail
}) {

  const userData = useContext(CurrentUserContext);

  return (
    <>
      <Header
        text={userEmail}
        exit={
          <button className='header__logout' onClick={handleLogout}>
            Sair
          </button>
        }
      ></Header>
      <section className="perfil" onClick={onClick}>
        <div className="perfil__view">
          <button onClick={onEditAvatarClick} className="perfil__edit-avatar">
            <img
              className="perfil__photo"
              src={userData.avatar}
              alt="foto de perfil do usuário"
            />
          </button>
          <div className="perfil__card">
            <div className='perfil__text-button'>
              <h1 className="perfil__name">{userData.name}</h1>
              <button
                type="button"
                className="button-edit"
                onClick={onEditProfileClick}
              >
                <img
                  src={buttonEdit}
                  alt="desenho de uma caneta"
                />
              </button>
            </div>
            <h2 className="perfil__profission">{userData.about}</h2>
          </div>
        </div>
        <button type="button" className="button-add" onClick={onAddPlaceClick}>
          <img
            className="perfil__add-button-img"
            src={buttonAdd}
            alt="um sinal de mais usado como botão de adicionar"
          />
        </button>
      </section>
      <section className="card">
        <template id="template" />
        <ul className="card__template">
          {cardsApp.map((card) => (
            <Card
              productData={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onConfirmClick={onConfirmClick}
            />
          ))}
        </ul>
      </section>
    </>
  );
}

export default Main;