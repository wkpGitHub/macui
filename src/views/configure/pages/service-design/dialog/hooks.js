import { ref } from 'vue'
import styles from '../index.module.less'

export function useDialog () {
  const showRightPanel = ref(false)
  const dialogBaseProps = {
    customClass: [styles.drawer, 'cip-drawer'],
    modalClass: styles['drawer-modal'],
    dialogType: 'drawer',
    modal: false,
    showOnly: true,
    onOpened: () => { showRightPanel.value = true },
    onClose: () => { showRightPanel.value = false }
  }
  return {
    showRightPanel,
    dialogBaseProps
  }
}
