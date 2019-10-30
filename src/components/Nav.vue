<template>
  <div class="nav">
    <div class="left navList" @click="show">
      <span class="navbtn"></span>
      <div class="btnList">
        <ul>
          <li class="userL" v-if="loginUser">
            <el-popover placement="top" width="180" trigger="hover">
              <p v-if="!loginphoto">点击上传头像</p>
              <p v-if="loginphoto">点击更换头像</p>
              <el-upload
                class="avatar-uploader"
                action="http://ddiyy.cn:4000/upload"
                :data="{username:loginUser}"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-button slot="reference" class="user">
                <img
                  class="portrait"
                  v-if="loginphoto"
                  :src="'./static/upload/'+loginphoto"
                  alt="肠肠鱼"
                />
                <span>{{loginUser}}</span>
              </el-button>
            </el-popover>
          </li>

          <li>
            <input
              class="select"
              type="text"
              v-model="input"
              placeholder="搜索文章"
              @keydown.13="select"
            />
          </li>
          <li @click="show">
            <router-link to="/" :class="{show:showV == 'Index'}">首页</router-link>
          </li>
          <li @click="show();getSite()">
            <router-link to="/" :class="{show:showV == 'Details'}">文章</router-link>
          </li>

          <li @click="show" v-if="loginUser == '肠肠鱼'">
            <router-link to="/add" :class="{show:showV == 'Add'}">发布文章</router-link>
          </li>
          <li @click="show" v-if="!loginUser">
            <router-link to="/login" :class="{show:showV == 'Login'}">登录</router-link>
          </li>
          <li @click="show" v-if="!loginUser">
            <router-link to="/reg" :class="{show:showV == 'Register'}">注册</router-link>
          </li>
          <li v-if="loginUser" @click="loginOut">
            <span>退出登录</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="left myBlog" @click="show">
      <router-link to="/" class="show">肠肠鱼的博客</router-link>
    </div>
    <div class="left homePage" @click="show">
      <router-link to="/" :class="{show:showV == 'Index'}">首页</router-link>
    </div>
    <div class="left artLsit" @click="show();getSite()">
      <router-link to="/" :class="{show:showV == 'Details'}">文章</router-link>
    </div>
    <div v-if="loginUser" class="left photo">
      <el-popover placement="top" width="180" trigger="hover">
        <p v-if="!loginphoto">点击上传头像</p>
        <p v-if="loginphoto">点击更换头像</p>
        <el-upload
          class="avatar-uploader"
          action="http://ddiyy.cn:4000/upload"
          :data="{username:loginUser}"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button slot="reference" class="user">
          <img class="portrait" v-if="loginphoto" :src="'./static/upload/'+loginphoto" />
          <span>{{loginUser}}</span>
        </el-button>
      </el-popover>
    </div>
    <ul class="navR">
      <li>
        <input class="select" type="text" v-model="input" placeholder="搜索文章" @keydown.13="select" />
      </li>
      <li @click="show" v-if="loginUser == '肠肠鱼'">
        <router-link to="/add" :class="{show:showV == 'Add'}">发布文章</router-link>
      </li>
      <li @click="show" v-if="!loginUser">
        <router-link to="/login" :class="{show:showV == 'Login'}">登录</router-link>
      </li>
      <li @click="show" v-if="!loginUser">
        <router-link to="/reg" :class="{show:showV == 'Register'}">注册</router-link>
      </li>
      <li class="loginOut" v-if="loginUser" @click="loginOut">
        <span>退出登录</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      id: "",
      input: ""
    };
  },
  computed: {
    ...mapState(["loginUser", "loginphoto", "showV", "artSite"])
  },
  methods: {
    select() {
      //搜索文章
      this.$store.commit("selectArt", this.input);
      this.input = "";
    },
    handleAvatarSuccess(res, file) {
      //头像上传成功
      this.$store.commit("savePhoto", res.filename);
      if (res.code == 0) {
        this.$message({
          showClose: true,
          message: "上传成功",
          type: "success"
        });
      }
    },
    loginOut() {
      //退出登录
      localStorage.removeItem("user");
      localStorage.removeItem("photo");
      this.$router.go(0);
    },
    show() {
      //点击高亮
      this.$store.commit("changeShow", this.$route.name);
    },
    getSite() {
      //获取位置
      window.scrollTo(0, this.artSite);
    }
  },
  created() {
    this.$store.commit("changeShow", this.$route.name);
  }
};
</script>

<style>
.nav {
  width: 100%;
  height: 60px;
  background-color: rgb(28, 35, 39);
}
.myBlog {
  font-size: 20px;
}
.left {
  float: left;
  height: 100%;
  text-align: center;
  line-height: 60px;
  margin-left: 80px;
}
.navList {
  cursor: pointer;
  position: relative;
  display: none;
  width: 30px;
  height: 60px;
  margin-left: 20px;
}
.navList .navbtn {
  display: inline-block;
  width: 30px;
  height: 4px;
  background-color: #fff;
  border-radius: 10px;
  transition: 0.2s;
}
.btnList {
  position: absolute;
  top: 60px;
  left: -20px;
  width: 300px;
  height: 0;
  background-color: #fff;
  z-index: 10;
  overflow: hidden;
  transition: 0.6s;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.6);
  border-radius: 0 0 4px 4px;
  background: url(../../static/img/bg-1.jpg) no-repeat center/cover;
}
.left .btnList a {
  color: rgba(250, 250, 250, 0.6);
}
.left .btnList ul li {
  color: rgba(250, 250, 250, 0.6);
  border-bottom: 1px solid #ccc;
}
.left .btnList ul .userL {
  height: 70px;
}
.navList:hover .btnList {
  height: 370px;
}
.navList .navbtn:after {
  content: "";
  position: absolute;
  top: 21px;
  left: 0;
  width: 30px;
  height: 4px;
  background-color: #fff;
  border-radius: 10px;
  transform-origin: left bottom;
  transition: 0.5s;
}
.navList .navbtn:before {
  transition: 0.5s;
  content: "";
  position: absolute;
  bottom: 13px;
  left: 0;
  width: 30px;
  height: 4px;
  background-color: #fff;
  border-radius: 10px;
  transform-origin: left top;
}
.navList:hover.navList .navbtn {
  width: 0;
}
.navList:hover.navList .navbtn:after {
  transform: rotate(45deg);
}
.navList:hover.navList .navbtn:before {
  transform: rotate(-45deg);
}
.photo {
  margin-left: 70px;
}
.left a {
  color: #fff;
}
.navR {
  float: right;
}
.navR li {
  float: left;
  height: 100%;
  margin-right: 50px;
  text-align: center;
  color: #fff;
  line-height: 60px;
}
.navR li a {
  display: block;
  height: 100%;
  color: #fff;
}
.select {
  width: 190px;
  height: 15px;
  outline-style: none;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
  font-family: "楷体";
  border-radius: 10px;
}
.loginOut {
  cursor: pointer;
}
.user {
  height: 50px;
  padding: 5px;
  color: #fff;
  background-color: rgb(0, 0, 0, 0);
}
.user img {
  vertical-align: middle;
  margin-right: 2px;
}
.user span {
  vertical-align: middle;
}
.portrait {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
.user:hover {
  color: #fff;
  border-color: #c6e2ff;
  background-color: rgba(0, 0, 0, 0);
}
.user:focus {
  color: #fff;
  border-color: #c6e2ff;
  background-color: rgba(0, 0, 0, 0);
}
.el-button {
  border: 0px;
}
.el-popover {
  box-shadow: 0 0 10px #111;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.nav .show {
  color: #00c1de;
}
.left .btnList .show {
  color: #00c1de;
}
@media screen and (max-width: 1120px) {
  .left {
    margin-left: 50px;
  }
}

@media screen and (max-width: 1000px) {
  .artLsit,
  .photo,
  .navR,
  .homePage {
    display: none;
  }
  .navList {
    display: block;
    margin-left: 20px;
  }
  .myBlog {
    margin: 0;
    width: 100%;
    height: 0;
    position: absolute;
  }
}
</style>