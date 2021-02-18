<template>
  <transition name="modal">
    <div
      v-if="show"
      class="modal-overlay"
    >
      <div class="modal">
        <div class="modal-header">
          <span class="modal-header__title">Создание инструмента</span>
          <button class="modal-header__close btn"
                  @click="close"
          >
            X
          </button>
        </div>
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  mounted: function() {},
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="sass">
@import "../assets/vars"
.modal-overlay
  position: fixed
  z-index: 9998
  top: 0
  left: 0
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  background-color: rgba(255, 255, 255, .7)
  transition: opacity .3s ease
  overflow-x: auto
.modal
  width: 30%
  height: auto
  background-color: #fff
  border-radius: .2rem
  box-shadow: 0 .2rem .8rem rgba(0, 0, 0, .33)
  transition: all .3s ease
  &-header
    padding: .9rem 1rem
    display: flex
    align-items: center
    font-size: 1.2em
    justify-content: space-between
    color: rgb(0, 0, 0)
    &__close
      background-color: white
  &-content
    padding: .9rem
// for transition
.modal-enter
  opacity: 0

.modal-leave-active
  opacity: 0

.modal-enter .modal-container,
.modal-leave-active .modal-container
  -webkit-transform: scale(1.1)
  transform: scale(1.1)

</style>
