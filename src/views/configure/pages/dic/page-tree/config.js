import { generateFieldList } from 'd-render'
import { pageInfoEntityEntity } from '@/api/entity/chr'
import { keysToConfigMap } from '@d-render/shared'
import { cloneDeep, depthFirstSearchIndexTree, getFieldValue, getPropertyKeyByPath } from '@cip/utils/util'
export const pageSimpleFieldList = generateFieldList(
  keysToConfigMap(['pid', 'name', 'path']),
  pageInfoEntityEntity,
  {
    pid: {
      type: 'selectTree',
      dependOn: ['id', '_temp'],
      optionProps: { value: 'id', label: 'name' },
      asyncOptions: ({ id, _temp }) => {
        const tree = cloneDeep(_temp)
        const idx = depthFirstSearchIndexTree(tree, id, 'id')
        if (idx) {
          const len = idx.length
          if (len > 1) {
            // 孙中
            const parentItemIdx = idx.slice(0, len - 1)
            const currentIdx = idx[len - 1]
            const key = getPropertyKeyByPath(parentItemIdx, { children: 'children' })
            const parentItem = getFieldValue(tree, key)
            parentItem.children.splice(currentIdx, 1)
          } else {
            // 子中
            tree.splice(idx[0], 1)
          }
        }
        // 需要过滤掉自己
        return tree
      }
    }
  }
)
