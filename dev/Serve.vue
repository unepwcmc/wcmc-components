<template>
  <div id="app">
    <p>
      <dummy-button />
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
export default {
  name: 'Serve'
}
</script>