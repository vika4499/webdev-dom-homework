import { renderComments } from "./renderComments.js";
import { userName } from "./renderLogin.js";

export function attachLikeButtonHandler(
    commentsData,
    isAuthenticated,
    isAuthorized,
    userName,
  ) {
    if (isAuthenticated === true && isAuthorized === true) {
      const likeButtons = document.querySelectorAll('.like-button')
      for (const button of likeButtons) {
        button.addEventListener('click', (event) => {
          event.stopPropagation()
          button.classList.add('-loading-like')
          delay(2000).then(() => {
            const index = parseInt(button.dataset.index)
            const isActive = commentsData[index].isLiked
  
            if (isActive) {
              commentsData[index].likes--
            } else {
              commentsData[index].likes++
            }
            commentsData[index].isLiked = !isActive
            renderComments(commentsData, true, true, userName)
          })
        })
      }
    }
  }

function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}