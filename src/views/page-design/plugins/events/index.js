import EventComponent from './component'
import { ConfigurePlugin } from '@d-render/design'
export class EventsPlugin extends ConfigurePlugin {
  constructor (options) {
    super(options)
    this.Component = EventComponent
    this.config = { name: 'events', title: '事件' }
  }
}
