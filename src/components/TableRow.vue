<template>
  <tr
    @dblclick="showEditingForm()"
    @keyup.enter="doneEditSecurity()"
    @keyup.esc="cancelEdit()"
  >
    <template v-if="!securities.editState">
      <td>{{ securities.date }}</td>
      <td>{{ securities.name }}</td>
      <td>{{ securities.price }}</td>
      <td>
        <button
          class="base-button base-button_simple base-button_clear"
          @click="removeSecurity(securities.key)"
        >
          &#x2716;
        </button>
      </td>
    </template>
    <template v-else>
      <td>
        <div class="securities-display-table-form-group">
          <input
            v-model="securities.date"
            type="date"
            class="base-input"
          >
          <small v-show="false">Заполните поле</small>
        </div>
      </td>
      <td>
        <div class="securities-display-table-form-group">
          <input
            v-model="securities.name"
            type="text"
            class="base-input"
          >
          <small v-show="false">Заполните поле</small>
        </div>
      </td>
      <td>
        <div class="securities-display-table-form-group">
          <input
            v-model="securities.price"
            type="number"
            class="base-input"
          >
          <small v-show="false">Заполните поле</small>
        </div>
      </td>
      <td>
        <button
          class="base-button base-button_simple base-button_create"
          @click="doneEditSecurity()"
        >
          &#x2714;
        </button>
      </td>
    </template>
  </tr>
</template>

<script>
import Repository from '../Repository/ApiRepository';
const Securities = Repository.get('securities');
import Toast from '../plugins/toast';
export default {
  name: "TableRow",
  props: {
    securities: {
      type: Object,
      required: true
    },
    // Индекс цикла
    // (нужен при удаление инстурмента из основного массива)
    index: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      // поле, чтобы временно хранить старые значения редактируемой строки
      beforeEditCache: {}
    }
  },
  methods: {
    /**
     * Удаление инструмента
     * @param key
     * @return {Promise<void>}
     */
    async removeSecurity(key) {
      try {
        // удаление из firebase
        await Securities.delete(key);
        // удаление из сновного массива
        this.$emit('removeSecurities', this.index)
        // Уведомление пользователю
        Toast.successDeleted()
      }catch (e) {
        Toast.error(e.message)
      }
    },
    /**
     * Редактирование инструмента
     * @return {Promise<void>}
     */
    async doneEditSecurity() {
      try {
        // Валидация
        if(!this.validateEditData()){
          return;
        }
        // Обновляем в Firebase
        // (Перадаем данные для обновления и ключ объекта, который хотим обновить)
        await Securities.update({
          date: this.securities.date,
          name: this.securities.name,
          price: this.securities.price,
        }, this.securities.key)
        // Показываем уведомление
        Toast.successUpdated()
        // закрываем форму
        this.securities.editState = false
      }catch (e) {
        // Если есть ошибки
        Toast.error(e.message)
      }
    },
    /**
     * Показываем форму редатирования
     */
    showEditingForm() {
      // Если уже форма открыта, ниче не делаем
      if(this.securities.editState) {
        return;
      }
      // Показываем форму
      this.securities.editState = !this.securities.editState
      // Старые данные временно храним в beforeEditCache,
      // если пользователь отменит редактирование
      // JSON.parse(JSON.stringify(this.securities)) - чтобы поле не было рективным
      this.beforeEditCache = JSON.parse(JSON.stringify(this.securities))
    },
    /**
     * Отмена редактирования
     */
    cancelEdit() {
      this.securities.editState = false
      // Обратно присваиваем старые данные
      this.securities.date = this.beforeEditCache.date
      this.securities.name = this.beforeEditCache.name
      this.securities.price = this.beforeEditCache.price
      // очищаем переменную, которая выпалняет роль кеша
      this.beforeEditCache.date = {}
    },
    /**
     * Валидация input перед редактированием
     * @return {boolean}
     */
    validateEditData() {
      // если хоть одно поле пустое, возвращаем false
      // иначе true
      if(
        this.securities.date.length
        && this.securities.name.length
        && this.securities.price.length ) {
        return true
      }
      Toast.validateError()
      return false
    }
  }
 }
</script>

<style>

</style>
