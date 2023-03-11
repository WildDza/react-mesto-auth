import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePostConfirm from "./DeletePostConfirm";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [currentPost, setCurrentPost] = useState({});

  useEffect(() => {
    api
      .getProfileInformation()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => console.log("Ошибка... " + error));
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.log("Ошибка... " + error));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handlePostClick(data) {
    setIsImagePopupOpen(true);
    setSelectedCard(data);
  }

  function handlePostDeleteClick(data) {
    setIsConfirmDeletePopupOpen(true);
    setCurrentPost(data);
  }

  function handlePostDelete(post) {
    api
      .deletePost(post._id)
      .then(() => {
        setPosts((data) => data.filter((p) => p._id !== post._id));
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => console.log("Ошибка... " + error));
  }

  function handleAddPost(data) {
    api
      .addPost(data.name, data.link)
      .then((newPost) => {
        setPosts([newPost, ...posts]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => console.log("Ошибка... " + error));
  }

  function handlePostLike(post) {
    const isLiked = post.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikePostStatus(post._id, isLiked)
      .then((newPost) => {
        setPosts((state) => state.map((p) => (p._id === post._id ? newPost : p)));
      })
      .catch((error) => console.log("Ошибка... " + error));
  }

  function handleUpdateUser(data) {
    api
      .editProfileInformation(data.name, data.about)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => console.log("Ошибка... " + error));
  }

  function handleUpdateAvatar(data) {
    api
      .editUserAvatar(data.avatar)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => console.log("Ошибка... " + error));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setCurrentPost({});
    setIsConfirmDeletePopupOpen(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onPostClick={handlePostClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          posts={posts}
          onPostLike={handlePostLike}
          onPostDelete={handlePostDeleteClick}
        />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPost={handleAddPost} />

        <DeletePostConfirm post={currentPost} isOpen={isConfirmDeletePopupOpen} onClose={closeAllPopups} onSubmit={handlePostDelete} />

        <ImagePopup post={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
