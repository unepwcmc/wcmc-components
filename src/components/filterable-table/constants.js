const UNEP_WCMC_BLUE = '#009FE3';

export const DEFAULT_OPTIONS = {
  fontFamily: 'Arial, sans-serif',
  download: {
    bgColor: '#aaa',
    bgColorHover: UNEP_WCMC_BLUE,
    borderColor: UNEP_WCMC_BLUE,
    borderColorHover: UNEP_WCMC_BLUE,
    color: '#fff',
    height: '50px',
    iconFill: '#fff',
    paddingLeft: '24px',
    paddingRight: '24px',
  },
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
      // borderRadius: '0',
      tickFill: UNEP_WCMC_BLUE
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
      height: '50px',
      paddingLeft: '24px',
      paddingRight: '24px',
    },
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
    title: 'Optional modal title',
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
  }
}

export const DUMMY_DATA = {
  "attributes": [
    { field: "column-1", title: "Column 1" },
    { field: "column-2", title: "Column 2" },
    { field: "column-3", title: "Column 3" },
    { field: "column-4", title: "Column 4" },
    { field: "column-5", title: "Column 5" },
    { field: "column-6", title: "Column 6" },
    { field: "column-7", title: "Column 7" }
  ],
  "filters": [
    {
      "name": "filter-1",
      "options": ["Option 1", "Option 2", "Option 3"],
      "title": "Filter 1",
      "type": "multiple"
    },
    {
      "name": "filter-2",
      "options": ["Option 1", "Option 2", "Option 3"],
      "title": "Filter 2",
      "type": "multiple"
    }
  ],
  items: [
    {
      pageUrl: "http://google.com",
      cells: [
        {
          name: "Attribute 1",
          value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          showInTable: true,
          showInModal: true
        }, 
        {
          name: "Attribute 2",
          value: "Lorem ipsum",
          showInTable: true,
          showInModal: true
        }, 
        {
          name: "Attribute 3",
          value: 1,
          showInTable: true,
          showInModal: true
        }, 
        {
          name: "Attribute 4",
          value: "Lorem",
          showInTable: true,
          showInModal: true
        }, 
        {
          name: "Attribute 5",
          value: "Lorem ipsum dolor sit amet, consectetur",
          showInTable: true,
          showInModal: true
        }, 
        {
          name: "Attribute 6",
          value: 1,
          showInTable: true,
          showInModal: true
        }, 
        {
          name: "Attribute 7",
          value: "Lorem ipsum dolor sit",
          showInTable: true,
          showInModal: true
        }, 
      ]
    },
    {
      pageUrl: '',  
      cells:[
        {
          name: "Attribute 1",
          value: "1",
          showInTable: true,
          showInModal: true
        }, 
        {
          name: "Attribute 2",
          value: "Lorem ipsum dolor sit",
          showInTable: true,
          showInModal: true
        }, 
        {
          name: "Attribute 3",
          value: 3,
          showInTable: true,
          showInModal: true
        }, 
        {
          name: "Attribute 4",
          value: "Lorem ipsum",
          showInTable: true,
          showInModal: true
        },
        {
          name: "Attribute 5",
          value: "Lorem ipsum dolor sit",
          showInTable: true,
          showInModal: true
        }, 
        {
          name: "Attribute 6",
          value: 6,
          showInTable: true,
          showInModal: true
        }, 
        {
          name: "Attribute 7",
          value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          showInTable: true,
          showInModal: true
        }, 
      ],
    },
    {
      pageUrl: "",
      cells: [
        {
          name: "Attribute 1",
          value: "Lorem ipsum",
          showInTable: true,
          showInModal: true
        }, 
        {
          name: "Attribute 2",
          value: "Lorem ipsum dolor sit amet, consectetur",
          showInTable: true,
          showInModal: true
        }, 
        {
          name: "Attribute 3",
          value: 3,
          showInTable: true,
          showInModal: true
        }, 
        {
          name: "Attribute 4",
          value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          showInTable: true,
          showInModal: true
        }, 
        {
          name: "Attribute 5",
          value: "Lorem ipsum dolor sit amet, consectetur",
          showInTable: true,
          showInModal: true
        }, 
        {
          name: "Attribute 6",
          value: 6,
          showInTable: true,
          showInModal: true
        }, 
        {
          name: "Attribute 7",
          value: "Lorem Ipsum, lorem ipsum",
          showInTable: true,
          showInModal: true
        }, 
      ]
    }
  ]
}