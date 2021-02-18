<template>
  <div id="app">
    <div class="securities">
      <span class="securities__title">
        Ценные бумаги
      </span>
      <create-securities />
    </div>
  </div>
</template>

<script>
import Repository from './Repository/ApiRepository';
import CreateSecurities from './components/CreateSecurities.vue';
const Securities = Repository.get('securities');

export default {
  name: "App",
  components: {
    CreateSecurities
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
    }
  }
};
</script>

<style lang="sass">
body
  font-size: 16px
  margin: 0
  padding: 0
#app
  color: black
.securities
  width: 38%
  margin: 0 auto
  border: 1px solid black
  &__title
    display: block
    width: 100%
    font-size: 1.6em
    color: rgba(0, 0, 0, 0.96)
    padding: 1rem
.btn
  border: 0
  outline: 0
  cursor: pointer

</style>
