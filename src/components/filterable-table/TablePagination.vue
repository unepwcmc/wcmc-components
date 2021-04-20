<template>
  <div 
    class="pagination"
    :style="cssVariables"
  >
    <div 
      class="pagination__content"
      v-if="haveResults"
    >
      <span class="bold">
        {{ config.pagination.textTitle }} {{ firstItem }} - {{ lastItem }} of {{ totalItems }} {{ config.pagination.textItems }}
      </span>

      <button
        v-bind="{ 'disabled' : !previousIsActive }"
        @click="changePage(previousIsActive, 'previous')"
        :class="['button--previous', { 'disabled' : !previousIsActive }]"
      >
        <svg-chevron class="button__svg" />
      </button>


      <button
        v-bind="{ 'disabled' : !nextIsActive }"
        @click="changePage(nextIsActive, 'next')"
        :class="['button--next', { 'disabled' : !nextIsActive }]"
      >
        <svg-chevron class="button__svg" />
      </button>
    </div>

    <div v-else class="left">
      <p>There are no evaluations matching the selected filters options.</p>
    </div>
  </div>
</template>

<script>
import SvgChevron from './svgs/SvgChevron.vue'

export default {
  name: "TablePagination",

  components: { SvgChevron },

  props: {
    currentPage: {
      required: true,
      type: Number
    },
    itemsPerPage: {
      required: true,
      type: Number
    },
    tableId: {
      required: true,
      type: Number,
    },
    totalItems: {
      required: true,
      type: Number
    },
    totalPages: {
      required: true,
      type: Number
    }
  },

  computed: {
    config () {
      return this.$store.getters['filterableTable/options'](this.tableId)
    },
    cssVariables () {
      return {
        '--svg-chevron-fill'        : this.config.pagination.chevronFill,
        '--button-bg-color'         : this.config.pagination.buttonBgColor,
        '--button-bg-color-disabled': this.config.pagination.buttonBgColorDisabled,
        '--button-border-radius'    : this.config.pagination.buttonBorderRadius,
      }
    },
    nextIsActive () {
      return  this.currentPage < this.totalPages
    },
    previousIsActive () {
      return this.currentPage > 1
    },
    firstItem () {
      let first

      if(this.totalItems == 0) {
        first = 0

      } else if (this.totalItems < this.itemsPerPage) {
        first = 1

      } else {
        first = this.itemsPerPage * (this.currentPage - 1) + 1
      }

      return first
    },
    lastItem () {
      let lastItem = this.itemsPerPage * this.currentPage

      if (lastItem > this.totalItems) {
        lastItem = this.totalItems
      }

      return lastItem
    },
    haveResults () {
      return this.totalItems > 0
    }
  },

  methods: {
    changePage (isActive, direction) {
      // only change the page if the button is active
      if (isActive) {
        const newPage = direction == 'next' ? this.currentPage + 1 : this.currentPage - 1

        this.$store.commit('updateRequestedPage', newPage)
        this.$emit('updated:page')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination__content {
  align-items: center;
  display: flex;
  justify-items: flex-end;
}

.no-results {
  font-weight: bold;
  margin: rem-calc(60 0);
  text-align: center;
}

$buttons: ('next', 'previous', '');

@for $i from 1 to length($buttons) {
  .button--#{nth($buttons, $i)} {
    @include button-basic;
    background-color: var(--button-bg-color);
    border-radius: var(--button-border-radius);
    padding: 0;
    width: 50px; height: 50px;

    @if nth($buttons, $i) == 'previous' {
      margin: rem-calc(0 6 0 10); 

      .button__svg { transform: rotateY(180deg); }
    }

    .button__svg {
      width: rem-calc(12); height: rem-calc(22);
    }

    &.disabled { 
      background-color: var(--button-bg-color-disabled); 
      cursor: disabled;
    }
  }
}

::v-deep .svg-chevron {
  fill: var(--svg-chevron-fill);
}
</style>