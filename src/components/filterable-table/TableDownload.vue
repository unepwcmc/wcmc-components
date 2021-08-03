<template>
  <button
    @click="download"
    :class="['button', { 'button--disabled' : noResults }]"
    :style="cssVariables"
    v-bind="{ 'disabled' : noResults }">
    {{ config.download.text }}
  </button>
</template>

<script>
import axios from 'axios'
import { setAxiosHeaders } from '../../helpers/helpers-axios.js'

export default {
  name: 'TableDownload',

  props: {
    tableId: {
      required: true,
      type: Number
    },
    totalItems: {
      required: true,
      type: Number
    }
  },

  computed: {
    config () {
      return this.$store.getters['filterableTable/options'](this.tableId)
    },
    cssVariables () {
      return {
        '--bg-color'          : this.config.download.bgColor,
        '--bg-color-hover'    : this.config.download.bgColorHover,
        '--border-color'      : this.config.download.borderColor,
        '--border-color-hover': this.config.download.borderColorHover,
        '--color'             : this.config.download.color,
        '--font-size'         : this.config.download.fontSize,
        '--font-weight'       : this.config.download.fontWeight,
        '--height'            : this.config.download.height,
        '--icon-fill'         : this.config.download.iconFill,
        '--padding-left'      : this.config.download.paddingLeft,
        '--padding-right'     : this.config.download.paddingRight
      }
    },
    noResults () {
      return this.totalItems == 0
    },
    selectedFilterOptions () {
      return this.$store.getters['filterableTable/getSelectedFilterOptions'](this.tableId)
    }
  },

  methods: {
    download () {
      setAxiosHeaders(axios, 'download')

      // const csrf = document.querySelectorAll('meta[name="csrf-token"]')[0].
      // getAttribute('content'),
      
      const data = this.selectedFilterOptions
      
      // const config = {
      //     headers: {
      //       'Accept': 'text/csv',
      //       'responseType': 'blob'
      //     }
      //   }
      // axios.post('/pame/download', data, config)
      axios.post(this.endpoint, data)
        .then((response) => {
          // content-disposition looks something like: 'attachment; filename="the_file_name_here.csv"
          // so splitting the string by 'filename=" will leave us with ['attachemnt;', 'the_file_name_here.csv"']
          // we then get the last item and split it further by the the remaining '"' to ensure anything after that is gone.
          // Finally we get the first element of that split.
          const filename = response.headers['content-disposition'].split('filename="')[1].split('"')[0]

          this.createBlob(filename, response.data)

          // this.$ga.event('Button', 'click', 'PAME - CSV download')
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    createBlob (filename, data) {
      let blob = new Blob([data])

      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE workaround for "HTML7007: One or more blob URLs were 
        // revoked by closing the blob for which they were created. 
        // These URLs will no longer resolve as the data backing 
        // the URL has been freed."
        window.navigator.msSaveBlob(blob, filename)

      } else {
        const blobURL = window.URL.createObjectURL(blob),
          tempLink = document.createElement('a')

        // Safari thinks _blank anchor are pop ups. We only want to set _blank
        // target if the browser does not support the HTML5 download attribute.
        // This allows you to download files in desktop safari if pop up blocking 
        // is enabled.
        if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank')
        }
        
        tempLink.href = blobURL
        tempLink.setAttribute('download', filename)
        this.simulateClick(tempLink)
        window.URL.revokeObjectURL(blobURL)
      }
    },

    simulateClick () {
      //TODO check if this is needed
      // created because standard .click() doesn't work in Firefox
      // const event = new MouseEvent('click', {
      //   bubbles: true,
      //   cancelable: true,
      //   view: window
      // })
      // If cancelled, don't dispatch our event
      // var cancelled = !element.dispatchEvent(event)
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  @include button-basic;
  background-color: #aaa; // IE11
  background-color: var(--bg-color);
  border-color: #009FE3; // IE11
  border-color: var(--border-color);
  color: #fff; // IE11
  color: var(--color);
  font-size: 18px;
  font-size: var(--font-size);
  font-weight: 500;
  font-weight: var(--font-weight);
  height: '50px'; // IE11
  height: var(--height);
  margin-left: auto;
  padding-left: '24px'; // IE11
  padding-left: var(--padding-left);
  padding-right: '24px'; // IE11
  padding-right: var(--padding-right);

  &:hover {
    background-color: #009FE3; // IE11
    background-color: var(--bg-color-hover);
    border-color: #009FE3; // IE11
    border-color: var(--border-color-hover);
  }
}

::v-deep .svg--download {
  fill: '#fff'; // IE11
  fill: var(--icon-fill);
}
</style>