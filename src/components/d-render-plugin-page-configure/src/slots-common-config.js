export const slotsCommonConfig = (options) => ({
  usingSlots: {
    label: '插槽选则',
    type: 'select',
    multiple: true,
    realArray: true,
    options
  },
  options: {
    hideItem: 'true',
    type: 'arrayObject',
    dependOn: ['usingSlots', 'options'],
    changeValue: ({ usingSlots, options }) => {
      const value = options.concat(usingSlots.filter(name => {
        return !options.find(option => option.key === name)
      }).map(name => ({ key: name, children: [] })))
      return {
        value
      }
    }
  }
})
