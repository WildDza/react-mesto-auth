import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePostConfirm(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit(props.post);
  }

  return <PopupWithForm name="delete" title="Вы уверены?" buttonSave="Да" isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose} />;
}

export default DeletePostConfirm;
