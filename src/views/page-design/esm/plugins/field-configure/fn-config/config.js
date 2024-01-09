const signs = [
  { label: "\u7B49\u4E8E", value: "===" },
  { label: "\u4E0D\u7B49\u4E8E", value: "!==" },
  { label: "\u5927\u4E8E", value: ">" },
  { label: "\u5927\u4E8E\u7B49\u4E8E", value: ">=" },
  { label: "\u5C0F\u4E8E", value: "<" },
  { label: "\u5C0F\u4E8E\u7B49\u4E8E", value: "<=" }
];
const multipleSign = [
  { label: "\u5305\u542B", value: "===" },
  { label: "\u4E0D\u5305\u542B", value: "!==" }
];
const logicSign = [
  { label: "\u4E14", value: "&&" },
  { label: "\u6216", value: "||" }
];

export { logicSign, multipleSign, signs };
