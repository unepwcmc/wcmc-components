<template>
  <div v-if="ready">
    <slot />
  </div>
</template>
<script>
/**
 * This component is meant to be used to hydrate your store
 * and within a Rails context, might be utilised in an ERB.
 * 
 * 
 * Here's an example:
 * 
 * <store-hydrater
 *  :data="[
 *    {
 *      type: 'commit',
 *      call: 'some/namespaced/mutation/name',
 *      data: { your: 'data' }      
 *    }
 *  ]">
 *  <div>This content loads after the hydration is complete</div>
 * </store-hydrater>
 * 
 */
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      queue: []
    }
  },

  created () {
    this.initialize()
  },

  computed: {
    /**
     * Has everything has been hydrated
     *
     * @return Boolean
     */
    ready () {
      return this.queue.length === 0
    }
  },

  methods: {
    /**
     * Initialise the component
     * 
     * @return void
     */
    initialize () {
      this.resetQueue()

      Array.prototype.forEach.call(this.data, this.useStore)
    },

    /**
     * This method will call a namespaced method on the store.
     * You should pass it an object in the following format:
     * 
     *    {
     *      type: 'commit',
     *      call: 'some/namespaced/mutation/name',
     *      data: { your: 'data' }      
     *    }
     * 
     * The type is optional, and defaults to 'commit', you can
     * also use 'dispatch'.
     * 
     * @param data
     * 
     * @return void
     */
    useStore ({ call, type, data }) {
      const promise = this.$store[type || 'commit'](call, data)

      if (promise) {
        promise.then(() => { this.advanceTheQueue() })
      } else {
        this.advanceTheQueue()
      }
    },

    /**
     * Set the queue to the number of items in the data array
     * 
     * @return void
     * 
     */
    resetQueue () {
      Array.prototype.forEach.call(this.data, (_, dataIndex) => {
        this.queue.push(dataIndex)
      })
    },

    /**
     * Decrement the queue
     * 
     * @return void
     */
    advanceTheQueue () {
      Array.prototype.pop.call(this.queue)
    }
  }
}
</script>