const { user, article } = require("../model/sch")

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var Hours = date.getHours();
    var Minutes = date.getMinutes();
    var Seconds = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (Hours >= 0 && Hours <= 9) {
        Hours = "0" + Hours;
    }
    if (Minutes >= 0 && Minutes <= 9) {
        Minutes = "0" + Minutes;
    }
    if (Seconds >= 0 && Seconds <= 9) {
        Seconds = "0" + Seconds;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + Hours + seperator2 + Minutes +
        seperator2 + Seconds;
    return currentdate;
}
const addArt = async(ctx, next) => { //发布文章
    let { title, text, author } = ctx.request.body
        // console.log(ctx.request.body);

    let newtime = getNowFormatDate(new Date)
    if (author) { //如果登录
        await new Promise((res, rej) => {

            user.findOne({
                title
            }).then(data => {
                res(data)
            })
        }).then(data => {
            ctx.body = { code: 0 } //发布成功  ！！！！！！
            article.create({
                title,
                text,
                author,
                time: newtime
            }).then((data, err) => {
                user.updateOne({ _id: author }, { $push: { "art.publish": data._id } }, () => {})
            })
        })
    } else {
        ctx.body = { code: 1 }
    }
}
const detail = async(ctx, next) => { //详情页
    await new Promise((res, rej) => {
        article.findOne({
            _id: ctx.params.id
        }).then((data) => {
            res(data)
        })
    }).then(data => {
        if (data) {
            ctx.body = data
        }
    })
}
const delArt = async(ctx, next) => { //删除文章
    await new Promise((res, rej) => {
        article.deleteOne({
            _id: ctx.params.id
        }).then((data) => {
            res(data)
        })
    }).then(data => {
        if (data) {
            ctx.body = { code: 0 }
        }
    })
}
const editArt = async(ctx, next) => { //编辑文章
    let { newDetail } = ctx.request.body
    await new Promise((res, rej) => {
        Promise.all([
                article.updateOne({ _id: newDetail._id }, { $set: { title: newDetail.title } }),
                article.updateOne({ _id: newDetail._id }, { $set: { text: newDetail.text } })
            ])
            .then(() => {
                res()
            })
    }).then(() => {
        ctx.body = { code: 0 }
    })
}
const allArt = async(ctx, next) => { //获取所有文章
    await new Promise((res, rej) => {
        article.find().then(data => {
            res(data)
        })
    }).then(data => {
        ctx.body = data;
    })
}

module.exports = {
    allArt,
    editArt,
    delArt,
    detail,
    addArt
}