<script>
import { Line, mixins } from 'vue-chartjs'
export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  watch: {
    // chartDataが更新された時チャートを描き直す
    chartData() {
      this.renderChart(this.chartData, this.options)
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
}
</script>
