import { formInputProps, formInputEmits, useFormInput, isNotEmpty, isInputEmpty } from '@d-render/shared'
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

    const dataModelIconMap = {
      entity: <Entity/>,
      pojo: <Pojo/>,
      dic: <Enum />,
      basic: <Basic/>
    }

    const prefixIcon = computed(() => {
      if (props.modelValue) {
        return dataModelIconMap[props.modelValue]
      }
      return undefined
    })
    const Icon = ({ node, data }) => {
      if (node.level === 1) return <Folder />
      if (node.level >= 2) {
        if (isDbInfo(data)) return <Database />
        const typeIcon = dataModelIconMap[data.type]
        if (typeIcon) return typeIcon
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
      if (['entity', 'pojo', 'dic'].includes(props.modelValue)) {
        nodeId = proxyOtherValue[1].value
      } else {
        nodeId = proxyOtherValue[0].value
      }
      return isNotEmpty(nodeId) ? nodeId + '' : undefined
    })
    const treeSelect$ = ref()
    const clearValues = () => {
      updateStream.appendValue(undefined)
      updateStream.appendOtherValue(undefined, 1)
      updateStream.appendOtherValue(undefined, 2)
      updateStream.appendOtherValue(undefined, 3)
    }
    const handleCurrentChange = (data, node) => {
      if (['dic', 'entity', 'pojo'].includes(data.type)) {
        updateStream.appendValue(data.type)
        updateStream.appendOtherValue(undefined, 1)
        updateStream.appendOtherValue(data.id, 2)
        updateStream.appendOtherValue(data.name, 3)
      } else if (data.type === 'basic') {
        updateStream.appendValue(data.type)
        updateStream.appendOtherValue(data.id, 1)
        updateStream.appendOtherValue(undefined, 2)
        updateStream.appendOtherValue(undefined, 3)
      } else {
        clearValues()
      }
    }
    const handleChange = (val) => {
      if (isInputEmpty(val)) {
        clearValues()
      } else {
        const currentNode = treeSelect$.value.getNode({ nodeId: val })
        if (currentNode) {
          const { data } = currentNode
          handleCurrentChange(data, currentNode)
        } else {
          clearValues()
        }
      }
      // 提交数据
      updateStream.end()
    }
    const slots = computed(() => {
      const result = {
        default: ({ node, data }) => {
          return <div style={{ display: 'flex', alignItems: 'center' }}>
            <ElIcon style={'margin-right: 10px'}><Icon node={node} data={data} /></ElIcon>
            <Text node={node} data={data}/>
          </div>
        }
      }
      if (prefixIcon.value) {
        result.prefix = () => <ElIcon>{prefixIcon.value}</ElIcon>
      }
      return result
    })
    return () => <div class={'data-type'}>
      <ElTreeSelect
        ref={treeSelect$}
        modelValue={treeValue.value}
        data={options.value}
        node-key="nodeId"
        props={{ label: 'name' }}
        clearable={true}
        defaultExpandAll
        highlightCurrent
        expandOnClickNode={false}
        onChange={handleChange}
        prefixIcon={prefixIcon.value}
        v-slots={slots.value}
      >
      </ElTreeSelect>
    </div>
  }
}
