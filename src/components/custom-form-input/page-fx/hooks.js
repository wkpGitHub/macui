import { reactive, computed, withModifiers, watch } from 'vue'
import CipDialog from '@cip/components/cip-dialog'
import { ElCard, ElMessage } from 'element-plus'
import CipTree from '@cip/components/cip-tree'
// import cipStore from '@cip/components/store'
import { getModuleTree, getFxValue } from '@lc/components/d-render-plugin-page-render/use-event-configure'

export function useFxDialog (proxyValue, proxyOtherValue, config, drDesign) {
  function onConfirm (resolve, reject) {
    try {
      getFxValue(state.list, { model: {} })
      proxyValue.value = [...state.list]
      resolve()
    } catch (err) {
      ElMessage.error('表达式不正确，请修改设置！')
      reject()
    }
  }

  const stringMap = {
    fx (item) {
      const startText = item.desc + '('
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
      return `{${item.desc}}`
    },
    constant (item) {
      return item.desc
    },
    operate (item) {
      return item.desc
    }
  }

  function listToString (list) {
    let str = ''
    list.forEach((item, index) => {
      str += stringMap[item.type](item)
      if (index < list.length - 1) {
        str += ' '
      }
    })
    return str
  }

  const operateTreeOpts = [
    {
      label: '基础函数',
      children: [
        { label: '为空', value: 'isNull' },
        { label: '不为空', value: 'isNotNull' },
        { label: '对象转JSON字符串', value: 'JSON.stringify', info: '对象转JSON字符串( 对象 )' },
        { label: 'JSON字符串转对象', value: 'JSON.parse', info: 'JSON字符串转对象( JSON字符 )' },
        { label: '计算长度', value: 'length', info: '计算长度( 数组 或 字符串 )，返回数组或字符串的长度' }
      ]
    },
    {
      label: '对象函数',
      children: [
        { label: '创建一个对象', value: 'newObject', info: '创建一个对象()，返回这个对象' },
        { label: '读取对象key值', value: 'Reflect.get', info: '读取对象key值( 对象, key )，返回对象中key项的值' },
        { label: '设置对象key值', value: 'reflectSet', info: '设置对象key值( 对象, key, 值 )，返回这个对象' },
        { label: '移除对象key', value: 'Reflect.deleteProperty', info: '移除对象key( 对象, key )，返回Boolean值表明该属性是否被成功删除' }
      ]
    },
    {
      label: '数组函数',
      children: [
        { label: '创建一个数组', value: 'newArray', info: '创建一个数组()，返回这个数组' },
        { label: '根据index获取数组值', value: 'Reflect.get', info: '根据index获取数组值( 数组, index )，返回数组中第index项的值' },
        { label: '向数组末尾增加一个成员', value: 'arrPush', info: '向数组末尾增加一个成员( 数组, 值 )，返回这个数组' },
        { label: '移除数组最后一个成员', value: 'arrPop', info: '移除数组最后一个成员( 数组 )，返回这个数组' },
        { label: '向数组中插入或移除一个成员', value: 'arrSplice', info: '向数组中插入或移除一个成员( 数组, 开始位置, 移除几个元素, 新插入的值 )，返回这个数组' }
      ]
    },
    {
      label: '文本函数',
      children: [
        { label: '去前后空格', value: 'String.prototype.trim.call', info: '去前后空格( 字符串 )' },
        { label: '去前空格', value: 'String.prototype.trimLeft.call', info: '去前空格( 字符串 )' },
        { label: '去后空格', value: 'String.prototype.trimRight.call', info: '去后空格( 字符串 )' },
        { label: '转大写', value: 'String.prototype.toUpperCase.call', info: '转大写( 字符串 )' },
        { label: '转小写', value: 'String.prototype.toLowerCase.call', info: '转小写( 字符串 )' },
        { label: '分割字符串', value: 'String.prototype.split.call', info: '分割字符串(字符串, 分隔符)。将文本根据指定片段分割成数组。 示例：`分割字符串("a,b,c", ",")`， 返回 `["a", "b", "c"]`。' }
      ]
    },
    {
      label: '日期函数',
      children: [
        { label: 'DATE', value: 'DATE', info: 'DATE(\'2021-12-06 08:20:00\') 创建日期对象，可以通过特定格式的字符串，或者数值。 需要注意的是，其中月份的数值是从0开始的， 即如果是12月份，你应该传入数值11。' }
      ]
    }
  ]

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
      { type: 'operate', value: '&&', desc: 'and' },
      { type: 'operate', value: '||', desc: 'or' },
      { type: 'operate', value: '!', desc: 'not' }
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
      { type: 'fx', value: 'isNotNull', desc: '不为空', arguments: [[]] }
      // { type: 'fx', value: 'contains', desc: '包含', arguments: [[], []] },
      // { type: 'fx', value: 'thereIn', desc: '属于', arguments: [[], []] }
    ]
  ]
  const state = reactive({
    list: [],
    currentFxInfo: ''
  })

  watch(proxyValue, v => {
    state.list = [...(v || [])]
    containerClick()
  }, { immediate: true })

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
      return <div class="constantElem" contenteditable onBlur={({ target }) => {
        item.value = target.textContent
        item.desc = target.textContent
      }} onClick={withModifiers(() => {}, ['stop'])}>{item.desc}</div>
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
        desc: target.textContent,
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
      'Reflect.get': { type: 'fx', value: 'Reflect.get', desc: '读取对象key值', arguments: [[], []] },
      'Reflect.deleteProperty': { type: 'fx', value: 'Reflect.deleteProperty', desc: '移除对象key', arguments: [[], []] },
      reflectSet: { type: 'fx', value: 'reflectSet', desc: '设置对象key值', arguments: [[], [], []] },
      arrayAt: { type: 'fx', value: 'arrayAt', desc: '根据index获取数组值', arguments: [[], []] },
      length: { type: 'fx', value: 'length', desc: '计算长度', arguments: [[]] },
      'String.prototype.trim.call': { type: 'fx', value: 'String.prototype.trim.call', desc: '去前后空格', arguments: [[]] },
      'String.prototype.trimLeft.call': { type: 'fx', value: 'String.prototype.trimLeft.call', desc: '去前空格', arguments: [[]] },
      'String.prototype.trimRight.call': { type: 'fx', value: 'String.prototype.trimRight.call', desc: '去后空格', arguments: [[]] },
      'String.prototype.toUpperCase.call': { type: 'fx', value: 'String.prototype.toUpperCase.call', desc: '转大写', arguments: [[]] },
      'String.prototype.toLowerCase.call': { type: 'fx', value: 'String.prototype.toLowerCase.call', desc: '转小写', arguments: [[]] },
      'String.prototype.split.call': { type: 'fx', value: 'String.prototype.split.call', desc: '分割字符串', arguments: [[], [{ type: 'constant', value: ',', desc: ',' }]] },
      DATE: { type: 'fx', value: 'DATE', desc: '创建日期对象', arguments: [[]] },
      'JSON.stringify': { type: 'fx', value: 'JSON.stringify', desc: '对象转JSON字符串', arguments: [[]] },
      'JSON.parse': { type: 'fx', value: 'JSON.parse', desc: 'JSON字符串转对象', arguments: [[]] },
      newObject: { type: 'fx', value: 'new Object', desc: '创建一个对象', arguments: [] },
      newArray: { type: 'fx', value: 'new Array', desc: '创建一个数组', arguments: [] },
      arrPush: { type: 'fx', value: 'arrPush', desc: '向数组末尾增加一个成员', arguments: [[], []] },
      arrPop: { type: 'fx', value: 'arrPop', desc: '移除数组最后一个成员', arguments: [[]] },
      arrSplice: { type: 'fx', value: 'arrSplice', desc: '向数组中插入或移除一个成员', arguments: [[], [], [], []] }
      // thereIn: {
      //   type: 'fx',
      //   desc: '属于',
      //   arguments: [[], []],
      //   value: 'thereIn'
      // },
      // unitBelongsTo: {
      //   type: 'fx',
      //   desc: '人员隶属',
      //   arguments: [[], []],
      //   value: 'unitBelongsTo'
      // }
    }

    state.current.list.splice(state.current.index, 0, fxMap[type])
    state.current.index++
  }

  function getEventVars () {
    const children = []
    const currentItem = drDesign.path.at(-1)
    if (currentItem.config?.events) {
      Object.values(currentItem.config.events).forEach(e => {
        children.push({
          name: `${currentItem.key}_${e.type}`,
          title: '当前事件回调参数',
          disabled: e.args?.length,
          children: e.args?.map((arg, i) => ({
            name: `${currentItem.key}_${e.type}.${i}`,
            title: arg
          }))
        })
      })
    }
    function getModules (list) {
      list.forEach((item) => {
        if (item.config?.events) {
          Object.values(item.config.events).forEach(e => {
            children.push({
              name: `${item.key}_${e.type}`,
              title: `${item.config.label}_${e.label}回调参数`,
              disabled: e.args?.length,
              children: e.args?.map((arg, i) => ({
                name: `${item.key}_${e.type}.${i}`,
                title: arg
              }))
            })
          })
        }
        if (item.config?.options) {
          const _children = []
          item.config.options?.forEach(o => o.children && _children.push(...o.children))
          getModules(_children)
        }
      })
    }
    getModules(drDesign.schema?.list)
    return children
  }

  function getApiResults () {
    return (drDesign.schema?.apiList || []).filter(api => !api.isFileDown).map(api => ({
      title: api.name,
      name: api.objId
    }))
  }

  const varTreeOpts = computed(() => {
    return [
      {
        title: '外部变量',
        disabled: true,
        children: (drDesign.schema.variables || []).map(({ name }) => ({ name, title: name }))
      },
      {
        title: '事件动作',
        disabled: true,
        children: getEventVars()
      },
      {
        title: '接口返回数据',
        disabled: true,
        children: getApiResults()
      },
      {
        title: '组件',
        disabled: true,
        children: getModuleTree(true, drDesign)
      }
    ]
  })

  function renderTreeItem ({ node, data }) {
    return <div style='display: flex;align-items: center;justify-content: space-between;' onClick={() => data.disabled || selectVar(data.title, data.name)}>
      <span>{data.title}</span>
      {/* {dateTypeMap.value[data.dataType] && <ElTag>{dateTypeMap.value[data.dataType]?.name}</ElTag>} */}
    </div>
  }

  function renderFxItem ({ data }) {
    return <span onMouseenter={() => { state.currentFxInfo = data.info || '' }}>{data.label}</span>
  }

  return {
    state,
    listToString,
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
                    defaultExpandAll: false,
                    renderItem: renderFxItem
                  }}
                  onNodeClick={({ data }) => data.value && selectFx(data.value)}
                >
                </CipTree>
            </ElCard>
            <ElCard shadow="never">{state.currentFxInfo}</ElCard>
        </div>
      </CipDialog>
    }
  }
}
