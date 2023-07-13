import { inject } from 'vue'

const handleRouter = (event, { router }, options) => {
  console.log(options)
  const params = event.pageParams.reduce((data, cur) => {
    data[cur.key] = cur.value
    return data
  }, {})
  const queryString = Object.keys(params).reduce((arr, key) => {
    arr.push(`${key}=${params[key]}`)
    return arr
  }, []).join('&')
  event.isNewTab
    ? window.open(`${event.pageUrl}?${queryString}`)
    : router.push({ path: event.pageUrl, query: { ...params } })
}
export const handleEvent = async (e, drPageRender, options) => {
  const events = [].concat(e)
  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    const { eventType } = event
    if (eventType === 'openDialog') {
      drPageRender.dataBus(event.dialogKey, true)
    } else if (eventType === 'method') {
      const method = drPageRender.methods[event.methods]
      if (method) await method(options)
    } else if (eventType === 'script') {
      // eslint-disable-next-line no-eval
      eval(event.script)
    } else if (eventType === 'router') {
      handleRouter(event, drPageRender, options)
    }
  }
}

export const useEventConfigure = () => {
  const drPageRender = inject('drPageRender', {})
  const handleEventBridge = (e, options) => handleEvent(e, drPageRender, options)
  return handleEventBridge
}
