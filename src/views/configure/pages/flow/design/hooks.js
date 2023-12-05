import { reactive, ref } from 'vue'
import { ElCollapse, ElCollapseItem } from 'element-plus'
import CipButton from '@cip/components/cip-button'
import { iconHtmlMap } from './ausyda'
import { CipForm } from 'd-render'
import examineAndApproveTaskConfig from '../../service-design/comps/examine-and-approve-task'
import writeConfig from '../../service-design/comps/write'
import inclusiveGateWayConfig from '../../service-design/flow-path/inclusive-gateway'
import exclusiveGateWayConfig from '../../service-design/flow-path/exclusive-gateway'
import parallelGateWayConfig from '../../service-design/flow-path/parallel-gateway'
import notifyNodeConfig from '../../service-design/flow-path/notify-node'
import { allComps } from '../../service-design/comps'
// import { gatewayBranch } from '../../service-design/flow-path/gateway-branch'

const iconClassMap = {
  start: 'node-start',
  branch: 'node-logic',
  break: 'node-logic',
  loop: 'node-logic node-icon-loop-wrapper',
  continue: 'node-logic node-icon-continue-wrapper',
  exit: 'node-logic',
  'datasource-sql': 'icon-outer',
  script: 'icon-outer',
  notification: 'icon-outer',
  email: 'icon-outer',
  connector: 'icon-outer',
  flow: 'icon-outer',
  apicenter: 'icon-outer',
  http: 'icon-outer',
  'delete-data-records': 'icon-outer icon-crud',
  'query-data-records': 'icon-outer icon-crud',
  'update-data-records': 'icon-outer icon-crud',
  'create-data-records': 'icon-outer icon-crud',
  coder: 'icon-outer',
  'date-format': 'icon-outer',
  mapping: 'icon-outer',
  expand: 'icon-outer',
  folded: 'icon-outer',
  delete: 'icon-outer',
  set: 'icon-outer',
  end: 'node-end',
  'exclusive-gateway': 'icon-outer no-background',
  'parallel-gateway': 'icon-outer no-background',
  'inclusive-gateway': 'icon-outer no-background',
  'submit-node': 'icon-outer',
  'capture-time': 'icon-outer',
  'web-api': 'icon-outer',
  'examine-and-approve-task': 'icon-outer',
  'notify-node': 'icon-outer',
  write: 'icon-outer',
  'auto-entity-add-records': 'icon-outer',
  'auto-entity-delete-records': 'icon-outer',
  'auto-entity-update-records': 'icon-outer',
  'auto-entity-search-records': 'icon-outer',
  'gateway-branch': 'node-logic'
}

export function useNodeSetDialog (props, parentState = {}) {
  const state = reactive({ isShow: false })
  let nodeConfig = {}
  const model = ref({})
  function setNode (node, updateConfig) {
    if (!node.type) return
    const children = node.children?.filter(item => (item.type !== 'branch-close')).map(item => ({ label: item.expression, id: item.id, value: item.id }))
    model.value = { ...node.config, children }
    if (node.isBranch === 1) {
      nodeConfig = allComps.find(comp => comp.type === 'gateway-parallel-line')
    } else if (node.isBranch === 2) {
      nodeConfig = allComps.find(comp => comp.type === 'gateway-branch-line')
    } else {
      nodeConfig = allComps.find(comp => comp.type === node.type)
    }
    if (node.type === 'examine-and-approve-task' || node.type === 'write') {
      model.value.type = 'TRANSTACTOR'
    }
    // if (nodeConfig.formField instanceof Function) {
    //   nodeConfig.formField = nodeConfig.formField({ parentState })
    // }
    // nodeConfig.formField.map(v => {
    //   v.config.parentState = parentState
    //   v.config.changeEffect = async (value, key, data) => {
    //     if (key === 'title') node.title = value
    //     const _data = data ? { ...data } : {}
    //     _data[key] = value
    //     updateConfig(_data)
    //   }
    // })
  }

  return {
    state,
    render ({ node, updateConfig }) {
      state.isShow && setNode(node, updateConfig)
      return state.isShow && <CipForm labelWidth={nodeConfig.labelWidth || '90px'} v-model:model={model.value} fieldList={nodeConfig.formField}></CipForm>
    }
  }
}

export function useNodeMenu () {
  const nodeList = [
    {
      title: '人工节点',
      name: 'rg',
      children: [examineAndApproveTaskConfig, writeConfig, notifyNodeConfig]
    },
    {
      title: '网关节点',
      name: 'branch',
      children: [exclusiveGateWayConfig, inclusiveGateWayConfig, parallelGateWayConfig]
    }
    // {
    //   title: '自动节点',
    //   name: 'auto',
    //   children: [webApiConfig, captureTimeConfig, createDataRecordsConfig, submitNodeConfig, updateDataRecordsConfig, queryDataRecordsConfig, deleteDataRecordsConfig]
    // },
  ]

  const state = reactive({
    isShow: false,
    activeNames: ['rg', 'branch', 'auto', 'senior'],
    position: {
      x: 0,
      y: 0
    }
  })

  return {
    state,
    render ({ nodeClick }) {
      const { position: { x, y } } = state
      return state.isShow && <div class="select-node-menu" style={{ top: `${y}px`, left: `${x}px` }}>
        <ElCollapse v-model={state.activeNames} >
          {nodeList.map(group => <ElCollapseItem title={group.title} name={group.name}>
            {group.children.map(item => <CipButton onClick={(e) => nodeClick(item, e)}><div class={`${iconClassMap[item.type]} mr-2`} v-html={iconHtmlMap[item.type]}></div>{item.title}</CipButton>)}
          </ElCollapseItem>)}
        </ElCollapse>
      </div>
    }
  }
}
