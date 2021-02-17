<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button class="button" @click="clockMehos()">Нажать</button>
  </div>
</template>

<script>
import Repository from "./Repository/ApiRepository";
import Noty from './plugins/toast'
const Securities = Repository.get("securities");
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      securities: []
    };
  },
  created() {
    this.getSecurities();
  },
  methods: {
    getSecurities: async function() {
      const { data } = await Securities.get();
      this.securities = data;
    },
    clockMehos() {
      Noty.show()
    }
  }
}
</script>

<style lang="sass">
#app
  color: white
</style>
