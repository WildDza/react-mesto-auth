export { postSelectors, validationConfig };

const postSelectors = {
  post: ".post",
  postImg: ".post__img",
  postLikeIcon: ".post__like-icon",
  postLikeIconActive: "post__like-icon_active",
  postDelete: ".post__delete",
  postTitle: ".post__title",
  templateSelector: "#post-template",
  postLikeCounter: ".post__likes-counter",
};

const validationConfig = {
  popupForm: ".popup__content-container",
  popupInput: ".popup__input",
  saveButton: ".popup__button-save",
  saveButtonInactive: "popup__button-save_inactive",
  popupInputTypeError: "popup__input_type_error",
  popupInputErrorActive: "popup__input-error_active",
};

export const popupImage = document.querySelector(".popup_open-image");
export const popupAddPost = document.querySelector(".popup_add-post");
export const popupEdit = document.querySelector(".popup_edit");
export const popupAvatar = document.querySelector(".popup_change-avatar");
export const containerPosts = document.querySelector(".posts");
export const titleProfile = document.querySelector(".profile__title");
export const subtitleProfile = document.querySelector(".profile__subtitle");
export const popupWithConfirmDelPost = document.querySelector(".popup_confirm-delete-post");
export const iconDataEdit = document.querySelector(".profile__edit-icon");
export const iconPostAdd = document.querySelector(".profile__add-button");
export const formEditUserData = document.forms["profile-form"];
export const formAddPostData = document.forms["card-form"];
export const formChangeAvatar = document.forms["change-avatar-form"];
export const buttonAvatar = document.querySelector(".profile__avatar-container");
export const avatar = document.querySelector(".profile__img");
export const userNameInput = popupEdit.querySelector(".popup__input_name-area");
export const userJobInput = popupEdit.querySelector(".popup__input_addictions");
