import { isArray } from '@d-render/shared';

const addQuote = (val) => {
  return `'${val}'`;
};
const handleValue = (value) => {
  if (["number", "boolean"].includes(typeof value))
    return value;
  if (typeof value === "object")
    return JSON.stringify(value);
  if (!value)
    return addQuote("");
  return addQuote(value);
};
const handleOtherValue = (key, value) => {
  if (isArray(key)) {
    const ret = {};
    key.forEach((k, i) => {
      ret[k] = value[i];
    });
    return JSON.stringify(ret);
  }
  return handleValue(value);
};
const parseConfig = ({ config, isCurrentInTable, currOtherKey, fnType = "value" }) => {
  if (!(config == null ? void 0 : config.length))
    return "";
  let str = "";
  let dependVars = [];
  let outDependVars = [];
  config.forEach((item) => {
    const { value, otherValue, config: configOption, conditions, autoSelect } = item;
    let ifStatement = "";
    conditions.forEach((condition, index) => {
      const {
        logic,
        source,
        sign,
        target,
        sourceOtherKey,
        targetOtherValue,
        isInTable,
        type,
        multiple
      } = condition;
      if (isCurrentInTable && !isInTable) {
        outDependVars.push(source);
        if (sourceOtherKey)
          outDependVars.push(sourceOtherKey);
      } else {
        dependVars.push(source);
        if (sourceOtherKey)
          dependVars.push(sourceOtherKey);
      }
      let currState = `${source} ${sign} ${handleValue(target)}`;
      if (sourceOtherKey) {
        currState = autoSelect ? `${currState}` : `(${currState} && ${sourceOtherKey} ${sign} ${handleValue(targetOtherValue)})`;
      }
      if (type === "checkbox" || multiple) {
        currState = sign === "===" ? `${source}?.length === '${target}'?.length && ${source}?.split?.(',').every?.(item => '${target}'.indexOf(item) > -1)` : `!${source}?.split?.(',').some?.(item => '${target}'.indexOf(item) > -1)`;
      }
      currState = ` ${index === 0 ? "" : logic} ${currState}`;
      ifStatement += currState;
    });
    const autoSelectStatement = () => {
      var _a, _b, _c;
      const sourceOtherKey = (_c = (_b = (_a = config == null ? void 0 : config[0]) == null ? void 0 : _a.conditions) == null ? void 0 : _b[0]) == null ? void 0 : _c.sourceOtherKey;
      return `
        return {
          value: ${sourceOtherKey}[${handleValue(value)}],
          otherValue: ${handleOtherValue(currOtherKey, otherValue)},
        }
      `;
    };
    const _autoSelect = config.some((item2) => item2.autoSelect === true);
    const body = fnType === "value" ? _autoSelect ? autoSelectStatement() : `
      if(${ifStatement}){
        return {
          value: ${handleValue(value)},
          otherValue: ${handleOtherValue(currOtherKey, otherValue)},
        }
      };` : `
      if(${ifStatement}){
        ${Object.keys(configOption).map((key) => {
      return `config.${key} = ${handleValue(configOption[key])}`;
    }).join("; ")}
        return config
      };
      `;
    str += body;
  });
  dependVars = Array.from(new Set(dependVars));
  outDependVars = Array.from(new Set(outDependVars));
  const declareStatement = `const { ${dependVars.join(",")} } = dependOnValues;
    const { ${outDependVars.join(",")} } = outDependOnValues;`;
  str = `
    ${declareStatement}
    ${str}
  `;
  return str;
};
const parseValueFn = ({ config, isCurrentInTable, currOtherKey }) => parseConfig({ config, isCurrentInTable, currOtherKey });
const parseConfigFn = ({ config, isCurrentInTable, currOtherKey }) => parseConfig({ config, isCurrentInTable, currOtherKey, fnType: "config" });

export { parseConfig, parseConfigFn, parseValueFn };
