<template>
  <div>
    <input
      :id="prefecture.name"
      v-model="checked"
      type="checkbox"
      :value="prefecture.neme"
    />
    <label :for="prefecture.name">{{ value }}</label>
  </div>
</template>

<script>
export default {
  props: {
    prefecture: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      checked: false,
    }
  },
}
</script>
