export function useMethods (proxyValue, props) {
  props.config.open = function (a, b) {
    proxyValue.value = true
  }
  props.config.close = function () {
    proxyValue.value = false
  }
}
