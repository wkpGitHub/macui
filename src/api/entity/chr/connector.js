import { baseDicService } from '@/api/service/chr/base-dic'

export const connectorEntity = {
  name: { _renderConfig: { label: '名称' } },
  type: {
    _renderConfig: {
      label: '类型',
      type: 'select',
      optionProps: {
        value: 'id',
        label: 'name'
      },
      async asyncOptions () {
        const { data } = await baseDicService.connectorType()
        return data || []
      }
    }
  }
}
