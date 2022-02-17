const express = require("express");
const bodyParser = require("body-parser");
const app = express();


let comments = [
    {
        name: "Joanna",
        content: "飛向宇宙～",
        time: "2022-2-16 20:20:00" 
    },
    {
        name: "David",
        content: "浩瀚無敵～",
        time: "2022-2-17 21:45:00" 
    },
];

app.use('/public/', express.static('./public/'));
app.engine('html', require('express-art-template')); //  engine("附檔名", path: string, options: object, callback: (e: any, rendered?: string))

app.get('/', (req, res) => {
    res.render('index.html', {
        comments: comments
    });
})
app.get('/post', (req, res) => {
    res.render('post.html'); // render("直接寫檔名，非路徑")
})
app.get('/comment', (req, res) => {
    const newComment = req.query;
    newComment.time = new Date().toLocaleString();
    comments = [newComment, ...comments];

    res.redirect('/');
})

/*  
    - GET：可以使用 query string 傳在 url params，使用 req.query 解析。
    - POST、PUT：不能用querystring，要在 request body 傳遞。express 不能直接解析 request body --> 使用套件：body-parser
    - 加入 middleWare: use() 中間來處理 body-parser解析 request body。
    - bbodyParser.urlencoded({extended: false}): 目前用來解析表單提交內容，解析方式有兩種：querystring、qs，分別對應到 extended: false、true
        (補充)常見 req 文件類型：
        - (1) JSON: application/json
        - (2) 表單提交: application/x-www-form-urlencoded
        - (3) xml格式: text/xml
        - (4) 文件: multipart/form-data

    - 解析完，express.post 就可以使用 req. 拿到資料。

*/

app.use(bodyParser.urlencoded({extended: false})); 

app.post('/addcomment', (req, res)=> {
    const newComment = req.body;
    console.log("🚀 ~ file: server.js ~ line 57 ~ app.post ~ req.body", req.body)
    newComment.time = new Date().toLocaleString();
    comments = [newComment, ...comments];

    res.redirect('/');

})




app.listen(4000, ()=> {
    console.log("Server is running on port: 4000!")
})