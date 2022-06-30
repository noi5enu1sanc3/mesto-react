import React from "react";
import api from "../utils/Api"

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(
   () => {
      api.getUserInfo()
        .then((res) => {
          setUserName(res.name);
          setUserDescription(res.about);
          setUserAvatar(res.avatar);
        })
    }
  );

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <div
            className="profile__avatar-overlay"
            onClick={props.onEditAvatar}
          ></div>
          <img alt="аватар пользователя" className="profile__avatar" src={userAvatar}/>
        </div>
        <div className="profile__about">
          <div className="profile__name-edit-wrapper">
            <h1 className="profile__username">{userName}</h1>
            <button
              type="button"
              aria-label="Редактировать профиль"
              className="profile__edit-btn"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__userinfo">{userDescription}</p>
        </div>
        <button
          type="button"
          aria-label="Загрузить фото"
          className="profile__add-btn"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="cards">
        <ul className="cards__items"></ul>
      </section>
    </main>
  );
}

export default Main;
