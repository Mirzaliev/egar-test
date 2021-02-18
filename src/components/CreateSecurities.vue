<template>
  <div class="securities-create-wrap">
    <button
      class="securities-create__btn btn"
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
              class="securitiesForm__form-control"
              placeholder="18.03.1996"
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
              class="securitiesForm__form-control"
              placeholder="Газпром"
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
              class="securitiesForm__form-control"
              placeholder="2286"
            >
            <small
              v-show="false"
              class="securitiesForm__form-text"
            >Укажите цену</small>
          </div>
          <button
            type="submit"
            class="securities-create__btn btn"
          >
            Создать
          </button>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';
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
    modalShowActions() {
      this.modalShow = !this.modalShow
    },
    async createSecurities() {
        // if(!this.isValidateForm){
        //   Toast.validateError();
        //   return 0
        // }
        await Securities.create(this.form).then(() => {
          Toast.successCreated();
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
  &__btn
    font-size: 1.2em
    width: 100%
    color: $text-btn
    padding: .6rem
    background-color: $accent
    &:hover
      background-color: rgba(235, 232, 219, 0.86)
      color: black
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
    display: block
    padding: .375rem .75rem
    font-size: 1rem
    font-weight: 500
    line-height: 1.5
    color: #495057
    background-color: #fff
    background-clip: padding-box
    border: 1px solid #ced4da
    border-radius: .25rem
  &__form-text
    color: $error
  label
    font-size: 1.1em
    color: $muted
    margin-bottom: .5rem
</style>
