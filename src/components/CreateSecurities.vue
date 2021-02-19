<template>
  <div class="securities-create-wrap">
    <button
      class="securities-create__btn base-button"
      @click="modalShowActions"
    >
      Создать новый инструмент
    </button>
    <modal
      :show="modalShow"
      @close="modalShowActions"
    >
      <div class="securities-create-form-wrap">
        <form
          class="securities-create-form securitiesForm"
          @submit.prevent="createSecurities()"
        >
          <div class="securitiesForm-form-group">
            <label for="securitiesDate">Введение дату</label>
            <input
              v-model="form.date"
              id="securitiesDate"
              type="date"
              class="securitiesForm__form-control base-input"
              placeholder="18.03.1996"
              required
            >
            <small
              v-show="false"
              class="securitiesForm__form-text"
            >Укажите дату</small>
          </div>
          <div class="securitiesForm-form-group">
            <label for="securitiesName">Введение название</label>
            <input
              v-model="form.name"
              id="securitiesName"
              type="text"
              class="securitiesForm__form-control base-input"
              placeholder="Газпром"
              required
            >
            <small
              v-show="false"
              class="securitiesForm__form-text"
            >Введите название</small>
          </div>
          <div class="securitiesForm-form-group">
            <label for="securitiesPrice">Введение цену</label>
            <input
              v-model="form.price"
              id="securitiesPrice"
              type="number"
              class="securitiesForm__form-control base-input"
              placeholder="2286"
              required
            >
            <small
              v-show="false"
              class="securitiesForm__form-text"
            >Укажите цену</small>
          </div>
          <button
            type="submit"
            class="securities-create__btn base-button"
          >
            Создать
          </button>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Modal from './TheModal.vue';
import Toast from '../plugins/toast';
import Repository from '../Repository/ApiRepository';
const Securities = Repository.get('securities');
export default {
  name: "CreateSecurities",
  components: {
    Modal
  },
  data() {
    return {
      modalShow: false,
      form: {
        date: '',
        name: '',
        price: '',
        editState: false
      }
    };
  },
  computed: {},
  methods: {
    /**
    *  Вспомагательная функция VUEX,
    *  создающую локальные псевдонимы для действий в виде методов компонента
    *  проксирует в  this.getUpdateFromFirebase() доступ
    *  к store.actions.getUpdateFromFirebase
    */
    ...mapActions(['getUpdateFromFirebase']),
    /**
     * Показываем модальное окно
     */
    modalShowActions() {
      this.modalShow = !this.modalShow
    },
    /**
     * Сохранение нового инструмента
     * @return {Promise<void>}
     */
    async createSecurities() {
        await Securities.create(this.form).then(() => {
          // показываем уведомление
          Toast.successCreated();
          // после успешного сохранения обновляем данные
          this.getUpdateFromFirebase();
          // закрываем модльное окно
          this.modalShowActions();
        }).catch((e) => {
          Toast.error(e);
          console.log(e)
        })
    },
  }
}
</script>

<style lang="sass">
@import "../assets/vars"
.securities-create
  &-form-wrap
    width: 100%
.securities-create-form-wrap .securitiesForm
  width: 100%
  &-form-group
    display: flex
    flex-direction: column
    margin: 1rem 0
  &__form-control
    padding: .375rem .75rem
  &__form-text
    color: $error
  label
    font-size: 1.1em
    color: $muted
    margin-bottom: .5rem
</style>
