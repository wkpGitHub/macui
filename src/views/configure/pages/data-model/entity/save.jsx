import { ref } from 'vue'
import CipPageSave from '@/components/cip-page-save'
import { formFieldList } from './config'
import { dataInfoService } from '@/api/service/chr'
import CipMessage from '@cip/components/cip-message'
export default {
  props: {
    dbId: [Number, String],
    id: [Number, String]
  },
  emits: ['cancel', 'success'],
  setup (props, { emit }) {
    const entityInfo = ref({ dbId: props.dbId, type: 'entity' })
    const onSave = (resolve, reject) => {
      dataInfoService.infoSave(entityInfo.value).then(res => {
        resolve(res)
        emit('success')
        CipMessage.sucess(res.message)
      }).catch((err) => {
        reject(err)
      })
    }
    const onCancel = () => {
      console.log('emit cancel')
      emit('cancel')
    }

    const getDataInfo = async () => {
      if (props.id) {
        const { data } = await dataInfoService.detail({ id: props.id })
        return data
      } else {
        return { dbId: props.dbId, type: 'entity' }
      }
    }

    getDataInfo().then(res => {
      entityInfo.value = res
    })

    return () => <CipPageSave
      style={'--content-bg: var(--cip-main-bg)'}
      v-model:model={entityInfo.value}
      formFieldList={formFieldList}
      formProps={{
        grid: 24
      }}
      onSave={onSave}
      onCancel={onCancel}
    />
  }
}
