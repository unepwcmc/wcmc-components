import type { headers } from '@/types/store/main'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWcmcComponentsMainStore = defineStore('wcmc-components-main-store', () => {
  const headers = ref<headers>({})

  function updateHeaders(newHeaders: headers): headers {
    headers.value = newHeaders
    return headers.value
  }

  return {
    headers,
    updateHeaders
  }
})
