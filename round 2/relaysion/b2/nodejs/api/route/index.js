const { getData } = require("../controller")

const Router = (app)=>{
    app.get('/get',getData)
}
module.exports = Router