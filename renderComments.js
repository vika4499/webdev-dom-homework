import { attachLikeButtonHandler } from "./likebuttons.js";
import { initEditComments } from "./editcomment.js";
import { handlePostClick } from "./handlepostclick.js";
import { renderLogin } from "./renderLogin.js";
export function renderComments(commentsData, isAuthenticated, isAuthorized, userName) {

    const appElement = document.getElementById("app");
    const commentsHtml = commentsData
        .map((comment, index) => {
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


    const addFormHtml = isAuthenticated ? `
        <div class="add-form">
            <input id="name-input" type="text" class="add-form-name" value = "${userName}" readonly />
            <textarea id="text-input" type="textarea" class="add-form-text" placeholder="Введите Ваш коментарий" rows="4"></textarea>
            <div class="add-form-row">
                <button id="write-button" class="add-form-button">Написать</button>
            </div>
        </div>` : '';

    const appHtml = `
<div class="container">
    <ul id="list" class="comments">${commentsHtml}</ul>
    <div id="add-comment" class="add-comment-text ${isAuthorized ? 'hidden' : ''}">Чтобы добавить комментарий, <span class = "authorize-word">авторизуйтесь</span></div>
    ${addFormHtml}
  </div>
`;
    appElement.innerHTML = appHtml;


    const authorizeWordElement = document.querySelector(".authorize-word");
    authorizeWordElement.addEventListener('click', renderLogin);


    const buttonElement = document.getElementById("write-button");
    if (buttonElement) {
        buttonElement.addEventListener('click', handlePostClick);
    }

    attachLikeButtonHandler(commentsData);
    initEditComments(commentsData);
}