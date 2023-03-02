<template>
  <div class="container-search">
    <input 
      class="search_input"
      type="text" 
      name="consulta" 
      id="q" 
      placeholder="Buscar"
    />
    <button class="search_btn">
      <ph-magnifying-glass :size="32" color="#6da1d2" />
    </button>
  </div>
</template>

<script>
  import { PhMagnifyingGlass } from 'phosphor-vue';
export default {
  components: {
    PhMagnifyingGlass,
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
    background: white;
    cursor: pointer;
  }
</style>