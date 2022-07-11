import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const user = useContext(CurrentUserContext);

  const isOwn = card.owner._id === user.id;

  const cardDeleteButtonClassName = `cards__delete-btn ${
    isOwn ? "" : "cards__delete-btn_visibility_hidden"
  }`;

  const isLiked = card.likes.some(i => i._id === user.id);

  const cardLikeButtonClassName = `cards__like-btn ${
    isLiked ? "cards__like-btn_status_active" : ""
  }`;

  const handleClick = () => onCardClick(card);
  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onCardDelete(card);

  return (
    <li className="cards__item">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        aria-label="Удалить"
        onClick={handleDeleteClick}
      ></button>
      <img
        alt={card.name}
        className="cards__image"
        src={card.link}
        onClick={handleClick}
      />
      <div className="cards__info">
        <h2 className="cards__caption">{card.name}</h2>
        <div className="cards__like-element">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <p className="cards__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
