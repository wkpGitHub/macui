import {
  // computed,
  defineComponent,
  ref
} from 'vue'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'

import ExpandTable from './expand-table'

export default defineComponent({
  name: 'obj-fields',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const {
      // proxyValue,
      width
      // securityConfig
    } = useFormInput(props, ctx)

    const data = ref([
      {
        name: 'name',
        title: '姓名',
        type: 'string'
      },
      {
        name: 'obj',
        title: '对象',
        type: 'object',
        children: [
          {
            name: 'obj_name',
            title: 'obj姓名',
            type: 'string'
          },
          {
            name: 'obj_obj',
            title: 'obj姓名',
            type: 'object',
            children: [
              {
                name: 'obj_obj_name',
                title: 'obj_obj姓名',
                type: 'string'
              }
            ]
          }
        ]
      }
    ])
    return () => <div style={{ width: width.value }}>
      <ExpandTable data={data.value}/>
    </div>
  }
})
