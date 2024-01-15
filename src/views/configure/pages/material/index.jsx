import { onMounted, ref, reactive } from 'vue'
import CipTree from '@cip/components/cip-tree'
import styles from './index.module.less'
import { materialService } from '@lc/api/service/chr'
import CipDialog from '@cip/components/cip-dialog'
import { CipForm } from 'd-render'
import { useDataModel } from './use-page'
import CipButtonText from '@cip/components/cip-button-text'
import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon } from 'element-plus'
import { MoreFilled, Folder, Document, FolderOpened } from '@element-plus/icons-vue'
import CipUpload from '@cip/components/cip-upload'

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
    const state = reactive({
      loading: false
    })
    const getPages = () => {
      state.loading = true
      materialService.tree().then(({ data }) => {
        pages.value = [{
          id: '0',
          name: '根目录',
          isDir: true,
          children: data
        }]
      }).finally(() => { state.loading = false })
    }

    const { dialog, dialogTitle, dataModel, dataModelFieldList, saveDataModel, handleClick } = useDataModel(getPages, state)

    function uploadFile ({ file }, { id }) {
      state.loading = true
      materialService.create({ file, pid: id }).then(({ data }) => {
        state.url = materialService.img(data.id)
        getPages()
      }).finally(() => { state.loading = false })
    }

    const treeConfig = {
      showButtons: true,
      nodeKey: 'id',
      buttonList: ['append', 'remove'],
      optionProps: {
        label: 'name',
        value: 'path'
      },
      expandOnClickNode: false,
      highlightCurrent: true,
      renderItem ({ node, data }) {
        return <>
          <ElIcon class="mr-1">{data.isDir ? (node.expanded ? <FolderOpened /> : <Folder />) : <Document />}</ElIcon>
          <span>{data.name}</span>
        </>
      },
      renderNode: (data, node, store) => {
        return <ElDropdown onCommand={(command) => handleClick(command, { data, node, store })} trigger={'click'}>
        {{
          default: () => <CipButtonText icon={MoreFilled} onClick={e => e.stopPropagation()} />,
          dropdown: () => <ElDropdownMenu>
            {data.isDir
              ? <>
              <ElDropdownItem command={'upload'}>
                <CipUpload action="" uploadFile={opts => uploadFile(opts, data)}><div>上传文件</div></CipUpload>
              </ElDropdownItem>
              <ElDropdownItem command={'add'}>新增子目录</ElDropdownItem>
              {data.id !== '0' && <ElDropdownItem command={'edit'}>编辑</ElDropdownItem>}
            </>
              : <ElDropdownItem command={'download'}>下载</ElDropdownItem>}
            {data.id !== '0' && <ElDropdownItem command={'deleteItem'}>删除</ElDropdownItem>}
          </ElDropdownMenu>
        }}

      </ElDropdown>
      }
    }

    onMounted(() => {
      getPages()
    })

    // function genDropdownMenu (data) {
    //   debugger
    //   return <ul class="el-dropdown-menu">
    //     <li class="el-dropdown-menu__item">下载</li>
    //   </ul>
    // }

    function handleContextMenu (e, data) {
      console.log(e, data)
    }

    return () => <div class={styles.wrapper}>
      <CipTree
        v-loading={state.loading}
        ref={tree$}
        nodeKey={'id'}
        style={{ width: '100%' }}
        config={treeConfig}
        options={pages.value}
        onTree-reload={getPages}
        onNode-contextmenu={handleContextMenu}
      >
      </CipTree>
      <CipDialog
          v-model={dialog.value}
          title={dialogTitle.value}
          size={'mini'}
          onConfirm={saveDataModel}
        >
          <CipForm v-model:model={dataModel.value} fieldList={dataModelFieldList} labelWidth="100px"></CipForm>
        </CipDialog>
    </div>
  }
}
