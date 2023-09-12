<template>
  <div class="app">
    <div>
      <h3>Dummy button</h3>
      <dummy-button />
    </div>
    <hr />

    <filterable-table
      :attributes="config.attributes"
      :endpoint="config.endpoint"
      :endpoint-download="config.endpointDownload"
      :filter-array="config.filter"
      :options="config.options"
      :items-per-page="15"
    />
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, inject } from 'vue'
import { useWcmcComponentsMainStore } from '@/store/wcmcComponentsMainStore'

const wcmcComponentsMainStore = useWcmcComponentsMainStore()
wcmcComponentsMainStore.updateHeaders({ dsfds: 'sdfsdf' })
console.log(wcmcComponentsMainStore.headers)

const config = ref<{}>({
  attributes: [
    { field: 'goal_target', title: 'Goal/target', sortable: null },
    { field: 'indicator_name', title: 'Indicator name', sortable: null },
    { field: 'availability', title: 'Availability', sortable: null },
    { field: 'time_series', title: 'Time series', sortable: null },
    { field: 'update_frequency', title: 'Update frequency', sortable: null },
    {
      field: 'other_meas_processes.name',
      title: 'Other MEAs/Processes',
      sortable: null
    },
    { field: 'table_button', title: 'Metadata File', sortable: null }
  ],
  // endpoint: 'http://localhost:8081/v1/resources/headlineIndicators/',
  // // http://localhost:8081/
  // endpointDownload: 'http://localhost:8081/headlineIndicators/download',
  filter: [
    {
      name: 'goal_target',
      title: 'Goal/target',
      options: [
        'Goal A',
        'Goal B',
        'Goal C',
        'Goal D ',
        'Target 1',
        'Target 10',
        'Target 11',
        'Target 12',
        'Target 13',
        'Target 14',
        'Target 15 ',
        'Target 16',
        'Target 17',
        'Target 18',
        'Target 19',
        'Target 2',
        'Target 20',
        'Target 21',
        'Target 22',
        'Target 23',
        'Target 3',
        'Target 4',
        'Target 5',
        'Target 6',
        'Target 7',
        'Target 8',
        'Target 9'
      ],
      type: 'single'
    }
  ],
  options: {
    download: {
      bgColor: '#E37835',
      bgColorHover: '#EE8929',
      color: '#000',
      fontSize: '18px',
      fontWeight: '500',
      text: 'Download CSV'
    },
    fontFamily: 'Roboto, sans-serif',
    filters: {
      buttonApply: {
        borderColor: '#059396',
        borderWidth: '1px',
        colorBg: '#059396',
        colorText: '#fff',
        textTransform: 'uppercase'
      },
      buttonCancel: {
        borderColor: '#707070',
        borderWidth: '1px',
        textTransform: 'uppercase'
      },
      buttonClear: {
        borderColor: '#707070',
        borderWidth: '1px',
        textTransform: 'uppercase'
      },
      filterOptions: { tickFill: '#E37835' },
      trigger: {
        borderRadius: '2px',
        colorBg: '#F8F8F8',
        colorBgActive: '#306088',
        colorBgHover: '#306088',
        colorBgSelected: '#306088',
        fontSize: '18px'
      }
    },
    headings: { bgColor: '#306088', borderColor: '#306088' },
    modal: {
      closeBgColor: '#059396',
      closeBorderRadius: '2px',
      crossFill: '#fff',
      wrapperColor: 'rgba(255,255,255,.8)'
    },
    pagination: {
      buttonBorderRadius: '2px',
      buttonBgColor: '#E37835',
      textTitle: 'Showing',
      textItems: 'entries'
    },
    rows: {
      bgColor1: '#F7FAFB',
      bgColor2: '#FFF',
      borderColor: 'transparent',
      buttonHoverColor: '#1876BA'
    },
    showArchived: true,
    showEdit: true,
    columns: {
      widths: ['1fr', '150px', '150px', '150px', '180px', '160px', '80px', '80px', '80px']
    },
    newRecordLink: {
      url: 'headlineIndicators/new',
      text: 'Create a new Headline Indicator'
    }
  }
})
</script>

<style lang="postcss" scoped>
.app {
  width: 100%;

  @apply flex
    flex-col
    gap-4;
}
</style>
