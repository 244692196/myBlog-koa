const Router = require("koa-router"),
    server = require("./router/server"),
    article = require("./router/article"),
    multer = require("koa-multer"), //上传包
    { user } = require("./model/sch"),
    { join } = require("path"),
    router = new Router;
const storage = multer.diskStorage({ //  上传配置
    //存储的位置
    destination: join(__dirname, "../dist/static/upload"),
    //文件名
    filename(req, file, cb) {
        const filename = file.originalname.split(".")
        cb(null, `${Date.now()}.${filename[filename.length-1]}`)
    }
})
const upload = multer({ storage }) //绑定到multer
router.post("/login", server.login)
router.post("/reg", server.reg)
router.get("/", server.userList)
router.post("/article/add", article.addArt)
router.get("/article", article.allArt)
router.get("/article/:id", article.detail)
router.delete("/article/del/:id", article.delArt)
router.post("/article/edit", article.editArt)
router.post("/upload", upload.single("file"), async(ctx, next) => {
    let { username } = ctx.req.body
    await new Promise((res, rej) => {
        user.updateOne({ username }, { $set: { photoSrc: ctx.req.file.filename } })
            .then((data) => {
                res(data)
            })
    }).then((data) => {
        ctx.body = { code: 0, filename: ctx.req.file.filename }
    })

})
router.post('/fileUpload', upload.single("file"), async ctx => {
    const filename = ctx.req.file.filename
    ctx.body = { code: 0, filename: filename }
})
module.exports = router