<template>
  <div class="wrapper">
    <div class="chart__svg" id="chartdiv" />
    <button 
      @click="resetChart"
    >Reset</button>
    <div class="panel">
      [
      {{ selectedContent }}
      ]
    </div>
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
    }
  },
  data () {
    return {
      config: '',
      selectedContent: '',
      container: '',
      root: null,
      series: null
    }
  },
  mounted () {
    this.chartInit()
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
      this.root = am5.Root.new("chartdiv")
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
          initialDepth: 0,
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

this.series.get("colors").set("colors", [
  am5.color(0x11C583),
  am5.color(0x159BFA),
  am5.color(0xA83CF5)
])

// this.root.setThemes([
//   am5themes_Animated.new(this.root),
//   myTheme
// ])

      const data = DUMMY_DATA

      this.resetChart()

      

      // let selectedSlice;

      // this.series.slices.template.states.create("highlight", {
      //   fill: am5.color(0x000000),
      //   stroke: am5.color(0x297373)
      // })

      

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
        console.log('selectedContent', event.target.dataItem.dataContext.name)
        // this.selectedContent = event.target
      })
      
      this.series.data.setAll([data])
    },
    importPropOptions () {
      // const obj = {
      //   options: typeof(this.options) == 'object' ? merge({}, DEFAULT_OPTIONS, this.options) : DEFAULT_OPTIONS
      // }

      this.config = typeof(this.options) == 'object' ? merge({}, DEFAULT_OPTIONS, this.options) : DEFAULT_OPTIONS

      // this.$store.dispatch('filterableTable/updateOptions', obj)
    },
    resetChart () {
      this.series.set("selectedDataItem", this.series.dataItems[0])
    },
    getSeries() {
      // console.log('node', this.series)
      
    }
  }
}
</script>
<style lang="scss" scoped>
.chart__svg {
  font-family: 'icomoon';
  width: 50vw;
  height: 50vh;
}

.icomoon {
  font-family: 'icomoon';
}

.panel {
  width: 20%;
}
</style>