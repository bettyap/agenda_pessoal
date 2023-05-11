<template>
  <div class="container-search">
    <q-input
      outlined
      @update:model-value="$emit('change', $event)"
      placeholder="Buscar"
      debounce="500"
      style="background: white; width: 100%"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

  </div>
</template>

<script>
  import { debounce } from '../utils/debounce.js'
export default {
  // created() {
  //   this.onChangeDebounced = debounce(event => {
  //     this.$emit('change', event.target.value)
  //   }, 500);
  // },
}
</script>

<style>
  .container-search {
    width: 100%;
    display: flex;
  }
</style>