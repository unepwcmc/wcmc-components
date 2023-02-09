<template>
  <div id="app">
    <ChartSunburst 
      :options="{
        chart: {
          hideRoot: true
        },
        resetButton: {
          fontSize: '14px',
          text:'Back to all impact areas'
        }
      }"
      :data="data"
    />
    <!-- <ChartSunburst /> -->
    <p>
      <!-- <dummy-button /> -->
    </p>
    
    <filterable-table
      endpoint-download="/"
    >
    <!-- 
      Example of an options prop that would disable the "show more content" column for the whole table
      :options="{ 
        hideMoreContentColumn: true

        Example of the sortable property in the options prop that sets every column as sortable by default
        sortable: true  // if some column should not be sortable, in the project using the table set the 
                         'sortable' key in the table_attr property of the model (the column) to false.

        Example of the sortable property in the options prop that sets every column as not sortable by default
        sortable: false  // or don't set anything, it will be false by default. If some column should be 
                            sortable, in the project using the table set the 'sortable' key in the table_attr
                            property of the model (the column) to true.

      }"
    -->

    <!-- 
      <template #sort-icon>
        <span>This element is used as the sorting icon now!</span>
      </template>
      
      <template #row-link-icon>
        <span>This element is used as the row link icon now!</span>
      </template>
    -->
    </filterable-table>
  </div>
</template>

<script>
import ChartSunburst from '../src/components/chart-sunburst/ChartSunburst.vue'

export default {
  components: { ChartSunburst },
  name: 'Serve',
  mounted() {
    this.$root.$on('chart-sunburst:update:selected', this.test)
  },
  data (){
    return {
      data: {
        id: 'home',
        children: [
          {
            id: "parent-1",
            color: "#159BFA",
            name: "Parent 1",
            children: [
            {
              id: "child-1",
              color: "#159BFA",
              name: "Child 1",
              value: 1
            },
            {
              id: "child-2",
              color: "#159BFA",
              name: "Child 2",
              value: 1
            },
            {
              id: "child-3",
              color: "#159BFA",
              name: "Child 3",
              value: 1
            },
            ]
          },
          {
            id: "parent-2",
            color: "#A83CF5",
            name: "Parent 2",
            children: [
            {
              id: "child-4",
              color: "#A83CF5",
              name: "Child 4",
              value: 1
            },
            {
              id: "child-5",
              color: "#A83CF5",
              name: "Child 5",
              value: 1
            },
            {
              id: "child-6",
              color: "#A83CF5",
              name: "Child 6",
              value: 1
            },
            ]
          },
          {
            id: "parent-3",
            color: "#11C583",
            name: "Parent 3",
            children: [
            {
              id: "child-7",
              color: "#11C583",
              name: "Child 7",
              value: 1
            },
            {
              id: "child-8",
              color: "#11C583",
              name: "Child 8",
              value: 1
            },
            {
              id: "child-9",
              color: "#11C583",
              name: "Child 9",
              value: 1
            },
            ]
          }
        ]
      }
    }
  },
  methods: {
    test (selectedId) {
      console.log('selectedId', selectedId)
    }
  }
}
</script>