<template>
  <div :class="['cell', { 'cell--disabled': disabled }]">
    <template v-if="cell">
      <div v-if="cell.legend_on" class="cell__legend">
        <span class="cell__title" v-text="cell.title" />

        <span
          v-for="(value, valueIndex) in cell.value"
          :key="Math.random() * valueIndex"
          class="legend__icon"
          :class="kebabCaseClassName(value)"
        />
      </div>

      <span v-else>
        <span class="cell__title" v-text="cell.title" />

        <span v-html="printValue(cell.value)" />
      </span>
    </template>

    <div v-if="$slots" class="cell__content">
      <slot />
    </div>
  </div>
</template>

<script>
import { isALink } from '../../helpers/helpers-url.js'

export default {
  name: 'Cell',

  props: {
    cell: {
      type: Object,
      default: undefined
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    printValue(value) {
      let output = value

      if (Array.isArray(value)) {
        const strings = value.map((string) => {
          return isALink(string)
        })

        output = strings.join(', ')
        return output
      }

      return isALink(value)
    },

    kebabCaseClassName(title) {
      if (typeof title !== 'string') {
        return
      }

      return title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
    }
  }
}
</script>

<style lang="scss" scoped>
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

  &:first-child {
    border-left: none;
  }

  &--disabled {
    cursor: none;
    opacity: 0.5;
    pointer-events: none;
  }

  &__title {
    font-weight: bold;
    margin-right: rem-calc(6);

    @include breakpoint($medium) {
      display: none;
    }
  }

  &__legend {
    display: flex;
    align-items: center;

    @include breakpoint($medium) {
      display: block;
    }
  }

  &__content {
    width: 100%;
    height: 100%;

    @include breakpoint($medium) {
      display: flex;
      align-items: center;
      justify-content: center;

      &:empty {
        display: none;
      }
    }

    &:empty {
      display: none;
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
</style>
