<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask" @click="$emit('close')">
      <div class="modal-container" @click.stop="('close')">
        <div class="modal-header">
          <slot name="header"></slot>
          <button @click="$emit('close')" class="close-icon">
            <q-icon size="1.5rem" name="close" font="weight"/>
          </button>
        </div>

        <div class="modal-body">
          <slot name="body"></slot>
        </div>

        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { PhX } from "phosphor-vue"
import Button from './Button.vue'
export default {
  components: { Button, PhX },
  props: {
    show: Boolean
  }
}
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
    overflow: auto;
  }
  .modal-container {
    width: 25rem;
    max-height: 30rem;
    overflow-y: auto;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
  }
  .close-icon {
    display: flex;
    cursor: pointer;
    color: var(--blue-500);
    border: none;
    background: transparent;
  }
  .close-icon i {
    transition: transform .1s ease;
  }
  .close-icon i:hover {
    color: var(--blue-300);
    transform: translateY(-3px);
  }
  .modal-body {
    margin: 20px 0;
  }
  .modal-default-button {
    float: right;
  }
  .modal-enter-from {
    opacity: 0;
  }
  .modal-leave-to {
    opacity: 0;
  }
  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>