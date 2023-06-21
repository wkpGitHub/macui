import { computed, ref } from 'vue'
import { generateFieldList } from 'd-render'
import { keysToConfigMap } from '@d-render/shared'
import { dataInfoService, dbInfoService } from '@/api'
import CipMessage from '@cip/components/cip-message'

export const useDataModel = () => {
  const dialog = ref(false)
  const dialogTitle = ref('')
  const dataModel = ref({})
  const dataModelFieldList = computed(() => {
    let keys
    if (dataModel.value.type === 'entity') {
      keys = ['dbId', 'name']
    } else {
      keys = ['name']
    }
    return generateFieldList(keysToConfigMap(keys), {
      dbId: {
        label: '所属数据库',
        type: 'select',
        autoSelect: true,
        optionProps: {
          label: 'name',
          value: 'id'
        },
        asyncOptions: async () => {
          const { data } = await dbInfoService.list({})
          return data
        }
      },
      name: {
        label: '名称',
        required: true
      }
    })
  })
  const commandEnum = {
    dic: '枚举',
    entity: '实体',
    pojo: '数据结构'
  }
  const handleCommand = (command) => {
    dataModel.value = { type: command }
    dialogTitle.value = commandEnum[command]
    dialog.value = true
    console.log('handleCommand', command)
  }
  const saveDataModel = (resolve, reject) => {
    dataInfoService.infoSave(dataModel.value).then(res => {
      CipMessage.success(res.message)
      resolve(res)
    }).catch(reject)
  }
  return {
    dialog,
    dialogTitle,
    dataModel,
    dataModelFieldList,
    handleCommand,
    saveDataModel
  }
}
