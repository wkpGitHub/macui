import { generateFieldList } from 'd-render'
import { EVENT_TYPE } from '@/assets/consts'
export default {
  key: { readable: true },
  text: { label: '文字' },
  icon: { label: '图标' },
  click: {
    label: '点击事件',
    type: 'eventHandle',
    infoRender: (h, { item }) => h('div', null, [item.remark]),
    itemType: '事件',
    itemKey: 'index',
    formProps: {
      fieldList: generateFieldList({
        _layout: {
          type: 'layoutBox',
          options: [
            {
              key: 'operate',
              children: generateFieldList({
                eventType: {
                  type: 'selectTreePanel',
                  showButton: false,
                  options: [
                    ...EVENT_TYPE
                  ]
                },
                eventName: {
                  readable: false,
                  dependOn: ['eventType'],
                  changeValue ({ eventType }) {
                    const { label } = EVENT_TYPE.find(item => item.value === eventType) ?? {}
                    return {
                      value: label
                    }
                  }
                }
              })
            },
            {
              key: 'content',
              children: generateFieldList({
                content: {
                  type: 'form',
                  options: [],
                  labelPosition: 'top',
                  dependOn: ['eventType'],
                  changeConfig (config, { eventType }) {
                    if (eventType === 'router') {
                      config.options = [
                        {
                          children: generateFieldList({
                            pageUrl: {
                              label: '页面地址'
                            },
                            pageParams: {
                              label: '页面参数',
                              type: 'paramsAdd'
                            },
                            isNewTab: {
                              label: '新窗口打开',
                              type: 'switch'
                            }
                          })
                        }
                      ]
                    } else if (eventType === 'openDialog') {
                      config.options = [
                        {
                          children: generateFieldList({
                            dialogType: {
                              label: '类型',
                              type: 'radio',
                              defaultValue: 'dialog',
                              options: [
                                {
                                  label: '弹窗',
                                  value: 'dialog'
                                },
                                {
                                  label: '抽屉',
                                  value: 'drawer'
                                }
                              ]
                            },
                            dialogContent: {
                              label: '弹窗内容',
                              type: 'button',
                              defaultValue: '去配置',
                              dependOn: ['dialogType'],
                              changeConfig (config, { dialogType }) {
                                config.label = dialogType === 'dialog' ? '弹窗' : '抽屉'
                                return config
                              }
                            }
                          })
                        }
                      ]
                    } else if (eventType === 'script') {
                      config.options = [{
                        children: generateFieldList({
                          script: {
                            label: '脚本',
                            type: 'codemirrorInput'
                          }
                        })
                      }]
                    } else if (eventType === 'method') {
                      config.options = [{
                        children: generateFieldList({
                          script: {
                            label: '脚本',
                            mode: 'javascript',
                            type: 'codemirrorInput'
                          }
                        })
                      }]
                    }
                    return config
                  }
                }
              })
            }
          ]
        }
      })
    }
  }
}
