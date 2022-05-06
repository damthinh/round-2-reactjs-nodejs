import * as constants from "../constants"
export default function callApi(method, path, data) {
    console.log('dataAPI',data);
    let objFetch = {}
    if(method === constants.HTTP_READ || method === constants.HTTP_DELETE){
        objFetch = {
            headers: {"Authorization": `beare ${data}`},
            method
          }
    }else{
        objFetch = {
            method,
            headers: {"Content-Type": "Application/json","Authorization": `beare ${data.token}`},
            body: JSON.stringify(data)
          }
    }
    return new Promise((resolve, reject) => {
        const url = constants.DOMAIN + path
        fetch(url, objFetch)
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error));
    });
}
