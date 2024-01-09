import { DRender } from 'd-render';

var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const dRender = new DRender();
const getComponentConfigure = (type) => __async(void 0, null, function* () {
  const { default: configure } = yield dRender.componentDictionary[type]("/configure")();
  return configure;
});

export { getComponentConfigure };
