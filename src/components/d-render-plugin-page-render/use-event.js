import { computed } from 'vue'
import { useEventConfigure, bindEvent } from './use-event-configure'

const reg = /^[\w\W]/
function toUpperFirstCase (str) {
  return str.replace(reg, (v) => {
    return v.toLocaleUpperCase()
  })
}

export function useEvents (props, securityConfig) {
  const handleEvent = useEventConfigure()

  const eventMap = computed(() => {
    const events = securityConfig.value.events || {}
    const eventKeys = Reflect.ownKeys(events)
    return eventKeys.reduce((pre, curr) => {
      pre[`on${toUpperFirstCase(curr)}`] = function (...arg) {
        bindEvent(handleEvent, curr, props, arg)
      }
      return pre
    }, {})
  })

  return {
    eventMap
  }
}
