import Vue from "vue";
import Toasted from "vue-toasted";

Vue.use(Toasted, {
  theme: "bubble",
  position: "top-right",
  duration: 5000
});

export default {
  show() {
    Vue.toasted.success("Добавлено");
  },
  error(e) {
    Vue.toasted.error("Ошибка" + e.message);
  },
  successCreated() {
    Vue.toasted.success("Инструмент успешно создан");
  },
  successDeleted() {
    Vue.toasted.success("Инструмент успешно удален");
  },
  successUpdated() {
    Vue.toasted.success("Инструмент успешно обновлен");
  },
  validateError() {
    Vue.toasted.error("Заполните все поля");
  }
};
