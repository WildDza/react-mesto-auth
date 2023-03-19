import logo from "../images/logo.svg";
import { Link, useNavigate, Route, Routes } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();

  function handleSignOut() {
    localStorage.removeItem("token");
    props.handleLogOut();
    navigate("/sign-in");
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип 'Mesto'" />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ul className="header__navigations">
              <li>
                <p className="header__email">{props.userEmail}</p>
              </li>
              <li>
                <button className="header__link header__button" onClick={handleSignOut}>
                  Выйти
                </button>
              </li>
            </ul>
          }
        ></Route>
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        ></Route>
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link">
              Вход
            </Link>
          }
        ></Route>
      </Routes>
    </header>
  );
}
export default Header;
