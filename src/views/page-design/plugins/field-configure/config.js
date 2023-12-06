import { DRender } from 'd-render'

const dRender = new DRender()
export const getComponentConfigure = async (type) => {
  const { default: configure } = await dRender.componentDictionary[type](
    '/configure'
  )()
  if (configure.key) {
    configure.key = {
      label: '字段',
      type: 'selectModuleField',
      otherKey: 'label'
    }
  }
  return configure
}
