export type HeadingSortBy = 'ascending' | 'descending' | 'default' | null
export type HeadingAttributes = {
  field: string
  title: string
  sortingOrder: HeadingSortBy
  showIn: 'both' | 'table' | 'modal'
  type?: 'string' | 'number' | 'float' | 'boolean' | 'list' | 'links'
}
export type Endpoint = String
export type Filters = {
  name: string
  title: string
  options: string[]
  type: 'single'
}
export type Options = {
  showEdit: boolean
  showArchived: boolean
  showMoreContentColumn: boolean
  text?: { [key: string]: string }
}
export type ClassesKey = 'ct-table-heading__sort-icon' | 'ct-table-heading__title'
export type Classes = {
  [key in ClassesKey]?: string
}
export type FindClassesObject = {
  [key in ClassesKey]?: any
}
export type OptionsKeyType = keyof Options
export type OptionsValueType = Options[keyof Options]

export interface TableConfig {
  attributes: HeadingAttributes[]
  endpoint: Endpoint
  filters: Filters[]
  options: Options
  classes: Classes
}

const config = {
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
}

const postBody = {
  filters: [
    { name: 'goal_target', options: ['Goal C', 'Target 1', 'Target 10'], type: 'single' },
    { name: 'time_series', options: ['Goal C', 'Goal D ', 'Target 1'], type: 'single' }
  ],
  items_per_page: 5,
  requested_page: 1
}
