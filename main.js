import { fetchAndCommentsRender } from "./fetchnrender.js";
import { userName } from "./renderLogin.js";

// Объявление переменных
let commentsData = [];
export let isAuthenticated = false;
let isAuthorized = false;
export { commentsData };


fetchAndCommentsRender(commentsData, isAuthenticated, isAuthorized, userName);