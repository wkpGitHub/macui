import { ref } from 'vue'
import CipTree from '@cip/components/cip-tree'
import styles from './index.module.less'
import { pageInfoService } from '@/api/service/chr'
import CipDialog from '@cip/components/cip-dialog'
import { CipForm } from 'd-render'
import { usePage } from './use-page'
import { pageSimpleFieldList } from './config'
export default {
  name: 'PageTree',
  props: {
    modelValue: [Number, String]
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const pages = ref([])

    const getPages = () => {
      pageInfoService.tree({}).then(res => {
        pages.value = res.data
      })
    }

    const treeConfig = {
      isTreeAppend: true,
      showButtons: true,
      nodeKey: 'id',
      buttonList: ['append', 'remove'],
      optionProps: {
        label: 'name',
        value: 'path'
      },
      highlightCurrent: true
    }
    const { page, pageDialog, createPage, savePage, updatePage } = usePage()

    const handleCurrentChange = (item, path) => {
      emit('update:modelValue', item.id)
    }
    getPages()

    return () => <div class={styles.wrapper}>
      <CipTree
        style={{ width: '100%' }}
        config={treeConfig}
        options={pages.value}
        onCurrent-change={handleCurrentChange}
        onNode-append={createPage}
        onNode-edit={updatePage}
        onTree-reload={getPages}
      >
      </CipTree>
      <CipDialog
        v-model={pageDialog.value}
        title={'xx'}
        size={'small'}
        onConfirm={savePage}
      >
        <CipForm
          v-model:model={page.value}
          fieldList={pageSimpleFieldList}/>
      </CipDialog>
    </div>
  }
}
