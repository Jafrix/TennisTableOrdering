import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance, { SetAccessToken } from "../axiosInstance";

function LoginPage({ setUser }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(!email.trim() || !password.trim()) {
      return alert("Не верная запись логина или пароля !")
    }
    const response = await axiosInstance.post("/auth/log", { email, password });
      if (response.status === 201) {
      setUser(response.data.user);
      SetAccessToken(response.data.accessToken)
      navigation("/");
    }
  };

  return (
    <div >
      <form id="log" onSubmit={onSubmitHandler} >
        <label> Email 
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
        </label>
        <label> Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
          />
        </label>
        <button className="btn" type="submit">Авторизоваться</button>
      </form>

    </div>
  );
}

export default LoginPage;
