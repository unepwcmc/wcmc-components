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
    
    <!-- <filterable-table
      endpoint-download="/"
    /> -->
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