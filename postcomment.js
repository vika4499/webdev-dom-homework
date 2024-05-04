import { postListElement } from "./api.js";
import { fetchAndCommentsRender } from "./fetchnrender.js";
import { commentsData } from "./main.js";
import { userName } from "./renderLogin.js";
import { textAreaElement, nameInputElement } from "./varexp.js";

export const postComment = () => {
    const nameInputElement = document.getElementById("name-input");
    const textAreaElement = document.getElementById("text-input");
    return postListElement({ name: nameInputElement.value, text: textAreaElement.value })
        .then(() => {
            fetchAndCommentsRender(commentsData, true, true, userName);
            nameInputElement.value = "";
            textAreaElement.value = "";
        });
};