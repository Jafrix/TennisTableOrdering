import React, { useState } from "react";
import axiosInstance, { SetAccessToken } from "../axiosInstance";
import { useNavigate } from "react-router-dom";

function RegPage({ setUser }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== rpassword) {
      setErrorMessage("Пароли не совпадают");
      setShowError(true);
    } else if (
      !name.trim() ||
      !password.trim() ||
      !rpassword.trim() ||
      !email.trim()
    ) {
      setErrorMessage("Пустые поля !!!");
      alert(" ПОЛЯ ПУСТЫЕ !!! ");
    } else {
      setShowError(false);

      
      const response = await axiosInstance.post("/auth/reg", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        setUser(response.data.user);
        SetAccessToken(response.data.accessToken);
        navigate("/");
      } else {
        setErrorMessage("NET Cheloveka TAKOGO");
      }
    }
  };

  return (
    <div>

      <div>Зарегистрируйся</div>
      <form onSubmit={submitHandler}>
        <label>
          Имя
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <label>
          Почта
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value.trim());
            }}
          />
        </label>
        <label>
          Пароль
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value.trim());
            }}
          />
        </label>
        <label>
          Пароль повторно
          <input
            type="password"
            value={rpassword}
            onChange={(e) => {
              setRpassword(e.target.value.trim());
            }}
          />
        </label>
        <button type="submit">Зарегистриуйся</button>
      </form>

      {showError && (
        <div style={{ border: "1px solid red" }}>{errorMessage}</div>
      )}

    

    </div>
  );
}

export default RegPage;
