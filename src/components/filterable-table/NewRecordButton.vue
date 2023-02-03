<template>
   <a 
      :style="cssVariables"
      :href="buttonURL"
      class="button new-record-button"
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
    ...mapGetters([
      'options'
    ]),

    buttonText () {
      return this.config.newRecordLink.text
    },
    
    buttonURL () {
      return this.config.newRecordLink.url
    },

    config () {
      return this.options(this.tableId)
    },

    cssVariables () {
      return {
        '--bg-color'          : this.config.download.bgColor,
        '--bg-color-hover'    : this.config.download.bgColorHover,
        '--border-color'      : this.config.download.borderColor,
        '--border-color-hover': this.config.download.borderColorHover,
        '--color'             : this.config.download.color,
        '--font-size'         : this.config.download.fontSize,
        '--font-weight'       : this.config.download.fontWeight,
        '--height'            : this.config.download.height,
        '--icon-fill'         : this.config.download.iconFill,
        '--padding-left'      : this.config.download.paddingLeft,
        '--padding-right'     : this.config.download.paddingRight
      }
    },
  },
}

</script>

<style lang="scss" scoped>
.new-record-button {
  @include button-basic;
  background-color: #aaa; // IE11
  background-color: var(--bg-color);
  border-color: #009FE3; // IE11
  border-color: var(--border-color);
  color: #fff; // IE11
  color: var(--color);
  font-size: 18px;
  font-size: var(--font-size);
  font-weight: 500;
  font-weight: var(--font-weight);
  height: 50px; // IE11
  height: var(--height);
  margin-bottom: rem-calc(10); //to sit inline with filters on mobile
  margin-left: auto;
  padding-left: 24px; // IE11
  padding-left: var(--padding-left);
  padding-right: 24px; // IE11
  padding-right: var(--padding-right);

  @include breakpoint($medium) { margin-bottom: 0; }

  &:hover {
    background-color: #009FE3; // IE11
    background-color: var(--bg-color-hover);
    border-color: #009FE3; // IE11
    border-color: var(--border-color-hover);
  }
}

::v-deep .svg--download {
  fill: '#fff'; // IE11
  fill: var(--icon-fill);
}
</style>