<template>
  <label class="form_label">{{label}}</label>
  <input 
    class="form_input" 
    :type="type" 
    ref="input" 
    v-maska 
    :data-maska="dataMaska" 
    :modelValue="modelValue" 
    @input="onInput"
  >
</template>

<script>
export default {
  props: {
    label: String,
    type: String,
    dataMaska: String,
    modelValue: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
  .form_label {
    margin-bottom: 0.25rem;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
  }
  .form_input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1rem;
  }
</style>