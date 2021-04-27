<template>
  <div id="app">
    <p>
      <dummy-button />
    </p>
    
    <filterable-table />
    
    <!-- ELP -->
    <!-- <filterable-table
      :options="{ 
        filters: {
          trigger: {
            colorBg: '#ffffff',
            colorBgHover: '#3294A9'
          }
        },
        headings: {
          bgColor: '#525657',
          fontWeight: 'bold'
        },
        rows: {
          
        }
      }"
    /> -->
    <!-- <filterable-table
      :options="{ 
        filters: {
          colorBgActive: '#71A32B',
          colorBgHover: '#71A32B',
        },
        headings: {
          borderStyle: 'dashed',
          borderWidth: '2px'
        },
        rows: {
          borderStyle: 'dashed',
          borderWidth: '2px',
        }
      }"
    /> -->
  </div>
</template>

<script>
export default {
  name: 'Serve'
}
</script>