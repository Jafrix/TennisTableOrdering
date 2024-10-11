import React, { Dispatch, SetStateAction, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance, { setAccessToken } from "../shared/api/axiosInstance";
import { UserRegType } from "./UserRegType";

type LoginPageProps = {
  setUser: Dispatch<SetStateAction<UserRegType | null>>;
}

function LoginPage({ setUser }:LoginPageProps) {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigate();

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!email.trim() || !password.trim()) {
      return alert("Не верная запись логина или пароля !")
    }
    const response = await axiosInstance.post("/auth/log", { email, password });
    
      if (response.status === 201) {
      setUser(response.data.user);
      setAccessToken(response.data.accessToken)
      navigation("/");
  // console.log(response.data.user, "RDRDRD")

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
