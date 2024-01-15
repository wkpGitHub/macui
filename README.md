# coding-hammer-ui

>

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Generate version and build git tag
```
npm run gen-version
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 参考地址
https://aisuda.bce.baidu.com/company/e5dde/app/8698866ab02d-dev/design/api/all


# 接入到其他模块
```js
git submodule add https://git.citycloud.com.cn:3000/cci_tech_research/coding-hammer-ui.git low-code
cd low-code 
git checkout dev
```

### 修改自己项目中config/alias-config.js
```js
const aliasConfig = {
  // ... 其他代码
  '@lc': 'low-code/src'
}

module.exports = aliasConfig
```

### 修改自己项目中的 config/proxy-config.js
```js
const CHR = '/chr'
const proxyConfig = [
  {
    key: 'apiChr', 
    target: process.env.VUE_APP_API_CHR_TARGET + CHR,
    productionTarget: process.env.VUE_APP_API_CHR_PRODUCTION_TARGET + CHR
  },
  {
    key: 'apiBasic', 
    target: process.env.VUE_APP_API_BASIC_TARGET,
    productionTarget: process.env.VUE_APP_API_BASIC_PRODUCTION_TARGET
  },
  // ... 其他代码
]

module.exports = proxyConfig

```
### 修改自己项目中d-render.config.js
```js
// ... 其他代码
import lowCodeConfig from './low-code/d-render.config'
// 小心同名覆盖问题
export default {
  components: {
    ...lowCodeConfig.components,
    // ... 其他代码
  },
  plugins: [
    ...lowCodeConfig.plugins,
    // ... 其他代码
  ]
}
```

### 引用设计页面
```jsx
import PageDesign from '@lc/views/page-design'
import {reactive} from 'vue'
export default {
  setup() {
    const state = reactive({
      appPath: 'lRoad',
      id: '2h66y5dr59d11'
    })
    // 注意：这里需要传递appPath和id，因为设计页面需要知道当前应用的路径和id
    return () => <PageDesign appPath={state.appPath} id={state.id} />;  
  }
}
```

### 引用使用页面
```jsx
import PageView from '@lc/views/app/pages/low-code'
export default {
  setup() {
    const state = reactive({
      appPath: 'lRoad',
      path: '/yhb/yhb001'
    })
    return () => <PageView appPath={state.appPath} path={state.path}  />;  
  }
}
```