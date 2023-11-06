import { CipButton } from '@xdp/button'
import { ElInput } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'

export default {
  props: {
    schema: {}
  },
  emits: ['update:schema'],
  setup (props, { emit }) {
    function addRouterQuery () {
      /* eslint-disable */
      if (props.schema.routerQuery) {
        props.schema.routerQuery.push({value: ''})
      } else {
        props.schema.routerQuery = [{value: ''}]
      }
    }

    function removeRouterQuery(i) {
      props.schema.routerQuery.splice(i, 1)
    }

    return () => <div style={'padding: 0 12px;'}>
      <div>

      </div>
      {(props.schema.routerQuery || []).map((r,i) => <div class="mb-2" style="display: flex">
        <ElInput placeholder="请输入路由参数名称" v-model={r.value} />
        <CipButton square icon={Delete} class="ml-2" onClick={() => removeRouterQuery(i)}></CipButton>
      </div>)}
      <CipButton style="width: 100%" onClick={addRouterQuery}>新增路由参数</CipButton>
    </div>
  }
}
