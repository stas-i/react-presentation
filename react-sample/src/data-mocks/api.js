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