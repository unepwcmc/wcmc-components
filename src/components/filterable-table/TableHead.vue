<template>
  <div 
    id="sticky" 
    :class="{ 'stuck' : isSticky }"
  >
    <div
      class="table-head"
      :style="cssVariables"
    >
      <table-heading 
        v-for="(heading, n) in headings" 
        :key="heading._uid"
        :heading="heading"
        :tableId="tableId"
        :style="`grid-column: ${n+1}`"
      />
      
      <!-- empty heading for 'more content' button -->
      <table-heading
        :tableId="tableId"
        :style="`grid-column: ${totalColumns}`"
      />
    </div>
  </div>
</template>

<script>
import TableHeading from './TableHeading.vue'

import mixinColumns from './mixins/mixin-columns'

export default {
  name: 'TableHead',

  components: { TableHeading },

  mixins: [mixinColumns],

  props: {
    headings: {
      required: true,
      type: Array
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

  data() {
    return {
      stickyTrigger: 0,
      isSticky: false
    }
  },

  computed: {
    cssVariables () {
      return {
        'grid-template-columns': this.gridColumnsCss,
        'grid-columns': this.gridColumnsCss, // IE11
      }
    },
  },

  mounted () {
    this.setStickyTrigger()
    this.scrollHandler()
  },

  methods: {
    setStickyTrigger () {
      const stickyElement = document.getElementById('sticky')
      const stickyElementHeight = stickyElement.clientHeight
      const stickyYOffset = stickyElement.getBoundingClientRect().top + window.pageYOffset

      this.stickyTrigger = stickyElementHeight + stickyYOffset
    },

    scrollHandler () {
      setInterval( () => {
        let scrollY = window.pageYOffset

        this.isSticky = scrollY > this.stickyTrigger ? true : false
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
  $table-head-bg-color: #333 !default;
  $table-head-color: #fff !default;

  .table-head {
    background-color: $table-head-bg-color;
    color: $table-head-color;
    margin-top: rem-calc(30);
    // height: rem-calc(56);

    display: none;

    @include breakpoint($medium) { 
      display: -ms-grid; // IE11
      display: grid;
    }
  }
</style>