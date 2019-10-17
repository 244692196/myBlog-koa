<template>
  <div class="index">
    <div class="frist clear">
      <el-carousel trigger="click" height="300px">
        <el-carousel-item class="medium" v-for="(item,index) in imgUrl" :key="index">
          <img v-bind:src="'.'+item.src" />
        </el-carousel-item>
      </el-carousel>
      <div class="card">
        <h2>我的名片</h2>
        <p>网名：肠肠鱼</p>
        <p>职业：Web前端工程师</p>
        <p>现居：天津市</p>
        <p>Email：244692196@qq.com</p>
        <p>个人爱好：健身</p>
      </div>
    </div>
    <div class="second clear">
      <div class="artCon" ref="artCon">
        <ul class="artItem" v-for="item in selArtList" :key="item._id">
          <li>
            <h3>{{item.title}}</h3>
            <div class="content" v-html="item.text"></div>
            <span class="time">{{item.time.slice(0,10)}}</span>
            <span class="author">{{item.author}}</span>
            <el-button class="btn" type="text" @click="detail(item._id)">查看全文</el-button>
            <el-button v-if="loginUser" class="del" type="text" @click="del(item._id)">删除</el-button>
          </li>
        </ul>
      </div>
      <el-calendar v-model="value" class="date">
        <template slot="dateCell" slot-scope="{date, data}">
          <p @click="getDate(data)">{{ data.day.split('-').slice(1).join('-') }}</p>
        </template>
      </el-calendar>
    </div>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Bottom from "@/components/Bottom";
import { mapState, mapGetters } from "vuex";
import img from "../../static/json/imgsrc.json";
export default {
  components: {
    Bottom
  },
  data() {
    return {
      value: new Date(),
      date: "",
      imgUrl: img.img
    };
  },
  computed: {
    ...mapState(["artList", "userList", "selArt", "loginUser"]),
    ...mapGetters(["newArtList"]),
    selArtList() {
      return this.newArtList.filter(item => {
        return item.time.includes(this.date);
      });
    }
  },
  methods: {
    detail(id) {
      this.$router.push({ path: `/article/${id}` });
      this.$store.commit("changeShow", this.$route.name);
    },
    del(id) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete(`http://ddiyy.cn:3000/article/del/${id}`)
            .then(res => {
              if (res.data.code === 0) {
                setTimeout(() => {
                  this.$router.go(0);
                }, 500);
              }
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getDate(data) {
      this.date = data.day;
    }
  },
  created() {
    this.$store.dispatch("getUser");
    this.$store.dispatch("getArt");
  },
  mounted() {
    this.selArtList = this.newArtList;
    this.$store.commit(
      "addArtStie",
      this.$refs.artCon.getBoundingClientRect().top
    );
  }
};
</script>

<style>
.index {
  position: relative;
  width: 100%;
}
.el-carousel {
  float: left;
  width: 750px;
}
.frist {
  width: 80%;
  margin: 20px auto;
}
.frist .medium img {
  width: 750px;
}
.frist .card {
  float: right;
  width: 400px;
  height: 300px;
  background: url(../../static/img/5.jpg) no-repeat center/cover;
  color: rgb(227, 227, 227);
}
.frist .card h2 {
  width: 100%;
  height: 15%;
  font-family: "楷体";
  padding-top:10px;
  text-indent: 20px;
}
.frist .card p{
  font: 18px/1.5 "楷体";
  text-indent: 40px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.second {
  width: 80%;
  margin: 20px auto;
}
.artCon {
  float: left;
  width: 780px;
  margin-right: 20px;
}
.artCon .artItem {
  position: relative;
  width: 100%;
}
.artCon .artItem li {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  margin: 10px 0;
}
.artCon .artItem li h3 {
  width: 100%;
  height: 30px;
  font: 16px/30px "微软雅黑";
  font-weight: bold;
  text-align: center;
}
.artCon .artItem li .content {
  width: 100%;
  height: 45px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-indent: 25px;
}
.time {
  position: absolute;
  left: 0;
  bottom: 10px;
}
.author {
  position: absolute;
  left: 100px;
  bottom: 10px;
}
.btn {
  position: absolute;
  right: 0;
  bottom: 0;
}
.del {
  position: absolute;
  right: 100px;
  bottom: 0;
}
.date {
  width: 400px;
  float: right;
  border-radius: 10px;
  background-color: rgb(248, 248, 255, 0.6);
}
.el-calendar-table .el-calendar-day {
  height: 60px;
}
.el-button-group > .el-button {
  background-color: rgb(0, 0, 0, 0);
}
.el-button-group .el-button:hover {
  color: rgba(0, 0, 0, 0.3);
  background-color: rgb(0, 0, 0, 0);
}
</style>