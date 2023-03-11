function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen && "popup_show"}`}>
      <div className={`popup__content popup__content_${props.name} `}>
        <button className="popup__close-icon" type="button" aria-label="Иконка закрытия попапа" onClick={props.onClose}></button>
        <form onSubmit={props.onSubmit} className={`popup__content-container popup__form popup__form-${props.name} `} name={props.name}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className={`popup__button-save popup__button-save_${props.name}`} type="submit" aria-label="Кнопка подтверждения">
            {props.buttonSave}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
