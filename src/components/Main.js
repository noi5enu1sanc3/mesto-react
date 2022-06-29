import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';

function Main() {
  function handleEditAvatarClick() {
    document
      .querySelector(".popup_role_change-avatar")
      .classList.add("popup_status_show");
  }

  function handleEditProfileClick() {
    document
      .querySelector(".popup_role_edit-profile")
      .classList.add("popup_status_show");
  }

  function handleAddPlaceClick() {
    document
      .querySelector(".popup_role_add-card")
      .classList.add("popup_status_show");
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <div
            className="profile__avatar-overlay"
            onClick={handleEditAvatarClick}
          ></div>
          <img alt="аватар пользователя" className="profile__avatar" />
        </div>
        <div className="profile__about">
          <div className="profile__name-edit-wrapper">
            <h1 className="profile__username">Онейрос</h1>
            <button
              type="button"
              aria-label="Редактировать профиль"
              className="profile__edit-btn"
              onClick={handleEditProfileClick}
            ></button>
          </div>
          <p className="profile__userinfo">Исследователь снов</p>
        </div>
        <button
          type="button"
          aria-label="Загрузить фото"
          className="profile__add-btn"
          onClick={handleAddPlaceClick}
        ></button>
      </section>
      <section className="cards">
        <ul className="cards__items"></ul>
      </section>

      <PopupWithForm name="edit-profile" title="Редактировать профиль">
        <input
          name="name"
          id="username-input"
          type="text"
          className="popup__input-form popup__input-form_type_username"
          placeholder="Как вас зовут?"
          minLength="2"
          maxLength="40"
          required
        />
        <div className="popup__input-error-container">
          <span
            className="popup__input-error"
            id="username-input-error"
          ></span>
        </div>
        <input
          name="about"
          id="userinfo-input"
          type="text"
          className="popup__input-form popup__input-form_type_userinfo"
          placeholder="Кто вы?"
          minLength="2"
          maxLength="200"
          required
        />
        <div className="popup__input-error-container">
          <span
            className="popup__input-error"
            id="userinfo-input-error"
          ></span>
        </div>
        <button type="submit" className="popup__save-btn">
          Сохранить
        </button>
      </PopupWithForm>

      <PopupWithForm name="add-card" title="Новое место">
        <input
          name="name"
          id="cardName-input"
          type="text"
          className="popup__input-form popup__input-form_type_card-name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <div className="popup__input-error-container">
          <span
            className="popup__input-error"
            id="cardName-input-error"
          ></span>
        </div>
        <input
          name="link"
          id="cardLink-input"
          type="url"
          className="popup__input-form popup__input-form_type_card-link"
          placeholder="Ссылка на картинку"
          required
        />
        <div className="popup__input-error-container">
          <span
            className="popup__input-error"
            id="cardLink-input-error"
          ></span>
        </div>
        <button type="submit" className="popup__save-btn">
          Создать
        </button>
      </PopupWithForm>

      <PopupWithForm name="confirm" title="Вы уверены?">
        <button className="popup__save-btn" type="submit">
          Да
        </button>
      </PopupWithForm>

      <PopupWithForm name="change-avatar" title="Обновить аватар">
        <input
          name="avatar"
          id="avatarLink-input"
          type="url"
          className="popup__input-form popup__input-form_type_avatar-link"
          placeholder="Ссылка на аватар"
          required
        />
        <div className="popup__input-error-container">
          <span
            className="popup__input-error"
            id="avatarLink-input-error"
          ></span>
        </div>
        <button type="submit" className="popup__save-btn">
          Сохранить
        </button>
      </PopupWithForm>

      <ImagePopup />
    </main>
  );
}

export default Main;
