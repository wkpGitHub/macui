import store from '@cip/components/store'

export const pageInfoToMenu = {
  fromData (data, parentPath) {
    const appPath = store.state.app.path
    const result = {
      route: `/app/${appPath}/${parentPath}/${data.path}`,
      title: data.name,
      name: `lowCodePage-${data.id}`
    }
    console.log(appPath, parentPath)
    if (data.children) {
      parentPath = parentPath ? `${parentPath}/${data.path}` : data.path
      console.log('parentPath', parentPath)
      result.children = this.fromDataSet(data.children, parentPath)
    }
    return result
  },
  fromDataSet (list, parentPath = '') {
    return list.map(v => this.fromData(v, parentPath))
  }
}
