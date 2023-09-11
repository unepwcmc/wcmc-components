<template>
  <button class="button" @click="increment" v-text="text" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const times = computed(() => (store.getters['dummyButton/counter'] > 1 ? 'times' : 'time'))
const text = computed(
  () => `I have been clicked ${store.getters['dummyButton/counter']} ${times.value}`
)

function increment() {
  store.commit('dummyButton/increment')
}
</script>
