import { ref } from 'vue'
import { pageInfoService } from '@/api/service/chr'
import CipMessage from '@cip/components/cip-message'
export const usePage = () => {
  const page = ref({})
  const pageDialog = ref(false)
  const createPage = (data = { }) => {
    page.value = { pid: data.id ?? 0 }
    pageDialog.value = true
  }
  const updatePage = (row) => {
    page.value = { ...row }
    pageDialog.value = true
  }
  const savePage = (resolve, reject) => {
    pageInfoService
      .save(page.value)
      .then((res) => {
        CipMessage.success(res.message)
        resolve(res)
      })
      .catch(reject)
  }

  return {
    page,
    pageDialog,
    createPage,
    updatePage,
    savePage
  }
}
