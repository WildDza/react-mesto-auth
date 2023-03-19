import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const refInput = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: refInput.current.value,
    });
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" buttonSave="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input
        ref={refInput}
        className="popup__input popup__input_type_about popup__input_type_avatar popup__input_url-img"
        type="url"
        name="avatar"
        id="avatar-input"
        placeholder="Ссылка на аватар"
        required
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
