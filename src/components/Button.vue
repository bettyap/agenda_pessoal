<template>
  <button 
    class="form_button" 
    @click="onClick" 
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
  },
  methods: {
    onClick(event){
      this.$emit('click', event)
    }
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
    background: var(--blue-200);
    border: 0;
    padding: 1rem;
    cursor: pointer;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--blue-500);
  }
  .form_button:hover {
    background: var(--blue-500);
  }
</style>