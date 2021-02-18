<template>
  <div class="securities-display">
    <div class="securities-display-hint">
      <small>Двойное нажатие - редактирование</small>
      <small>Enter - сохранить изменения</small>
      <small>Esc - отменить</small>
    </div>
    <table class="securities-display-table">
      <thead>
        <tr>
          <th>Дата</th>
          <th>Название</th>
          <th>Цена</th>
        </tr>
      </thead>
      <tbody>
        <table-row />
        <table-row />
        <table-row />
        <table-row />
      </tbody>
    </table>
  </div>
</template>

<script>
import TableRow from './TableRow'
  export default {
    name: "Table",
    components: {
      TableRow
    }
  }
</script>

<style lang="sass">
@import "../assets/vars"
.securities-display
  padding: 1rem 0
  &-hint
    display: flex
    color: $muted
    small
      margin-right: 1rem
.securities-display-table
  width: 100%
  min-width: 100%
  margin-top: 1rem
  border-collapse: collapse
  font-size: 0.9em
  font-family: sans-serif
  overflow: hidden
  thead tr
    text-align: left
    font-size: 1.2em
    height: 2rem
  tbody tr
    height: 2.3rem
    td
      width: 32%
      vertical-align: text-bottom
      &:last-child
        width: 4%
  &-form-group
    display: flex
    flex-direction: column
    small
      color: $error

</style>
