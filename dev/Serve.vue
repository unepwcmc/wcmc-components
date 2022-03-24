<template>
  <div id="app">
    <p>
      <dummy-button />
    </p>
    
    <filterable-table
      endpoint-download="/"
    >
    <!-- 
      An example of how you might pass a named template for the sort icon into the FilterableTable:
      
      <template #sort-icon>
        <span>
          I'm the sorting icon now!
        </span>
      </template>
    -->
    </filterable-table>
  </div>
</template>

<script>
export default {
  name: 'Serve'
}
</script>