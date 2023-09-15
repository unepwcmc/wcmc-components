<template>
  <tr>
    <TableCell
      v-for="(header, cellIndex) in headersInfomation.headersForTable"
      :key="`${cellIndex}cell`"
      v-bind="{
        header,
        data: row.data,
        tableId
      }"
      :disabled="row.archived"
      @routeInternalLink="(routeInfo) => emit('routeInternalLink', routeInfo)"
    />
    <td v-if="options.showArchived">
      <ArchiveButton
        class="base-icon--in-table ct-table-row__archiveRestore"
        v-bind="{
          archived: row.archived,
          recordId: row.id
        }"
        @archiveRestoreCurrentRow="
          (archiveRestoreCurrentRowInfo) =>
            emit('archiveRestoreCurrentRow', archiveRestoreCurrentRowInfo)
        "
      />
    </td>
    <td v-if="options.showEdit">
      <SvgEdit class="base-icon--in-table ct-table-row__edit" />
    </td>
    <td v-if="options.showMoreContentColumn">
      <SvgArrow class="base-icon--in-table ct-table-row__more-content" />
    </td>
  </tr>
</template>
<script setup lang="ts">
import TableCell from '@/components/FilterableTable/TableCell.vue'
import { useFilterableTableStore } from '@/store/filterableTable'
import { storeToRefs } from 'pinia'
import ArchiveButton from '@/components/Icons/ArchiveButton.vue'
import SvgEdit from '@/components/Icons/SvgEdit.vue'
import SvgArrow from '@/components/Icons/SvgArrow.vue'

const props = defineProps({
  row: {
    required: true,
    type: Object
  },

  // itemIndex: {
  //   required: true,
  //   type: Number
  // },

  tableId: {
    required: true,
    type: String
  }

  // totalColumns: {
  //   required: true,
  //   type: Number
  // }
})

const emit = defineEmits(['routeInternalLink', 'archiveRestoreCurrentRow'])

const FilterableTableStore = useFilterableTableStore(props.tableId)
const { headersInfomation, options } = storeToRefs(FilterableTableStore)

console.log(headersInfomation.value)
</script>

<!-- <style lang="postcss" scoped>
.ct-table-row {
  &__edit {
    @apply h-[3vw];
  }
}
</style> -->
