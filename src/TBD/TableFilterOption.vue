<template>
  <li class="option">
    <input
      :id="optionId"
      v-model="isSelected"
      type="checkbox"
      class="checkbox"
    />

    <svg-tick
      v-show="isSelected"
      class="icon-tick"
      :style="cssVariables"
    />

    <label
      :for="optionId"
      :title="option"
      class="label"
      :class="labelClasses"
      v-text="option"
    />
  </li>
</template>

<script>
import SvgTick from './../svgs/SvgTick.vue'

export default {
  name: 'TableFilterOption',

  components: { SvgTick },

  props: {
    option: {
      required: true
    },

    tableId: {
      required: true,
      type: Number
    }
  },

  data() {
    return {
      isSelected: false
    }
  },

  computed: {
    cssVariables() {
      return {
        '--svg-tick-color': this.config.filters.filterOptions.tickFill
      }
    },

    config() {
      return this.$store.getters['filterableTable/options'](this.tableId)
    },
    /**
     * filterOptions -- Properties: tickFill, handleLongLabels
     * filterOptions.handleLongLabels
     * @returns {string} returns array/string with values 'truncate', 'wrap'
     * passed as classes to labels (see example constants.js)
     */
    labelClasses() {
      return this.config.filters.filterOptions.handleLongLabels
    },

    optionId() {
      return `${this.option.replace(/\s/g, '-').toLowerCase()}-${Math.ceil(Math.random() * 10000)}`
    }
  }
}
</script>

<style lang="scss" scoped>
$checkbox-border-color: #3c3c3c !default;
$checkbox-height: rem-calc(22) !default;
$label-max-width: 45vw !default;
$label-min-width: rem-calc(460) !default;
$sm-label-max-width: 80vw !default;

.option {
  font-size: rem-calc(16);
  margin-bottom: rem-calc(16);
  width: 100%;
  display: block;
  position: relative;

  label {
    cursor: pointer;
  }
}

.checkbox {
  z-index: 10;
  border: solid rem-calc(1) $checkbox-border-color;
  cursor: pointer;
  margin: 0;
  padding: 0;
  width: $checkbox-height;
  height: $checkbox-height;
  appearance: none;
  display: block;
  position: absolute;
  left: 0;
}

.label {
  line-height: $checkbox-height;
  padding: rem-calc(0 20 0 38);
  display: inline-block;
}

.icon-tick {
  position: absolute;
  top: 3px;
  left: 2px;
}

::v-deep .svg-tick {
  fill: #009fe3; // IE11
  fill: var(--svg-tick-color);
}

.truncate {
  overflow: hidden;
  max-width: $sm-label-max-width;
  text-overflow: ellipsis;
  white-space: nowrap;

  @include breakpoint($small) {
    max-width: $label-max-width;
  }
}

.wrap {
  min-width: $sm-label-max-width;
  white-space: normal;
  word-wrap: break-word;

  @include breakpoint($small) {
    min-width: $label-min-width;
  }
}
</style>
