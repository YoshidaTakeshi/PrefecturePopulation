export default function ({ $axios }) {
  $axios.onRequest((config) => {
    config.headers['X-API-KEY'] = process.env.RESAS_API_KEY
  })
}
