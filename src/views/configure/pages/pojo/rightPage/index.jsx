import CipButton from '@cip/components/cip-button'
import { reactive, watch } from 'vue'
import { dataFieldEntityEntity, dbInfoEntityEntity } from '@lc/api/entity/chr'
import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig, CipForm } from 'd-render'
import { dataInfoService } from '@lc/api'
import CipMessage from '@cip/components/cip-message'

export default {
  props: {
    id: String
  },
  setup (props) {
    const state = reactive({
      active: 0,
      dataModel: {},
      loading: false
    })
    const formFieldList = generateFieldList(defineFormFieldConfig({
      name: {
        span: 12
      },
      remark: {
        span: 12
      }
    }), dbInfoEntityEntity)

    const tableColumns = generateFieldList(defineFormFieldConfig({
      fields: {
        type: 'table',
        hideLabel: true,
        options: generateFieldList(defineTableFieldConfig({
          isPk: { align: 'center', type: 'tableRadio', writable: true, label: '主键', width: '60px', fixed: 'left' },
          name: { label: '字段名称', writable: true, fixed: 'left', width: '140px' },
          title: { label: '显示名称', writable: true, width: '120px' },
          typeScope: {
            type: 'dataType2',
            label: '类型',
            outDependOn: ['dbId'],
            otherKey: [
              'refDataId'
            ],
            writable: true,
            width: '240px'
          }, // 此处需要一个自定义组件来处理
          length: {
            writable: true,
            step: 1,
            min: 1
          },
          scale: {
            step: 1,
            min: 0,
            writable: true
          },
          nullable: {
            align: 'center',
            type: 'singleCheckbox',
            option: { value: true, label: '' },
            writable: true,
            dependOn: ['isPk'],
            width: '92px',
            changeValue: ({ isPk }) => {
              if (isPk) {
                return { value: false }
              }
            },
            changeConfig: (config, { isPk }) => {
              config.disabled = isPk
              return config
            }
          },
          isUnique: {
            align: 'center',
            type: 'singleCheckbox',
            option: { value: true, label: '' },
            writable: true,
            width: '92px',
            dependOn: ['isPk'],
            changeValue: ({ isPk }) => {
              if (isPk) {
                return { value: true }
              }
            },
            changeConfig: (config, { isPk }) => {
              config.disabled = isPk
              return config
            }
          }
        }), dataFieldEntityEntity)
      }
    }))

    const getDataInfo = async () => {
      const { data } = await dataInfoService.detail({ id: props.id })
      return data
    }
    watch(() => props.id, () => {
      getDataInfo().then(res => {
        state.dataModel = res
      })
    }, { immediate: true })

    const onSave = () => {
      state.loading = true
      dataInfoService.infoSave(state.dataModel).then(res => {
        CipMessage.success(res.message)
      }).finally(() => { state.loading = false })
    }

    return () => <div class="flex-column" style={{ height: '100%' }}>
      <div class="flex-auto">
        <CipForm v-model:model={state.dataModel} fieldList={formFieldList} labelWidth="60px" grid={24}></CipForm>
        <CipForm v-model:model={state.dataModel} fieldList={tableColumns}></CipForm>
      </div>
      <div class="flex-shrink flex-end pa-3" style="box-shadow: 0 -2px 12px 0 rgba(0,0,0,.06); margin: 0 -20px">
        <CipButton type="primary" loading={state.loading} onClick={onSave}>保存</CipButton>
      </div>
    </div>
  }
}
