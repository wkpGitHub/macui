import { DRender } from 'd-render'
import { inject, ref, provide, reactive, computed } from 'vue'
import { ElIcon, ElTag } from 'element-plus'
import { CaretRight } from '@element-plus/icons-vue'
const dRender = new DRender()
const isLayoutType = (type) => dRender.isLayoutType(type)
const CustomTree = {
  props: {
    list: Object,
    modelValue: [String, Number],
    isSub: Boolean
  },
  setup (props) {
    const pageDesign = inject('drDesign', {})
    return () => <div class={{ 'structure-tree': !props.isSub, 'structure-sub-tree': props.isSub }}>{props.list?.map(item => {
      const isLayout = isLayoutType(pageDesign?.drawTypeMap?.[item.config.type] ?? item.config.type)
      if (isLayout) {
        return <CustomTreeParent modelValue={props.modelValue} item={item}/>
      }
      return <CustomTreeItem modelValue={props.modelValue} item={item}/>
    })}
    </div>
  }
}
const TreeTitle = {
  props: {
    title: String,
    subTitle: String,
    span: Number
  },
  setup (props) {
    const subTitle = computed(() => `{ ${props.subTitle} }`)
    return () => <span class="structure-tree__item__text">{props.title}
      {
        props.span && <ElTag size='small' type='warning'> {props.span}</ElTag>
      }
      <span class="structure-tree__item__status" title={subTitle.value}>{subTitle.value}</span>
    </span>
  }
}
const CustomTreeParent = {
  props: { item: Object, modelValue: [String, Number] },
  setup (props) {
    const isExpand = ref(false)
    const toggleExpand = () => {
      isExpand.value = !isExpand.value
    }
    const pageStructure = inject('page-structure', {})
    return () => <div class={['structure-sub-tree', { 'is-expand': isExpand.value, 'is-active': props.modelValue === props.item.id }]}>
      <div class={'structure-sub-tree__title'} onClick={(e) => {
        if (e.target === e.currentTarget) {
          pageStructure.onSelect(props.item)
        }
      }}>
        <ElIcon class={['structure-sub-tree__title__icon', { 'is-expand': isExpand.value }]}
                onClick={() => toggleExpand()}><CaretRight/></ElIcon>
        <TreeTitle title={props.item.config.type} subTitle={props.item.key} onClick={() => pageStructure.onSelect(props.item)} span={props.item.config.span}></TreeTitle>
      </div>
      <div class={['structure-sub-tree__panel', { 'is-expand': isExpand.value }]}>
        {props.item.config.options.map((option, idx) => <div key={`${option.key}-${idx}`}>
          {/* <ElTag type={'info'}>slot-{option.key}</ElTag> */}
          <div>
            <CustomTree isSub={true} modelValue={props.modelValue} list={option.children}/>
          </div>
        </div>)}
      </div>
    </div>
  }
}
const CustomTreeItem = {
  props: { item: Object, modelValue: [String, Number] },
  setup (props) {
    const pageStructure = inject('page-structure', {})
    return () => <div class={['structure-tree__item', { 'is-active': props.modelValue === props.item.id }]}
                      onClick={() => pageStructure.onSelect(props.item)}
    ><TreeTitle title={props.item.config.type} subTitle={props.item.key} span={props.item.config.span}></TreeTitle></div>
  }
}

export default {
  inheritAttrs: false,
  props: {
    schema: Object,
    selectItem: Object
    // modelValue: [String, Number]
  },
  emits: ['update:selectItem'],
  setup (props, { emit }) {
    provide('page-structure', reactive({
      activeId: props.selectItem?.id,
      onSelect: (item) => {
        emit('update:selectItem', item)
      }
    }))
    return () => <div class={'page-design-structure'}>
      <CustomTree
        modelValue={props.selectItem?.id}
        list={props.schema?.list}>
      </CustomTree>

    </div>
  }
}
