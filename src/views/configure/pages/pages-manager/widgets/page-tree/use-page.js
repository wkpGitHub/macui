import { ref } from 'vue'
import { pageInfoService } from '@lc/api/service/chr'
import CipMessage from '@cip/components/cip-message'
export const usePage = (pages, getPages) => {
  const page = ref({})
  const pageDialog = ref(false)
  const createPage = ({ data }) => {
    page.value = { pid: data?.id ?? 0 }
    page.value._temp = pages.value
    pageDialog.value = true
  }
  const updatePage = ({ data }) => {
    page.value = { ...data }
    page.value._temp = pages.value
    pageDialog.value = true
  }

  const savePage = (resolve, reject) => {
    const { _temp, ...params } = page.value
    pageInfoService
      .save(params)
      .then((res) => {
        CipMessage.success(res.message)
        getPages()
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
