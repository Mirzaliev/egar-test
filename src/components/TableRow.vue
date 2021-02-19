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
import { mapActions } from 'vuex'
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
    index: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      beforeEditCache: {}
    }
  },
  methods: {
    ...mapActions(['getUpdateFromFirebase']),
    async removeSecurity(key) {
      try {
        await Securities.delete(key);
        this.$emit('removeSecurities', this.index)
        //this.getUpdateFromFirebase()
        Toast.successDeleted()
      }catch (e) {
        Toast.error(e.message)
      }
    },
    async doneEditSecurity() {
      try {
        if(!this.validateEditData()){
          return;
        }
        await Securities.update({
          date: this.securities.date,
          name: this.securities.name,
          price: this.securities.price,
        }, this.securities.key)
        Toast.successUpdated()
        this.securities.editState = false
      }catch (e) {
        Toast.error(e.message)
      }
    },
    showEditingForm() {
      if(this.securities.editState) {
        return;
      }
      this.securities.editState = !this.securities.editState
      // non reactive
      this.beforeEditCache = JSON.parse(JSON.stringify(this.securities))
    },
    cancelEdit() {
      this.securities.editState = false
      this.securities.date = this.beforeEditCache.date
      this.securities.name = this.beforeEditCache.name
      this.securities.price = this.beforeEditCache.price
      this.beforeEditCache.date = {}
    },
    validateEditData() {
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
