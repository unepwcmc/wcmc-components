<template>
  <div id="app">
    <p>
      <dummy-button />
    </p>
    
    <filterable-table
      endpoint-download="/"
      :options="{ 
        hideMoreContentColumn: true
      }"
    >
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
export default {
  name: 'Serve'
}
</script>