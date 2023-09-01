import { layoutProps } from '@d-render/shared'
import { ElTabs, ElTabPane } from 'element-plus'
export default {
  name: 'tabs-layout',
  props: layoutProps,
  setup (props, { slots }) {
    const Item = (option, index) => {
      const { children: classify, ...classifyConfig } = option
      return <ElTabPane label={classifyConfig.label} name={index.toString()} key={classifyConfig.value}>
        {slots.item?.({ children: classify })}
      </ElTabPane>
    }
    return () => <ElTabs>
      {props.config.options?.map(Item)}
    </ElTabs>
  }
}
