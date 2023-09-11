import type { useWcmcComponentsMainStore } from '@/store/main'
import type { defineStore } from 'pinia'

export interface headers {
  [string: string]: string
}

type UseNullStore = ReturnType<typeof defineStore>
export type NullStore = ReturnType<UseNullStore>
export type WcmcComponentsStore = ReturnType<typeof useWcmcComponentsMainStore>
export type useWcmcComponentsMainStoreType = Omit<WcmcComponentsStore, keyof NullStore>
