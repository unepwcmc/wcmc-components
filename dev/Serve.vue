<template>
  <div id="app">
    <ChartSunburst 
      :options="{
        chart: {
          colours: ['#11C583', '#159BFA', '#A83CF5']
        },
        resetButton: {
          fontSize: '14px',
          text:'Back to all impact areas'
        }
      }"
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
  methods: {
    test (selectedId) {
      console.log('selectedId', selectedId)
    }
  }
}
</script>