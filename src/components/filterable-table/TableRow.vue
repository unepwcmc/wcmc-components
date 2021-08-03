<template>
  <div 
    class="row"
    :style="cssVariablesAndStyles"
  >
    <template v-for="(cell, index) in item.cells">
      <p
        v-if="cell.showInTable"
        :key="index"
        class="cell"
        :style="`grid-column: ${index + 1}`"
      >
        <span class="cell__name">{{ cell.name }}:</span>
        {{ cell.value }}
      </p>
    </template>

    <p
      class="cell"
      :style="`grid-column: ${columnsCount}`"
    >
      <a 
        v-if="item.pageUrl"
        class="button"
        :href="item.pageUrl"
      >
        <svg-arrow class="button__svg" />
      </a>

      <button 
        v-else 
        class="button"
        @click="openModal"
      >
        <svg-arrow class="button__svg" />
      </button>
    </p>
  </div>
</template>

<script>
import SvgArrow from './svgs/SvgArrow.vue'

import mixinColumns from './mixins/mixin-columns'

export default {
  name: "row",

  components: { SvgArrow },

  mixins: [mixinColumns],

  props: {
    item: {
      required: true,
      type: Object,
    },
    tableId: {
      required: true,
      type: Number,
    }
  },

  computed: {
    cssVariablesAndStyles () {
      return {
        'grid-template-columns': this.gridColumnsCss,
        'grid-columns': this.gridColumnsCss, // IE11
        '--bg-color-1': this.config.rows.bgColor1,
        '--bg-color-2': this.config.rows.bgColor2,
        '--bg-color-mobile': this.config.rows.bgColorMobile,
        '--border-color': this.config.rows.borderColor,
        '--border-style': this.config.rows.borderStyle,
        '--border-width': this.config.rows.borderWidth,
        '--button-hover-color': this.config.rows.buttonHoverColor
      }
    },
    columnsCount () {
      return Object.keys(this.item.cells).length + 1
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
        tableId: this.tableId,
        content: this.item.cells
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
    background-color: #efefef; // IE11
    background-color: var(--bg-color-mobile);
    margin-bottom: rem-calc(18);
    padding: rem-calc(6 0);      

    display: flex;
    flex-direction: column;

    @include breakpoint($medium) { 
      background-color: #ffffff; // IE11
      background-color: var(--bg-color-1);
      margin: 0;
      padding: 0;

      display: -ms-grid; // IE11
      display: grid;
    }

    &:nth-child(even) { 
      @include breakpoint($medium) { 
        background-color: #f4f4f4; // IE11
        background-color: var(--bg-color-2);
      }
    }
  }

  .cell {
    margin: 0;
    padding: rem-calc(4 14);
    width: 100%;

    @include breakpoint($medium) {
      border-left: solid #ffffff 1px; // IE11
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

  .button {
    background: transparent;
    border: none;
    padding: 0;

    display: block;

    &:hover {
      cursor: pointer;

      ::v-deep .svg-arrow .svg__circle {
        fill: #009FE3; // IE11
        fill: var(--button-hover-color);
      }
    }
  }
</style>