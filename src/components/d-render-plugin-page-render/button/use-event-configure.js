
export const useEventConfigure = () => {

}

export const handleEvent = (e, cipFormRender, dataBus) => {
  const events = [].concat(e)
  events.forEach(event => {
    const { type, value } = event

    if (type === 'openDialog') {
      dataBus(value, true)
    } else if (type === 'method') {
      const method = cipFormRender.methods[value]
      if (method) method()
    } else if (type === 'script') {
      // eslint-disable-next-line no-eval
      eval(value)
    }
  })
}
