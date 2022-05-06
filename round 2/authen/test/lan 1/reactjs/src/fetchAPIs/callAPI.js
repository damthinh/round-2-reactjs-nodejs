import * as constants from "../constants"
export default function callApi(method, path, data) {
    console.log('dataAPI',data);
    let objFetch = {}
    if(method === constants.HTTP_READ || method === constants.HTTP_DELETE){
        objFetch = {
            headers : {'authorization':`beare ${data}`},
            method
          }
    }else{
        objFetch = {
            method,
            headers:  {"Content-Type": "Application/json",'authorization':`beare ${data.token}`} ,
            body: JSON.stringify(data)
          }
    }
    return new Promise((resolve, reject) => {
        const url = constants.DOMAIN + path
        console.log('url',url);
        fetch(url, objFetch)
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error));
    });
}
