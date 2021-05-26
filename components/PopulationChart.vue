<template>
  <LineChart :chart-data="datacollection" :options="options" />
</template>

<script>
import * as palette from 'google-palette'
import LineChart from '~/components/LineChart.vue'

export default {
  components: {
    LineChart,
  },
  props: {
    checkedPrefs: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      datacollection: {
        labels: [],
        datasets: [],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: '年度',
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: '人口数',
              },
            },
          ],
        },
      },
    }
  },
  watch: {
    // 選択した県が更新された時datacollectionを更新
    checkedPrefs(checkedPrefs) {
      const newDatacollection = {}
      newDatacollection.datasets = []
      // グラフに割り当てる色を自動生成
      const borderColors = palette('mpn65', this.checkedPrefs.length).map(
        (hex) => {
          return '#' + hex
        }
      )
      checkedPrefs.forEach((checkedPref, index) => {
        if (index === 0) {
          newDatacollection.labels =
            checkedPref.populationInfo.data[0].data.map((d) => d.year)
        }
        const chartData = {
          label: checkedPref.prefName,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: borderColors[index],
          data: checkedPref.populationInfo.data[0].data.map((d) => d.value),
        }
        newDatacollection.datasets.push(chartData)
      })
      this.datacollection = newDatacollection
    },
  },
}
</script>
