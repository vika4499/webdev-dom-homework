import { attachLikeButtonHandler } from "./likebuttons.js";
import { initEditComments } from "./editcomment.js";
// let commentsData = [];

export function renderComments(commentsData) {
   
    const listElement = document.getElementById("list");

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

    attachLikeButtonHandler(commentsData);
    initEditComments(commentsData);
}