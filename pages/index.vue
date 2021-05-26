<template>
  <div>
    <div class="prefectures-container">
      <p>都道府県</p>
      <PrefectureCheckbox
        v-for="prefecture in prefectures"
        :key="prefecture.prefCode"
        :prefecture="prefecture"
        @check="addPopulation($event)"
        @uncheck="deletePopulation($event)"
      />
    </div>
    <div class="small">
      <PopulationChart :checked-prefs="checkedPrefs" />
      <p>※{{ border }}以降は推定値</p>
    </div>
  </div>
</template>

<script>
import PrefectureCheckbox from '~/components/PrefectureCheckbox.vue'
import PopulationChart from '~/components/PopulationChart.vue'

export default {
  components: {
    PrefectureCheckbox,
    PopulationChart,
  },
  async asyncData(context) {
    const result = await context.$axios.get('api/v1/prefectures')
    return { prefectures: result.data.result }
  },
  data() {
    return {
      border: null,
      checkedPrefs: [],
    }
  },
  methods: {
    async addPopulation(prefecture) {
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
      // 実績値と推計値の区切り年をセット
      if (this.border === null) {
        this.border = result.data.result.boundaryYear
      }
      // checkedPrefsに県名と人口の情報を持ったオブジェクトを追加
      const prefPopulation = {
        prefName: prefecture.prefName,
        populationInfo: result.data.result,
      }
      this.checkedPrefs.push(prefPopulation)
    },
    deletePopulation(targetPref) {
      // checkedPrefsからチェックを外した県を削除
      this.checkedPrefs.forEach((checkedPref, index) => {
        if (checkedPref.prefName === targetPref.prefName) {
          this.checkedPrefs.splice(index, 1)
        }
      })
    },
  },
}
</script>

<style>
.prefectures-container {
  padding: 0 100px 0;
  margin-top: 10px;
  text-align: center;
}

.prefectures-container p {
  text-align: initial;
  font-size: 20px;
}

.small {
  max-width: 600px;
  margin: 150px auto;
}

@media screen and (max-width: 480px) {
  .prefectures-container {
    padding: 0 20px 0;
  }

  .prefectures-container p {
    font-size: 10px;
  }
}
</style>
