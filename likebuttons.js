import { renderComments } from "./render.js";

export function attachLikeButtonHandler(commentsData) {
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
                renderComments(commentsData);
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