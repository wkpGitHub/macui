
export const useEventConfigure = () => {

}

export const handleEvent = async (e, cipFormRender, dataBus, options) => {
  console.log(e, 'e')
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
      console.log(event, 'event')
    }
  }
}
