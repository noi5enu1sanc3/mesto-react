export const cardsListContainerSelector = '.cards__items';

export const cardTemplateId = '#card';

export const popupWithImageSelector = '.popup_role_view-image';
export const popupCardSubmitSelector = '.popup_role_add-card';
export const popupProfileEditSelector = '.popup_role_edit-profile';
export const popupConfirmSelector = '.popup_role_confirm';
export const popupChangeAvatarSelector = '.popup_role_change-avatar';

const formSelector = '.popup__form';

export const usernameTextSelector = '.profile__username';
export const userinfoTextSelector = '.profile__userinfo';
export const avatarSelector = '.profile__avatar';

const profile = document.querySelector('.profile');

export const profileEditBtn = profile.querySelector('.profile__edit-btn');
export const cardAddButton = profile.querySelector('.profile__add-btn');
export const avatarEditElem = profile.querySelector('.profile__avatar-overlay');

const popupProfileEdit = document.querySelector('.popup_role_edit-profile');
const popupCardAdd = document.querySelector('.popup_role_add-card');
const popupChangeAvatar = document.querySelector('.popup_role_change-avatar');

export const formUsername = popupProfileEdit.querySelector('.popup__input-form_type_username');
export const formUserinfo = popupProfileEdit.querySelector('.popup__input-form_type_userinfo');

const formSubmitProfileContainer = popupProfileEdit.querySelector('.popup__container');
const formSubmitCardContainer = popupCardAdd.querySelector('.popup__container');
const formSubmitAvatarContainer = popupChangeAvatar.querySelector('.popup__container');

export const profileForm = formSubmitProfileContainer.querySelector(formSelector);
export const cardAddForm = formSubmitCardContainer.querySelector(formSelector);
export const changeAvatarForm = formSubmitAvatarContainer.querySelector(formSelector);

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-form',
  submitButtonSelector: '.popup__save-btn',
  closeButtonSelector: '.popup__close-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input-form_type_error',
};

export const elementsConfigCard = {
  cardElementSelector: '.cards__item',
  cardImageSelector: '.cards__image',
  cardCaptionSelector: '.cards__caption',
  cardLikeButtonSelector: '.cards__like-btn',
  cardLikesCountSelector: '.cards__like-count',
  cardDeleteButtonSelector: '.cards__delete-btn',
  cardLikeButtonActiveClass: 'cards__like-btn_status_active',
  hiddenDeleteButtonClass: 'cards__delete-btn_visibility_hidden'
}

export const elementsConfigPopup = {
  popupVisibleClass: 'popup_status_show', 
  popupCloseButtonSelector: '.popup__close-btn',
  submitButtonSelector: '.popup__save-btn',
  popupImageCaptionSelector: '.popup__caption', 
  popupImageSelector: '.popup__image',
  formSelector: '.popup__form',
  inputSelector: '.popup__input-form',
  submitButtonSelector: '.popup__save-btn'
}
