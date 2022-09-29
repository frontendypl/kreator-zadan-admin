<template>
  <nav class=" c-AppFooterComponent navbar bg-dark text-light">
    <div class="container d-flex justify-content-center">
      <a class="logo__link link-light text-decoration-none written-font" href="https://ucze.net">ucze.net</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppFooterComponent',
}
</script>

<style lang="scss" scoped>
  .c-AppFooterComponent{

    .logo{
      &__link {
        font-size: 2em;
      }
    }
  }
</style>