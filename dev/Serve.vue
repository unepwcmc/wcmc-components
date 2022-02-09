<template>
  <div id="app">
    <ChartSunburst
      
    />
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
  name: 'Serve'
}
</script>