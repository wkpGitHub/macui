import { DRender } from 'd-render'

const dRender = new DRender()
export const getComponentCssConfigure = async (type) => {
  const { cssConfigure } = await dRender.componentDictionary[type]('/configure')()
  return cssConfigure
}
