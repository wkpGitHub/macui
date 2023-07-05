import store from '@cip/components/store'

export const pageInfoToMenu = {
  fromData (data) {
    const appPath = store.state.app.path
    const result = {
      route: `/preview/${appPath}/${data.path}?id=${data.id}`,
      title: data.name,
      name: `lowCodePage-${data.id}`
    }
    if (data.children) {
      result.children = this.fromDataSet(data.children)
    }
    return result
  },
  fromDataSet (list) {
    return list.map(v => this.fromData(v))
  }
}
