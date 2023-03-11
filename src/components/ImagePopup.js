function ImagePopup(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen && "popup_show"}`}>
      <div className="popup__post-container">
        <button className="popup__close-icon" type="button" aria-label="Иконка закрытия попапа" onClick={props.onClose}></button>
        <img className="popup__image" src={props.post.link} alt={props.post.name} />
        <h2 className="popup__image-title">{props.post.name}</h2>
      </div>
    </div>
  );
}
export default ImagePopup;
