<template>
  <div 
    id="sticky" 
    :class="{ 'stuck' : isSticky }"
    :style="cssVariables"
  >
    <div class="table-head">
      <table-heading 
        v-for="heading in headings" 
        :key="heading._uid"
        :heading="heading"
        :tableId="tableId"
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
        '--columns': Object.keys(this.headings).length
      }
    }
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
      display: grid;
      grid-template-columns: repeat(var(--columns), 1fr);
    }
  }
</style>