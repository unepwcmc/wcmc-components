<template>
  <td>
    <template v-if="props.header.type !== 'links'">
      {{ valueAtCurrentCell }}
    </template>
    <template v-else>
      <template v-for="(link, index) in valueAtCurrentCell">
        <a
          class="ct-table-cell__link"
          v-if="link.type === 'external'"
          :href="link.link"
          target="_blank"
          v-text="link.title"
        />
        <template v-if="link.type === 'internal'">
          <a
            class="ct-table-cell__link"
            v-text="link.title"
            @click="routeInternalLink(link)"
          />
        </template>
        <span
          v-if="valueAtCurrentCell.length - 1 !== index"
          v-text="','"
        />
      </template>
    </template>
  </td>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import type { HeadingAttributes, LinkType } from '@/types/FilterableTable/configTypes'
import type { InternalLinkInfo } from '@/types/FilterableTable/emitTypes'
const props = defineProps({
  header: {
    required: true,
    type: Object as PropType<HeadingAttributes>
  },
  data: {
    required: true,
    type: Object as any
  },
  tableId: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['routeInternalLink'])

const valueAtCurrentCell = computed(() => {
  let value = props.data[props.header.field]
  if (props.header.type === 'list') {
    if (Array.isArray(value)) {
      value = value.join(',')
    } else {
      console.warn(
        `Field of ${props.header.field} should be an array. However, other format is detected!. `,
        value
      )
    }
  }
  return value
})

function routeInternalLink(routeInfo: LinkType) {
  const internalLinkInfo: InternalLinkInfo = { attribute: props.header, routeInfo }

  emit('routeInternalLink', internalLinkInfo)
}
</script>

<style lang="postcss" scoped>
.ct-table-cell {
  &__link {
    @apply underline
    pl-2
    decoration-solid
    cursor-pointer
    hover:no-underline;
  }

  /* &__internal-link {
  } */
}
</style>
@/components/FilterableTable/types/FilterableTable/filterableTable
