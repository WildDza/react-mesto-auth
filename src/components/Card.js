import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const post = props.post;
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = post.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = post.likes.some((i) => i._id === currentUser._id);
  const postLikeButtonClassName = `post__like-icon ${isLiked && "post__like-icon_active"}`;

  function handleClick() {
    props.onPostClick(post);
  }

  function handleLikeClick() {
    props.onPostLike(post);
  }

  function handleDeleteClick() {
    props.onPostDelete(post);
  }

  return (
    <div id="post-template">
      <article className="post">
        <img className="post__img" src={post.link} alt={post.name} onClick={handleClick} />
        {isOwn && <button className="post__delete" onClick={handleDeleteClick} type="button" aria-label="Иконка удаления поста" />}
        <div className="post__info">
          <h2 className="post__title">{post.name}</h2>
          <div className="post__like">
            <button className={postLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Иконка лайка"></button>
            <span className="post__likes-counter">{post.likes.length}</span>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Card;
