<template>
  <div id="app">
    <canvas></canvas>
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
export default {
  name: "App",
  components: {
    Nav
  },
  data() {
    return {};
  },
  mounted() {
    const cv = document.querySelector("canvas"),
      c = cv.getContext("2d"),
      w = (cv.width = window.innerWidth),
      h = (cv.height = window.innerHeight);
    let arr = [];
    for (let i = 0; i < (w > 600 ?100 : 50); i++) {
      arr.push({
        x: w * Math.random(),
        y: h * Math.random(),
        r: (10 * (i)) / 100 + 1
      });
    }
    function move() {
      arr.forEach((item, index) => {
        item.y = item.y + index / 100 + 1;
        if (item.y > h) {
          item.y = -20;
          item.x = w * Math.random();
        }
      });
    }
    function draw() {
      c.clearRect(0, 0, w, h);
      arr.forEach(item => {
        const { x, y, r } = item;
        c.strokeStyle = "red";
        c.beginPath();
        c.arc(x, y + 10, r, 0, 2 * Math.PI);
        c.closePath();
        c.fillStyle = "rgba(255,255,255,.5)";
        c.shadowOffsetX = 0; // 阴影Y轴偏移
        c.shadowOffsetY = 0; // 阴影X轴偏移
        c.shadowBlur = 20; // 模糊尺寸
        c.shadowColor = "#fff"; // 颜色
        c.fill();
      });
      move();
    }
    setInterval(draw, 15);
  }
};
</script>

<style>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  background-image: linear-gradient(#111 5%, #4f6b93 50%, #dbe4f5);
  z-index: -1;
}
</style>
