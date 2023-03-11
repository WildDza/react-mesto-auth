import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ posts, ...props }) {
  const currentUser = useContext(CurrentUserContext);

  const postElements = posts.map((post) => (
    <Card key={post._id} post={post} onPostClick={props.onPostClick} onPostLike={props.onPostLike} onPostDelete={props.onPostDelete} />
  ));

  return (
    <main className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__avatar-container">
          <div className="profile__avatar-icon" onClick={props.onEditAvatar}>
            <button className="profile__avatar-edit" type="button" aria-label="Иконка карандаша"></button>
          </div>
          <img className="profile__img" alt="Фото профиля" src={currentUser.avatar} />
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-icon" type="button" aria-label="Иконка корректировка личных данных" onClick={props.onEditProfile}></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Иконка добавления поста" onClick={props.onAddPlace}></button>
      </section>

      <section className="posts" aria-label="Посты">
        {postElements}
      </section>
    </main>
  );
}
export default Main;
