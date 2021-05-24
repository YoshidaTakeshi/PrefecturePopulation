<template>
  <div>
    <input
      :id="prefecture.prefName"
      v-model="checked"
      type="checkbox"
      :value="prefecture.prefName"
      @change="changeCheckbox()"
    />
    <label :for="prefecture.prefName">{{ prefecture.prefName }}</label>
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
  methods: {
    changeCheckbox() {
      if (this.checked) {
        this.$emit('check', this.prefecture)
      } else {
        this.$emit('uncheck', this.prefecture)
      }
    },
  },
}
</script>
