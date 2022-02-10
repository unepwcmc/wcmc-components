<template>
  <div class="wrapper" 
    :style="cssVariables"
  >
    <button 
    :style="cssVariables"
      @click="resetChart"
      class="button"
    >
      {{ config.resetButton.text }}
    </button>

    <div 
      :id="id"
      class="chart__svg"  
    />
  </div>
</template>
<script>
import * as am5 from "@amcharts/amcharts5"
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"

import { merge } from 'lodash'

import { DEFAULT_OPTIONS, DUMMY_DATA } from './constants.js'

export default {
  name: 'ChartSunburst',

  props: {
    options: {
      type: Object
    },
    data: {
      type: Object
    }
  },

  data () {
    return {
      chartDataSeries: null,
      config: null,
      container: '',
      dummyData: DUMMY_DATA,
      id: '',
      root: null,
      series: null
    }
  },

  created () {
    this.importPropOptions()
    this.importData()

    //create id so multiple charts can be added to a page
    this.id = `chartdiv-${Math.random(100)*100}`
  },

  mounted () {
    this.chartInit()
  },

  computed: {
    cssVariables () {
      return {
        '--button-font-size': this.config.resetButton.fontSize
      }
    }
  },

  methods: {
    chartInit() {
      this.createChart()
      this.createSeries()
      this.setLabels()
      this.setSliceOptions()
      if(this.config.chart.hideRoot) { this.setRootSliceToHidden() }
      this.addEventHandlers()
      this.createSeries()
      this.resetChart()
    },
    addEventHandlers () {
      this.chart.nodes.template.events.on("click", event => {
        const selectedNodeId = event.target.uid,
          selectedDataContextId = event.target.dataItem.dataContext.id
        
        this.updateSelectedSlice(selectedDataContextId, selectedNodeId)
      })
    },
    createChart () {
      this.root = am5.Root.new(this.id)

      this.root.setThemes([
        am5themes_Animated.new(this.root)
      ])

      this.chart = this.root.container.children.push(
        am5hierarchy.Sunburst.new(this.root, {
          valueField: "value",
          categoryField: "name",
          childDataField: "children",
        })
      )
    },
    createSeries () {
      this.chart.data.setAll([this.chartDataSeries])    
    },
    importPropOptions () {
      this.config = typeof(this.options) == 'object' ? merge({}, DEFAULT_OPTIONS, this.options) : DEFAULT_OPTIONS
    },
    importData () {
      this.chartDataSeries = typeof(this.data) == 'object' ? this.data : DUMMY_DATA
    },
    resetChart () {
      this.updateSelectedSlice(this.data.id, 0)

      this.chart.setAll({
        initialDepth: 1,
        innerRadius: am5.percent(20),
        radius: am5.percent(98),
        selectedDataItem: this.chart.dataItems[0],
      })

      this.chart.nodes.values.forEach(node => {
        const depth = node.dataItem.get('depth')
        if(depth == 0) {
          node.setAll({
            downDepth: 0,
            initialDepth: 1,
            topDepth: 1
          })
        } else {
          node.setAll({
            downDepth: 1,
            initialDepth: 0,
            topDepth: 1
          })
        }
      })
    },
    setLabels () {
      this.chart.labels.template.setAll({
        textType: 'circular',
        oversizedBehavior: 'wrap',
        setStateOnChildren: 'true',
        textAlign: 'center',
        textBaseline: 'middle',
        x: 0,
        y: 0
      })
    },
    setRootSliceToHidden () {
      this.chart.nodes.template.adapters.add('forceHidden', (forceHidden, target) => {
        return target.dataItem.get("depth") == 0 ? true: false;
      })
    },
    setSliceOptions () {
      this.chart.slices.template.setAll({
        fillOpacity: 1
      })
    },
    updateSelectedSlice(id, selectedNodeId) {
      this.chart.nodes.each(node => {
        const isSelected = selectedNodeId == node.uid,
          slice = node.dataItem._settings.slice

        let settings
        
        if(isSelected){
          settings = {
            fill: am5.color(this.config.chart.selectedColor),
            fillOpacity: 1
          }
        } else {
          const dataContext = node.dataItem.dataContext

          if('color' in dataContext){
            settings = {
              fill: am5.color(dataContext.color)
            }
          } else {
            settings = {
              fill: am5.color(this.config.chart.defaultColor)
            }
          }
        }

        slice.setAll(settings)
      })
      
      this.$root.$emit('chart-sunburst:update:selected', id)
    }
  }
}
</script>
<style lang="scss" scoped>
.chart__svg {
  width: 100vw;
  height: 100vh;
}

.button {
  background: none;
  border: none;
  font-size: var(--button-font-size);
}
</style>