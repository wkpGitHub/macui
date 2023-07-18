import { ref, computed } from 'vue'
import { PlLeftRight as CipPageLayoutLeftRight } from '@cip/page-layout'
import DataModelTree from './widgets/data-model-tree'
import EntitySave from './entity/save'
import EnumSave from './enum/save'
import DataStructure from './data-structure/save'
export default {
  setup (props, ctx) {
    const currentDataModel = ref({})
    const dataModelType = computed(() => {
      return currentDataModel.value.type
    })
    return () => <CipPageLayoutLeftRight leftStyle={{ width: '220px' }}>
      {{
        left: () => <DataModelTree v-model={currentDataModel.value}/>,
        default: () => <div>
          {dataModelType.value}
          {JSON.stringify(currentDataModel.value)}
          {dataModelType.value === 'entity' && <EntitySave id={currentDataModel.value.id} />}
          {dataModelType.value === 'dic' && <EnumSave id={currentDataModel.value.id} />}
          {dataModelType.value === 'pojo' && <DataStructure id={currentDataModel.value.id}/>}
        </div>
      }}
    </CipPageLayoutLeftRight>
  }
}
