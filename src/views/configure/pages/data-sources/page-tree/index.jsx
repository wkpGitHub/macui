import { onMounted, ref, nextTick } from 'vue'
import CipTree from '@cip/components/cip-tree'
import styles from './index.module.less'
import { dataInfoService, dbInfoService } from '@lc/api/service/chr'
import CipDialog from '@cip/components/cip-dialog'
import { CipForm } from 'd-render'
import { useDataModel } from './use-page'
// import CipButtonText from '@cip/components/cip-button-text'
// import { MoreFilled } from '@element-plus/icons-vue'
// import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'
export default {
  name: 'PageTree',
  props: {
    modelValue: [Number, String],
    type: String
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
      dbInfoService.list({}).then(res => {
        // let children = res.data.datasources
        // switch (props.type) {
        //   case 'entity':
        //     children = res.data.datasources
        //     break
        //   case 'dic':
        //     children = res.data.dics
        //     break
        //   case 'pojo':
        //     children = res.data.pojos
        //     break
        // }
        pages.value = res.data
        // 获取firstLeaf
        const firstLeaf = findFirstLeaf(res.data ?? [])
        nextTick().then(() => {
          tree$.value.setCurrentKey(firstLeaf.id)
        })
        emit('update:modelValue', firstLeaf.id)
      })
    }

    const {
      dialog, dialogTitle, dataModel, dataModelFieldList, handleCommand, saveDataModel
      // handleClick
    } = useDataModel(getPages)

    const treeConfig = {
      isTreeAppend: true,
      showButtons: false,
      nodeKey: 'id',
      // buttonList: ['append', 'remove'],
      optionProps: {
        label: 'name',
        value: 'id'
      },
      expandOnClickNode: false,
      highlightCurrent: true,
      renderNode: (data, node, store) => {
        return <div></div>
        //   return <ElDropdown onCommand={(command) => handleClick(command, { data, node, store })} trigger={'click'}>
        //   {{
        //     default: () => <CipButtonText icon={MoreFilled} onClick={e => e.stopPropagation()} />,
        //     dropdown: () => <ElDropdownMenu>
        //       <ElDropdownItem command={'updateItem'}>编辑</ElDropdownItem>
        //       <ElDropdownItem command={'deleteItem'}>删除</ElDropdownItem>
        //     </ElDropdownMenu>
        //   }}
      // </ElDropdown>
      }
    }
    const handleDrop = (draggingNode, dropNode, dropType, ev) => {
      const changePage = draggingNode.data
      const pid = dropNode.data.id
      changePage.pid = pid
      dataInfoService.save(changePage).then(() => {
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
        showButton={false}
        onCurrent-change={handleCurrentChange}
        onNode-append={() => handleCommand(props.type)}
        onTree-reload={getPages}
      >
      </CipTree>
      <CipDialog
        v-model={dialog.value}
        title={`新增${dialogTitle.value}`}
        size={'mini'}
        onConfirm={saveDataModel}
      >
        <CipForm v-model:model={dataModel.value} fieldList={dataModelFieldList} labelWidth="85px"></CipForm>
      </CipDialog>
    </div>
  }
}
