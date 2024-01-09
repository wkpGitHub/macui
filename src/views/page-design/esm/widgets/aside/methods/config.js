import { generateFieldList } from 'd-render';

const methodsConfigFieldList = generateFieldList({
  methods: {
    type: "simpleCurd",
    itemType: "\u65B9\u6CD5",
    itemKey: "name",
    infoRender: (h, { item }) => {
      return h("div", null, [item.name]);
    },
    dialogProps: {
      size: "default"
    },
    formProps: {
      fieldList: generateFieldList({
        name: { label: "\u65B9\u6CD5\u540D\u79F0" },
        body: { label: "\u63A5\u53E3\u5730\u5740", type: "codeMirror", mode: "javascript" }
      })
    }
  }
});

export { methodsConfigFieldList };
