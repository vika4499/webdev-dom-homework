import { postListElement } from "./api.js";
import { fetchAndCommentsRender } from "./fetchnrender.js";
import {commentsData, nameInputElement} from "./main.js";
import {textAreaElement} from "./main.js";

export const postComment = () => {
    return postListElement({ name: nameInputElement.value, text: textAreaElement.value })
        .then(() => {
            fetchAndCommentsRender(commentsData);
            nameInputElement.value = "";
            textAreaElement.value = "";
        });
};