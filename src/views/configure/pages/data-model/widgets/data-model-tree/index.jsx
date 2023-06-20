import { ElTree, ElIcon } from 'element-plus'
import { dataInfoService, dbInfoService } from '@/api'
import { ref } from 'vue'
import Folder from './folder'
import Database from './database'
export default {
  setup () {
    const data = ref([])
    const root = [
      {
        id: 'entity',
        name: 'entity',
        title: '实体',
        getChildren: async () => {
          // 第一层获取数据库
          const { data } = await dbInfoService.list({})
          return data
        }
      },
      {
        id: 'pojo',
        name: 'pojo',
        title: '数据结构',
        getChildren: async () => {
          return []
        }
      },
      {
        id: 'enum',
        name: 'enum',
        title: '枚举',
        getChildren: async () => {
          return []
        }
      }
    ]
    data.value = root
    const getData = () => {
      data.value.forEach((v) => {
        const { getChildren } = v
        if (getChildren) {
          getChildren()
            .then(res => {
              v.children = res
              return v
            }).then(v => {
              // if (v.name === 'entity') {
              //   v.children.forEach(child => {
              //     dataInfoService.infoList({ dbId: child.id, type: 'entity' }).then(res => {
              //       console.log('child', child)
              //       child.children = res.data
              //     })
              //   })
              // }
            })
        }
      })
    }
    getData()

    const isDbInfo = (data) => {
      return !!data.dbType
    }

    const Icon = ({ node, data }) => {
      console.log('args', node, data)
      if (node.level === 1) return <Folder />
      if (node.level >= 2) {
        if (isDbInfo(data)) return <Database />
        if (data.type === 'entity') return <Folder />
        if (data.type === 'pojo') return <Folder />
        if (data.type === 'enum') return <Folder />
      }
    }
    const Text = ({ node, data }) => {
      if (isDbInfo(data)) return data.name
      return <div>
        {data.title}
      </div>
    }
    return () => <div>
      <ElTree data={data.value} node-key="id" props={{ label: 'title' }} icon={{}}>
        {{
          default: ({ node, data }) => {
            return <div style={{ display: 'flex', alignItems: 'center' }}>
              <ElIcon style={'margin-right: 10px'}><Icon node={node} data={data} /></ElIcon>
              <Text node={node} data={data}/>
            </div>
          }
        }}
      </ElTree>
    </div>
  }
}
