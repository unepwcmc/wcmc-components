<template>
  <SvgArchive
    class="base-icon--in-table"
    v-if="archiveClass === 'archive'"
    @click="archive"
  />
  <SvgRestore
    class="base-icon--in-table"
    v-else
    @click="archive"
  />
</template>
<script setup lang="ts">
// @ts-nocheck
import { computed } from 'vue'
import SvgArchive from '@/components/filterable-table/svgs/SvgArchive.vue'
import SvgRestore from '@/components/filterable-table/svgs/SvgRestore.vue'
import axios from 'axios'
import { setAxiosHeaders } from '../../helpers/helpers-axios.js'
import { useWcmcComponentsMainStore } from '@/store/wcmcComponentsMainStore'

const props = defineProps({
  archiveUrl: {
    type: String,
    required: true
  },

  archived: {
    type: Boolean,
    required: true,
    default: true
  },

  recordId: {
    type: Number,
    required: true
  }
})

const archiveClass = computed(() => (props.archived ? 'restore' : 'archive'))

function archive() {
  const data = {
    id: this.recordId,
    archived: this.archived ? 0 : 1
  }

  setAxiosHeaders(axios)

  axios
    .post(this.archiveUrl, data)
    .then((response) => {
      this.$emit('clicked', response.data.archived)
    })
    .catch(function (error) {
      console.log(error)
    })
}

const wcmcComponentsMainStore = useWcmcComponentsMainStore()
console.log(wcmcComponentsMainStore.headers)
</script>
