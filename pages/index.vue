<template>
  <div>
    <PrefectureCheckbox
      v-for="prefecture in prefectures"
      :key="prefecture.prefCode"
      :prefecture="prefecture"
      @check="getPopulation($event)"
      @uncheck="deletePopulation($event)"
    />
  </div>
</template>

<script>
import PrefectureCheckbox from '~/components/PrefectureCheckbox.vue'
export default {
  components: {
    PrefectureCheckbox,
  },
  async asyncData(context) {
    const result = await context.$axios.get('api/v1/prefectures')
    console.log(result)
    return { prefectures: result.data.result }
  },
  data() {
    return {
      checkedPrefs: [],
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
      console.log(this.checkedPrefs)
    },
    deletePopulation(targetPref) {
      // checkedPrefsからチェックを外した県を削除
      this.checkedPrefs.forEach((checkedPref, index) => {
        if (checkedPref.prefName === targetPref.prefName) {
          this.checkedPrefs.splice(index, 1)
        }
      })
      console.log(this.checkedPrefs)
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
</style>
