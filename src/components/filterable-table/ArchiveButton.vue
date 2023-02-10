<template>
  <div @click="archive" :class="`button button__svg-wrapper button--${archiveClass}`" >
    <component
      :is="`svg-${archiveClass}`"
      class="button__svg"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { setAxiosHeaders } from '../../helpers/helpers-axios.js'
import SvgArchive from './svgs/SvgArchive.vue'
import SvgRestore from './svgs/SvgRestore.vue'

export default {
  name: 'ArchiveButton',

  components: {
    SvgArchive,
    SvgRestore
  },

  props: {
    archiveUrl: {
      type: String,
      required: true
    },

    archived: {
      type: Boolean,
      required: true
    },

    recordId: {
      type: Number,
      required: true
    },
  },

  computed: {
    archiveClass () {
      return this.archived ? 'restore' : 'archive'
    }
  },

  methods:{
    archive () {
      const data = {
        id: this.recordId,
        archived: this.archived ? 0 : 1
      }

      setAxiosHeaders(axios)

      axios.post(this.archiveUrl, data)
        .then(response => {
          this.$emit('clicked', response.data.archived)
        })
        .catch(function (error) {
            console.log(error)
        })
    }
  }
}

</script>

<style lang="scss" scoped>
.button.button--archive {
  background: transparent;
  border: none;
  padding: 0;
  width: 100%; height: 100%;
  max-width: 80px; max-height: 80px;

  &:hover {
    cursor: pointer;

    ::v-deep .svg-arrow .svg__circle {
      fill: #009fe3; // IE11
      fill: var(--button-hover-color);
    }

    ::v-deep .svg-arrow .svg__arrow {
      fill: #fff; // IE11
      fill: var(--button-hover-color-arrow);
    }
  }

  &--restore {
    position: relative;
    z-index: 1;

    &::before {
      background-color: #fff;
      border-radius: 100%;
      content: '';
      width: 100%; padding-top: 100%;

      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: -1;

      transform: translate(-50%, -50%);
    }
  }

  &__svg-wrapper {
    width: 100%;
  }

  &__svg {
    width: 56%; height: 56%;
  }
}
</style>