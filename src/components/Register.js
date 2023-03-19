import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(formValue);
    props.isStatusPopupOpen(true);
  }

  return (
    <section className="auth">
      <h3 className="auth__title">Регистрация</h3>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input auth__input_email"
          id="email"
          name="email"
          type="email"
          value={formValue.email || ""}
          placeholder="Email"
          onChange={handleChange}
          minLength="2"
          required
        >
          {/* задел на будущую валиадацию */}
          <span className="email-input-error"></span>
        </input>

        <input
          className="auth__input auth__input_pass"
          id="password"
          name="password"
          type="password"
          value={formValue.password || ""}
          placeholder="Пароль"
          onChange={handleChange}
          minlength="8"
          required
        >
          {/* задел на будущую валидацию */}
          <span className="password-input-error"></span>
        </input>
        <button className="auth__submit" type="submit" aria-label="кнопка подтверждения регистрации">
          Войти
        </button>
      </form>
      <span className="auth__question">
        Уже зарегистрированы?
        <Link className="auth__link" to="/sign-in">
          Войти
        </Link>
      </span>
    </section>
  );
}

export default Register;
