<template>
  <div id="app">
    <div class="wrapper">
      <Cart></Cart>
    </div>
  </div>
</template>

<script>
import Cart from "./components/cart/Cart.vue";

export default {
  name: 'App',
  components: {
    Cart
  }
}
</script>

<style lang="scss">
@import "./assets/style/Imports.scss";
::-webkit-scrollbar {
  width: 0;
}
#app {
background: #fcfbfa 80%;
display: flex;
  .wrapper {
    //outline: 1px solid black;
    width: 87%;
    display: flex;
    flex-direction: row;
    margin-top: 2%;
    margin-left: 2%;
  }
}

@media screen and (max-width: 980px) {
  #app {
    .wrapper {
      width: 100%;
    }
  }
}
@media screen and (max-width: 550px) {
  #app {
    .wrapper {
      width: 100%;
      justify-content: center;
      margin-left: 0%;
    }
  }
}
</style>