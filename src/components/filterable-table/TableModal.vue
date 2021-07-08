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
            class=""
          >
            <span class="modal__item-name">{{ item.name }}:</span> 
            {{ item.value }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import SvgCross from './svgs/SvgCross.vue'

export default {
  name: 'TableModal',

  components: { SvgCross },

  props: {
    tableId: {
      required: true,
      type: Number,
    }
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

    // printMultiple (field) {
    //   // print out the array of values comma separated as a string
    //   let array = this.modalContent[field]

    //   if (array !== undefined) {
    //     return array.join(', ')
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
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

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }

  &__close {
    @include button-basic;
    background-color: var(--close-bg-color);
    border-radius: var(--close-border-radius);
    cursor: pointer;
    width: rem-calc(50); height: rem-calc(50);
    
    position: absolute;
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

  &__title { margin-top: 0; }
}

::v-deep .svg-cross {
  fill: var(--svg-cross-color);
}
</style>