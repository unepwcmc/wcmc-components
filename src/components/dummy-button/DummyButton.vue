<template>
  <div>
    <button 
      class="button"
      @click="increment"
      v-text="text"
    />
  </div>
</template>
<script>
export default {
  name: 'DummyButton',
  computed: {
    times () {
      return this.$store.getters['dummyButton/counter'] > 1
        ? 'times'
        : 'time'
    },
    text () {
      return `I have been clicked ${this.$store.getters['dummyButton/counter']} ${this.times}`
    }
  },
  methods: {
    increment () {
      this.$store.commit('dummyButton/increment')
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  border: solid 2px black;
}
</style>