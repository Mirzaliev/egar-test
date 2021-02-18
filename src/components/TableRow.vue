<template>
  <tr
    @dblclick="showEditingForm()"
    @keyup.enter="editSecurity()"
    @keyup.esc="cancelEdit()"
  >
    <template v-if="!security.editState">
      <td>{{ security.date }}</td>
      <td>{{ security.name }}</td>
      <td>{{ security.price }}</td>
      <td>
        <button
          class="base-button base-button_simple base-button_clear"
          @click="removeSecurity(security.key)"
        >
          &#x2716;
        </button>
      </td>
    </template>
    <template v-else>
      <td>
        <div class="securities-display-table-form-group">
          <input
            type="text"
            :value="security.date"
            class="base-input"
          >
          <small>Заполните поле</small>
        </div>
      </td>
      <td>
        <div class="securities-display-table-form-group">
          <input
            type="text"
            :value="security.name"
            class="base-input"
          >
          <small v-show="false">Заполните поле</small>
        </div>
      </td>
      <td>
        <div class="securities-display-table-form-group">
          <input
            type="text"
            :value="security.price"
            class="base-input"
          >
          <small v-show="false">Заполните поле</small>
        </div>
      </td>
      <td>
        <button class="base-button base-button_simple base-button_create">
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
    security: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dateForEditing: null
    }
  },
  methods: {
    ...mapActions(['getUpdateFromFirebase']),
    async removeSecurity(key) {
      try {
        await Securities.delete(key);
        this.getUpdateFromFirebase()
        Toast.successDeleted()
      }catch (e) {
        Toast.error(e.message)
      }
    },
    // eslint-disable-next-line vue/no-dupe-keys
    editSecurity(security) {
      console.log('Начинаем')
    },
    showEditingForm() {
      if(this.security.editState) {
        return;
      }
      this.security.editState = !this.security.editState
    },
    cancelEdit() {
      this.security.editState = false
    }
  }
 }
</script>

<style>

</style>
