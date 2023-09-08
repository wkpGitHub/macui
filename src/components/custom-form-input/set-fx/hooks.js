import { reactive, computed, withModifiers } from 'vue'
import CipDialog from '@cip/components/cip-dialog'
import CipTabs from '@cip/components/cip-tabs-plus'
import CipTabPane from '@cip/components/cip-tabs-plus/tab'
import { ElTag } from 'element-plus'
import { dateTypeMap } from '@/lib/contants'

export function useFxDialog (proxyValue, config) {
  const { parentState } = config

  function onConfirm (resolve) {
    // const { selectNode } = parentState
    // if (selectNode.type === 'set') {
    //   selectNode.dataType = state.item.dataType
    //   selectNode.source = state.item.value
    // }
    // proxyValue.value = state.varType + state.item.name
    console.log('展示数据格式：', state.list)
    resolve()
  }

  const canSelectTarget = computed(() => {
    const targets = []
    console.log(parentState.selectNode)
    const { parent, index } = parentState.selectNode
    parent.children.forEach((n, i) => {
      if (n.targetName && i < index) targets.push(n)
    })
    function deepAdd (parent) {
      if (parent.targetName) targets.push(parent)
      if (parent.parent) deepAdd(parent.parent)
    }
    deepAdd(parent)
    return targets
  })

  const operateList = [
    [
      { type: 'operate', value: '+', desc: '+' },
      { type: 'operate', value: '-', desc: '-' },
      { type: 'operate', value: '*', desc: '×' },
      { type: 'operate', value: '/', desc: '÷' },
      { type: 'operate', value: '%', desc: 'mod' }
    ],
    [
      { type: 'operate', value: '==', desc: '=' },
      { type: 'operate', value: '!=', desc: '!=' },
      { type: 'operate', value: '>', desc: '>' },
      { type: 'operate', value: '<', desc: '<' },
      { type: 'operate', value: '>=', desc: '>=' },
      { type: 'operate', value: '<=', desc: '<=' }
    ],
    [
      { type: 'operate', value: 'and', desc: '&' },
      { type: 'operate', value: 'or', desc: '|' },
      { type: 'operate', value: 'not', desc: '!' }
    ],
    [
      { type: 'operate', value: 'true', desc: 'true' },
      { type: 'operate', value: 'false', desc: 'false' }
    ],
    [
      { type: 'operate', value: '(', desc: '(' },
      { type: 'operate', value: ')', desc: ')' }
    ],
    [
      { type: 'fx', value: 'isNull', desc: '为空', arguments: [[]] },
      { type: 'fx', value: 'isNotNull', desc: '不为空', arguments: [[]] },
      { type: 'fx', value: 'contains', desc: '包含', arguments: [[], []] },
      { type: 'fx', value: 'thereIn', desc: '属于', arguments: [[], []] }
    ]
  ]
  const state = reactive({
    list: [
      {
        type: 'fx',
        desc: '为空',
        value: 'isNull',
        arguments: [[]]
      }
    ]
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
                {nodeRenderMap[varItem.type](varItem, i)}
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
      return <span key={Math.random()} class="text-node" contenteditable v-focus={focus} onKeydown={e => deleteItem(e, index, list)} onBlur={e => editableBlur(e, index, list)} onFocus={() => setCurrent(index, list)}></span>
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
    state.current.list.splice(state.current.index, 0, item)
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

  return {
    state,
    render () {
      return state.isShow && <CipDialog title={'选择变量'} model-value={true} onUpdate:modelValue={() => { state.isShow = false }} onConfirm={onConfirm}>
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
        <CipTabs model-value={0}>
          <CipTabPane label='全局变量' name={0}>
            <ul class="select-container">
              {parentState.rootNode.globalValue.map(item => <li style="cursor: pointer; margin: 4px" onClick={() => selectVar(item.title, 'global.' + item.name)}>{item.title} <ElTag>{dateTypeMap[item.dataType].label}</ElTag></li>)}
            </ul>
          </CipTabPane>
          <CipTabPane label='上下文' name={1}>
            <ul class="select-container">
              {(canSelectTarget.value || []).map(item => <li style="cursor: pointer; margin: 4px" onClick={() => selectVar(item.targetName, item.source)}>
                {item.targetName}
                {item.selectFields ? <ul class="select-container">{item.selectFields.map(sel => <li style="cursor: pointer; margin: 4px" onClick={withModifiers(() => selectVar(sel.name, sel.ename), ['stop'])}>{sel.name}<ElTag>{dateTypeMap[item.type].label}</ElTag></li>)}</ul> : <ElTag>{dateTypeMap[item.dataType].label}</ElTag>}
              </li>)}
            </ul>
          </CipTabPane>
          <CipTabPane label='服务入参' name={2}>
            <ul class="select-container">
              {(parentState.rootNode.inputParams || []).map(item => <li style="cursor: pointer; margin: 4px" onClick={() => selectVar(item.title, 'inputParams.' + item.name)}>{item.title} <ElTag>{dateTypeMap[item.dataType].label}</ElTag></li>)}
            </ul>
          </CipTabPane>
          <CipTabPane label='服务出参' name={3}>
            <ul class="select-container">
              {(parentState.rootNode.outParams || []).map(item => <li style="cursor: pointer; margin: 4px" onClick={() => selectVar(item.title, 'outParams.' + item.name)}>{item.title} <ElTag>{dateTypeMap[item.dataType].label}</ElTag></li>)}
            </ul>
          </CipTabPane>
          <CipTabPane label='系统变量' name={4}>

          </CipTabPane>
          <CipTabPane label='函数' name={5}>
            <ul class="select-container">
              <li onClick={() => selectFx('isNull')}>为空</li>
            </ul>
          </CipTabPane>
        </CipTabs>
      </CipDialog>
    }
  }
}
