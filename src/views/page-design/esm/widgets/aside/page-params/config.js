import { generateFieldList } from 'd-render';

const formFieldList = generateFieldList({
  collapse1: {
    type: "collapse",
    active: ["inputParams", "pageParams"],
    options: [
      {
        name: "inputParams",
        title: "\u9875\u9762\u5165\u53C2",
        children: generateFieldList({
          inputParams: {
            type: "simpleCurd",
            dialogProps: {
              size: "small"
            },
            formProps: {
              labelWidth: "80px",
              fieldList: generateFieldList({
                type: { label: "\u6570\u636E\u7C7B\u578B", required: true },
                name: { label: "\u53D8\u91CF\u540D\u79F0", required: true },
                required: { label: "\u662F\u5426\u5FC5\u586B", type: "switch" },
                defaultValue: { label: "\u9ED8\u8BA4\u503C", type: "" },
                remark: { label: "\u63CF\u8FF0", type: "textarea" }
              })
            },
            infoRender: (h, { item, $index }) => h("div", {
              style: "display: flex; justify-content: space-between;width: 100%;padding: 0 12px;border: 1px solid #ddd;"
            }, [
              h("div", null, [item.name]),
              h("div", null, [item.type])
            ]),
            itemType: "\u53D8\u91CF",
            itemKey: "name"
          }
        })
      },
      {
        name: "pageParams",
        title: "\u9875\u9762\u53D8\u91CF",
        children: generateFieldList({
          pageParams: {
            type: "simpleCurd",
            dialogProps: {
              size: "small"
            },
            formProps: {
              labelWidth: "80px",
              fieldList: generateFieldList({
                type: { label: "\u6570\u636E\u7C7B\u578B", required: true },
                name: { label: "\u53D8\u91CF\u540D\u79F0", required: true },
                required: { label: "\u662F\u5426\u5FC5\u586B", type: "switch" },
                defaultValue: { label: "\u9ED8\u8BA4\u503C", type: "" },
                remark: { label: "\u63CF\u8FF0", type: "textarea" }
              })
            },
            infoRender: (h, { item, $index }) => h("div", {
              style: "display: flex; justify-content: space-between;width: 100%;padding: 0 12px;border: 1px solid #ddd;"
            }, [
              h("div", null, [item.name]),
              h("div", null, [item.type])
            ]),
            itemType: "\u53D8\u91CF",
            itemKey: "name"
          }
        })
      }
    ]
  }
});

export { formFieldList };
