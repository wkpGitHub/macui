import { generateFieldList } from 'd-render'
import { v4 as uuidv4 } from 'uuid'

export const fieldList = generateFieldList({
  name: { label: '接口名称', type: 'select-api-tree', otherKey: '_apiMap' },
  fullPath: {
    label: '接口地址',
    dependOn: ['_apiMap'],
    changeValue ({ _apiMap }) {
      if (_apiMap) {
        return { value: _apiMap.fullPath }
      }
    }
  },
  httpMethod: {
    label: '请求方式',
    type: 'select',
    defaultValue: 'GET',
    dependOn: ['_apiMap'],
    options: ['GET', 'POST'],
    changeValue ({ _apiMap }) {
      if (_apiMap) {
        return { value: _apiMap.httpMethod }
      }
    }
  },
  apiId: {
    hideItem: true,
    dependOn: ['_apiMap', 'fullPath'],
    changeValue ({ _apiMap, fullPath }) {
      return {
        value: _apiMap?.fullPath === fullPath ? _apiMap.id : uuidv4()
      }
    }
  },
  objId: {
    hideItem: true,
    dependOn: ['apiId'],
    changeValue ({ apiId }) {
      return { value: apiId }
    }
  },
  isFileDown: {
    type: 'switch',
    label: '文件下载'
  },
  // headers: {
  //   label: '请求头【key为&，将解构整个对象】',
  //   type: 'table',
  //   options: generateFieldList({
  //     name: { label: 'key', writable: true },
  //     value: { label: 'value', writable: true, type: 'pageVar' }
  //   })
  // },
  inputParams: {
    label: '入参',
    type: 'table',
    hideIndex: true,
    options: generateFieldList({
      name: { label: '字段', writable: true },
      title: { label: '描述', writable: true },
      dataType: { label: '数据类型', writable: true, type: 'dataType2', otherKey: 'refDataId', defaultValue: 'STRING' }
    }),
    dependOn: ['_apiMap'],
    changeValue ({ _apiMap }) {
      if (_apiMap) {
        return { value: _apiMap.inputParams || [] }
      }
    }
  },
  outParams: {
    label: '出参',
    type: 'table',
    hideIndex: true,
    options: generateFieldList({
      name: { label: '字段', writable: true },
      title: { label: '描述', writable: true },
      dataType: { label: '描述', writable: true, type: 'dataType2', otherKey: 'refDataId', defaultValue: 'STRING' }
    }),
    dependOn: ['_apiMap'],
    changeValue ({ _apiMap }) {
      if (_apiMap) {
        return { value: _apiMap.outParams || [] }
      }
    }
  }
})
