import { getListElements } from "./api.js";
import { renderComments } from "./renderComments.js";


export function fetchAndCommentsRender(commentsData, isAuthenticated, isAuthorized, userName) {
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

        renderComments(commentsData, isAuthenticated, isAuthorized, userName);
    });
};