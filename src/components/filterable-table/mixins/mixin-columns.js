export default {
  computed: {
    columnsConfig () {
      return this.$store.getters['filterableTable/options'](this.tableId).columns
    },

    gridColumnsCss () {
      if (!('columnsCount' in this)) {
        console.error(`columnsCount is not implemented for ${this.$options.name}`)

        return ''
      } else if (this.hasColumnWidths) {
        return this.gridColumnWidthFromConfig
      }

      return this.gridEvenColumnsCss
    },

    hasColumnWidths () {
      return this.columnsConfig.widths && this.columnsConfig.widths.length
    },

    gridColumnWidthFromConfig () {
      if (this.columnsConfig.widths.length !== this.columnsCount) {
        console.warn(`columnsConfig.widths must have the same length as the number of columns: ${this.columnsCount}`)

        return this.gridEvenColumnsCss
      }
      
      return this.columnsConfig.widths.map(x => `${x}fr`).join(' ')
    },

    gridEvenColumnsCss () {
      const cols = []

      for (let i=0; i < this.columnsCount; i++) {
        cols.push('1fr')
      }

      return cols.join(' ')
    }
  }
}