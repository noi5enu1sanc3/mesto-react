import React from "react";

function Card({ card, onCardClick }) {
  const handleClick = () => onCardClick(card);

  return (
    <li className="cards__item">
      <button type="button" className="cards__delete-btn" aria-label="Удалить"></button>
      <img
        alt={card.name}
        className="cards__image"
        src={card.link}
        onClick={handleClick}
      />
      <div className="cards__info">
        <h2 className="cards__caption">{card.name}</h2>
        <div className="cards__like-element">
          <button type="button" className="cards__like-btn" aria-label="Нравится"></button>
          <p className="cards__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;
