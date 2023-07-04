export const useEventConfigure = () => {

}

export const handleEvent = (e, cipFormRender, dataBus) => {
  const events = [].concat(e)
  events.forEach(event => {
    const { type, value } = event
    if (type === 'openDialog') {
      dataBus(value, true)
    }
  })
}
