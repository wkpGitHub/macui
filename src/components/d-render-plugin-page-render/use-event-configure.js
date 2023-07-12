import { inject } from 'vue'

const handleRouter = (event, { router }) => {
  const params = event.pageParams.reduce((data, cur) => {
    data[cur.key] = cur.value
    return data
  }, {})
  event.isNewTab
    ? window.open(event.pageUrl)
    : router.push({ path: event.pageUrl, query: { ...params } })
}
export const handleEvent = async (e, drPageRender, options) => {
  const events = [].concat(e)
  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    const { eventType, value } = event
    if (eventType === 'openDialog') {
      drPageRender.dataBus(value, true)
    } else if (eventType === 'method') {
      const method = drPageRender.methods[value]
      if (method) await method(options)
    } else if (eventType === 'script') {
      // eslint-disable-next-line no-eval
      eval(value)
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
