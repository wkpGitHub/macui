import { ref, onMounted, createApp, createVNode } from 'vue';

var iframeContainer = {
  props: {},
  setup(props, {
    slots
  }) {
    const doc = ref(defaultDoc);
    const iframe$ = ref();
    onMounted(() => {
      iframe$.value.onload = () => {
        Array.from(document.head.childNodes).filter((v) => v.nodeName === "STYLE").forEach((style2) => {
          iframe$.value.contentDocument.head.appendChild(style2.cloneNode(true));
        });
        createApp({
          setup() {
            return () => {
              var _a;
              return (_a = slots.default) == null ? void 0 : _a.call(slots);
            };
          }
        }).mount(iframe$.value.contentDocument.getElementById("app"));
      };
    });
    const style = {
      margin: "auto 0",
      pointerEvents: "auto",
      width: "100%",
      height: "100%",
      border: "none"
    };
    return () => createVNode("iframe", {
      "ref": iframe$,
      "srcdoc": doc.value,
      "style": style
    }, null);
  }
};
const defaultDoc = `<html>
    <style type="text/css">
        html,body {height: 100%; margin: 0; padding: 0}
        #app{height: 100%}
    </style>
    <body>
        <div id="app"></div>
    </body>
</html>
`;

export { iframeContainer as default };
