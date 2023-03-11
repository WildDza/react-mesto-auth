import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    setNameUser(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen, currentUser]);

  const [nameUser, setNameUser] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  function handleNameUser(evt) {
    setNameUser(evt.target.value);
  }

  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: nameUser,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonSave="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleNameUser}
        value={nameUser || ""}
        className="popup__input popup__input_name-area"
        type="text"
        name="name"
        id="userName-input"
        placeholder="Ваше имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__input-error userName-input-error"></span>
      <input
        onChange={handleDescription}
        value={description || ""}
        className="popup__input popup__input_type_about popup__input_addictions"
        type="text"
        name="about"
        id="userAddictions-input"
        placeholder="Чем Вы занимаетесь?"
        minLength="2"
        maxLength="200"
        required
      />

      <span className="popup__input-error userAddictions-input-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
