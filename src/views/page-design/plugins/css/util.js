import { DRender } from 'd-render'

const dRender = new DRender()
export const getComponentCssConfigure = async (val, type) => {
  const {
    cssConfigure = {
      width: {
        label: '宽度'
      },
      height: {
        label: '高度'
      },
      padding: {
        label: '内边距'
      },
      margin: {
        label: '外边距'
      },
      border: {
        label: '描边'
      },
      display: {
        label: '展示方式'
      },
      position: {
        label: '定位方式'
      },
      font: {
        label: '字体'
      },
      background: {
        label: '背景'
      }
    }
  } = await dRender.componentDictionary[val]('/configure')()
  return type === 'css' ? cssConfigure : {}
}
