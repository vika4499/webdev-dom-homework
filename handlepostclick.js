import { postComment } from "./postcomment.js";
import { addCommentElement, addFormElement, nameInputElement, textAreaElement} from "./main.js";


// функция проверки полей и обработка кодов API
export const handlePostClick = () => {
    nameInputElement.classList.remove("error");
    textAreaElement.classList.remove("error");

    if (!nameInputElement.value || nameInputElement.value.trim().length === 0) {
        nameInputElement.classList.add("error");
        return;
    }

    else if (!textAreaElement.value || textAreaElement.value.trim().length === 0) {
        textAreaElement.classList.add("error");
        return;
    }

    // Скрыть форму добавления и показать сообщение о добавлении
    addFormElement.style.display = "none";
    addCommentElement.textContent = "Комментарий добавляется...";
    addCommentElement.style.display = "block";

    postComment(textAreaElement.value, nameInputElement.value)

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
function showAddForm() {
    addFormElement.style.display = "flex";
    addCommentElement.style.display = "none";
}