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
    //   this.series.nodes.template.events.on("click", ev => {
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

      this.series = this.container.children.push(
        am5hierarchy.Sunburst.new(this.root, {
          downDepth: 1,
          initialDepth: 1,
          topDepth: 1,
          upDepth: 1,
          valueField: "value",
          categoryField: "name",
          childDataField: "children",
          innerRadius: am5.percent(30)
        })
      );

const myTheme = am5.Theme.new(this.root);

myTheme.rule("Label").setAll({
  fill: am5.color(0xFF0000),
  fontSize: "1.5em"
})

// myTheme.rule("Slice").setAll({
//   fill: am5.color(0x11C583),
//   colors: [  am5.color(0x11C583),
//   am5.color(0xbb9f06)],
//   fontSize: "1.5em"
// })



// this.root.am5themes_Animated.rule("ColorSet").set("colors",  [
//   am5.color(0x11C583),
//   am5.color(0xbb9f06)
// ])

// ])



// this.root.setThemes([
//   am5themes_Animated.new(this.root),
//   myTheme
// ])

      const data = DUMMY_DATA

      this.resetChart()
      this.setChartColours()

      this.series.labels.template.setAll({
        textType: 'circular',
        oversizedBehavior: 'wrap',
        setStateOnChildren: 'true',
        textAlign: 'center',
        textBaseline: 'middle',
        x: 0,
        y: 0
      })


      this.series.slices.template.setAll({
        interactive: false
      })

      this.series.slices.template.states.create("active", {
        fill: am5.color(0x000000),
        stroke: am5.color(0x297373)
      })

      this.series.nodes.template.setAll({
        setStateOnChildren: true
      })
    
      this.series.nodes.template.events.on("click", event => {
        const selectedNode = event.target

        this.series.nodes.each(node => {
          const isSelected = selectedNode.uid == node.uid
          
          node.set('active', isSelected)

          console.log('state', node.get('active'))
        })
        
        const selectedContent = event.target.dataItem.dataContext.id
        this.$root.$emit('chart-sunburst:update:selected', selectedContent)
      })
      
      this.series.data.setAll([data])
    },
    importPropOptions () {
      this.config = typeof(this.options) == 'object' ? merge({}, DEFAULT_OPTIONS, this.options) : DEFAULT_OPTIONS
    },
    resetChart () {
      this.series.set('selectedDataItem', this.series.dataItems[0])
    },
    setChartColours () {
      let colours = []
      
      this.config.chart.colours.forEach(colour => {
        colours.push(am5.color(colour))
      })

      this.series.get("colors").set("colors", colours)
    },
    getSeries() {
      // console.log('node', this.series)
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