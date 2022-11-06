import * as constants from "../constants"
export default function callApi(method, path, data) {
    console.log("data",data);
    if (data) {
        var form = new FormData()
        form.append('content',data.content)
        if (data.arrNameImg) {
            for (let i = 0; i <data.arrNameImg.length; i++) {
                form.append('arrNameImg',data.arrNameImg[i])
            }
        }
    }
    let objFetch = {}
    if(method === constants.HTTP_READ || method === constants.HTTP_DELETE){
        objFetch = {
            method
          }
    }else{
        objFetch = {
            method,
            body: form
          }
    }
    return new Promise((resolve, reject) => {
        const url = constants.DOMAIN + path
        fetch(url, objFetch)
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error));
    });
}
