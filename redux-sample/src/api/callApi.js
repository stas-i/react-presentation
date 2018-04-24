export const baseUri = "http://localhost:5000/api";

export const CallApi = (url, options) => {
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