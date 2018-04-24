const baseUri = "http://localhost:5000/api";

export const getArticlesList = () => {
    return CallApi(`${baseUri}/articles`);
};

export const getArticle = (id) => {
    return CallApi(`${baseUri}/articles/${id}`);
};

export const updateRating = (id, isIncrease) => {
    return CallApi(`${baseUri}/articles/update-rating/${id}`, {
        method: 'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(isIncrease)
    });
};

export const getComments = (articleId) => {
    return CallApi(`${baseUri}/comments/${articleId}`)
};

export const addComment = (articleId, comment) => {
    return CallApi(`${baseUri}/comments/${articleId}`, {
        body: JSON.stringify(comment),
        headers: {'content-type': 'application/json'},
        method: 'POST'
    });
};

const CallApi = (url, options) => {
    return fetch(url, options).then((response) => handleErrors(response));
};

const handleErrors = (response) => {
    if (!response.ok) {
        const error = new Error(response.statusText);
        error.response = response;
        error.code = response.status;
        if(response.status !== 400){
            throw error; // eslint-disable-line
        }
        else {
            return response.text().then(
                result => {
                    error.message = result;
                    error.name = "Bad Request";
                    throw error; // eslint-disable-line
                }
            );
        }
    }
    else {
        if (response.status === 204){
            return {};
        }

        return response.json();
    }
};