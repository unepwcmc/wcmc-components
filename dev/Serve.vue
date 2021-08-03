<template>
  <div id="app">
    <p>
      <dummy-button />
    </p>
    
    <filterable-table
      endpoint-download="/"
    />
  </div>
</template>

<script>
export default {
  name: 'Serve'
}
</script>