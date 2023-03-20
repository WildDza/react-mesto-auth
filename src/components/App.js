import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import api from "../utils/Api";
import auth from "../utils/Auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePostConfirm from "./DeletePostConfirm";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState({
    isEditAvatarPopupOpen: false,
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    isImagePopupOpen: false,
    isConfirmDeletePopupOpen: false,
    isStatusPopupOpen: false,
  });

  const [posts, setPosts] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [currentPost, setCurrentPost] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [tooltipInfo, setTooltipInfo] = useState({ success: null, text: "" });
  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((error) => console.log("Ошибка... " + error));
    }
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfileInformation(), api.getInitialCards()])
        .then(([dataProfile, dataPosts]) => {
          setCurrentUser(dataProfile);
          setPosts(dataPosts);
        })
        .catch((error) => console.log("Ошибка... " + error));
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsPopupOpen({ isEditAvatarPopupOpen: true });
  }

  function handleEditProfileClick() {
    setIsPopupOpen({ isEditProfilePopupOpen: true });
  }

  function handleAddPlaceClick() {
    setIsPopupOpen({ isAddPlacePopupOpen: true });
  }

  function handlePostClick(data) {
    setIsPopupOpen({ isImagePopupOpen: true });
    setSelectedCard(data);
  }

  function handlePostDeleteClick(data) {
    setIsPopupOpen({ isConfirmDeletePopupOpen: true });
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

  function handleRegister(data) {
    auth
      .register(data.email, data.password)
      .then((res) => {
        if (res) {
          setTooltipInfo({ success: true, text: "Вы успешно зарегистрировались!" });
        } else {
          setTooltipInfo({ success: false, text: "Что-то пошло не так! Попробуйте ещё раз." });
        }
      })
      .catch((error) => {
        console.log("Ошибка... " + error);
        setTooltipInfo({ success: false, text: "Что-то пошло не так! Попробуйте ещё раз." });
      });
  }

  function handleLogOut() {
    setLoggedIn(false);
  }

  function handleAuth(data) {
    auth
      .authorize(data.email, data.password)
      .then((res) => {
        if (res) {
          setUserEmail(data.email);
          setLoggedIn(true);
        }
      })
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((error) => console.log("Ошибка... " + error));
  }

  function closeAllPopups() {
    setIsPopupOpen({ prop: false });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onLogged={loggedIn} userEmail={userEmail} onLogOut={handleLogOut} />

        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register
                setIsPopupOpen={setIsPopupOpen}
                onRegister={handleRegister}
                isRegistered={tooltipInfo.success}
                setTooltipInfo={setTooltipInfo}
              />
            }
          />
          <Route path="/sign-in" element={<Login onLogIn={handleAuth} setUserEmail={setUserEmail} />} />

          <Route
            exact
            path="/"
            element={
              <ProtectedRoute isAllowed={loggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onPostClick={handlePostClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  posts={posts}
                  onPostLike={handlePostLike}
                  onPostDelete={handlePostDeleteClick}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
        <InfoTooltip tooltipInfo={tooltipInfo} setTooltipInfo={setTooltipInfo} isOpen={isPopupOpen.isStatusPopupOpen} onClose={closeAllPopups} />

        <EditProfilePopup isOpen={isPopupOpen.isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup isOpen={isPopupOpen.isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup isOpen={isPopupOpen.isAddPlacePopupOpen} onClose={closeAllPopups} onAddPost={handleAddPost} />

        <DeletePostConfirm post={currentPost} isOpen={isPopupOpen.isConfirmDeletePopupOpen} onClose={closeAllPopups} onSubmit={handlePostDelete} />

        <ImagePopup post={selectedCard} isOpen={isPopupOpen.isImagePopupOpen} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
