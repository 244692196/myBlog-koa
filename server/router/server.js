const { user, article } = require("../model/sch")

const login = async(ctx, next) => { //登录
    let { username, password } = ctx.request.body
    await new Promise((res, rej) => {
        user.findOne({
            username
        }).then((data, err) => {
            if (err) {
                rej(err)
            } else {
                res(data)
            }
        })
    }).then(data => {
        if (data) {
            if (data.password != password) {
                ctx.body = { code: 3 } //密码不正确
            } else {
                ctx.body = { code: 0, data: data.photoSrc } //成功
            }
        } else {
            ctx.body = { code: 1 } //账号不存在
        }

    }).catch(err => {
        ctx.body = { code: 2 } //登录失败
    })

}

const reg = async(ctx, next) => { //注册
    let { username, password, age } = ctx.request.body
    await new Promise((res, rej) => {
        user.findOne({
            username
        }).then((data, err) => {
            if (err) {
                rej(err)
            } else {
                res(data)
            }
        })
    }).then(data => {
        if (data) {
            ctx.body = { code: 1 } //已注册
        } else {
            ctx.body = {
                code: 0, //可以注册      !!!!!
            }
            user.create({
                username,
                password,
                age
            }).then()
        }

    }).catch(err => {
        ctx.body = { code: 2 } //注册失败
    })
}

/*router.post("/userOne", (req, res) => { //获取登录用户信息
    let { username } = req.body
    console.log(req.body);
    user.findOne({
        username
    }).then(data => {
        if (data) {
            res.send(data._id);
        }

    })

})*/
const userList = async(ctx, next) => { //获取所有用户信息
    await new Promise((res, rej) => {
        user.find().then(data => {
            res(data)
        })
    }).then(data => {
        ctx.body = data;

    })
}
module.exports = { login, reg, userList }