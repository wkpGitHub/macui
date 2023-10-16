import { reactive, computed, withModifiers } from 'vue'
import CipDialog from '@cip/components/cip-dialog'
import { ElTag, ElCard } from 'element-plus'
import CipTree from '@cip/components/cip-tree'
import cipStore from '@cip/components/store'

const operateTreeOpts = [
  {
    label: '基础函数',
    children: [
      { label: '为空', value: 'isNull' },
      { label: '不为空', value: 'isNotNull' }
    ]
  }
]

export function useFxDialog (proxyValue, config) {
  const { parentState } = config
  const dateTypeMap = computed(() => {
    return cipStore.state.dataType.reduce((total, current) => {
      total[current.id] = current
      return total
    }, {})
  })

  function onConfirm (resolve) {
    // const { selectNode } = parentState
    // if (selectNode.type === 'set') {
    //   selectNode.dataType = state.item.dataType
    //   selectNode.source = state.item.value
    // }
    // proxyValue.value = state.varType + state.item.name
    console.log('展示数据格式：', state.list)
    proxyValue.value = toString()
    resolve()
  }

  function toString () {
    let str = ''
    state.list.forEach((item, index) => {
      str += stringMap[item.type](item)
      if (index < state.list.length - 1) {
        str += ' '
      }
    })
    return str
  }

  const stringMap = {
    fx (item) {
      const startText = item.value + '('
      const endText = ')'
      let args = ''
      item.arguments.forEach((argList, argIndex) => {
        if (argIndex > 0) {
          args += ','
        }
        let varItemStr = ' '
        argList.forEach((varItem, i) => {
          varItemStr += stringMap[varItem.type](varItem)
          if (i < argList.length - 1) {
            varItemStr += ' '
          }
        })
        args += varItemStr
      })
      return startText + args + endText
    },
    var (item) {
      return item.value
    },
    constant (item) {
      return `"${item.value}"`
    },
    operate (item) {
      return item.value
    }
  }

  const canSelectTarget = computed(() => {
    const targets = []
    console.log(parentState.selectNode)
    const { parent, index } = parentState.selectNode
    parent.children.forEach((n, i) => {
      const children = (n.config?.selectFields || n.config?.initFields || []).map(sel => ({
        label: sel.title,
        value: n.config.targetName + '.' + sel.name,
        dataType: sel.dataType
      }))
      if (n.config?.targetName && i < index) {
        targets.push({
          label: n.config.targetName,
          value: n.config.targetName,
          dataType: n.config.dataType || 'ENTITY',
          children
        })
      }
    })
    function deepAdd (parent) {
      if (parent.config?.targetName) {
        const children = (parent.config?.selectFields || []).map(sel => ({
          label: sel.title,
          value: sel.targetName,
          dataType: sel.dataType
        }))
        targets.push({ label: parent.config.title, value: parent.config.targetName, dataType: parent.config.dataType || 'ENTITY', children })
      }
      if (parent.parent) deepAdd(parent.parent)
    }
    deepAdd(parent)
    return targets
  })

  const operateList = [
    [
      { type: 'operate', value: 'plus', desc: '+' },
      { type: 'operate', value: 'minus', desc: '-' },
      { type: 'operate', value: 'multi', desc: '×' },
      { type: 'operate', value: 'divi', desc: '÷' },
      { type: 'operate', value: 'mod', desc: 'mod' }
    ],
    [
      { type: 'operate', value: 'eq', desc: '=' },
      { type: 'operate', value: 'ne', desc: '!=' },
      { type: 'operate', value: 'gt', desc: '>' },
      { type: 'operate', value: 'lt', desc: '<' },
      { type: 'operate', value: 'ge', desc: '>=' },
      { type: 'operate', value: 'le', desc: '<=' }
    ],
    [
      { type: 'operate', value: 'and', desc: 'and' },
      { type: 'operate', value: 'or', desc: 'or' },
      { type: 'operate', value: 'not', desc: 'not' }
    ],
    [
      { type: 'operate', value: 'tr', desc: 'true' },
      { type: 'operate', value: 'fa', desc: 'false' }
    ],
    [
      { type: 'operate', value: 'lb', desc: '(' },
      { type: 'operate', value: 'rb', desc: ')' }
    ],
    [
      { type: 'fx', value: 'isNull', desc: '为空', arguments: [[]] },
      { type: 'fx', value: 'isNotNull', desc: '不为空', arguments: [[]] },
      { type: 'fx', value: 'contains', desc: '包含', arguments: [[], []] },
      { type: 'fx', value: 'thereIn', desc: '属于', arguments: [[], []] }
    ]
  ]
  const state = reactive({
    list: []
  })

  function containerClick () {
    state.current = {
      index: state.list.length,
      list: state.list
    }
  }
  containerClick()

  const nodeRenderMap = {
    fx (item) {
      const startText = item.desc + '('
      const endText = ')'
      return <div class="fx-node" onClick={withModifiers(() => {}, ['stop'])}>
        {startText}
        <div class="functionParamWrapper">
          {/* 参数 */}
          {item.arguments.map((argList, argIndex) => <>
            {argIndex > 0 && <div class="functionParamSplit">,</div>}
            <div class="functionParamElem">
              {nodeRenderMap.blank(0, argList)}
              {/* 参数内容 */}
              {argList.map((varItem, i) => <>
                {nodeRenderMap[varItem.type](varItem)}
                {nodeRenderMap.blank(i + 1, argList)}
              </>)}
            </div>
          </>)}
        </div>
        {endText}
      </div>
    },
    var (item) {
      return <div class="variableElem" onClick={withModifiers(() => {}, ['stop'])}>{item.desc}</div>
    },
    constant (item) {
      return <div class="constantElem" contenteditable onBlur={({ target }) => { item.value = target.textContent }} onClick={withModifiers(() => {}, ['stop'])}>{item.value}</div>
    },
    operate (item) {
      return <div class="operatorElem" onClick={withModifiers(() => {}, ['stop'])}>{item.desc}</div>
    },
    blank (index, list) {
      const { current } = state
      let focus
      // 最后一个节点，特殊处理
      if (index === list.length) {
        // 数组为空，默认就一个空节点，默认选中它
        if (current.list === list && list.length === 0) {
          focus = true
        } else {
          focus = list[index - 1] && current.list[current.index - 1] === list[index - 1]
        }
      } else {
        focus = list[index] && current.list[current.index] === list[index]
      }
      return <span key={Math.random()} class="text-node" contenteditable v-focus={focus} onKeydown={e => deleteItem(e, index, list)} onClick={withModifiers(() => setCurrent(index, list), ['stop'])}
        onBlur={e => editableBlur(e, index, list)}></span>
    }
  }

  function setCurrent (index, list) {
    const { current } = state
    if (current.list[current.index - 1] !== list[index - 1]) {
      state.current = { index, list }
    }
  }

  function editableBlur ({ target }, index, list) {
    if (target.textContent) {
      list.splice(index, 0, {
        desc: 'string',
        value: target.textContent,
        type: 'constant'
      })
      target.textContent = ''
      state.current.index++
    }
  }

  function deleteItem (e, index, list) {
    const { textContent } = e.target
    if (e.code === 'Backspace' && !textContent && index > 0) {
      list.splice(index - 1, 1)
      state.current.index--
    }
  }

  function selectOperate (item) {
    state.current.list.splice(state.current.index, 0, { ...item })
    state.current.index++
  }

  function selectVar (desc, value) {
    state.current.list.splice(state.current.index, 0, {
      type: 'var',
      desc,
      value
    })
    state.current.index++
  }

  function selectFx (type) {
    const fxMap = {
      isNull: {
        type: 'fx',
        desc: '为空',
        arguments: [[]],
        value: 'isNull'
      },
      isNotNull: {
        type: 'fx',
        desc: '不为空',
        arguments: [[]],
        value: 'isNotNull'
      },
      contains: {
        type: 'fx',
        desc: '包含',
        arguments: [[], []],
        value: 'contains'
      },
      thereIn: {
        type: 'fx',
        desc: '属于',
        arguments: [[], []],
        value: 'thereIn'
      },
      unitBelongsTo: {
        type: 'fx',
        desc: '人员隶属',
        arguments: [[], []],
        value: 'unitBelongsTo'
      }
    }
    state.current.list.splice(state.current.index, 0, fxMap[type])
    state.current.index++
  }

  const varTreeOpts = computed(() => {
    const { globalValue, inputParams, outParams } = parentState.rootNode
    return [
      {
        label: '全局变量',
        children: globalValue.map(item => ({ label: item.title, value: `global.${item.name}`, dataType: item.dataType }))
      },
      {
        label: '服务入参',
        children: inputParams.map(item => ({ label: item.title, value: `inputParams.${item.name}`, dataType: item.dataType }))
      },
      {
        label: '服务出参',
        children: outParams.map(item => ({ label: item.title, value: `outParams.${item.name}`, dataType: item.dataType }))
      },
      {
        label: '上下文',
        children: canSelectTarget.value
      },
      {
        label: '系统变量',
        children: []
      }
    ]
  })

  function renderTreeItem ({ node, data }) {
    return <div style='display: flex;align-items: center;justify-content: space-between;' onClick={() => data.value && selectVar(data.label, data.value)}>
      <span>{data.label}</span>
      {dateTypeMap.value[data.dataType] && <ElTag>{dateTypeMap.value[data.dataType]?.name}</ElTag>}
    </div>
  }

  return {
    state,
    render () {
      return state.isShow && <CipDialog title="表达式设置" model-value={true} onUpdate:modelValue={() => { state.isShow = false }} onConfirm={onConfirm} width="900px">
        <div class="fx-editor" onClick={withModifiers(containerClick, ['stop'])}>
          {nodeRenderMap.blank(0, state.list)}
          {state.list.map((item, index) => <>
            {nodeRenderMap[item.type](item, index)}
            {nodeRenderMap.blank(index + 1, state.list)}
          </>)}
        </div>
        <div class="operate-line">
          {operateList.map(l => <div class="item-group">
            {l.map(item => <div class="item" onClick={() => selectOperate(item)}>{item.desc}</div>)}
          </div>)}
        </div>
        <div class="fx-select-container">
            <ElCard shadow="never">
              <CipTree
                options={varTreeOpts.value}
                showButton={false}
                config={{
                  defaultExpandAll: false,
                  renderItem: renderTreeItem
                }}
              >
              </CipTree>
            </ElCard>
            <ElCard shadow="never">
              <CipTree
                  options={operateTreeOpts}
                  showButton={false}
                  config={{
                    defaultExpandAll: false
                  }}
                  onNodeClick={({ data }) => data.value && selectFx(data.value)}
                >
                </CipTree>
            </ElCard>
            <ElCard shadow="never"></ElCard>
        </div>
      </CipDialog>
    }
  }
}
