<template>
  <div 
    class="pagination"
    :style="cssVariables"
  >
    <div 
      v-show="haveResults"
      class="pagination__content"
    >
      <span class="pagination__numbers">
        {{ options(tableId).pagination.textTitle }} {{ firstItem }} - {{ lastItem }} of {{ totalItems }} {{ options(tableId).pagination.textItems }}
      </span>

      <button
        class="button--previous button__margin"
        :class="{ 'disabled': !previousIsActive }"
        @click="goToEnd('first')"
      >
        <svg-chevron class="button__svg" />
        <svg-chevron class="button__svg" />
      </button>

      <button
        class="button--previous button__margin"
        :class="{ 'disabled': !previousIsActive }"
        @click="changePage(previousIsActive, 'previous')"
      >
        <svg-chevron class="button__svg" />
      </button>

      <div v-for="(page, pageIndex) in pages" :key="pageIndex">
        <button v-if="numberOfPageButtons"
          class="button--page button__margin"
          :class="{ 'button__page--selected': currentPage === page }"
          @click="goToPage(page)"
          v-text="page"
        />
      </div>

      <button
        class="button--next button__margin"
        :class="{ 'disabled' : !nextIsActive }"
        @click="changePage(nextIsActive, 'next')"
      >
        <svg-chevron class="button__svg" />
      </button>

      <button
        class="button--next"
        :class="{ 'disabled': !nextIsActive }"
        @click="goToEnd('last')"
      >
        <svg-chevron class="button__svg" />
        <svg-chevron class="button__svg" />
      </button>
    </div>

    <p 
      v-show="!haveResults"
      class="pagination__message"
    >
      There are no evaluations matching the selected filters options.
    </p>
  </div>
</template>

<script>
import SvgChevron from './svgs/SvgChevron.vue'
import { createNamespacedHelpers } from 'vuex'
import { range } from 'lodash'

const { mapGetters, mapActions } = createNamespacedHelpers('filterableTable')

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
      type: Number
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
    ...mapGetters({ options: 'options' }),

    cssVariables () {
      return {
        '--svg-chevron-fill'        : this.options(this.tableId).pagination.chevronFill,
        '--button-bg-color'         : this.options(this.tableId).pagination.buttonBgColor,
        '--button-bg-color-disabled': this.options(this.tableId).pagination.buttonBgColorDisabled,
        '--button-border-radius'    : this.options(this.tableId).pagination.buttonBorderRadius,
        '--button-bg-color-selected'    : this.options(this.tableId).pagination.pageSelectedBgColor,
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

      if (this.totalItems === 0) {
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
    },

    numberOfPageButtons () {
      return this.options(this.tableId).pagination.numberOfPageButtonsToShow
    },

    pages () {
      let firstPageButton
      let lastPageButton

      // paginationRadius is the number of pages to have either side of the this.currentPage, where possible 
      const paginationRadius = Math.round(this.numberOfPageButtons / 2)
      const isFirstPageVisible = this.currentPage - paginationRadius >= 0
      const isLastPageVisible = this.currentPage + paginationRadius < this.totalPages

      switch (false) {
        case isFirstPageVisible:
          firstPageButton = 1
          lastPageButton = Math.min(this.totalPages, this.numberOfPageButtons)
          break
        case isLastPageVisible:
          lastPageButton = this.totalPages
          firstPageButton = this.totalPages - this.numberOfPageButtons + 1
          break
        default:
          firstPageButton = this.currentPage - paginationRadius + 1
          lastPageButton = this.currentPage + paginationRadius - 1
      }

      return range(firstPageButton, lastPageButton + 1)
    },
  },

  methods: {
    ...mapActions({ updateRequestedPage: 'updateRequestedPage' }),

    changePage (isActive, direction) {
      // only change the page if the button is active
      if (isActive) {
        const newPage = direction == 'next' ? this.currentPage + 1 : this.currentPage - 1

        const obj = { 
          tableId: this.tableId,
          requestedPage: newPage 
        }

        this.updateRequestedPage(obj)
        this.$emit('updated:page')
      }
    },

    goToPage (page) {
      const obj = {
        tableId: this.tableId,
        requestedPage: page,
      };
      this.updateRequestedPage(obj)
      this.$emit("updated:page")
    },

    goToEnd (end) {
      const obj = {
        tableId: this.tableId,
        requestedPage: (end === 'first' ? 1 : this.totalPages)
      }
      this.updateRequestedPage(obj)
      this.$emit("updated:page")
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  &__content {
    margin-top: rem-calc(16);

    align-items: center;
    display: flex;
    justify-items: flex-end;
  }

  &__numbers {
    font-family: Arial, sans-serif; // IE11
    font-family: var(--font-family);
    margin-left: auto;
    margin-right: rem-calc(6);
  }

  &__message {
    font-weight: bold;
    margin: rem-calc(60 0);
    text-align: center;
  }
}

$buttons: ('next', 'previous', 'page', '');

@for $i from 1 to length($buttons) {
  .button--#{nth($buttons, $i)} {
    @include button-basic;
    background-color: #009FE3; // IE11
    background-color: var(--button-bg-color);
    border-radius: 0; // IE11
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

    @if nth($buttons, $i) == 'page' {
      color: #fff;
      font-size: rem-calc(22);
    }

    &.disabled { 
      background-color: #ccc; // IE11 
      background-color: var(--button-bg-color-disabled); 
      cursor: disabled;
    }
  }

  .button__page--selected {
    background-color: var(--button-bg-color-selected);
  }

  .button__margin {
    margin: rem-calc(0 6 0 0);
  }
}
::v-deep .svg-chevron {
  fill: #fff; // IE11
  fill: var(--svg-chevron-fill);
}
</style>
