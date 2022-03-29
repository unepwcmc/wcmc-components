<template>
  <div 
    class="row"
    :style="cssVariablesAndStyles"
  >
    
    <div
      v-for="(cell, index) in columns"
      :key="Math.random() * index"
      class="cell"
      :style="`grid-column: ${index + 1}`"
    >
      <div 
      class="cell__legend" 
      v-if="cell.legend_on"
      >
        <span
          class="cell__title"
          v-text="cell.title"
        />

        <span
          v-for="(value, index) in cell.value"
          :key="Math.random() * index"
          :class="`legend__icon ${kebabCaseClassName(value)}`"
        >
        </span>
      </div>

      <p v-else>
        <span
          class="cell__title"
          v-text="cell.title"
        />

        <span v-html="printValue(cell.value)" />
      </p>
    </div>
    
    <p
      class="cell"
      :style="`grid-column: ${totalColumns}`"
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
import { isALink } from '../../helpers/helpers-url.js'
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
    },

    totalColumns: {
      required: true,
      type: Number,
    }
  },

  computed: {
    cssVariablesAndStyles () {
      return {
        'grid-template-columns'     : this.gridColumnsCss,
        'grid-columns'              : this.gridColumnsCss, // IE11
        '--bg-color-1'              : this.config.rows.bgColor1,
        '--bg-color-2'              : this.config.rows.bgColor2,
        '--bg-color-mobile'         : this.config.rows.bgColorMobile,
        '--border-color'            : this.config.rows.borderColor,
        '--border-style'            : this.config.rows.borderStyle,
        '--border-width'            : this.config.rows.borderWidth,
        '--button-hover-color'      : this.config.rows.buttonHoverColor,
        '--button-hover-color-arrow': this.config.rows.buttonHoverColorArrow
      }
    },

    projectTitle () {
      return this.trim(this.item.title)
    },

    config () {
      return this.$store.getters['filterableTable/options'](this.tableId)
    },

    columns () {
      return this.item.cells.filter(cell => cell.showInTable == true)
    }
  },

  methods: {
    assessmentUrl (url) {
      return url.includes('http') ? `<a href="${url}" title="View assessment" target="_blank">Link</a>` : url
    },

    openModal () {
      const obj = {
        tableId: this.tableId,
        content: this.item.cells
      }

      this.$store.dispatch('filterableTable/updateModal', obj)

      this.$root.$emit('openModal', this.tableId)
    },

    printValue (value) {
      let output = value

      if(Array.isArray(value)) {
        const strings = value.map(string => {
          return isALink(string)
        })

        output = strings.join(', ')
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
    },
      
    kebabCaseClassName (title) {
      return title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
    }
  }
}
</script>

<style lang="scss" scoped>
  .row {
    background-color: #efefef; // IE11
    background-color: var(--bg-color-mobile);
    font-family: Arial, sans-serif; // IE11
    font-family: var(--font-family);
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

  .legend {
    &__icon {
      margin: rem-calc(4);
      height: rem-calc(38);
      width: rem-calc(38);
      background-size: cover;

      display: inline-block;
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

    &__title {
      font-weight: bold; 
      margin-right: rem-calc(6);

      @include breakpoint($medium){ display: none; }
    }
    
    &__legend {
      display: flex;
      align-items: center;
      @include breakpoint($medium) {
        display: block;
      }
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

      ::v-deep .svg-arrow .svg__arrow {
        fill: #fff; // IE11
        fill: var(--button-hover-color-arrow);
      }
    }
  }
</style>