import { computed, ref } from 'vue'
import CipTabs from '@cip/components/cip-tabs'
import { ElScrollbar } from 'element-plus'
import ComponentProperty from './component-property.vue'
import './index.less'
export default {
  inheritAttrs: false,
  props: {
    tabList: Array
  },
  setup (props, { slots, attrs }) {
    const active = ref('component')
    const tabListBridge = computed(() => {
      return [
        { name: 'component', label: '属性' }
      ].concat(props.tabList)
    })
    console.log('tabListBridge', tabListBridge.value)
    return () => <div style={'height: 100%;'}>
      <CipTabs v-model:active={active.value} class={'dr-page-design-configure__tabs'} style={'height: 42px;'}>
        {tabListBridge.value.map(tab => {
          return <CipTabs.Tab key={tab.name} name={tab.name}><div class={'dr-page-design-configure__tabs__text'}>{tab.label}</div></CipTabs.Tab>
        })}
      </CipTabs>
      <div style={'height: calc( 100% - 42px);'}>
        <ElScrollbar>
          <div style={'padding: 0 12px;'}>
            {active.value === 'component' && <ComponentProperty {...attrs}></ComponentProperty>}
            {slots.default?.({ name: active.value })}
          </div>
        </ElScrollbar>
      </div>
    </div>
  }
}
