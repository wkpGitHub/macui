import { nextTick, ref, watch, provide, computed } from 'vue'
import { CipForm, isLayoutType } from 'd-render'
import { getComponentConfigure } from './config'
import { ElSelect, ElOption, ElInput } from 'element-plus'
import {
  configureOptionsFieldConfigMap,
  defaultConfigureOptions,
  generateFieldList
} from '@d-render/shared'
import CipInputSwitch from '@cip/components/cip-input-switch'
import CipNumber from '@cip/components/cip-number'
import CodeMirrorDialog from './code-mirror-dialog'
import ChangeValue from './fn-config/change-value'
import ChangeConfig from './fn-config/change-config'
export default {
  name: 'DrDesignFieldConfig',
  inheritAttrs: false,
  props: {
    selectItem: { type: Object, default: () => ({}) },
    schema: Object
  },
  emits: ['update:selectItem'],
  setup (props, { emit }) {
    provide('getSchema', () => props.schema)
    // TODO: 通过源代码修改，修改的值无法正常的回显，因为检测不到selectItem的变化
    const configBridge = ref({})
    const getOtherKeyItem = (item, otherKey) => {
      return {
        config: {
          label: item.config?.label
        },
        id: otherKey,
        key: otherKey
      }
    }

    const getDependOnSelectList = (
      list = [],
      keyList = [],
      totalFields = [],
      otherKeyList = [],
      isInTable = false
    ) => {
      list.forEach((item) => {
        const type = item.config?.type
        if (isLayoutType(type)) {
          const options = item.config.options || []
          const children = options.map((option) => option.children).flat()
          getDependOnSelectList(children, keyList, totalFields, otherKeyList)
        } else if (type === 'table') {
          const options = item.config?.options
          if (options?.length) {
            getDependOnSelectList(
              options,
              keyList,
              totalFields,
              otherKeyList,
              true
            )
          }
        } else if (
          [
            'formCountersignPerson',
            'roleDictionary',
            'image',
            'file',
            'divider',
            'signature',
            'formwork',
            'editor',
            'resourceFormTable',
            'staticInfo'
          ].includes(type)
        ) {
          // 这些东西没必要依赖，什么也不做
        } else {
          if (isInTable) {
            item.config.isInTable = true
          }
          keyList.push(item)
          if (item?.config?.otherKey) {
            const otherKey = item.config.otherKey
            if (Array.isArray(otherKey)) {
              otherKeyList = [
                ...otherKeyList,
                ...otherKey.map((key) => getOtherKeyItem(item, key))
              ]
            } else {
              otherKeyList.push(getOtherKeyItem(item, otherKey))
            }
          }
        }
      })
      return { keyList, otherKeyList }
    }

    const dependOnOptions = computed(() => {
      const { keyList } = getDependOnSelectList(props?.schema?.list ?? [])
      return [...keyList]
    })
    const isCurrentInTable = computed(() => {
      const { keyList, otherKeyList } = getDependOnSelectList(
        props?.schema?.list ?? []
      )
      const curr = [...keyList, ...otherKeyList].find(
        (item) => item?.key === configBridge.value?.key
      )
      return curr?.config?.isInTable ?? false
    })
    // 根据依赖修改值与配置的配置
    const onConfigUpdate = (value, type = 'value') => {
      if (type === 'value') {
        nextTick(() => {
          updateSelectItem({
            ...props.selectItem.config,
            changeValueStr: value
          })
        })
      } else {
        nextTick(() => {
          updateSelectItem({
            ...props.selectItem.config,
            changeConfigStr: value
          })
        })
      }
    }
    watch(
      () => props.selectItem,
      (val) => {
        if (!val?.key || !val?.id) return
        configBridge.value = val.config
        configBridge.value.key = val.key
        configBridge.value.id = val.id
      },
      { immediate: true, deep: true }
    )

    const getFieldComponentConfigureFieldConfigList = async (val) => {
      let configure
      try {
        configure = await getComponentConfigure(val)
      } catch (e) {
        // 若获取配置发生错误直接使用默认配置
        console.warn(
          `form-design: 获取${val}组件配置文件发生错误,使用默认配置进行替换`
        )
        configure = defaultConfigureOptions()
      }
      return generateFieldList(configure, configureOptionsFieldConfigMap)
    }
    const fieldComponentConfigureFieldConfigList = ref([])
    watch(
      () => configBridge.value.type,
      (val) => {
        if (val) {
          fieldComponentConfigureFieldConfigList.value = []
          // dependOn存在缓存问题，暂时先进行清空再赋值操作
          getFieldComponentConfigureFieldConfigList(val).then((res) => {
            nextTick().then(() => {
              fieldComponentConfigureFieldConfigList.value = res
            })
          })
        } else {
          return []
        }
      },
      { immediate: true }
    )

    const updateSelectItem = (val) => {
      const selectItem = props.selectItem
      selectItem.key = val.key
      // Reflect.deleteProperty(val, 'key')
      // Reflect.deleteProperty(val, 'id')
      selectItem.config = val // { ...val }
      emit('update:selectItem', selectItem)
    }
    const dependOnSelectList = computed(() => {
      const { keyList, otherKeyList } = getDependOnSelectList(
        props?.schema?.list ?? []
      )
      return [...keyList, ...otherKeyList]
    })
    return () => (
      <CipForm
        labelPosition="top"
        model={configBridge.value}
        onUpdate:model={updateSelectItem}
        fieldList={fieldComponentConfigureFieldConfigList.value}
        modelKey="id">
        {{
          labelWidthInput: ({ fieldKey, updateModel }) => (
            <CipInputSwitch
              modelValue={configBridge.value[fieldKey]}
              onUpdate:modelValue={updateModel}>
              {{
                input: ({ disabled, modelValue, updateModelValue }) => (
                  <CipNumber
                    disabled={disabled}
                    modelValue={modelValue}
                    step={10}
                    min={0}
                    controls-position="right"
                    onUpdate:modelValue={updateModelValue}></CipNumber>
                )
              }}
            </CipInputSwitch>
          ),
          validateValueInput: ({ fieldKey, updateModel }) => (
            <CipInputSwitch
              modelValue={configBridge.value[fieldKey]}
              onUpdate:modelValue={updateModel}>
              {{
                input: ({ disabled, modelValue, updateModelValue }) => (
                  <ElSelect
                    disabled={disabled}
                    modelValue={modelValue}
                    onUpdate:modelValue={updateModelValue}
                    placeholder="选择值类型">
                    <ElOption value="email" label="电子邮箱"></ElOption>
                    <ElOption value="mobilePhone" label="手机号"></ElOption>
                    <ElOption value="identityCard" label="身份证号"></ElOption>
                  </ElSelect>
                )
              }}
            </CipInputSwitch>
          ),
          regexpValidateInput: ({ fieldKey, updateModel }) => (
            <CipInputSwitch
              modelValue={configBridge.value[fieldKey]}
              onUpdate:modelValue={updateModel}>
              {{
                input: ({ disabled, modelValue, updateModelValue }) => (
                  <ElInput
                    disabled={disabled}
                    placeholder="填写正则表达式"
                    modelValue={modelValue}
                    onUpdate:modelValue={updateModelValue}
                    clearable></ElInput>
                )
              }}
            </CipInputSwitch>
          ),
          // dependOnInput: ({ disabled, fieldKey, updateModel }) => (
          //   <ElSelect
          //     multiple
          //     disabled={disabled}
          //     modelValue={configBridge.value[fieldKey]}
          //     onUpdate:modelValue={updateModel}
          //     placeholder="选择数据依赖">
          //     {dependOnSelectList.value.map((item) => (
          //       <ElOption
          //         value={item.id}
          //         label={`${item.config.label}(${item.key})`}
          //         key={item.id}></ElOption>
          //     ))}
          //   </ElSelect>
          // ),
          // changeValueStrInput: ({ fieldKey, updateModel }) => (
          //   <CodeMirrorDialog
          //     fn-name="changeValue"
          //     fieldKey={fieldKey}
          //     updateModel={updateModel}
          //     itemConfig={configBridge.value}></CodeMirrorDialog>
          // ),
          valueChangeConfigInput: ({ updateModel }) => (
            <ChangeValue
              updateModel={updateModel}
              itemConfig={configBridge.value}
              dependOnList={dependOnOptions.value}
              isCurrentInTable={isCurrentInTable.value}
              onUpdateConfig={(val) =>
                onConfigUpdate(val, 'value')
              }></ChangeValue>
          ),
          changeConfigStrInput: ({ fieldKey, updateModel }) => (
            <CodeMirrorDialog
              fn-name="changeValue"
              fieldKey={fieldKey}
              updateModel={updateModel}
              itemConfig={configBridge.value}></CodeMirrorDialog>
          ),
          configChangeConfigInput: ({ updateModel }) => (
            <ChangeConfig
              updateModel={updateModel}
              itemConfig={configBridge.value}
              dependOnList={dependOnOptions.value}
              isCurrentInTable={isCurrentInTable.value}
              onUpdateConfig={(val) =>
                onConfigUpdate(val, 'config')
              }></ChangeConfig>
          )
        }}
      </CipForm>
    )
  }
}
