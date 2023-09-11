<template>
  <div v-if="config.legend && legends">
    <button class="legend__button" @click="openLegend(tableId)">
      <span class="legend__icon" :class="config.legend.buttonClass" />

      <span class="legend__item" v-text="config.legend.buttonTitle.toUpperCase()" />
    </button>

    <div
      class="modal-wrapper"
      :class="{ active: isActive }"
      :style="cssVariables"
      @click.stop.self="closeModal"
    >
      <div class="modal">
        <div class="modal__content">
          <button class="modal__close" @click="closeModal">
            <svg-cross class="modal__close-svg" />
          </button>

          <div v-for="legend in legends" :key="legend.title">
            <h2 class="modal__title">
              <strong v-text="config.legend.title" />
            </h2>

            <h3 class="modal__item-name" v-text="legend.title" />

            <div class="legend__options">
              <div v-for="(item, index) in legend.options" :key="index" class="legend__row">
                <span class="legend__icon" :class="kebabCaseClassName(item)" />

                <p class="legend__item" v-text="item" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgCross from './svgs/SvgCross.vue'

export default {
  name: 'TableLegend',

  components: { SvgCross },

  props: {
    tableId: {
      required: true,
      type: Number
    },

    legends: {
      type: Array
    }
  },

  data() {
    return {
      isActive: false,
      modalOffset: 0,
      styleObject: {
        top: 0
      }
    }
  },

  computed: {
    cssVariables() {
      return {
        '--svg-cross-color': this.config.legend.crossFill,
        '--close-bg-color': this.config.legend.closeBgColor,
        '--close-border-radius': this.config.legend.closeBorderRadius,
        '--wrapper-color': this.config.legend.wrapperColor
      }
    },

    config() {
      return this.$store.getters['filterableTable/options'](this.tableId)
    }
  },

  mounted() {
    // this.$root.$on("openLegend", this.openLegend);
  },

  methods: {
    openLegend(tableId) {
      if (this.tableId !== tableId) {
        return false
      }

      this.isActive = true
    },

    closeModal() {
      this.isActive = false
    },

    kebabCaseClassName(title) {
      return title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  background-color: rgba(0, 0, 0, 0.2); // IE11
  background-color: var(--wrapper-color);

  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;

  &.active {
    display: block;
  }
}

.modal {
  background-color: white;
  box-shadow: #ababab 2px 2px 2px;
  overflow-y: scroll;
  padding: rem-calc(34 38);
  width: 100%;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;

  @include breakpoint($small) {
    border-radius: 0;
    width: 60%;
    height: auto;
    max-height: 80vh;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }

  &__close {
    @include button-basic;
    background-color: #fff; // IE11
    background-color: var(--close-bg-color);
    border-radius: 0; // IE11
    border-radius: var(--close-border-radius);
    cursor: pointer;
    width: rem-calc(50);
    height: rem-calc(50);

    position: sticky;
    float: right;
    top: rem-calc(-18);
    right: rem-calc(-16);

    &-svg {
      width: rem-calc(20);
      height: rem-calc(20);
    }
  }

  &__content {
    position: relative;
  }

  &__item-name {
    font-weight: bold;
    margin: rem-calc(0 4 12 0);
  }

  &__title {
    margin-bottom: rem-calc(32);
  }

  &__ul {
    margin-top: rem-calc(6);
    padding-left: rem-calc(24);
  }
}

.legend {
  &__button {
    border: 1px solid #000;
    display: flex;
    padding: rem-calc(1 12);
    align-items: center;
    font-weight: 600;
    margin-right: rem-calc(10);
    margin-bottom: rem-calc(10);
    @include breakpoint($medium) {
      margin-bottom: 0;
    }
  }

  &__options {
    display: grid;
    @include breakpoint($medium) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__icon {
    width: rem-calc(38);
    height: rem-calc(38);
    display: inline-block;
    margin: rem-calc(4);
    background-size: cover;
  }

  &__item {
    padding: rem-calc(0 12);
  }

  &__row {
    display: flex;
    align-items: center;
  }
}

::v-deep .svg-cross {
  fill: #000; // IE11
  fill: var(--svg-cross-color);
}
</style>
