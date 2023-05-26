<script>
export default {
  onLaunch() {
    console.log("App Launch")
  },
  onShow() {
    console.log("App Show")
  },
  onHide() {
    console.log("App Hide")
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
#app {
  font-family: PingFangSC-Regular, sans-serif;
  touch-action: pan-y;
}
body {
  background-color: transparent;
}
page {
  box-sizing: border-box;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
