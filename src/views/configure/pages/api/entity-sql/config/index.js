import { sqlFormFieldList } from './sql'
import { guidFormFieldList } from './guid'
import { debugParamsTableColumn } from './debug'
import { SQL, GUID } from '../constant'

const formFieldListMap = {
  [SQL]: sqlFormFieldList,
  [GUID]: guidFormFieldList
}
export {
  formFieldListMap,
  debugParamsTableColumn
}
