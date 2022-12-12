<template>
  <input :value="modelValue" @input="updateValue" class="input" type="text">
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid teal;
  border-radius: 5px;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>
