import {getFromLocalStorage} from "@/pages/game/helpers/local-storage.helper";
import {LocalStorageKeyEnum} from "@/enums/local-storage-key.enum";

function getRequest<T>(url: string, adminStrict = false): Promise<T> {
    return makeHttpRequest(url, 'GET', null, adminStrict);
}

function postRequest<T>(url: string, postData: object, adminStrict = false): Promise<T> {
    return makeHttpRequest(url, 'POST', postData, adminStrict);
}

function deleteRequest<T>(url: string, adminStrict = false): Promise<T> {
    return makeHttpRequest(url, 'DELETE', null, adminStrict);
}

function putRequest<T>(url: string, postData: object, adminStrict = false): Promise<T> {
    return makeHttpRequest(url, 'PUT', postData, adminStrict);
}

function makeHttpRequest<T>(url: string, method: string, postData: object | null = null, adminStrict: boolean = false): Promise<T> {
    const headersToAppend = getDefaultHeaders();
    if (adminStrict) {
        headersToAppend.append('Authorization', getFromLocalStorage(LocalStorageKeyEnum.AuthToken));
    }

    return new Promise((resolve, reject) => {
        let isError = false;
        const httpRequestObject: RequestInit = {
            mode: 'cors',
            method,
            headers: headersToAppend,
        };

        if (postData) {
            httpRequestObject.body = JSON.stringify(postData);
        }

        fetch(url, httpRequestObject).then(response => {
            if (!response.ok) {
                isError = true;
            }

            return response.json()
        }).then(results => {
            if (isError) {
                throw new Error(!results.message ? 'Bad request' : results.message);
            }

            resolve(results);
        }).catch((error) => reject(error));
    });
}

function getDefaultHeaders() {
    return new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });
}

export {getRequest, postRequest, deleteRequest, putRequest}
