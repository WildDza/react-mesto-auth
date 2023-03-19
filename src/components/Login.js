import React, { useState } from "react";

function Login(props) {
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
    if (!formValue.email || !formValue.password) {
      return;
    }
    props.onLogIn(formValue);
  }

  return (
    <section className="auth">
      <h3 className="auth__title">Вход</h3>
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
          <span className="password-input-error"></span>
        </input>
        <button className="auth__submit" type="submit" aria-label="кнопка подтверждения входа">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
