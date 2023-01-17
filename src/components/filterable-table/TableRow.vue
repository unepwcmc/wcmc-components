<template>
  <div
    class="row"
    :class="{ 'row--archived': archived }"
    :style="cssVariablesAndStyles"
  >
    <table-cell
      v-for="cell, cellIndex in columns"
      :key="Math.random() * cellIndex"
      :style="`grid-column: ${cellIndex + 1}`"
      :cell="cell"
      :disabled="archived"
    />

    <table-cell 
      v-if="config.showArchived"
      :style="`grid-column: ${getAdminButtonColumn('archive')}`">
      <archive-button
        v-if="item"
        @clicked="updateArchiveStatus"
        :archive-url="item.archiveUrl"
        :archived="archived"
        :record-id="item.id"
      />
    </table-cell>

    <table-cell
      v-if="config.showEdit"
      :style="`grid-column: ${getAdminButtonColumn('edit')}`"
      :disabled="archived"
    >
      <a
        :class="getButtonClasses('edit')" 
        :href="`${item.editUrl}?fallback_url=${window.location.pathname}`"
      >
        <portal-target 
          class="button__svg-wrapper"
          name="row-edit-icon"
        >
          <svg-edit class="button__svg" />
        </portal-target>
      </a>
    </table-cell>

    <table-cell
      v-if="this.isMoreContentColumnDisplayed(this.tableId)" 
      :style="`grid-column: ${totalColumns}`"
      :disabled="archived"
    >
      <a
        v-if="item.pageUrl"
        :class="getButtonClasses('more-content')"
        :href="item.pageUrl"
      >
        <portal-target
          name="row-link-icon"
          class="button__svg-wrapper"
        >
          <svg-arrow class="button__svg" />
        </portal-target>
      </a>

      <button
        v-else
        :class="getButtonClasses('more-content')"
        @click="openModal"
      >
        <portal-target
          name="row-link-icon"
          class="button__svg-wrapper"
        >
          <svg-arrow class="button__svg" />
        </portal-target>
      </button>
    </table-cell>
  </div>
</template>

<script>
import ArchiveButton from './ArchiveButton.vue'
import SvgArrow from './svgs/SvgArrow.vue'
import SvgEdit from './svgs/SvgEdit.vue'
import TableCell from './TableCell.vue'
import mixinColumns from './mixins/mixin-columns'
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('filterableTable')

export default {
  name: "row",

  components: {
    TableCell,
    ArchiveButton,
    SvgArrow,
    SvgEdit
  },

  mixins: [mixinColumns],

  props: {
    item: {
      required: true,
      type: Object,
    },

    itemIndex: {
      required: true,
      type: Number,
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

  created() {
    this.archived = this.item.archived
  },

  data() {
    return {
      archived: null
    }
  },

  computed: {
    ...mapGetters([
      'options',
      'isMoreContentColumnDisplayed'
    ]),

    adminButtonsCount () {
      return [this.config.showArchived, this.config.showEdit]
        .filter(Boolean).length
    },

    cssVariablesAndStyles () {
      return {
        'grid-template-columns': this.gridColumnsCss,
        'grid-columns': this.gridColumnsCss, // IE11
        '--bg-color-1': this.config.rows.bgColor1,
        '--bg-color-2': this.config.rows.bgColor2,
        '--bg-color-archived': this.config.rows.bgColorArchived,
        '--bg-color-mobile': this.config.rows.bgColorMobile,
        '--border-color': this.config.rows.borderColor,
        '--border-style': this.config.rows.borderStyle,
        '--border-width': this.config.rows.borderWidth,
        '--button-hover-color': this.config.rows.buttonHoverColor,
        '--button-hover-color-arrow': this.config.rows.buttonHoverColorArrow
      }
    },

    projectTitle () {
      return this.trim(this.item.title)
    },

    config () {
      return this.options(this.tableId)
    },

    columns () {
      return this.item.cells.filter(cell => cell.showInTable === true)
    }
  },

  methods: {
    assessmentUrl (url) {
      const linkMarkdown = `<a href="${url}" title="View assessment" target="_blank">Link</a>`

      return url.includes('http') ? linkMarkdown : url
    },

    getAdminButtonColumn (type) {
      let columnIndex = this.totalColumns

      if (this.isMoreContentColumnDisplayed(this.tableId)) {
        columnIndex -= 1
      }

      if (this.adminButtonsCount === 2) {
        columnIndex -= (type === 'archive' ? 1 : 0)
      }

      return columnIndex
    },

    getButtonClasses (type) {
      return [
        'button',
        `button--${type}`
      ]
    },

    openModal () {
      const obj = {
        tableId: this.tableId,
        content: this.item.cells
      }

      this.$store.dispatch('filterableTable/updateModal', obj)

      const payload = {
        row: this.item,
        rowIndex: this.itemIndex,
        tableId: this.tableId,
        totalColumns: this.totalColumns
      }
      console.log(payload)
      this.$root.$emit('openModal', {})
    },

    trim (phrase) {
      const length = phrase.length
      let output

      if (length <= 30) {
        output = phrase
      } else {
        output = phrase.substring(0, 27) + '...'
      }

      return output
    },

    updateArchiveStatus () {
      this.archived = !this.archived
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

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

  &.row--archived {
    background-color: #bbb;
    background-color: var(--bg-color-archived);

    @include breakpoint($medium) {
      background-color: #bbb;
      background-color: var(--bg-color-archived);
    }
  }

  &__button-form {
    width: 100%;
  }
}

.button {
  @include flex-center;

  background: transparent;
  border: none;
  padding: 0;
  width: 100%; height: 100%;
  max-width: 80px; max-height: 80px;

  &:hover {
    cursor: pointer;

    ::v-deep .svg-arrow .svg__circle {
      fill: #009fe3; // IE11
      fill: var(--button-hover-color);
    }

    ::v-deep .svg-arrow .svg__arrow {
      fill: #fff; // IE11
      fill: var(--button-hover-color-arrow);
    }
  }

  &--restore {
    position: relative;
    z-index: 1;

    &::before {
      background-color: #fff;
      border-radius: 100%;
      content: '';
      width: 100%; padding-top: 100%;

      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: -1;

      transform: translate(-50%, -50%);
    }
  }

  &__svg-wrapper {
    @include flex-center;
    width: 100%;
  }

  &__svg {
    width: 56%; height: 56%;
  }
}
</style>