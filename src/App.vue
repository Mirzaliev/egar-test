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
import { mapActions } from 'vuex'
import CreateSecurities from './components/CreateSecurities.vue';

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
    this.getDataFromFirebase()
  },
  beforeCreate() {
    this.$store.watch((state) => state.securities, () => {
      console.log('securities изменен')
    })
  },
  methods: {
    ...mapActions(['getDataFromFirebase']),

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
