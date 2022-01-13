<template>
  <div class="wrapper">
    <!-- <span class="icomoon">&#xe995;</span> -->
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

export default {
  name: 'ChartSunburst',
  data () {
    return {
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
      this.addEventHandlers()
    },
    addEventHandlers () {
      this.series.nodes.template.events.on("click", ev => {
        var data = ev.target.dataItem.dataContext;
        console.log("Clicked on a column", ev.target)
        console.log("Clicked on a column", data)

        this.container.children.push(am5.Label.new(this.root, {
          text: "YO",
          textAlign: "center",
          x: am5.p50,
          y: am5.p50,
          centerX: am5.p50,
          centerY: am5.p50,
          fontSize: 500,
          fontWeight: "500",
          fill: am5.color(0x385d63)
        }))
      })
    },
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

      this.container.children.push(am5.Label.new(this.root, {
          text: "Impact areas",
          textAlign: "center",
          x: am5.p50,
          y: am5.p50,
          centerX: am5.p50,
          centerY: am5.p50,
          fontSize: 20,
          fontWeight: "500",
          fill: am5.color(0x385d63)
        }))

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

      const data = {
        name: "Impact areas",
        children: 
        [
          {
            name: "Impact area 1",
            children: [
            {
              name: "Objective 1",
              value: 1
            },
            {
              name: "Objective 2",
              value: 1
            },
            {
              name: "Objective 3",
              value: 1
            },
            ]
          },
          {
            name: "Impact area 2 ",
            children: [
              {
                name: "Objective 1",
                value: 1
              },
              {
                name: "Objective 2",
                value: 1
              },
              {
                name: "Objective 3",
                value: 1
              },
            ]
          },
          {
            name: "Impact area 3",
            children: [
              {
                name: "Objective 1",
                value: 1
              },
              {
                name: "Objective 2",
                value: 1
              },
              {
                name: "Objective 3",
                value: 1
              },
            ]
          }
        ]
      }
      
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

@font-face {
  font-family: 'icomoon';
  src:  url('fonts/icomoon.eot?cxhvvh');
  src:  url('fonts/icomoon.eot?cxhvvh#iefix') format('embedded-opentype'),
    url('fonts/icomoon.ttf?cxhvvh') format('truetype'),
    url('fonts/icomoon.woff?cxhvvh') format('woff'),
    url('fonts/icomoon.svg?cxhvvh#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

.icomoon {
  font-family: 'icomoon';
}

.panel {
  width: 20%;
}
</style>