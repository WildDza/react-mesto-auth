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
    props.setIsPopupOpen({ isStatusPopupOpen: true });
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
        />

        <input
          className="auth__input auth__input_pass"
          id="password"
          name="password"
          type="password"
          value={formValue.password || ""}
          placeholder="Пароль"
          onChange={handleChange}
          minLength="8"
          required
        />
        <button className="auth__submit" type="submit" aria-label="кнопка подтверждения регистрации">
          Зарегистрироваться
        </button>
      </form>
      <p className="auth__question">
        Уже зарегистрированы?{" "}
        <Link className="auth__link" to="/sign-in">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
