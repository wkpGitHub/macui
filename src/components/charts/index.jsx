import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as echarts from 'echarts'

export default ({
  name: 'Charts',
  props: {
    option: {
      type: Object,
      default: () => {}
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '250px'
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

    watch(() => props.width, () => {
      setTimeout(() => {
        resize()
      }, 200)
    }, { deep: true })

    watch(() => props.height, () => {
      setTimeout(() => {
        resize()
      }, 200)
    }, { deep: true })

    watch(() => props.option, (newVal) => {
      chart?.clear()
      chart.setOption(newVal)
    }, { deep: true })

    onMounted(() => {
      init()
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resize)
      chart?.dispose()
    })

    return () => <div ref={chartRef} style={{ width: props.width, height: props.height }}></div>
  }
})
