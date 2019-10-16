<template>
  <div class="details">
    <h3>{{detail.title}}</h3>
    <p>{{detail.text}}</p>
    <el-button v-if="loginUser" type="primary" icon="el-icon-edit" circle class="btn-art" @click="edit"></el-button>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  data() {
    return {
      detail: ""
    };
  },
  computed:{
    ...mapState(["loginUser"])
  },
  methods: {
    edit(){
      this.$router.push({path:`/edit/${this.$route.params.id}`})
    }
  },
  created() {
    this.$axios.get(`http://ddiyy.cn:3000/article/${this.$route.params.id}`).then(res => {
      this.detail = res.data;
    });
  }
};
</script>

<style>
.details{
  width: 1200px;
  margin: auto;
}
.details h3 {
  width: 100%;
  height: 40px;
  font: 20px/2 "微软雅黑";
  font-weight: bold;
  text-align: center;
}
.details p {
  text-indent: 25px;
}
.btn-art {
  position: fixed;
  bottom: 100px;
  right: 100px;
  width: 40px;
}
</style>