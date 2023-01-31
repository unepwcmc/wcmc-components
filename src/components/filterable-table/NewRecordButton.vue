<template>
   <a 
      :href="buttonURL"
      class="new-record-button"
      v-text="buttonText"
    />
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('filterableTable')

export default {
  name: 'NewRecordButton',

  props: {
    tableId: {
      required: true,
      type: Number,
    }
  },

  computed: {
    ...mapGetters({
      config: 'options',
    }),

    buttonText () {
      return this.config(this.tableId).newRecordLink.text
    },
    
    buttonURL () {
      return this.config(this.tableId).newRecordLink.url
    }
  },
}

</script>

<style lang="scss" scoped>
</style>