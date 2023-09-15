<template>
  <SvgArchive
    v-if="props.archived"
    @click="archiveOrRestoreCurrentRow(true)"
  />
  <SvgRestore
    v-else
    @click="archiveOrRestoreCurrentRow(false)"
  />
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SvgArchive from '@/components/Icons/SvgArchive.vue'
import SvgRestore from '@/components/Icons/SvgRestore.vue'
import type { archiveRestoreCurrentRowInfo } from '@/types/FilterableTable/emitTypes'

const props = defineProps({
  archived: {
    type: Boolean,
    required: true,
    default: true
  },
  recordId: {
    type: Number,
    required: true,
    default: null
  }
})
const emit = defineEmits(['archiveRestoreCurrentRow'])
const axios = inject<Axios>('filterTableAxios') as Axios

function archiveOrRestoreCurrentRow(trueArchiveAndFalseRestore) {
  const archiveRestoreCurrentRowInfo: archiveRestoreCurrentRowInfo = {
    trueArchiveAndFalseRestore,
    recordId: props.recordId
  }
  emit('archiveRestoreCurrentRow', archiveRestoreCurrentRowInfo)
}

// function archiveRestore() {
//   const data: archiveAPI = {
//     id: props.recordId,
//     archived: props.archived ? 0 : 1
//   }

//   axios
//     .post(props.archiveUrl, data)
//     .then((response) => {
//       emit('clicked', response.data.archived)
//     })
//     .catch(function (error) {
//       console.log(error)
//     })
// }
</script>
