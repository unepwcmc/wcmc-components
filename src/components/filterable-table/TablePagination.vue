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
        <button v-if="showPageNumbers"
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

    showPageNumbers () {
      return this.options(this.tableId).pagination.pageNumbers
    },

    pages () {
      const numberOfPageButtons = this.options(this.tableId).pagination.numberOfPageButtonsToShow
      const halfPagination = Math.round(numberOfPageButtons / 2)
      let firstPageOnPagination, lastPageOnPagination

      switch (this.currentPage - halfPagination >= 0) { //check if the current page is beyond half the range of the pagination from the start (i.e. if numberOfPageButtons is 8, this checks if the current page is at least page 4)
        case true:
          if (this.currentPage + halfPagination <= this.totalPages) { //check if the current page is below half the range of the pagination from the last page (i.e. if totalPages is 27 and numberOfPageButtons is 8, this checks if the current page is not above page 23)
            firstPageOnPagination = this.currentPage - halfPagination + 1
            lastPageOnPagination = this.currentPage + halfPagination - 1
          } else {
            firstPageOnPagination = this.totalPages - numberOfPageButtons + 1
            lastPageOnPagination = this.totalPages
          }
          break
        case false:
          firstPageOnPagination = 1
          lastPageOnPagination = this.totalPages < numberOfPageButtons ? this.totalPages : numberOfPageButtons
          break
      }

    return range(firstPageOnPagination, lastPageOnPagination + 1)
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
    color: #8c8e8f;
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
