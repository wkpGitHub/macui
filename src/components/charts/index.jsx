import { onMounted, onBeforeMount, ref, watch } from 'vue'
import * as echarts from 'echarts'

export default ({
  name: 'Charts',
  props: {
    option: {
      type: Object,
      default: () => {}
    },
    height: {
      type: String,
      default: '100%'
    },
    isListeningClick: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup (props, { emit }) {
    let chart = null
    const chartRef = ref()

    const init = () => {
      chart = echarts.init(chartRef.value)
      window.addEventListener('resize', function () {
        resize()
      })
      chart.setOption(props.option)
      setTimeout(() => {
        resize()
      })
      // 监听点击事件
      if (props.isListeningClick) {
        chart.on('click', (params) => {
          // params 中包含了点击的数据信息，可以根据需要进行相应处理
          emit('click', params)
        })
      }
    }

    const resize = () => {
      chart.resize()
    }

    watch(() => props.option, (newVal) => {
      chart?.clear()
      chart.setOption(newVal)
    }, { deep: true })

    onMounted(() => {
      init()
    })

    onBeforeMount(() => {
      window.removeEventListener('resize', resize)
      chart?.dispose()
    })

    return () => <div ref={chartRef} style={{ width: '100%', height: props.height }}></div>
  }
})
