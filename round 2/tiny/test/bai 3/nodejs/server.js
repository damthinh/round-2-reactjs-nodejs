var express = require('express'),
  app = express(),
  port = process.env.PORT || 3002,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');
  cors = require('cors')
  
const multer = require('multer');

const path = require('path');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/quiz_app',
{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
  console.log("Connected !!!")
}).catch(err => {
  console.log(err);
});

app.use(cors({}))
app.use(bodyParser.json());
// 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'img'))
  },
  //Mỗi hàm được thông qua cả request ( req) và một số thông tin về tệp ( file) để hỗ trợ quyết định.
  //destination :được sử dụng để xác định tệp đã tải lên sẽ được lưu trữ trong thư mục nào.
  //Nếu không có destination, thư mục mặc định của hệ điều hành cho các tệp tạm thời sẽ được sử dụng.
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,uniqueSuffix + '-' +  file.originalname)
  }
  //filenameđược sử dụng để xác định tệp nên được đặt tên bên trong thư mục.
  // Nếu không có filename, mỗi tệp sẽ được đặt một tên ngẫu nhiên không bao gồm bất kỳ phần mở rộng tệp nào.
})

const upload = multer({ storage: storage }).any()
//.any() :Chấp nhận tất cả các tệp qua dây. Một mảng các tệp sẽ được lưu trữ trong req.files.
// Khởi tạo nơi lưu trữ của file khi được truyền vào backend
app.use(upload)
app.use(express.static('img'))
// 
var routes = require('./api/route');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Server started on: ' + port);
