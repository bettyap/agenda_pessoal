<template>
  <label class="form_label">{{label}}</label>
  <input 
    class="form_input"
    :type="type"
    ref="input"
    v-maska
    :data-maska="dataMaska"
    :value="modelValue"
    @input="onInput"
    :max="max"
  >
  <span v-if="errors.length" class="form-error">{{errors[0].$message}}</span>
</template>

<script> 
export default {
  props: {
    label: String,
    type: String,
    errors: {
      type: Array,
      default() {
        return []
      }
    },
    dataMaska: String,
    modelValue: {
      type: String,
      default: ''
    },
    max: String,
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
  }
  .form_input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
  .form-error {
    font-size: 0.75rem;
    color: red;
    margin: 0rem 0rem 0.5rem;
  }
</style>