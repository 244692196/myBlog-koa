const Koa = require("koa"),
    mongoose = require("mongoose"),
    body = require("koa-body"), //解析post请求，body
    router = require("./router"),
    cors = require("@koa/cors"),
    app = new Koa();
mongoose.connect("mongodb://localhost:27017/blogs", { useNewUrlParser: true })
mongoose.connection.once("open", () => {
    console.log("成功")
})

app.use(body())
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000, () => {
        console.log("监听成功");
    })