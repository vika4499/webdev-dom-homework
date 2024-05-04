import { login, setToken, token } from "./api.js";
import { fetchAndCommentsRender } from "./fetchnrender.js";
import { commentsData } from "./main.js";

export let userName;

export const renderLogin = () => {
    const appElement = document.getElementById("app");
    const loginHtml = `
  <div class="container">
        <div class="authorize-form">
            <h3>Форма входа</h3>
                <input id="login-input" type="text" class="authorize-form-login" placeholder="Введите логин" />
                <input id="password-input" type="text" class="authorize-form-password" placeholder="Введите пароль" />
            <button id="login-button" class="authorize-form-button">Войти</button>
            <!-- <p>Зарегистрироваться</p> -->
        </div>
    </div>
  `;

    appElement.innerHTML = loginHtml;
    
    
    const setName = (newName) => {
        userName = newName;
    }

    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");
    const enterButtonElement = document.getElementById("login-button");

    enterButtonElement.addEventListener("click", () => {
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        })
            .then((responseData) => {
                console.log(token);
                setToken(responseData.user.token);
                console.log(token);
                setName(responseData.user.name);
                fetchAndCommentsRender(commentsData, true, true, userName);

            })
            .catch((error) => {
                console.error("Ошибка входа:", error);
                alert("Неправильный логин или пароль");
            });
    });

};