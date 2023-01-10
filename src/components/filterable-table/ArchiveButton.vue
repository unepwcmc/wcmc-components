<template>
  <div @click="archive" class="button archive-button button__svg-wrapper">
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

  created () {
    this.isArchived = this.archived
  },

  data () {
    return {
      isArchived: false
    }
  },

  computed: {
    archiveClass () {
      return this.isArchived ? 'restore' : 'archive' 
    }
  },

  methods:{
    archive () {
      console.log('archived', this.isArchived)
      const data = {
        id: this.recordId,
        archived: this.isArchived ? 0 : 1
      }

      setAxiosHeaders(axios)

      axios.post(this.archiveUrl, data)
        .then(response => {
          console.log(response)
          this.isArchived = response.data.archived
        })
        .catch(function (error) {
            console.log(error)
        })
    }
  }
}

</script>

<style lang="scss" scoped>
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  @include flex-center;

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
    @include flex-center;
    width: 100%;
  }

  &__svg {
    width: 56%; height: 56%;
  }
}
</style>