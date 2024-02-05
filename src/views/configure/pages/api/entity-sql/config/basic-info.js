import { dataInfoService, dbInfoService } from '@/api'

export const basicInfoConfig = {
  name: { required: true, label: '接口名称', span: 8 },
  dbId: {
    required: true,
    label: '数据源',
    filterable: true,
    span: 12,
    type: 'select',
    optionProps: { value: 'id', label: 'name' },
    asyncOptions: async () => {
      const { data } = await dbInfoService.list({})
      return data || []
    }
  },
  tableId: {
    required: true,
    label: '数据表',
    span: 12,
    dependOn: ['dbId'],
    resetValue: true,
    type: 'select',
    filterable: true,
    optionProps: {
      label: 'name',
      value: 'id'
    },
    async asyncOptions ({ dbId }) {
      if (!dbId) {
        return []
      }
      const { data } = await dataInfoService.infoList({ dbId })
      return data || []
    }
  },
  remark: { label: '备注', span: 24, limit: 30 }
}
