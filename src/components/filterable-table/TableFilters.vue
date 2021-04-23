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
      v-if="endpointDownload"
      class="filter__button-download"  
      :endpoint="this.endpointDownload"
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
      endpointDownload: {
        type: String
      },
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
      this.$root.$on('clickDropdown', this.updateDropdowns)
    },

    methods: {
      updateDropdowns (name, tableId) {
        if(this.tableId !== tableId) { return false }

        this.children.forEach(filter => {
          filter.isOpen = filter.name == name
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.filters {
  align-items: center;
  display: flex;
}
</style>