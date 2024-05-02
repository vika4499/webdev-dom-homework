import { getListElements } from "./api.js";
import { postListElement } from "./api.js";

// Структура данных для комментариев
let commentsData = [];

// Объявление переменных
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const textAreaElement = document.getElementById("text-input");
const buttonElement = document.getElementById("write-button");

const addFormElement = document.querySelector(".add-form");
const addCommentElement = document.getElementById("add-comment");

//Функция GET-запроса (получение с сервера)
function fetchAndCommentsRender() {
    addCommentElement.style.display = "none";
    getListElements().then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
            return {
                author: comment.author.name,
                date: new Date(comment.date).toLocaleDateString('default', { day: '2-digit', month: '2-digit', year: '2-digit' }) + " " + new Date(comment.date).toLocaleTimeString().slice(0, -3),
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            };
        });

        commentsData = appComments;
        addFormElement.style.display = "flex"; // Показать форму после
        renderComments();
    });
};

// Функция для рендеринга списка комментариев
function renderComments() {
    listElement.innerHTML = commentsData.map((comment, index) => {
        const textWithHTML = comment.text.replaceAll("QUOTE_BEGIN", "<div class='quote'>").replaceAll("QUOTE_END", "</div>");
        return `
            <li data-index="${index}" class="comment">
                <div class="comment-header">
                    <div>${comment.author}</div>
                    <div>${comment.date}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">${textWithHTML}</div>
                </div>
                <div class="comment-footer">
                    <div class="likes">
                        <span class="likes-counter">${comment.likes}</span>
                        <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
                    </div>
                </div>
            </li>
        `;
    }).join('');

    attachLikeButtonHandler();
    initEditComments();

}
fetchAndCommentsRender();
renderComments();

const postComment = (text, name) => {
    postListElement( {name: nameInputElement.value, text: textAreaElement.value } )
    .then(() => {
        fetchAndCommentsRender();
        nameInputElement.value = "";
        textAreaElement.value = "";
    })
};

// функция проверки полей и обработка кодов API
const handlePostClick = () => {

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

    renderComments();
};


buttonElement.addEventListener('click', handlePostClick);

// Показ заполненной формы
function showAddForm() {
    addFormElement.style.display = "flex";
    addCommentElement.style.display = "none";
}

function attachLikeButtonHandler() {
    const likeButtons = document.querySelectorAll('.like-button');
    for (const button of likeButtons) {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            button.classList.add('-loading-like');
            delay(2000).then(() => {
                const index = parseInt(button.dataset.index);
                const isActive = commentsData[index].isLiked;
                if (isActive) {
                    commentsData[index].likes--;
                } else {
                    commentsData[index].likes++;
                }
                commentsData[index].isLiked = !isActive;
                renderComments();
            });
        });
    }
}


function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

function initEditComments() {
    const editComments = document.querySelectorAll('.comment');
    for (const editComment of editComments) {
        editComment.addEventListener('click', () => {
            const index = editComment.dataset.index;
            const commentAuthor = `QUOTE_BEGIN${commentsData[index].author}:`;
            const commentText = `${commentsData[index].text}QUOTE_END`;
            textAreaElement.value = `${commentAuthor}\n${commentText}\n\n`;
            renderComments();
        })
    }
}