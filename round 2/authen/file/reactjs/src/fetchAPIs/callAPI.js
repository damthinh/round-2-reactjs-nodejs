import * as constants from "../constants"
export default function callApi(method, path, data) {
    console.log(data)
    let objFetch = {}
    if(method === constants.HTTP_READ){
        objFetch = {
            headers:{'Authorization':`Bearer ${data.token}`},
            method
          }
    }else if (method === constants.HTTP_DELETE) {
        objFetch = {
            headers:{'Authorization':`Bearer ${data.token}`},
            method
          } 
    }else{
        objFetch = {
            method,
            headers:{"Content-Type": "Application/json",'Authorization':`Bearer ${data.token}`},
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
