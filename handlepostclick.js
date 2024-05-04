import { postComment } from "./postcomment.js";
import { isAuthenticated } from "./main.js";

// функция проверки полей и обработка кодов API
export const handlePostClick = () => {

    const nameInputElement = document.getElementById("name-input");
    const textAreaElement = document.getElementById("text-input");
    const addFormElement = document.querySelector(".add-form");
    const addCommentElement = document.getElementById("add-comment");


    nameInputElement.classList.remove("error");
    textAreaElement.classList.remove("error");

    if (!nameInputElement.value || 
        nameInputElement.value.trim().length === 0) {
        nameInputElement.classList.add("error");
        return;
    }

    else if (!textAreaElement.value || 
        textAreaElement.value.trim().length === 0) {
        textAreaElement.classList.add("error");
        return;
    }

    // Скрыть форму добавления и показать сообщение о добавлении
    addFormElement.style.display = "none";
    addCommentElement.textContent = "Комментарий добавляется...";
    addCommentElement.style.display = "block";

    postComment(textAreaElement.value, nameInputElement.value, isAuthenticated)

        .catch((error) => {

            // Обработка ошибки сервера
            if (error.message === "Сервер упал") {
                handlePostClick();
            }

            // Обработка ошибки пользователя
            else if (error.message === "Ошибочный запрос") {
                alert("Имя и комментарий должны быть не короче 3 символов");
                showAddForm();
                return;
            }

            else {
                alert("Кажется, у вас сломался интернет, попробуйте позже");
                showAddForm();
            }
        });

};

// Показ заполненной формы
const showAddForm = () => {

    const addFormElement = document.querySelector(".add-form");
    const addCommentElement = document.getElementById("add-comment");
    addFormElement.style.display = "flex";
    addCommentElement.style.display = "none";
}