<template>
  <div class="container-search">
    <input 
      class="search_input"
      type="search" 
      placeholder="Buscar"
      @input="onChangeDebounced"
    />

  </div>
</template>

<script>
  import { debounce } from '../utils/debounce.js'
export default {
  created() {
    this.onChangeDebounced = debounce(event => {
      this.$emit('change', event.target.value)
    }, 500);
  },
}
</script>

<style>
  .container-search {
    width: 100%;
    height: 2.14rem;
    display: flex;
    justify-content: center;
    border: 1px solid black 
  }
  .search_input {
    width: 100%;
    padding: 0.25rem;
    border: none;
  }
</style>