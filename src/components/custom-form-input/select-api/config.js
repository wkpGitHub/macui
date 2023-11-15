import { generateFieldList } from 'd-render'
import { apiConfigService } from '@/api'
const apiMap = {}
export const fieldList = generateFieldList({
  name: { label: '接口名称' },
  apiId: {
    label: '接口地址',
    type: 'selectTree',
    checkStrictly: false,
    optionProps: {
      label: 'fullPath',
      value: 'id'
    },
    async asyncOptions () {
      const { data } = await apiConfigService.tree({ })
      data.forEach(item => {
        item.fullPath = item.name
        item.children?.reduce((total, current) => {
          total[current.id] = current.fullPath
          return total
        }, apiMap)
      })
      return data
    }
  },

  httpMethod: {
    label: '请求方式',
    type: 'select',
    defaultValue: 'GET',
    options: ['GET', 'POST']
  },
  fullPath: {
    hideItem: true,
    dependOn: ['apiId'],
    changeValue ({ apiId }) {
      return { value: apiMap[apiId] }
    }
  },
  objId: {
    hideItem: true,
    dependOn: ['apiId'],
    changeValue ({ apiId }) {
      return { value: apiId }
    }
  },
  headers: {
    label: '请求头【key为&，将解构整个对象】',
    type: 'table',
    options: generateFieldList({
      name: { label: 'key', writable: true },
      value: { label: 'value', writable: true, type: 'pageVar' }
    })
  },
  inputParams: {
    label: '发送数据【key为&，将解构整个对象】',
    type: 'table',
    options: generateFieldList({
      name: { label: 'key', writable: true },
      value: { label: 'value', writable: true, type: 'pageVar' }
    })
  }
})
