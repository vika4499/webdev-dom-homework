import { sanitizeHtml } from "./sanitizeHtml.js";

export function getListElements() {
    const loadingElement = document.querySelector(".loading");
    return fetch("https://wedev-api.sky.pro/api/v1/aleksander-gavrikov/comments", {
        method: "GET"
    })
        //исполнить ниже, когда придёт ответ от сервера (then)
        .then((response) => {
            loadingElement.style.display = "none";
            return response.json();
        });
}

export function postListElement({ name, text }) {
    //POST-запрос с цепочкой промисов (отправка на сервер)
    return fetch("https://wedev-api.sky.pro/api/v1/aleksander-gavrikov/comments", {
        method: "POST",
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