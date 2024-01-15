import { ref } from 'vue'
import { generateFieldList } from 'd-render'
import { materialService } from '@lc/api'
import CipMessage from '@cip/components/cip-message'
import CipMessageBox from '@cip/components/cip-message-box'

export const useDataModel = (getData, state) => {
  const dialog = ref(false)
  const dialogTitle = ref('')
  const dataModel = ref({ isDir: true })
  const dataModelFieldList = generateFieldList({
    name: { label: '目录名', required: true }
  })

  const handleClick = (command, { data }) => {
    if (command === 'deleteItem') {
      CipMessageBox.confirm(`确认删除${data.name}?`, '提示').then(res => {
        state.loading = true
        materialService.delete(data).then(() => getData()).finally(() => (state.loading = false))
      }).catch(() => {})
    } else if (command === 'download') {
      window.open(materialService.download(data.id))
    } else if (command === 'edit') {
      dialog.value = true
      dialogTitle.value = `编辑${data.name}目录`
      dataModel.value = { ...data }
    } else if (command === 'add') {
      dialog.value = true
      dialogTitle.value = `新增${data.name}子目录`
      dataModel.value.pid = data.id
    }
  }

  const saveDataModel = (resolve, reject) => {
    materialService.mkdir(dataModel.value).then(res => {
      CipMessage.success(res.message)
      resolve(res)
      getData()
    }).catch(reject)
  }
  return {
    dialog,
    dialogTitle,
    dataModel,
    dataModelFieldList,
    handleClick,
    saveDataModel
  }
}
