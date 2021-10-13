<template>
  <div 
    :class="['modal-wrapper', { 'active' : isActive }]"
    @click.stop.self="closeModal()"
    :style="cssVariables"
  >
    <div class="modal">
      <div class="modal__content">
        <button 
          class="modal__close"
          @click="closeModal()"
        >
          <svg-cross class="modal__close-svg" />
        </button>

        <h2 
          v-if="config.modal.title"
          class="modal__title"
        >
          {{ config.modal.title }}
        </h2>

        <template v-for="(item, index) in modalContent">
          <p 
            v-if="item.showInModal"
            :key="index"
          >
            <span class="modal__item-name">{{ item.title }}:</span> 
            <ul 
              v-if="hasMultipleValues(item.value)"
              class="modal__ul"
            >
              <span 
                v-if="item.legend_on"
                class="legend"
              >
                <li v-for="string, index in item.value"
                  :key="Math.random() * index"
                  class="legend__li"
                >
                  <span 
                  :class="`legend__icon ${kebabCaseClassName(string)}`"
                  ></span>
                  <p v-html="printValue(string)"></p>
                </li>
              </span>
              <span v-else>
                <li v-for="string, index in item.value"
                  :key="Math.random() * index"
                  v-html="printValue(string)"
                ></li>
              </span>
            </ul>
            <template v-else>
              <span 
                v-if="item.legend_on"
                :class="`legend__icon ${kebabCaseClassName(item.value)}`"
              ></span>             
              {{ item.value }}
            </template>
          </p>
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
      modalOffset: 0,
      styleObject: {
        top: 0
      },
      modalContent: {}
    }
  },

  computed: {
    cssVariables () {
      return {
        '--svg-cross-color': this.config.modal.crossFill,
        '--close-bg-color': this.config.modal.closeBgColor,
        '--close-border-radius': this.config.modal.closeBorderRadius,
        '--wrapper-color': this.config.modal.wrapperColor
      }
    },
    config () {
      return this.$store.getters['filterableTable/options'](this.tableId)
    }
  },

  mounted () {
    this.$root.$on('openModal', this.openModal)
  },

  methods: {
    openModal (tableId) {
      if(this.tableId !== tableId) { return false }

      this.modalContent = this.$store.getters['filterableTable/modalContent'](this.tableId)

      this.isActive = true
    },

    closeModal () {
      this.isActive = false
    },

    hasMultipleValues (value) {
      return Array.isArray(value)
    },

    printValue(string) {
      return isALink(string) 
    },
    
    kebabCaseClassName (title) {
      return title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  background-color: rgba(0,0,0,.2); // IE11
  background-color: var(--wrapper-color);

  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;

  &.active { display: block; }
}

.modal {
  background-color: white;
  box-shadow: #ababab 2px 2px 2px;
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