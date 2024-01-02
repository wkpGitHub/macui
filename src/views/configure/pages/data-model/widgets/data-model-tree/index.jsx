import { ref } from 'vue'
import { ElTree, ElIcon, ElInput } from 'element-plus'
import { dataInfoService } from '@lc/api'
import { Plus, Delete } from '@element-plus/icons-vue'
import Folder from './svg/folder'
import Database from './svg/database'
import Entity from './svg/entity'
import Pojo from './svg/pojo'
import Enum from './svg/enum'
import CipButton from '@cip/components/cip-button'
import CipDialog from '@cip/components/cip-dialog'
import { CipForm } from 'd-render'
import { useDataModel } from './use-data-model'

import './index.less'

export default {
  props: {
    modelValue: {},
    type: String
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const data = ref([])

    const getData = () => {
      dataInfoService.tree({ withBasic: false }).then(res => {
        let children = res.data.datasources
        switch (props.type) {
          case 'entity':
            children = res.data.datasources
            break
          case 'dic':
            children = res.data.dics
            break
          case 'pojo':
            children = res.data.pojos
            break
        }
        data.value = children || []
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
      if (isDbInfo(data)) return <Database />
      if (isEntity(data)) return <Entity />
      if (isPojo(data)) return <Pojo />
      if (isEnum(data)) return <Enum />

      return <Folder />
    }

    const handleCurrentChange = (data, node) => {
      console.log(data, node)
      emit('update:modelValue', data)
    }
    const filterText = ref('')
    // TODO: 创建后直接选中
    const { dialog, dialogTitle, dataModel, dataModelFieldList, handleCommand, saveDataModel } = useDataModel(getData)
    return () => <div class="model-tree-wrap" >
      <div class="tool">
        <CipDialog
          v-model={dialog.value}
          title={`新增${dialogTitle.value}`}
          size={'mini'}
          onConfirm={saveDataModel}
        >
          <CipForm v-model:model={dataModel.value} fieldList={dataModelFieldList} labelWidth="100px"></CipForm>
        </CipDialog>
        <ElInput v-model={filterText.value}/>
        <CipButton style="flex-shrink: 0;" icon={Plus} square onClick={() => handleCommand(props.type)}/>
      </div>
      <ElTree
        data={data.value}
        node-key="nodeId"
        defaultExpandAll
        highlightCurrent
        expandOnClickNode={false}
        onCurrent-change={handleCurrentChange}
      >
        {{
          default: ({ node, data }) => {
            return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
              <ElIcon style={'margin-right: 10px'}><Icon node={node} data={data} /></ElIcon>
              {data.name}
              <ElIcon><Delete /></ElIcon>
            </div>
          }
        }}
      </ElTree>
    </div>
  }
}
