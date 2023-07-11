export const useEventConfigure = () => {

}
const handleRouter = (event, { router }) => {
  const { content } = event
  const params = content.pageParams.reduce((data, cur) => {
    data[cur.key] = cur.value
    return data
  }, {})
  content.isNewTab
    ? window.open(content.pageUrl)
    : router.push({ path: content.pageUrl, query: { ...params } })
}
export const handleEvent = async (e, cipFormRender, dataBus, options) => {
  const events = [].concat(e)
  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    const { eventType, value } = event
    if (eventType === 'openDialog') {
      dataBus(value, true)
    } else if (eventType === 'method') {
      const method = cipFormRender.methods[value]
      if (method) await method(options)
    } else if (eventType === 'script') {
      // eslint-disable-next-line no-eval
      eval(value)
    } else if (eventType === 'router') {
      handleRouter(event, cipFormRender)
    }
  }
}
