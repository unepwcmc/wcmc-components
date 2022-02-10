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
      
      // this.addEventHandlers()
    },
    // addEventHandlers () {
    //   this.chart.nodes.template.events.on("click", ev => {
    //     var data = ev.target.dataItem.dataContext;
    //     console.log("Clicked on a column", ev.target)
    //     console.log("Clicked on a column", data)

    //     this.container.children.push(am5.Label.new(this.root, {
    //       text: "YO",
    //       textAlign: "center",
    //       x: am5.p50,
    //       y: am5.p50,
    //       centerX: am5.p50,
    //       centerY: am5.p50,
    //       fontSize: 500,
    //       fontWeight: "500",
    //       fill: am5.color(0x385d63)
    //     }))
    //   })
    // },
    createChart () {
      this.root = am5.Root.new(this.id)
    },
    createSeries () {
      this.root.setThemes([
        am5themes_Animated.new(this.root)
      ]);

      this.container = this.root.container.children.push(
        am5.Container.new(this.root, {
          width: am5.percent(100),
          height: am5.percent(100),
          layout: this.root.verticalLayout
        })
      );

      this.chart = this.container.children.push(
        am5hierarchy.Sunburst.new(this.root, {
          downDepth: 1,
          initialDepth: 0,
          topDepth: 1,
          upDepth: 1,
          valueField: "value",
          categoryField: "name",
          childDataField: "children",
          // colorDataField: "color",
          innerRadius: am5.percent(30)
        })
      )

      const myTheme = am5.Theme.new(this.root);

      myTheme.rule("Label").setAll({
        fill: am5.color(0xFF0000),
        fontSize: "1.5em"
      })

      const data = DUMMY_DATA

      this.chart.labels.template.setAll({
        textType: 'circular',
        oversizedBehavior: 'wrap',
        setStateOnChildren: 'true',
        textAlign: 'center',
        textBaseline: 'middle',
        x: 0,
        y: 0
      })

      this.chart.slices.template.setAll({
        fillOpacity: 1,
        interactive: false
      })

      // this.chart.slices.template.adapters.add('fill', (fill, target) => {
      //   const isSelected = target.dataItem._settings.selected,
      //     dataContext = target.dataItem.dataContext
        
      //   if(isSelected) {
      //       return am5.color(this.config.chart.selectedColor)
      //   } else {
      //     if('color' in dataContext){
      //       return am5.color(dataContext.color)
      //     } else {
      //       return fill
      //     }
      //   }
      // })

      // this.chart.slices.template.states.create("active", {
      //   fill: am5.color(this.config.chart.selectedColor),
      //   stroke: am5.color(this.config.chart.selectedColor)
      // })
      
      if(this.config.chart.hideRoot === true) {
        this.setRootSliceToHidden()
      }

      this.chart.nodes.template.setAll({
        setStateOnChildren: true
      })
    
      this.chart.nodes.template.events.on("click", event => {
        const selectedNodeId = event.target.uid
        
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
              console.log(node)
              settings = {
                fill: am5.color(this.config.chart.defaultColor)
              }
            }
          }

          slice.setAll(settings)
        })
        
        const selectedContent = event.target.dataItem.dataContext.id
        this.$root.$emit('chart-sunburst:update:selected', selectedContent)
      })

      this.chart.data.setAll([data])    
    },
    importPropOptions () {
      this.config = typeof(this.options) == 'object' ? merge({}, DEFAULT_OPTIONS, this.options) : DEFAULT_OPTIONS
    },
    resetChart () {
      console.log('resetChart', this.chart.dataItems)
      
      this.chart.setAll({
        'selectedDataItem': this.chart.dataItems[0]
      })



// am5hierarchy.Sunburst.new(this.root, {
//   downDepth: 1,
//   initialDepth: 1,
//   topDepth: 1,
//   upDepth: 1,
//   valueField: "value",
//   categoryField: "name",
//   childDataField: "children",
//   innerRadius: am5.percent(30)
// })

    },
    setChartColors () {
      let colors = []
      
      this.config.chart.colors.forEach(color => {
        colors.push(am5.color(color))
      })

      this.chart.get("colors").set("colors", colors)
    },
    setRootSliceToHidden () {
      this.chart.nodes.template.adapters.add('forceHidden', (forceHidden, target) => {
        return target.dataItem.get("depth") == 0 ? true: false;
      })
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