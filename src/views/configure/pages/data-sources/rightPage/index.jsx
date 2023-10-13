import CipButton from '@cip/components/cip-button'
import CipTabs from '@cip/components/cip-tabs-plus'
import CipTabPane from '@cip/components/cip-tabs-plus/tab'
import { reactive, watch } from 'vue'
import { dataFieldEntityEntity, dataInfoEntityEntity } from '@/api/entity/chr'
import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig, CipForm } from 'd-render'
import { baseDicService, dataInfoService } from '@/api'
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
      name: { required: true, span: 6 },
      tableName: { required: true, label: '数据表名称', span: 6 },
      idStrategy: {
        required: true,
        type: 'select',
        span: 6,
        optionProps: { label: 'name' },
        asyncOptions: async () => {
          const { data } = await baseDicService.idStrategy()
          return data
        }
      },
      titleTpl: { span: 6 },
      _systemAttrs: {
        label: '系统属性',
        span: 6,
        type: 'compositionCheckbox',
        otherKey: ['saveOperator', 'saveTimestamp', 'logicDelete', 'isTree'],
        option: {
          saveOperator: '记录操作人',
          saveTimestamp: '记录时间',
          logicDelete: '是否逻辑删除',
          isTree: '树形结构'
        }
      },
      remark: { span: 6, type: 'textarea', autosize: { minRows: 6, maxRows: 6 } }
    }), dataInfoEntityEntity)

    const tableColumns = generateFieldList(defineFormFieldConfig({
      fields: {
        type: 'table',
        hideLabel: true,
        options: generateFieldList(defineTableFieldConfig({
          isPk: { align: 'center', type: 'tableRadio', writable: true, label: '主键', width: '60px' },
          name: { label: '字段名称', writable: true },
          title: { label: '显示名称', writable: true },
          typeScope: {
            type: 'dataType2',
            width: 250,
            label: '类型',
            otherKey: 'refDataId',
            writable: true
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

    const onSave = (resolve, reject) => {
      state.loading = true
      dataInfoService.infoSave(state.dataModel).then(res => {
        CipMessage.success(res.message)
      }).finally(() => { state.loading = false })
    }

    return () => <div class="flex-column" style={{ height: '100%' }}>
      <div class="flex-auto">
        <CipTabs v-model={state.active}>
          <CipTabPane lazy label='基础信息' name={0}>
            <CipForm v-model:model={state.dataModel} fieldList={formFieldList} labelWidth="110px"></CipForm>
          </CipTabPane>
          <CipTabPane lazy label='字段' name={1}>
            <CipForm v-model:model={state.dataModel} fieldList={tableColumns} labelWidth="110px"></CipForm>
          </CipTabPane>
        </CipTabs>
      </div>
      <div class="flex-shrink flex-end pa-3" style="box-shadow: 0 -2px 12px 0 rgba(0,0,0,.06); margin: 0 -20px">
        <CipButton type="primary" loading={state.loading} onClick={onSave}>保存</CipButton>
      </div>
    </div>
  }
}
