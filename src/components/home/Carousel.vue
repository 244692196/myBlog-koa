<template>
  <el-carousel interval="4000" trigger="click">
    <el-carousel-item class="medium" v-for="(item,index) in imgUrl" :key="index">
      <img v-bind:src="'./'+item.src" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import img from "../../../static/json/imgsrc.json";
export default {
  data() {
    return {
      imgUrl: img.img
    };
  }
};
</script>

<style>

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
</style>