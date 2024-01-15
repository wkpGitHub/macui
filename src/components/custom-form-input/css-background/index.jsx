import { defineComponent, reactive, watch } from 'vue'
import { ElSelect, ElOption, ElColorPicker, ElInput, ElButton } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { Upload } from '@element-plus/icons-vue'
import CipUpload from '@cip/components/cip-upload'
import { materialService } from '@lc/api'

export default defineComponent({
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const state = reactive({
      type: '颜色',
      url: '',
      color: ''
    })
    const { proxyValue } = useFormInput(props, ctx)
    if (proxyValue.value) {
      if (proxyValue.value.startsWith('url')) {
        state.type = '背景图'
        // eslint-disable-next-line no-unused-vars
        const [match, url] = (proxyValue.value.match(/^url\((.*?)\)/) || [null, ''])
        state.url = url
      } else {
        state.color = proxyValue.value
      }
    }

    watch(() => state.color, v => {
      proxyValue.value = v
    })
    watch(() => state.url, v => {
      proxyValue.value = `url(${v})`
    })

    function uploadFile ({ file }) {
      materialService.create({ file }).then(({ data }) => {
        state.url = materialService.img(data.id)
      })
    }

    return () => <div style={{ width: '100%' }} class="flex">
      <ElSelect size="small" v-model={state.type} style={{ width: '70px' }} class="mr-1 flex-shrink">
        <ElOption value="颜色" label="颜色"></ElOption>
        <ElOption value="背景图" label="背景图"></ElOption>
      </ElSelect>
      {state.type === '颜色'
        ? <ElColorPicker size="small" show-alpha v-model={state.color} />
        : <ElInput size="small" placeholder="图片地址" v-model={state.url}>{{
          append: () => <CipUpload action="" uploadFile={uploadFile}>{{
            default: () => <ElButton size="small" icon={Upload}>上传</ElButton>
          }}</CipUpload>
        }}</ElInput>}
    </div >
  }
})
