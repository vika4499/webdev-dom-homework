import { renderComments } from "./render.js";

export function initEditComments(commentsData) {
    const textAreaElement = document.getElementById("text-input");
    const editComments = document.querySelectorAll('.comment');
    for (const editComment of editComments) {
        editComment.addEventListener('click', () => {
            const index = editComment.dataset.index;
            const commentAuthor = `QUOTE_BEGIN${commentsData[index].author}:`;
            const commentText = `${commentsData[index].text}QUOTE_END`;
            textAreaElement.value = `${commentAuthor}\n${commentText}\n\n`;
            renderComments(commentsData);
        })
    }
}