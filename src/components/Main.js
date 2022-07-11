import React, { useState, useEffect, useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from "../utils/Api";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const user = useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === user.id);
   
    api.toggleLike(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    api.getInitialCards()
    .then((res) => {
      setCards(res);
    })
    .catch((err) => console.log(`Возникла ошибка: ${err}`));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
          <img
            alt="аватар пользователя"
            className="profile__avatar"
            src={user !== null ? user.avatar : ''}
          />
        </div>
        <div className="profile__about">
          <div className="profile__name-edit-wrapper">
            <h1 className="profile__username">{user !== null ? user.name : ''}</h1>
            <button
              type="button"
              aria-label="Редактировать профиль"
              className="profile__edit-btn"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__userinfo">{user !== null ? user.about : ''}</p>
        </div>
        <button
          type="button"
          aria-label="Загрузить фото"
          className="profile__add-btn"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards">
        <ul className="cards__items">
          {cards.map((card) => 
             (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            ))
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;
