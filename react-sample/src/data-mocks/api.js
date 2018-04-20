import {articles} from './articles'
import {comments} from './articles'

export const getArticlesList = () => {
    return [...articles];
};

export const getArticle = (id) => {
    return articles.find(article => article.id === id);
};

export const getComments = (ids) => {
    return comments.filter(comment => ids.indexOf(comment.id) !== -1);
};

export const addComment = (articleId, comment) => {
    const article = getArticle(articleId);
    const id = ID();
    article.comments.push(id);
    comment.id = id;
    comments.push(comment);

    return comment;
};

const ID = () =>  '_' + Math.random().toString(36).substr(2, 9);