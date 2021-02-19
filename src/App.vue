<template>
  <div id="app">
    <div class="securities">
      <div class="securities-title">
        <span>Тестовое задание EGAR</span>
        <a
          href="https://github.com/Mirzaliev/egar-test"
          class="securities-title__link"
          target="_blank"
        >GitHub</a>
      </div>
      <create-securities />
      <securities-table :key="keyForTableComponent"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CreateSecurities from './components/CreateSecurities.vue';
import SecuritiesTable from './components/Table.vue';

export default {
  name: "App",
  components: {
    CreateSecurities,
    SecuritiesTable
  },
  data() {
    return {
      securities: [],
      keyForTableComponent: 1
    };
  },
  /**
   * Жизненый хук VUE
   * перед созданием приложения, загружаем данные из сервера Firebase
   */
  created() {
    this.getUpdateFromFirebase()
  },
  /**
   * после создания приложения,
   * следим за состоянием securities(this.$state.securities)
   * Если состояние securities поменяется,
   * меняем значение ключа компонента Table,
   * чтобы перезапусить компонент
   *
   * Другое решение проблемы this.$forceUpdate();
   * https://michaelnthiessen.com/force-re-render/
   */
  beforeCreate() {
    this.$store.watch((state) => state.securities, () => {
      this.keyForTableComponent += 1
    })
  },
  methods: {
    // проксирует в  this.getUpdateFromFirebase() доступ
    // к store.actions.getUpdateFromFirebase
    ...mapActions(['getUpdateFromFirebase']),

  }
};
</script>

<style lang="sass">
@import "./assets/vars"
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
  &-title
    display: flex
    justify-content: space-between
    align-items: center
    padding: 1rem
    span
      display: block
      width: 100%
      font-size: 1.6em
      color: rgba(0, 0, 0, 0.96)
    &__link
      font-size: .9em
      text-decoration: none
      color: $muted
      &:hover
        font-size: 1rem
        color: $accent
.base-button
  font-size: 1.2em
  width: 100%
  color: black
  padding: .6rem
  background-color: rgba(235, 232, 219, 0.86)
  border: 0
  outline: 0
  cursor: pointer
  &:hover
    background-color: $accent
    color: $text-btn
  &_simple
    background: none
    &:hover
      background: none
  &_clear
    color: $muted
    &:hover
      color: $error
  &_create
    color: $accent
    &:hover
      color: $accent
.base-input
  display: block
  font-size: 1rem
  font-weight: 500
  line-height: 1.5
  color: #495057
  background-color: #fff
  background-clip: padding-box
  border: 1px solid #ced4da
  border-radius: .25rem

</style>
