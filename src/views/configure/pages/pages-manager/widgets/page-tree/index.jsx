import { onMounted, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import CipTree from '@cip/components/cip-tree'
import styles from './index.module.less'
import { pageInfoService } from '@/api/service/chr'
import CipDialog from '@cip/components/cip-dialog'
import { CipForm } from 'd-render'
import { usePage } from './use-page'
import { pageSimpleFieldList } from './config'
import CipButtonText from '@cip/components/cip-button-text'
import { MoreFilled } from '@element-plus/icons-vue'
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'
export default {
  name: 'PageTree',
  props: {
    modelValue: [Number, String]
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const tree$ = ref()
    const pages = ref([])
    const findFirstLeaf = (tree) => {
      if (tree && tree[0].children && tree[0].children.length > 1) {
        return findFirstLeaf(tree[0].children)
      } else {
        return tree[0]
      }
    }
    const getPages = () => {
      pageInfoService.tree({}).then(res => {
        pages.value = [{ name: '根路径', id: 0, children: res.data }]
        // 获取firstLeaf
        const firstLeaf = findFirstLeaf(res.data ?? [])
        nextTick().then(() => {
          tree$.value.setCurrentKey(firstLeaf.id)
        })
        emit('update:modelValue', firstLeaf.id)
      })
    }
    const { page, pageDialog, createPage, savePage, updatePage } = usePage(pages, getPages)

    const router = useRouter()
    const toDesign = ({ data, node, store }) => {
      console.log('toDesign', { data, node, store })
      const { id } = data
      const resolved = router.resolve({ name: 'configurePagesDesign', params: { id } })
      window.open(resolved.href)
    }

    const commands = {
      toDesign,
      createPage,
      updatePage
    }
    const handleCommand = (command, data) => {
      commands[command](data)
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
      expandOnClickNode: false,
      highlightCurrent: true,
      renderNode: (data, node, store) => {
        return <ElDropdown onCommand={(command) => handleCommand(command, { data, node, store })} trigger={'click'}>
        {{
          default: () => <CipButtonText icon={MoreFilled}/>,
          dropdown: () => <ElDropdownMenu>
            <ElDropdownItem command={'createPage'}>新增子页面</ElDropdownItem>
            <ElDropdownItem command={'updatePage'}>编辑</ElDropdownItem>
            {node.isLeaf && <ElDropdownItem command={'toDesign'}>设计</ElDropdownItem>}
          </ElDropdownMenu>
        }}

      </ElDropdown>
      }
    }
    const handleDrop = (draggingNode, dropNode, dropType, ev) => {
      const changePage = draggingNode.data
      const pid = dropNode.data.id
      changePage.pid = pid
      pageInfoService.save(changePage).then(() => {
      }).finally(() => {
        getPages()
      })
      console.log(draggingNode, dropNode, dropType, ev)
    }
    const handleCurrentChange = (item, node) => {
      if (node.isLeaf) {
        emit('update:modelValue', item.id)
      } else {
        tree$.value.setCurrentKey(props.modelValue)
      }
    }
    onMounted(() => {
      getPages()
    })

    return () => <div class={styles.wrapper}>
      <CipTree
        ref={tree$}
        allowDrop={() => true}
        allowDrag={() => true}
        draggable
        nodeKey={'id'}
        onNode-drop={handleDrop}
        style={{ width: '100%' }}
        config={treeConfig}
        options={pages.value}
        onCurrent-change={handleCurrentChange}
        onNode-append={() => createPage({})}
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
