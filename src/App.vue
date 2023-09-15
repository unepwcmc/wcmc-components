<template>
  <div class="app">
    <div>
      <h3>Dummy button</h3>
      <DummyButton />
    </div>
    <hr />
    <h3>Filterable Table</h3>
    <FilterableTable
      v-model="filteredData"
      v-bind="{
        id: 'filterableTable1',
        attributes: config.attributes,
        options: config.options,
        classes: config.classes
      }"
      @fetchNewData="fetchNewData"
      @editAction="editAction"
      @routeInternalLink="routeInternalLink"
    />

    <h3>Filterable Table 2</h3>
    <FilterableTable
      v-model="mockData"
      v-bind="{
        id: 'filterableTable2',
        attributes: config2.attributes,
        options: config2.options
      }"
      @editAction="editAction"
      @routeInternalLink="routeInternalLink"
    />
    <!-- @fetchNewData="fetchNewData" -->
    <!--       :items-per-page="15" -->
    <!--    :filter-array="config.filter" -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWcmcComponentsMainStore } from '@/store/wcmcComponentsMainStore'
import type { TableConfig } from '@/types/FilterableTable/configTypes.ts'
import type { InternalLinkInfo } from '@/types/FilterableTable/emitTypes.ts'
import type { TableDataType } from '@/types/FilterableTable/dataTypes.ts'

const wcmcComponentsMainStore = useWcmcComponentsMainStore()
wcmcComponentsMainStore.updateHeaders({ dsfds: 'sdfsdf' })

const mockData = ref<TableDataType[]>([
  {
    archived: false,
    id: 330,
    data: {
      metadata_identifier: 'A.1',
      goal_target: 'Goal A',
      indicator_name: 'A.1 Red List of Ecosystems* ',
      availability: 'Available',
      time_series: '2014 - 2025',
      update_frequency: '5 years ',
      global_indicator: 'Y ',
      national_data: 'N',
      national_methodology_available: 'N',
      'institutions.name': [],
      'other_meas_processes.name': [],
      bip_indicator: 'Yes',
      factsheet_link: [
        {
          type: 'internal',
          routeInfo: { indicator_id: '10', name: 'abc' },
          title: 'Hi'
        }
      ]
    }
  },
  {
    archived: false,
    id: 331,
    data: {
      id: 331,
      metadata_identifier: 'A.2',
      goal_target: 'Goal B',
      indicator_name: 'A.2 qwewqe* ',
      availability: 'Available',
      time_series: '2000 - 2022',
      update_frequency: '10 years ',
      global_indicator: 'Y ',
      national_data: 'N',
      national_methodology_available: 'N',
      'institutions.name': ['sfsdfsdf', 'sdfsdfsdf'],
      'other_meas_processes.name': ['sdfsdf', 'qeqweqwe'],
      bip_indicator: 'Yes',
      factsheet_link: [
        {
          type: 'external',
          link: 'https://google.co.uk',
          title: 'Google1'
        }
      ]
    }
  },
  {
    archived: false,
    id: 332,
    data: {
      metadata_identifier: 'A.121212',
      goal_target: 'Goal 123123123',
      indicator_name: 'A.1 sdfsdf* ',
      availability: 'Available',
      time_series: '2014 - 2025',
      update_frequency: '5 years ',
      global_indicator: 'Y ',
      national_data: 'N',
      national_methodology_available: 'N',
      'institutions.name': [],
      'other_meas_processes.name': [],
      bip_indicator: 'Yes',
      factsheet_link: [
        {
          type: 'internal',
          routeInfo: { indicator_id: '10', name: 'abc' },
          title: 'Hi'
        },
        {
          type: 'external',
          link: 'https://google.co.uk',
          title: 'Google2'
        },
        {
          type: 'external',
          link: 'https://google.co.uk',
          title: 'Google3'
        },
        {
          type: 'external',
          link: 'https://google.co.uk',
          title: 'Google4'
        }
      ]
    }
  },
  {
    archived: false,
    id: 333,
    data: {
      metadata_identifier: 'A.xcvdsdf',
      goal_target: 'Goal 123123123',
      indicator_name: 'A.1 sdfsdf* ',
      availability: 'Available',
      time_series: '2014 - 2025',
      update_frequency: '5 years ',
      global_indicator: 'Y ',
      national_data: 'N',
      national_methodology_available: 'N',
      'institutions.name': [],
      'other_meas_processes.name': [],
      bip_indicator: 'Yes',
      factsheet_link: []
    }
  },
  {
    archived: false,
    id: 334,
    data: {
      metadata_identifier: 'A.xcvxcv',
      goal_target: 'Goal xcvxcv',
      indicator_name: 'A.1 dfdfgdfg* ',
      availability: 'Available',
      time_series: '2014 - 2025',
      update_frequency: '5 dfgdfg ',
      global_indicator: 'Y ',
      national_data: 'N',
      national_methodology_available: 'N',
      'institutions.name': [],
      'other_meas_processes.name': [],
      bip_indicator: 'Yes',
      factsheet_link: [
        {
          type: 'internal',
          routeInfo: { indicator_id: '10', name: 'abc' },
          title: ''
        },
        {
          type: 'external',
          link: 'https://google.co.uk',
          title: 'Google'
        }
      ]
    }
  },
  {
    archived: false,
    id: 336,
    data: {
      metadata_identifier: 'A.sdfdscxv',
      goal_target: 'Goal vxcv',
      indicator_name: 'A.1 dfdfgdfg* ',
      availability: 'Available',
      time_series: '2014 - 2025',
      update_frequency: '5 dfgdfg ',
      global_indicator: 'Y ',
      national_data: 'N',
      national_methodology_available: 'N',
      'institutions.name': [],
      'other_meas_processes.name': [],
      bip_indicator: 'Yes',
      factsheet_link: []
    }
  }
])
const filteredData = ref(JSON.parse(JSON.stringify(mockData.value)))

const config = ref<TableConfig>({
  attributes: [
    { field: 'goal_target', title: 'Goal/target', sortingOrder: 'default', showIn: 'both' },
    { field: 'indicator_name', title: 'Indicator name', sortingOrder: 'ascending', showIn: 'both' },
    { field: 'availability', title: 'Availability', sortingOrder: 'descending', showIn: 'both' },
    { field: 'time_series', title: 'Time series', sortingOrder: null, showIn: 'both' },
    {
      field: 'update_frequency',
      title: 'Update frequency',
      sortingOrder: 'Ssdfsdf',
      showIn: 'table'
    },
    {
      field: 'other_meas_processes.name',
      title: 'Other MEAs/Processes',
      sortingOrder: null,
      type: 'list',
      showIn: 'table'
    },
    {
      field: 'institutions.name',
      title: 'Institutions',
      sortingOrder: null,
      showIn: 'both',
      type: 'list'
    },
    {
      field: 'factsheet_link',
      title: 'Factsheet',
      sortingOrder: null,
      showIn: 'both',
      type: 'links'
    },
    { field: 'table_button', title: 'Metadata File', sortingOrder: null, showIn: 'modal' }
  ],
  endpoint: 'http://localhost:8081/v1/resources/headlineIndicators/',
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

    columns: {
      widths: ['1fr', '150px', '150px', '150px', '180px', '160px', '80px', '80px', '80px']
    },
    newRecordLink: {
      url: 'headlineIndicators/new',
      text: 'Create a new Headline Indicator'
    },

    showArchived: true,
    showEdit: true,
    showMoreContentColumn: true,
    text: {
      noResult: 'No Results Found'
    }
  },
  classes: {
    'ct-table-heading__sort-icon': 'ct-table-heading__sort-icon--custom'
  }
})
const config2 = ref<TableConfig>({
  attributes: [
    { field: 'goal_target', title: 'Goal/target', sortingOrder: 'default', showIn: 'both' },
    { field: 'indicator_name', title: 'Indicator name', sortingOrder: 'ascending', showIn: 'both' },
    { field: 'availability', title: 'Availability', sortingOrder: 'descending', showIn: 'both' },
    { field: 'time_series', title: 'Time series', sortingOrder: null, showIn: 'both' },
    {
      field: 'update_frequency',
      title: 'Update frequency',
      sortingOrder: 'Ssdfsdf',
      showIn: 'table'
    },
    {
      field: 'other_meas_processes.name',
      title: 'Other MEAs/Processes',
      sortingOrder: null,
      type: 'list',
      showIn: 'table'
    },
    {
      field: 'institutions.name',
      title: 'Institutions',
      sortingOrder: null,
      showIn: 'both',
      type: 'list'
    },
    {
      field: 'factsheet_link',
      title: 'Factsheet',
      sortingOrder: null,
      showIn: 'both',
      type: 'links'
    },
    { field: 'table_button', title: 'Metadata File', sortingOrder: null, showIn: 'modal' }
  ],

  options: {
    showArchived: true,
    showEdit: true,
    showMoreContentColumn: true,
    text: {
      noResult: 'No Results Found'
    }
  }
})

function editAction() {
  console.log('editAction is called')
}
function routeInternalLink(internalLinkInfo: InternalLinkInfo) {
  console.log('routeInternalLink is called', internalLinkInfo)
}
function fetchNewData() {
  const n = 5
  var shuffled = filteredData.value.sort(function () {
    return 0.5 - Math.random()
  })

  filteredData.value = shuffled.slice(0, n)
}
</script>

<style lang="postcss">
.app {
  width: 100%;

  @apply flex
  p-4
    flex-col
    gap-4;
}

.ct-table-heading__sort-icon {
  @apply w-[120px];
}
</style>
