<template>
  <div class="container-search">
    <input 
      class="search_input"
      type="text" 
      placeholder="Buscar"
      @input="onInput"
    />
    <button class="search_btn" @click="$emit('click')">
      <ph-magnifying-glass :size="32" color="#6da1d2" />
    </button>
  </div>
</template>

<script>
  import { PhMagnifyingGlass } from 'phosphor-vue';
export default {
  components: {
    PhMagnifyingGlass,
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    }
  }
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
  .search_btn {
    border: none;
    background: var(--white);
    cursor: pointer;
  }
</style>