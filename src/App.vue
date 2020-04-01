<template>
  <div id="app">
    <h4 class="mt-4">
      <img
        alt="logo"
        src="@/assets/no-smoking.svg"
        style="width:24px;display:inline-block;padding-bottom:6px;">
      <span> No Smoke !</span>
      <span style="vertical-align:super;font-size:small;color:#ee0000;font-weight:bold;">
        Beta
      </span>
    </h4>
    <div>
      <SidebarMenu />
      <div id="page-wrap">
        <router-view />
      </div>
    </div>
    <div class="copyright mt-4 mb-4">
      &copy; 2019 <b-link
        href="https://twitter.com/qoAop"
        target="_blank"
        rel="noopener nofollow">
        <i class="fab fa-twitter-square" /> @qoAop
      </b-link>
    </div>
    <div class="yahoo_license">
      <!-- Begin Yahoo! JAPAN Web Services Attribution Snippet -->
      <span style="margin:15px 15px 15px 15px"><a
        href="https://developer.yahoo.co.jp/about"
        target="_blank"
        rel="noopener nofollow">Web Services by Yahoo! JAPAN</a></span>
      <!-- End Yahoo! JAPAN Web Services Attribution Snippet -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SidebarMenu from '@/components/SidebarMenu.vue';

export default {
  name: 'App',
  components: {
    SidebarMenu: SidebarMenu,
  }
};
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", YuGothic, "ヒラギノ角ゴ ProN W3", Hiragino Kaku Gothic ProN, Arial, "メイリオ", Meiryo, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0;
  padding:0;
}
</style>

<style scoped>
.copyright {
  font-size: small;
  color:#9999ee;
}

.yahoo_license {
  text-align:left;
}
</style>