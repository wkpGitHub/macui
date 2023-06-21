import { formInputProps, formInputEmits, useFormInput, isNotEmpty } from '@d-render/shared'
// import { CipTable, CipForm } from 'd-render'
import { ElIcon, ElTreeSelect } from 'element-plus'
import { ref, computed } from 'vue'
import { dataInfoService } from '@/api/service/chr'

import Folder from './svg/folder'
import Database from './svg/database'
import Entity from './svg/entity'
import Pojo from './svg/pojo'
import Enum from './svg/enum'
import Basic from './svg/basic'
import './index.less'
export default {
  props: formInputProps,
  emits: formInputEmits,
  setup (props, context) {
    const { updateStream, proxyOtherValue } = useFormInput(props, context, { maxOtherKey: 3 })
    const options = ref([])
    const treeRoot = [
      { nodeId: '_basic', name: 'basic', title: '基础类型' },
      { nodeId: '_datasources', name: 'datasources', title: '实体' },
      { nodeId: '_pojos', name: 'pojos', title: '数据结构' },
      { nodeId: '_dics', name: 'dics', title: '枚举' }
    ]
    const getOptions = async () => {
      // 必须依赖dbId
      const { data } = await dataInfoService.tree({ dbId: props.outDependOnValues?.dbId, withBasic: true })
      const treeData = treeRoot.reduce((acc, v) => {
        const children = data[v.name] ?? []
        if (v.name === 'basic') children.forEach(v => { v.type = 'basic' })
        acc.push({
          nodeId: v.nodeId,
          name: v.name,
          title: v.title,
          children
        })
        return acc
      }, [])
      options.value = treeData
    }
    getOptions()

    const isDbInfo = (data) => {
      return data.type === 'db'
    }
    const isEntity = (data) => {
      return data.type === 'entity'
    }
    const isPojo = (data) => {
      return data.type === 'pojo'
    }
    const isEnum = (data) => {
      return data.type === 'dic'
    }
    const isBasic = (data) => {
      return data.type === 'basic'
    }

    const dataModelIconMap = {
      entity: <Entity/>,
      pojo: <Pojo/>
    }

    const prefixIcon = computed(() => {
      switch (props.modelValue) {
        case 'entity':
          return <Entity/>
        case 'pojo':
          return <Pojo/>
        case 'dic':
          return <Enum/>
        case 'basic':
          return <Basic/>
        default:
          return undefined
      }
    })
    const Icon = ({ node, data }) => {
      if (node.level === 1) return <Folder />
      if (node.level >= 2) {
        if (isDbInfo(data)) return <Database />
        if (isEntity(data)) return <Entity />
        if (isPojo(data)) return <Pojo />
        if (isEnum(data)) return <Enum />
        if (isBasic(data)) return <Basic />
      }
      return <Folder />
    }
    const Text = ({ node, data }) => {
      if (node.level === 1) return data.title
      return <div>
        {data.name}
      </div>
    }
    const treeValue = computed(() => {
      let nodeId
      switch (props.modelValue) {
        case 'entity':
          nodeId = proxyOtherValue[1].value
          break
        case 'pojo':
          nodeId = proxyOtherValue[1].value
          break
        case 'dic':
          nodeId = proxyOtherValue[1].value
          break
        default:
          nodeId = proxyOtherValue[0].value
      }
      return isNotEmpty(nodeId) ? nodeId + '' : undefined
    })
    const handleCurrentChange = (data, node) => {
      console.log('handleCurrentChange', data)
      console.log(updateStream)
      if (['dic', 'entity', 'pojo'].includes(data.type)) {
        updateStream.appendValue(data.type)
        updateStream.appendOtherValue(data.id, 2)
        updateStream.appendOtherValue(data.name, 3)
        updateStream.end()
      } else {
        updateStream.appendValue('basic')
        updateStream.appendOtherValue(data.id, 1)
        updateStream.end()
      }
    }
    return () => <div class={'data-type'}>
      <ElTreeSelect
        modelValue={treeValue.value}
        data={options.value}
        node-key="nodeId"
        props={{ label: 'name' }}
        defaultExpandAll
        highlightCurrent
        expandOnClickNode={false}
        onCurrent-change={handleCurrentChange}
        prefixIcon={prefixIcon.value}
      >
        {{
          prefix: () => <ElIcon>{prefixIcon.value}</ElIcon>,
          default: ({ node, data }) => {
            return <div style={{ display: 'flex', alignItems: 'center' }}>
              <ElIcon style={'margin-right: 10px'}><Icon node={node} data={data} /></ElIcon>
              <Text node={node} data={data}/>
            </div>
          }
        }}
      </ElTreeSelect>
    </div>
  }
}
