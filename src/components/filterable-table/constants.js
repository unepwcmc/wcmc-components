const UNEP_WCMC_BLUE = '#009FE3'

export const DEFAULT_OPTIONS = {
  columns: {
    widths: ['1fr', '1fr', '300px', '1fr', '1fr', '100px'] // widths.length = attributes.length + 1
  },
  download: {
    bgColor: '#aaa',
    bgColorHover: UNEP_WCMC_BLUE,
    borderColor: UNEP_WCMC_BLUE,
    borderColorHover: UNEP_WCMC_BLUE,
    color: '#fff',
    fontSize: '16px',
    fontWeight: '500',
    height: '50px',
    iconFill: '#fff',
    paddingLeft: '24px',
    paddingRight: '24px',
    text: 'CSV'
  },
  fontFamily: 'Arial, sans-serif',
  filters: {
    buttonApply: {
      borderColor: UNEP_WCMC_BLUE,
      borderRadius: '2px',
      borderStyle: 'solid',
      borderWidth: '2px',
      colorBg: UNEP_WCMC_BLUE,
      colorBgHover: '#333',
      colorText: '#000',
      colorTextHover: '#fff',
      height: '50px',
      paddingLeft: '24px',
      paddingRight: '24px',
      textTransform: 'capitalize'
    },
    buttonCancel: {
      borderColor: '#000',
      borderRadius: '2px',
      borderStyle: 'solid',
      borderWidth: '2px',
      colorBg: '#fff',
      colorBgHover: '#333',
      colorText: '#000',
      colorTextHover: '#fff',
      height: '50px',
      paddingLeft: '24px',
      paddingRight: '24px',
      textTransform: 'capitalize'
    },
    buttonClear: {
      borderColor: '#000',
      borderRadius: '2px',
      borderStyle: 'solid',
      borderWidth: '2px',
      colorBg: '#fff',
      colorBgHover: '#333',
      colorText: '#000',
      colorTextHover: '#fff',
      height: '50px',
      paddingLeft: '24px',
      paddingRight: '24px',
      textTransform: 'capitalize'
    },
    filterOptions: {
      tickFill: UNEP_WCMC_BLUE,
      handleLongLabels: 'truncate'
    },
    trigger: {
      colorBg: '#fff',
      colorBgActive: UNEP_WCMC_BLUE,
      colorBgHover: '#333',
      colorBgSelected: UNEP_WCMC_BLUE,
      colorBorder: '',
      colorBorderActive: '',
      colorBorderHover: '',
      colorBorderSelected: '',
      colorText: '#000',
      colorTextActive: '#fff',
      colorTextHover: '#fff',
      colorTextSelected: '#fff',
      borderRadius: '0',
      fontSize: '16px',
      height: '50px',
      paddingLeft: '24px',
      paddingRight: '40px'
    }
  },
  headings: {
    bgColor: '#000000',
    borderColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: '1px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'normal'
  },
  modal: {
    bulletDisplay: true,
    title: 'Optional modal title',
    closeBgColor: '#fff',
    closeBorderRadius: '0',
    crossFill: '#000',
    wrapperColor: 'rgba(0,0,0,.2)'
  },
  legend: {
    title: 'Legend',
    buttonTitle: 'Legend',
    buttonClass: 'legend-icon',
    closeBgColor: '#fff',
    closeBorderRadius: '0',
    crossFill: '#000',
    wrapperColor: 'rgba(0,0,0,.2)'
  },
  pagination: {
    buttonBgColor: UNEP_WCMC_BLUE,
    buttonBgColorDisabled: '#ccc',
    buttonBorderRadius: '0',
    chevronFill: '#fff',
    textTitle: '',
    textItems: ''
  },
  rows: {
    bgColor1: '#ffffff',
    bgColor2: '#f4f4f4',
    bgColorMobile: '#efefef',
    borderColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: '1px',
    buttonHoverColor: UNEP_WCMC_BLUE,
    buttonHoverColorArrow: '#fff'
  },
  sortable: false, // for a sortable table, pass :options="{sortable: true}" to FilterableTable
  text: {
    noResultsMessage: 'There are no items to display.'
  }
}

export const DUMMY_DATA = {
  attributes: [
    { field: 'attribute-2', title: 'attribute 2' },
    { field: 'attribute-4', title: 'attribute 4' },
    { field: 'attribute-5', title: 'attribute 5' },
    { field: 'attribute-6', title: 'attribute 6' },
    { field: 'attribute-7', title: 'attribute 7' }
  ],
  filters: [
    {
      name: 'filter-1',
      options: [
        'Option 1',
        'Option 2',
        'Option 3 - this is an example very long label that needs to be handled'
      ],
      title: 'Filter 1',
      type: 'multiple'
    },
    {
      name: 'filter-2',
      options: ['Option 1', 'Option 2', 'Option 3'],
      title: 'Filter 2',
      type: 'multiple'
    }
  ],
  legends: [
    {
      name: 'legend-1',
      options: [
        'Option 1',
        'Option 2',
        'Option 3 - this is an example very long label that needs to be handled'
      ],
      title: 'What a legend',
      type: 'multiple'
    },
    {
      name: 'legend-1',
      options: ['Option 1', 'Option 2', 'Option 3'],
      title: 'Legendary',
      type: 'multiple'
    }
  ],
  items: [
    {
      pageUrl: 'http://google.com',
      cells: [
        {
          name: 'attribute_1',
          title: 'Attribute 1',
          value:
            ' Attribute 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          showInTable: false,
          showInModal: true
        },
        {
          name: 'attribute_2',
          title: 'Attribute 2',
          value: ' Attribute 2 Lorem ipsum',
          showInTable: true,
          showInModal: true
        },
        {
          name: 'attribute_3',
          title: 'Attribute 3',
          value: 3,
          showInTable: false,
          showInModal: true
        },
        {
          name: 'attribute_4',
          title: 'Attribute 4',
          value: ' Attribute 4 Lorem',
          showInTable: true,
          showInModal: true
        },
        {
          name: 'attribute_5',
          title: 'Attribute 5',
          value: ' Attribute 5 Lorem ipsum dolor sit amet, consectetur',
          showInTable: true,
          showInModal: true
        },
        {
          name: 'attribute_6',
          title: 'Attribute 6',
          value: 6,
          showInTable: true,
          showInModal: true
        },
        {
          name: 'attribute_7',
          title: 'Attribute 7',
          value: ' Attribute 7 Lorem ipsum dolor sit',
          showInTable: true,
          showInModal: true
        }
      ]
    },
    {
      pageUrl: '',
      cells: [
        {
          name: 'attribute_1',
          title: 'Attribute 1',
          value: '1',
          showInTable: false,
          showInModal: true
        },
        {
          name: 'attribute_2',
          title: 'Attribute 2',
          value: ['http://google.com', 'Item 2', 'item 3'],
          showInTable: true,
          showInModal: true
        },
        {
          name: 'attribute_3',
          title: 'Attribute 3',
          value: 3,
          showInTable: false,
          showInModal: true
        },
        {
          name: 'attribute_4',
          title: 'Attribute 4',
          value: 'Lorem ipsum',
          showInTable: true,
          showInModal: true
        },
        {
          name: 'attribute_5',
          title: 'Attribute 5',
          value: 'Lorem ipsum dolor sit',
          showInTable: true,
          showInModal: true
        },
        {
          name: 'attribute_6',
          title: 'Attribute 6',
          value: 6,
          showInTable: true,
          showInModal: true
        },
        {
          name: 'attribute_7',
          title: 'Attribute 7',
          value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          showInTable: true,
          showInModal: true
        }
      ]
    },
    {
      pageUrl: '',
      cells: [
        {
          name: 'attribute_1',
          title: 'Attribute 1',
          value: 'Lorem ipsum',
          showInTable: false,
          showInModal: true
        },
        {
          name: 'attribute_2',
          title: 'Attribute 2',
          value: 'Lorem ipsum dolor sit amet, consectetur',
          showInTable: true,
          showInModal: true
        },
        {
          name: 'attribute_3',
          title: 'Attribute 3',
          value: 3,
          showInTable: false,
          showInModal: true
        },
        {
          name: 'attribute_4',
          title: 'Attribute 4',
          value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          showInTable: true,
          showInModal: true
        },
        {
          name: 'attribute_5',
          title: 'Attribute 5',
          value: 'Lorem ipsum dolor sit amet, consectetur',
          showInTable: true,
          showInModal: true
        },
        {
          name: 'attribute_6',
          title: 'Attribute 6',
          value: 6,
          showInTable: true,
          showInModal: true
        },
        {
          name: 'attribute_7',
          title: 'Attribute 7',
          value: 'Lorem Ipsum, lorem ipsum',
          showInTable: true,
          showInModal: true
        }
      ]
    }
  ]
}
