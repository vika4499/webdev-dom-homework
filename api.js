import { sanitizeHtml } from "./sanitizeHtml.js";
import { loadingElement } from "./varexp.js";


const commentsURL = "https://wedev-api.sky.pro/api/v2/aleksander-gavrikov/comments";
const userURL = "https://wedev-api.sky.pro/api/user/login";

export let token;

export const setToken = (newToken) => {
    token = newToken;
}

export function getListElements() {
    // const loadingElement = document.querySelector(".loading");
    return fetch(commentsURL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            // loadingElement.style.display = "none";
            return response.json();
        });
}

export function postListElement({ name, text }) {
    //POST-запрос с цепочкой промисов (отправка на сервер)
    return fetch(commentsURL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: sanitizeHtml(name),
            text: sanitizeHtml(text),
            forceError: true,
        })
    })
        .then((response) => {

            if (response.status === 500) {
                throw new Error("Сервер упал");
            }

            if (response.status === 400) {
                throw new Error("Ошибочный запрос");
            }
            else {
                return response.json()
            }
        })
}

export function login({ login, password }) {
    return fetch(userURL, {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
    }).then((response) => {
      return response.json();
    });
  }