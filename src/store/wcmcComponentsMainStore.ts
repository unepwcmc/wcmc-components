import { ref } from 'vue'
import { defineStore, createPinia, setActivePinia } from 'pinia'

export interface headers {
  [string: string]: string
}

type UseNullStore = ReturnType<typeof defineStore>
export type NullStore = ReturnType<UseNullStore>
export type WcmcComponentsStore = ReturnType<typeof useWcmcComponentsMainStore>
export type useWcmcComponentsMainStoreType = Omit<WcmcComponentsStore, keyof NullStore>

setActivePinia(createPinia())
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
