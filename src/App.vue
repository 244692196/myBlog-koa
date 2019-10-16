<template>
  <div id="app" :style="{width:screenW+'px'}">
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
export default {
  name: "App",
  components:{
    Nav
  },
  data(){
    return{
      screenW : ""
    }
  },
  created() {
    this.screenW = window.screen.width;
  }
};
</script>

<style>
</style>
