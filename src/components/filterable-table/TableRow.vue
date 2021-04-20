<template>
  <div 
    class="row"
    :style="cssVariables"
    @click="openModal()"
  >
    <p
      v-for="(cell, index) in item" 
      :key="index"
      class="cell"
    >
      <span class="cell__name">{{ cell.name }}:</span>
      {{ cell.value }}
    </p>
    <!-- <p class="table__cell">{{ item.designation }}</p>
    <p class="table__cell">
      <template v-if="item.restricted">{{ item.wdpa_id }}</template>
      <a v-else :href="item.wdpa_url" title="View protected area on Protected Planet" target="_blank">{{ item.wdpa_id }}</a>
    </p>
    <p class="table__cell">{{ item.id }}</p>
    <p class="table__cell">{{ checkForMultiples('iso3') }}</p>
    <p class="table__cell">{{ item.methodology }}</p>
    <p class="table__cell">{{ item.year }}</p>
    <p 
      v-html="assessmentUrl(item.url)"
      class="table__cell"
    />
    <p 
      @click="openModal()" 
      class="table__cell table__cell-modal-trigger"
    >
      {{ item.metadata_id }}
    </p> -->
  </div>
</template>

<script>
export default {
  name: "row",
  props: {
    item: {
      required: true,
      type: Array,
    },
    tableId: {
      required: true,
      type: Number,
    }
  },

  computed: {
    cssVariables () {
      return {
        '--bg-color-1': this.config.rows.bgColor1,
        '--bg-color-2': this.config.rows.bgColor2,
        '--bg-color-mobile': this.config.rows.bgColorMobile,
        '--border-color': this.config.rows.borderColor,
        '--border-style': this.config.rows.borderStyle,
        '--border-width': this.config.rows.borderWidth,
        '--columns': Object.keys(this.item).length
      }
    },
    projectTitle () {
      return this.trim(this.item.title)
    },
    config () {
      return this.$store.getters['filterableTable/options'](this.tableId)
    }
  },

  methods: {
    assessmentUrl (url) {
      return url.includes('http') ? `<a href="${url}" title="View assessment" target="_blank">Link</a>` :  url
    },

    openModal () {
      const obj = {
        id: this.tableId,
        content: this.item
      }

      this.$store.dispatch('filterableTable/updateModal', obj)

      this.$root.$emit('openModal', this.tableId)
    },

    checkForMultiples (field) {
      // set output to the first item in the array
      // if the array has more than 1 value then set output to 'multiple'
      let output = this.item[field][0]

      if(this.item[field].length > 1) {
        output = 'Multiple'
      } else {
        output = this.trim(output)
      }

      return output
    },

    trim (phrase) {
      const length = phrase.length
      let output

      if (length <= 30) {
        output = phrase
      } else {
        output = phrase.substring(0,27) + '...'
      }

      return output
    }
  }
}
</script>

<style lang="scss" scoped>
  .row {
    background-color: var(--bg-color-mobile);
    margin-bottom: rem-calc(18);
    padding: rem-calc(6 0);      

    display: flex;
    flex-direction: column;

    @include breakpoint($medium) { 
      background-color: var(--bg-color-1);
      margin: 0;
      padding: 0;

      display: grid;
      grid-template-columns: repeat(var(--columns), 1fr);
    }

    &:nth-child(even) { 
      @include breakpoint($medium) { 
        background-color: var(--bg-color-2); 
      }
    }
  }

  .cell {
    margin: 0;
    padding: rem-calc(4 14);
    width: 100%;

    @include breakpoint($medium) {
      border-left: var(--border-style) var(--border-color) var(--border-width);
      padding: rem-calc(16 14);
      width: auto;

      display: block;
    }

    &:first-child { border-left: none; }

    &__name {
      font-weight: bold; 
      margin-right: rem-calc(6);

      @include breakpoint($medium){ display: none; }
    }
  }
</style>