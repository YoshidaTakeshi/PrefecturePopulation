<template>
  <div>
    <PrefectureCheckbox
      v-for="prefecture in prefectures"
      :key="prefecture.prefCode"
      :prefecture="prefecture"
      @check="getPopulation($event)"
      @uncheck="deletePopulation($event)"
    />
    <div class="small">
      <PopulationChart :chart-data="datacollection" :options="options" />
    </div>
  </div>
</template>

<script>
import * as palette from 'google-palette'
import PrefectureCheckbox from '~/components/PrefectureCheckbox.vue'
import PopulationChart from '~/components/PopulationChart.vue'

export default {
  components: {
    PrefectureCheckbox,
    PopulationChart,
  },
  async asyncData(context) {
    const result = await context.$axios.get('api/v1/prefectures')
    console.log(result)
    return { prefectures: result.data.result }
  },
  data() {
    return {
      checkedPrefs: [],
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
  methods: {
    async getPopulation(prefecture) {
      // apiから人口の情報を取得
      const result = await this.$axios.get(
        'api/v1/population/composition/perYear',
        {
          params: {
            prefCode: prefecture.prefCode,
            cityCode: '-',
          },
        }
      )
      // checkedPrefsに県名と人口の情報を持ったオブジェクトを追加
      const prefPopulation = {
        prefName: prefecture.prefName,
        populationInfo: result.data.result,
      }
      this.checkedPrefs.push(prefPopulation)
      this.updateDatacollection(this.checkedPrefs)
    },
    deletePopulation(targetPref) {
      // checkedPrefsからチェックを外した県を削除
      this.checkedPrefs.forEach((checkedPref, index) => {
        if (checkedPref.prefName === targetPref.prefName) {
          this.checkedPrefs.splice(index, 1)
        }
      })
      this.updateDatacollection(this.checkedPrefs)
    },
    updateDatacollection(checkedPrefs) {
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

<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
