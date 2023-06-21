import { ref } from 'vue'
import { ElTree, ElIcon, ElDropdown, ElDropdownMenu, ElDropdownItem, ElInput } from 'element-plus'
import { dataInfoService } from '@/api'
import { Plus } from '@element-plus/icons-vue'
import Folder from './svg/folder'
import Database from './svg/database'
import Entity from './svg/entity'
import Pojo from './svg/pojo'
import Enum from './svg/enum'
import CipButton from '@cip/components/cip-button'
import CipDialog from '@cip/components/cip-dialog'
import { CipForm } from 'd-render'
import { useDataModel } from './use-data-model'

import styles from './index.module.less'

export default {
  props: {
    modelValue: {}
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const data = ref([])

    const getData = () => {
      const treeRoot = [
        { nodeId: '_datasources', name: 'datasources', title: '实体' },
        { nodeId: '_pojos', name: 'pojos', title: '数据结构' },
        { nodeId: '_dics', name: 'dics', title: '枚举' }
      ]
      dataInfoService.tree({ withBasic: false }).then(res => {
        console.log('dataInfoService', res.data)
        const treeData = treeRoot.reduce((acc, v) => {
          acc.push({
            nodeId: v.nodeId,
            name: v.name,
            title: v.title,
            children: res.data[v.name] ?? []
          })
          return acc
        }, [])
        data.value = treeData
      })
    }
    getData()

    const isDbInfo = (data) => {
      return data.nodeId.indexOf('ds') === 0
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

    const Icon = ({ node, data }) => {
      if (node.level === 1) return <Folder />
      if (node.level >= 2) {
        if (isDbInfo(data)) return <Database />
        if (isEntity(data)) return <Entity />
        if (isPojo(data)) return <Pojo />
        if (isEnum(data)) return <Enum />
      }
      return <Folder />
    }
    const Text = ({ node, data }) => {
      if (node.level === 1) return data.title
      return <div>
        {data.name}
      </div>
    }
    const handleCurrentChange = (data, node) => {
      console.log(data, node)
      emit('update:modelValue', data)
    }
    const filterText = ref('')
    // TODO: 创建后直接选中
    const { dialog, dialogTitle, dataModel, dataModelFieldList, handleCommand, saveDataModel } = useDataModel()
    return () => <div class={styles.wrapper} >
      <div class={styles.tool}>
        <CipDialog
          v-model={dialog.value}
          title={`新增${dialogTitle.value}`}
          size={'mini'}
          onConfirm={saveDataModel}
        >
          <CipForm v-model:model={dataModel.value} fieldList={dataModelFieldList}></CipForm>
        </CipDialog>
        <ElInput v-model={filterText.value}/>
        <ElDropdown onCommand={handleCommand}>
          {{
            default: () => <CipButton icon={Plus} square/>,
            dropdown: () => <ElDropdownMenu>
              <ElDropdownItem command={'entity'}>添加实体</ElDropdownItem>
              <ElDropdownItem command={'pojo'}>添加数据结构</ElDropdownItem>
              <ElDropdownItem command={'dic'}>添加枚举</ElDropdownItem>
            </ElDropdownMenu>
          }}
        </ElDropdown>
      </div>
      <ElTree
        data={data.value}
        node-key="nodeId"
        props={{ label: 'title' }}
        defaultExpandAll
        highlightCurrent
        expandOnClickNode={false}
        onCurrent-change={handleCurrentChange}
      >
        {{
          default: ({ node, data }) => {
            return <div style={{ display: 'flex', alignItems: 'center' }}>
              <ElIcon style={'margin-right: 10px'}><Icon node={node} data={data} /></ElIcon>
              <Text node={node} data={data}/>
            </div>
          }
        }}
      </ElTree>
    </div>
  }
}
