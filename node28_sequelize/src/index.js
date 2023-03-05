// yarn init -y
// yarn add express

// import thư viện express
const express = require('express');
// tạo biến gán cho hàm express
const app = express();

//middleware chuyển đổi để đọc định dạng json
app.use(express.json());
app.use(express.static(".")); // => định vị thư mục để load tài nguyên

// cho phép FE truy cập API từ BE
const cors = require('cors');
app.use(cors());

// tạo ra một host từ thư viện express
app.listen(8080); // port 8080

// MVC

//import rootRoute
const rootRoute = require('./routes/rootRoute');
app.use("/api",rootRoute)



