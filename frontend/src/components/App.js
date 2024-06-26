import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from "react";

import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import api from "../utils/api";
import { AddPlacePopup } from "./AddPlacePopup.js";
import { EditAvatarPopup } from "./EditAvatarPopup.js";
import { EditProfilePopup } from "./EditProfilePopup.js";
import { ConfirmDeletePopup } from "./ConfirmDeletePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoToolTip';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCardToDelete, setSelectedCardToDelete] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isInfoToolOpen, setIsInfoToolOpen] = useState(false);
  const [popupType, setPopupType] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cardsApp, setCards] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [currentUser, setCurrentUser] = useState({
    name: " ",
    about: " ",
    avatar: " ",
  });

  const history = useHistory();

  // comando para fechar popups com Esc
  const EnableEsc = () => {
    const escFunction = useCallback((event) => {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }, []);

    useEffect(() => {
      document.addEventListener("keydown", escFunction, false);

      return () => {
        document.removeEventListener("keydown", escFunction, false);
      };
    }, [escFunction]);
  };
  EnableEsc();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      auth.checkToken(token).then((res) => {
          if (res && isLoggedIn === false) {
            setIsLoggedIn(true);
            console.log(isLoggedIn)
            history.push('/');
            setUserEmail(res.data.email);
          }
        }).catch((err) => {
          console.log(err);
        });
       api.getInitialCards(token).then((initialCardsResponse) => {
           setCards(initialCardsResponse.data);
         }).catch((error) => {
           console.error('Erro ao buscar dados dos cartões:', error);
         });

       api.getUserInfo(token).then((userInfoResponse) => {
           setCurrentUser(userInfoResponse.data);
         }).catch((error) => {
           console.error('Erro ao buscar informações do usuário:', error);
         });
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn, userEmail, history]);

  
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  function handleConfirmDeleteClick (cardId) {
    setSelectedCardToDelete(cardId);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleUpdateUser = ({ name, about }) => {
    api.editUserInfo(name, about).then(setCurrentUser).then(closeAllPopups);
  };

  const handleUpdateAvatar = (avatar) => {
    api.editAvatar(avatar).then(setCurrentUser).then(closeAllPopups);
  };

  const handleCardLike = (card) => {
    // Verifique mais uma vez se esse cartão já foi curtido
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Envie uma solicitação para a API e obtenha os dados do cartão atualizados
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  };

  const handleCardDelete = (cardId) => {
    api.deleteCard(cardId).then(() => {
      setCards(cardsApp.filter((card) => card._id !== cardId));
      setSelectedCardToDelete("");
    });
  };

  const handleAddPlaceSubmit = (name, link) => {
    api.addCard(name, link).then((newCard) => setCards([newCard, ...cardsApp])).then(closeAllPopups);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCardToDelete("");
    setSelectedCard(null);
    setIsInfoToolOpen(false);
  };

  function handleRegister(success) {
    setIsInfoToolOpen(true);
    setPopupType(success);
  }

  function handleRegisterError(fail) {
    setIsInfoToolOpen(true);
    setPopupType(fail);
  }

  function handleClose() {
    if (popupType === 'success') {
      setIsInfoToolOpen(false);
      history.push('/login');
    } else {
      setIsInfoToolOpen(false);
    }
  }

  function handleLogin() {
    setIsLoggedIn(true);
  }

 function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/login');
  }


  return (
      <div className='App'>
        <section className="page">
          <CurrentUserContext.Provider value={currentUser}>
            <Switch>
              <Route path='/register'>
                <Register
                  handleRegister={handleRegister}
                  handleRegisterError={handleRegisterError}
                />
                <InfoToolTip
                  isOpen={isInfoToolOpen}
                  popupType={popupType}
                  handleClose={handleClose}
                />
              </Route>
              <Route path='/login'>
                <Login handleLogin={handleLogin}
                      handleRegisterError={handleRegisterError} />
                <InfoToolTip
                      isOpen={isInfoToolOpen}
                      popupType={popupType}
                      handleClose={handleClose}
                    />
              </Route>
              <Route path='/'>
                <ProtectedRoute
                  exact
                  path='/'
                  isLoggedIn={isLoggedIn}
                  component={
                    <Main
                      onEditAvatarClick={handleEditAvatarClick}
                      onEditProfileClick={handleEditProfileClick}
                      onAddPlaceClick={handleAddPlaceClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onConfirmClick={handleConfirmDeleteClick}
                      cardsApp={cardsApp}
                      userEmail={userEmail}
                      handleLogout={handleLogout}
                    />
                  }
                />
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlaceSubmit={handleAddPlaceSubmit}
                />

              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />

              <ConfirmDeletePopup
                cardId={selectedCardToDelete}
                onClose={closeAllPopups}
                onCardDelete={handleCardDelete}
              />

              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              </Route>
            </Switch>
            <Footer />
          </CurrentUserContext.Provider>
        </section>
      </div>
  );
}

export default withRouter(App);