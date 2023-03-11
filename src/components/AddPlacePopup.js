import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [namePost, setNamePost] = useState("");
  const [link, setLink] = useState("");

  function handleNamePost(evt) {
    setNamePost(evt.target.value);
  }

  function handleLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPost({
      name: namePost,
      link: link,
    });
    setNamePost("");
    setLink("");
  }

  return (
    <PopupWithForm name="add" title="Новое место" buttonSave="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input
        onChange={handleNamePost}
        value={namePost || ""}
        className="popup__input popup__input_name-img"
        type="text"
        name="name"
        id="postName-input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__input-error postName-input-error"></span>
      <input
        onChange={handleLink}
        value={link || ""}
        className="popup__input popup__input_type_about popup__input_url-img"
        type="url"
        name="link"
        id="link-input"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
