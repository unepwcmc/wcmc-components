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
        :style="`grid-column: ${columnsCount}`"
      />
    </div>
  </div>
</template>

<script>
import TableHeading from './TableHeading.vue'

export default {
  name: 'TableHead',

  components: { TableHeading },

  props: {
    headings: {
      required: true,
      type: Array
    },
    tableId: {
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
        'grid-template-columns': `repeat(${this.columnsCount}, 1fr)`,
        'grid-columns': this.gridColumnsCss, // IE11
      }
    },
    gridColumnsCss () {
      const cols = []

      for (let i=0; i < this.columnsCount; i++) {
        cols.push('1fr')
      }

      return cols.join(' ')
    },
    columnsCount () {
      return Object.keys(this.headings).length + 1
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