<template>
  <div class="filters">
    <table-filter 
      v-for="filter in filters"
      :key="filter._uid"
      :name="filter.name"
      :options="filter.options"
      :tableId="tableId"
      :title="filter.title" 
      :type="filter.type" 
    />

    <table-download 
      class="filter__button-download"  
      :tableId="tableId"
      :total-items="totalItems" 
    />
  </div>
</template>

<script>
  import TableFilter from './TableFilter.vue'
  import TableDownload from './TableDownload.vue'

  export default {
    name: "TableFilters",

    components: { 
      TableFilter, 
      TableDownload 
    },

    props: {
      filters: {
        required: true,
        type: Array
      },
      totalItems: {
        required: true,
        type: Number
      },
      tableId: {
        required: true,
        type: Number,
      },
    },

    data () {
      return  {
        children: this.$children
      }
    },

    mounted () {
      this.createSelectedFilterOptions()
      
      this.$root.$on('clickDropdown', this.updateDropdowns)
    },

    methods: {
      updateDropdowns (name, tableId) {
        if(this.tableId !== tableId) { return false }

        this.children.forEach(filter => {
          filter.isOpen = filter.name == name
        })
      },

      createSelectedFilterOptions () {
        let array = []

        // create an empty array for each filter
        this.filters.forEach(filter => {
          if (filter.name !== undefined && filter.options.length > 0) {
            let obj = {}

            obj.name = filter.name
            obj.options = []
            obj.type = filter.type

            array.push(obj)
          }
        })
        
        const obj = {
          tableId: this.tableId,
          filterOptions: array
        }

        this.$store.dispatch('filterableTable/setFilterOptions', obj)
      },
    }
  }
</script>

<style lang="scss" scoped>
.filters {
  align-items: center;
  display: flex;
}
</style>