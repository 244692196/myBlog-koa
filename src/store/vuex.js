import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginUser: localStorage.getItem("user"),
        loginphoto: localStorage.getItem("photo"),
        userList: [],
        artList: [],
        selArt: "",
        showV: "",
        artSite: ""
    },
    getters: {
        newArtList(state) { //搜索之后的文章
            return state.artList.filter(item => {
                return item.title.includes(state.selArt)
            })
        }
    },
    mutations: {
        saveLogin(state, value) {
            state.loginUser = value
            localStorage.setItem('user', value)
        },
        savePhoto(state, value) {
            state.loginphoto = value
            localStorage.setItem('photo', value)
        },
        saveUser(state, users) {
            state.userList = users
        },
        saveArt(state, arts) { //保存文章
            function sortArr(time) { //按时间倒序排序
                return (a, b) => {
                    let val2 = b[time],
                        val1 = a[time];
                    return new Date(val2.replace(/-/, '/')) - new Date(val1.replace(/-/, '/'));
                }
            }
            let newArts = arts.sort(sortArr("time"))
            state.artList = newArts

        },
        selectArt(state, select) { //搜索文章
            state.selArt = select
        },
        changeShow(state, name) { //添加文章详情路由名称
            state.showV = name
        },
        addArtStie(state, site) { //添加文章在主页的位置
            state.artSite = site
        }
    },
    actions: {
        getUser(ctx) { //获取所有用户
            axios.get("http://ddiyy.cn:4000/")
                .then((msg) => {
                    ctx.commit("saveUser", msg.data)
                })
        },
        getArt(ctx) { //获取所有文章

            axios.get("http://ddiyy.cn:4000/article")
                .then((msg) => {
                    ctx.commit("saveArt", msg.data)
                })

        }
    }
})