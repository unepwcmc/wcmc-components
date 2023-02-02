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

// Styles here are only for IE11 
.new-record-button {
  background-color: #aaa;
  border-color: #009FE3;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  font-weight: 500;
  padding-left: 24px;
  padding-right: 24px; 
  height: 50px;

  &:hover {
    background-color: #009FE3;
    border-color: #009FE3; 
  }
}

::v-deep .svg--download {
  fill: '#fff';
}

// ------------------------------

// Styles here either overwrite IE11 styles for other browsers, apply to all browsers
.new-record-button {
  @include button-basic;
  background-color: var(--bg-color);
  border-color: var(--border-color);
  color: var(--color);
  font-family: var(--font-family);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  margin-bottom: rem-calc(10); // to sit inline with filters on mobile
  margin-left: auto;
  padding-left: var(--padding-left);
  padding-right: var(--padding-right);
  height: var(--height);

  display: flex;
  align-items: center;

  @include breakpoint($medium) { margin-bottom: 0; }

  &:hover {
    background-color: var(--bg-color-hover);
    border-color: var(--border-color-hover);
  }
}

::v-deep .svg--download {
  fill: var(--icon-fill);
}
</style>