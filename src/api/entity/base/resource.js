import Model from '@cip/utils/model'
import { fileEntity } from './file'
import { inputStreamEntity } from './input-stream'
import { uRIEntity } from './u-r-i'
import { uRLEntity } from './u-r-l'

// undefined
export const resourceEntity = {
  description: { type: String, _renderConfig: { label: undefined } },
  // undefined
  file: { type: new Model(fileEntity), _renderConfig: fileEntity },
  filename: { type: String, _renderConfig: { label: undefined } },
  // undefined
  inputStream: { type: new Model(inputStreamEntity), _renderConfig: inputStreamEntity },
  open: { type: Boolean, _renderConfig: { label: undefined, type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  readable: { type: Boolean, _renderConfig: { label: undefined, type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  // undefined
  uri: { type: new Model(uRIEntity), _renderConfig: uRIEntity },
  // undefined
  url: { type: new Model(uRLEntity), _renderConfig: uRLEntity }
}
