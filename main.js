import { fetchAndCommentsRender } from "./fetchnrender.js";
import { handlePostClick } from "./handlepostclick.js";

let commentsData = [];
export {commentsData};
export const nameInputElement = document.getElementById("name-input");
export const textAreaElement = document.getElementById("text-input");
export const addFormElement = document.querySelector(".add-form");
export const addCommentElement = document.getElementById("add-comment");
const buttonElement = document.getElementById("write-button");


fetchAndCommentsRender();

buttonElement.addEventListener('click', handlePostClick);