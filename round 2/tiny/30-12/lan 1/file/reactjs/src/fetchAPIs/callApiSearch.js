// import * as constants from "../constants"
// export default function callApiSearch(method, path, data) {
//     console.log("data",data);
//     if (data === '') {
//         console.log("ko");
//     } else {
//         console.log("co");
//     }
//     let objFetch = {}
//     if(method === constants.HTTP_READ || method === constants.HTTP_DELETE){
//         objFetch = {
//             method,
//             body: data
//           }
//     }else{
//         objFetch = {
//             method,
//             body: data
//           }
//     }
//     return new Promise((resolve, reject) => {
//         const url = constants.DOMAIN + path
//         fetch(url, objFetch)
//             .then((response) => resolve(response.json()))
//             .catch((error) => reject(error));
//     });
// }
