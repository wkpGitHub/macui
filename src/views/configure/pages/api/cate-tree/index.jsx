import { defineComponent } from 'vue'
import { Search, Delete, Edit } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import CipTree from '@cip/components/cip-tree'
import CipDialog from '@cip/components/cip-dialog'
import { CipForm } from 'd-render'
import { useCurd } from '@cip/hooks/use-curd'
import { apiConfigService } from '@/api'
import { formFieldList } from './config'
import { useTree } from './hooks'

import styles from './index.module.less'

export default defineComponent({
  name: 'CateTree',
  inheritAttrs: false,
  props: {
    modelValue: [String, Number, Object],
    refreshTable: {}
  },
  emit: ['update:modelValue', 'cateChange'],
  setup (props, { emit, attrs, expose }) {
    const {
      item, // 表单数据
      createItem, // 新增按钮
      updateItem,
      saveItem, // 保存操作 即新增/修改
      deleteItem, // 删除操作
      getItemList, // 获取表格数据
      itemList, // 表格数据
      listLoading,
      itemDialog,
      dialogTitle
    } = useCurd(apiConfigService, {
      pageFn: 'tree',
      updateFn: 'save',
      createFn: 'save',
      deleteFn: 'del',
      itemType: '分类'
    })
    // 删除分类
    const deleteNode = (e, data) => {
      e.stopPropagation()
      deleteItem(data, data.name)
    }
    // 编辑分类
    const editNode = (e, data) => {
      e.stopPropagation()
      updateItem(data)
    }

    const {
      currentNodeKey,
      tree$,
      expandedKeys,
      handleExpandChange,
      handleNodeClick
    } = useTree(props, emit, listLoading, item, itemList)
    // 请求数据
    getItemList()

    // 导入接口完成后 需要刷新分类树和右侧表格
    function refresh () {
      getItemList()
      props.refreshTable?.()
    }
    expose({
      getItemList,
      refresh
    })

    function renderTreeItem ({ node, data }) {
      return <div class={styles.treeItem}>
        <div class={styles.title}>
          <i class={['iconfont iconfolder', styles.icon]}/> {data.name}({data.cnt ?? 0})
        </div>
        {currentNodeKey.value === data.id && <div class={styles.handler}>
          <ElIcon onClick={(e) => { editNode(e, data) }}><Edit /></ElIcon>
          <ElIcon onClick={(e) => { deleteNode(e, data) }}><Delete /></ElIcon>
        </div>}
      </div>
    }

    return () => <>
      <CipTree
        {...attrs}
        ref={tree$}
        icon={Search}
        nodeKey='id'
        options={itemList.value}
        config={{
          optionProps: {
            label: 'name'
          },
          isTreeAppend: true,
          renderItem: renderTreeItem,
          highlightCurrent: true,
          defaultExpandAll: false,
          expandOnClickNode: false,
          currentNodeKey: currentNodeKey.value
        }}
        defaultExpandedKeys={expandedKeys.value}
        onTreeReload={(e) => {
          getItemList()
        }}
        onNodeAppend={() => { createItem() }}
        onNodeClick={({ data }) => {
          handleNodeClick(data)
        }}
        onNodeCollapse={(data) => {
          handleExpandChange('collapse', data)
        }}
        onCurrentChange={(val) => {
          currentNodeKey.value = val?.id
          emit('cateChange')
        }}
      >
      </CipTree>
      <CipDialog
        v-model={itemDialog.value}
        title={dialogTitle.value}
        onConfirm={saveItem}
        size={'small'}
      >
        <CipForm
          v-model:model={item.value}
          fieldList={formFieldList}
          labelWidth={'80px'}
        />
      </CipDialog>
    </>
  }
})
