<template>
  <div class="checkbox">
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

<style scoped>
.checkbox {
  display: inline-block;
  font-size: 20px;
  width: 125px;
}

.checkbox input {
  height: 20px;
  width: 20px;
}

@media screen and (max-width: 480px) {
  .checkbox {
    font-size: 15px;
    width: 90px;
  }

  .checkbox input {
    height: 15px;
    width: 15px;
  }
}
</style>
