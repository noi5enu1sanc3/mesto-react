import React, { useContext } from "react";
import { useLongPress } from "react-use";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
  onCardLikeCounter
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `cards__delete-btn ${
    isOwn ? "" : "cards__delete-btn_visibility_hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `cards__like-btn ${
    isLiked ? "cards__like-btn_status_active" : ""
  }`;

  const handleClick = () => onCardClick(card);
  const handleLikeClick = () =>  {
    console.log('like clicked')
    onCardLike(card);}
  const handleDeleteClick = () => onCardDelete(card);
  const handleLikeCounterClick = (evt) =>
    evt.target !== evt.target.closest(".cards__like-btn") &&
    onCardLikeCounter(card);

  const handleLongPress = () => {
    console.log("long pressed");
    onCardLikeCounter(card);
  };
  const defaultOptions = {
    isPreventDefault: false,
    delay: 300
  };
  const longPressEvent = useLongPress(handleLongPress, defaultOptions);

  return (
    <li className="cards__item" onContextMenu={(e)=> e.preventDefault()}>
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
      <div className="cards__info" onContextMenu={(e)=> e.preventDefault()}>
        <h2 className="cards__caption">{card.name}</h2>
        <div className="cards__like-element" onClick={handleLikeCounterClick} {...longPressEvent} onContextMenu={(e)=> e.preventDefault()}>
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            onClick={handleLikeClick}
            onContextMenu={(e)=> e.preventDefault()}
          ></button>
          <p className="cards__like-count" onContextMenu={(e)=> e.preventDefault()}>{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
