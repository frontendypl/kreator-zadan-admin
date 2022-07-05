<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap-icons/font/bootstrap-icons.css";

body {
  background-image: url("@/assets/images/background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}
</style>
