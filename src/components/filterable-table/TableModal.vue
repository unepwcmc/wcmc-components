<template>
  <div
    class="modal-wrapper"
    :class="{'active': isActive}"
    v-if="config"
    @click.stop.self="closeModal"
    :style="cssVariables"
  >
    <div class="modal">
      <div class="modal__content">
        <button
          class="modal__close"
          @click="closeModal"
        >
          <svg-cross class="modal__close-svg" />
        </button>

        <h2
          v-if="config.modal.title"
          class="modal__title"
          v-text="config.modal.title"
        />

        <template v-for="item, modalContentIndex in modalContent">
          <div
            v-if="item.showInModal"
            :key="modalContentIndex"
          >
            <span
              class="modal__item-name"
              v-text="item.title"
            />

            <div
              v-if="hasMultipleValues(item.value)"
              :key="modalContentIndex"
            >
              <ul
                v-if="item.legend_on"
                class="legend"
              >
                <li
                  v-for="string, valueIndex in item.value"
                  :key="Math.random() * valueIndex"
                  class="legend__li"
                >
                  <span
                    class="legend__icon"
                    :class="kebabCaseClassName(string)"
                  />

                  <p v-html="printValue(string)" />
                </li>
              </ul>

              <ul
                v-else
                class="modal__ul"
              >
                <li
                  v-for="string, valueIndex in item.value"
                  :key="Math.random() * valueIndex"
                  v-html="printValue(string)"
                />
              </ul>
            </div>

            <template v-else>
              <span
                v-if="item.legend_on"
                :key="modalContentIndex"
                class="legend__icon"
                :class="kebabCaseClassName(item.value)"
                v-text="item.value"
              />

              <span v-else v-text="item.value" />
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import SvgCross from './svgs/SvgCross.vue'
import { isALink } from '../../helpers/helpers-url.js'

export default {
  name: 'TableModal',

  components: { SvgCross },

  props: {
    tableId: {
      required: true,
      type: Number,
    },

    legends: {
      type: Array,
    },
  },

  data () {
    return {
      isActive: false,
      config: undefined,
      modalContent: {},
      modalOffset: 0,
      styleObject: {
        top: 0
      },
    }
  },

  computed: {
    cssVariables () {
      return {
        '--svg-cross-color': this.config.modal.crossFill,
        '--close-bg-color': this.config.modal.closeBgColor,
        '--close-border-radius': this.config.modal.closeBorderRadius,
        '--wrapper-color': this.config.modal.wrapperColor,
        '--font-family': this.config.fontFamily
      }
    },
  },

  mounted () {
    this.$root.$on('openModal', this.openModal)
  },

  methods: {
    openModal ({ tableId }) {
      if (this.tableId !== tableId) { return false }

      this.config = this.$store.getters['filterableTable/options'](this.tableId)

      this.modalContent = this.$store.getters['filterableTable/modalContent'](this.tableId)

      this.isActive = true
    },

    closeModal () {
      this.isActive = false
    },

    hasMultipleValues (value) {
      return Array.isArray(value)
    },

    printValue (string) {
      return isALink(string)
    },

    kebabCaseClassName (title) {
      return title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
    }
  },

  beforeDestroy () {
    this.$root.$off('openModal', this.openModal)
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
  font-family: Arial, sans-serif; // IE11
  font-family: var(--font-family);
  overflow-y: scroll;
  padding: rem-calc(34 32);
  width: 100%; height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;

  @include breakpoint($small) {
    border-radius: 0;
    padding: rem-calc(34 32);
    width: 60%; height: auto;
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
    width: rem-calc(50); height: rem-calc(50);

    position: sticky;
    float: right;
    top: rem-calc(-18);
    right: rem-calc(-16);

    &-svg {
      width: rem-calc(20); height: rem-calc(20);
    }
  }

  &__content {
    position: relative;
  }

  &__item-name {
    font-weight: bold;
    margin-right: rem-calc(4);
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
  display: flex;
  flex-wrap: wrap;

  &__li {
    padding: rem-calc(12);

    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__icon {
    margin: rem-calc(4);
    height: rem-calc(38);
    width: rem-calc(38);
    background-size: cover;

    display: inline-block;
  }
}

::v-deep .svg-cross {
  fill: #000; // IE11
  fill: var(--svg-cross-color);
}
</style>