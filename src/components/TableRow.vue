<template>
  <tr @dblclick="f = !f">
    <template v-if="f">
      <td>12.02.2020</td>
      <td>Газпром</td>
      <td>2363</td>
      <td>
        <button class="base-button base-button_simple base-button_clear">
          &#x2716;
        </button>
      </td>
    </template>
    <template v-else>
      <td>
        <div class="securities-display-table-form-group">
          <input
            type="text"
            class="base-input"
          >
          <small>Заполните поле</small>
        </div>
      </td>
      <td>
        <div class="securities-display-table-form-group">
          <input
            type="text"
            class="base-input"
          >
          <small v-show="false">Заполните поле</small>
        </div>
      </td>
      <td>
        <div class="securities-display-table-form-group">
          <input
            type="text"
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
export default {
  name: "TableRow",
  data() {
    return {
      f: true
    }
  }
 }
</script>

<style>

</style>
