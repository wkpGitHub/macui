
export const useEventConfigure = () => {

}

export const handleEvent = async (e, cipFormRender, dataBus, options) => {
  const events = [].concat(e)
  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    const { type, value } = event
    if (type === 'openDialog') {
      dataBus(value, true)
    } else if (type === 'method') {
      const method = cipFormRender.methods[value]
      if (method) await method(options)
    } else if (type === 'script') {
      // eslint-disable-next-line no-eval
      eval(value)
    }
  }
}
