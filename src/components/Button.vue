<template>
  <button 
    class="form_button" 
    @click="$emit('click')" 
    :type="type"
  >
    {{title}}
  </button>
</template>

<script>
export default {
  props: {
    title: String,
    type: String
  }
}
</script>

<style scoped>
  .container_button{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
  .form_button {
    width: 100%;
    min-width: 120px;
    background: lightblue;
    border: 0;
    padding: 1rem;
    cursor: pointer;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    border: 1px solid #6da1d2;
  }
  .form_button:hover {
    background: #6da1d2;
  }
</style>