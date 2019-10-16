<template>
  <div id="app" :style="{width:screenW+'px'}">
    <Nav></Nav>
    <router-view></router-view>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Bottom from "@/components/Bottom";
import Nav from "@/components/Nav";
export default {
  name: "App",
  components: {
    Nav,
    Bottom
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
