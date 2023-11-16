import { DRender } from 'd-render'

const dRender = new DRender()
export const getComponentCssConfigure = async (val, type) => {
  const { cssConfigure = {} } = await dRender.componentDictionary[val]('/configure')()
  return type === 'css' ? cssConfigure : {}
}
