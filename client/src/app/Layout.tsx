import React, { Dispatch, SetStateAction } from "react";
import { Link, Outlet } from "react-router-dom";
import axiosInstance, { setAccessToken } from "../shared/api/axiosInstance";
import { UserRegType } from "../pages/UserRegType";

function Layout({ user, setUser }: {user:UserRegType, setUser:Dispatch<SetStateAction<UserRegType | null>>}) {
  // очистка куки юзера ----- LOGOUT------Сама кнопка в разметке ниже

  const logoutHandler = async () => {
    const response = await axiosInstance.delete("/auth/logout");
    if (response.status === 200) {
      setUser(null);
      setAccessToken("");
    }
  };
  // ----------------------------------------------------------------

  return (
    <>
      <div className="header">
        <nav>
          <div className="nav-bar">
            <ul className="nav-btn">
              <li>
                <Link to={"/"}>Главная</Link>
              </li>
              <li>
                <Link to={"/table"}>Столы</Link>
              </li>
              {/* <li> */}

              {/* <Link to={"/cart"}>Корзина</Link> */}
              {/* </li> */}
            </ul>
            <h1>Теннисный Стол</h1>
            <ul className="nav-btn">
              {!user && (
              <>
                <li>
                  <Link to={"/login"}>Авторизация</Link>
                </li>
                <li>
                  <Link to={"/reg"}>Регистрация</Link>
                </li>
              </>
              )}
            </ul>

            <div className="logout">
              {user && (
                <>
                  <p className="header-name">{"Привет, " + user.name}</p>
                  <button
                    className="header-btn"
                    type="button"
                    onClick={logoutHandler}
                  >
                    Выйти
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>

      <div className="body">
        <div className="main-page">
          <h2>Хочешь немного поиграть?</h2>
          <p>Выбирай время и бронируй</p>
        </div>

        <Outlet />
      </div>

      <div className="footer">Футер для красоты</div>
    </>
  );
}

export default Layout;
