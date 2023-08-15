### type枚举
|类型|说明|
|:---|:---|
|start|开始节点|
| branch|分支 |
|loop | 循环|
| continue| 继续循环|
| break| 跳出循环|
| exit| 退出|
|set | 设置变量|
|coder | 编码转换|
| date-format| 日期格式化|
|mapping | 数据映射|
| create-data-records| 新增记录|
|delete-data-records | 删除记录|
| update-data-records| 更新记录|
|query-data-records | 查询记录|
| http| http请求|
| flow| 流程调用|
|apicenter | API中心节点|
| connector| 连接器|
| auto-entity-add-records|流程管理 - 新增记录 |
| update-entity-add-records| 流程管理 - 更新记录|
|web-api|调用服务 |
| examine-and-approve-task| 人工节点|
| notification| 发送消息|
| email| 发送邮件|
| datasource-sql| 数据源SQL|
|script |JS代码 |
| auto-entity-search-records| 自动节点 - 查询记录|

### 通用节点属性
|字段|说明|默认值|数据类型|
|:---|:---|:---|:--|
|type|节点类型| 枚举值见[type枚举]| string|
|title|节点标题| |string|
|targetName|节点出参 或者 变量名||string|
|validateFailed|前端校验是否通过||boolean|

### 开始节点属性
|字段|说明|默认值|数据类型|
|:---|:---|:---|:--|
|children|下面的所有节点| |array |
|inputParams|服务入参|[]|array|
|outParams|服务出参|[{"label":"status","value":0,"dataType":"number"},{"label":"msg","value":"","dataType":"string"}]|array|
|globalValue|全局变量|[]|array|

### 结束节点
|字段|说明|默认值|数据类型|
|:---|:---|:---|:--|
|outputType|设置出参data方式[global: 出参赋值, number: 出参成员赋值]| |array |
|output|出参赋值设置的值存放在这个字段||string|
|outputParams|出参成员赋值方式，存放在这个字段||array|

### 设置变量
|字段|说明|默认值|数据类型|
|:---|:---|:---|:--|
|dataType|数据类型||string|
|source|值||any|
```
{
  "id": "0juy9hzpx2ge",
  "type": "start",
  "title": "开始",
  "conditions": {},
  "children": [
    {
      "id": "343d182b-deb4-4a33-84c6-d1c2349d5875",
      "type": "set",
      "title": "设置变量",
      "conditions": {},
      "children": [],
      "index": 0,
      "top": 148,
      "width": 140,
      "left": 0,
      "active": true,
      "isBranch": false,
      "dataType": "string",
      "source": "kp",
      "targetName": "inputParams.name"
    },
    {
      "id": "ef4ae388395b",
      "type": "end",
      "title": "结束",
      "index": 1,
      "top": 292,
      "width": 44,
      "left": 0,
      "active": false
    }
  ],
  "trigger": "empty-event",
  "inputParams": [
    {
      "dataType": "string",
      "label": "name"
    }
  ],
  "outParams": [
    {
      "label": "status",
      "value": 0,
      "dataType": "number"
    },
    {
      "label": "msg",
      "value": "",
      "dataType": "string"
    }
  ],
  "globalValue": [],
  "variableParams": {},
  "fields": [],
  "updateFields": [],
  "filterMode": "normal",
  "filterFields": {},
  "triggerMode": "interval",
  "intervalSetting": {},
  "periodicSetting": {},
  "active": false,
  "isBranch": false
}
```

### 新增记录
|字段|说明|默认值|数据类型|
|:---|:---|:---|:--|
|dataMode|新增模式【multi:新增多条，single：新增一条】||string|
|objectKey|数据表id||string \| number|
|fields|选择的数据表有哪些字段||array|
|initFields|增加哪些字段 默认有哪些值【例如：[{"name":"name","ename":"姓名","type":"text","formula":"kk"},{"name":"time","ename":"日期","type":"date","formula":"4"}]】||array|
```
{
  "id": "0juy9hzpx2ge",
  "type": "start",
  "title": "开始",
  "conditions": {},
  "children": [
    {
      "id": "e1fa5023-8af9-4ab6-9f69-db5a1f3cebfd",
      "type": "create-data-records",
      "title": "新增记录",
      "conditions": {},
      "children": [],
      "validateFailed": false,
      "index": 0,
      "top": 148,
      "width": 140,
      "left": 0,
      "active": true,
      "isBranch": false,
      "dataMode": "single",
      "relationFields": [],
      "mFields": [],
      "rFields": [],
      "objectKey": "model:user",
      "fields": [
        {
          "name": "id",
          "ename": "主键",
          "type": "int"
        },
        {
          "name": "name",
          "ename": "姓名",
          "type": "text"
        },
        {
          "name": "time",
          "ename": "日期",
          "type": "date"
        }
      ],
      "fieldLabel": "user",
      "targetName": "add",
      "initFields": [
        {
          "name": "name",
          "ename": "姓名",
          "type": "text",
          "formula": "${inputParams.name}"
        }
      ]
    },
    {
      "id": "ef4ae388395b",
      "type": "end",
      "title": "结束",
      "index": 1,
      "top": 292,
      "width": 44,
      "left": 0,
      "active": false
    }
  ],
  "trigger": "empty-event",
  "inputParams": [
    {
      "dataType": "string",
      "label": "name"
    }
  ],
  "outParams": [
    {
      "label": "status",
      "value": 0,
      "dataType": "number"
    },
    {
      "label": "msg",
      "value": "",
      "dataType": "string"
    }
  ],
  "globalValue": [],
  "variableParams": {},
  "fields": [],
  "updateFields": [],
  "filterMode": "normal",
  "filterFields": {},
  "triggerMode": "interval",
  "intervalSetting": {},
  "periodicSetting": {},
  "active": false,
  "isBranch": false
}
```

### 删除记录
|字段|说明|默认值|数据类型|
|:---|:---|:---|:--|
|objectKey|数据表id||string \| number|
|fields|选择的数据表有哪些字段||array|
|filterFields|删除条件【例如：{"conjunction":"and","children":[{"field":"name","op":"equal","right":""}]}】||object|
```
{
  "id": "0juy9hzpx2ge",
  "type": "start",
  "title": "开始",
  "conditions": {},
  "children": [
    {
      "id": "c5336c52-3b3b-432f-a64b-af034e372d1a",
      "type": "delete-data-records",
      "title": "删除记录",
      "conditions": {},
      "children": [],
      "index": 0,
      "top": 148,
      "width": 140,
      "left": 0,
      "active": true,
      "isBranch": false,
      "objectKey": "model:user",
      "fields": [
        {
          "name": "id",
          "ename": "主键",
          "type": "int"
        },
        {
          "name": "name",
          "ename": "姓名",
          "type": "text"
        },
        {
          "name": "time",
          "ename": "日期",
          "type": "date"
        }
      ],
      "filterMode": "normal",
      "filterFields": {
        "conjunction": "and",
        "children": [
          {
            "field": "name",
            "op": "equal",
            "right": "${inputParams.name}"
          }
        ]
      }
    },
    {
      "id": "ef4ae388395b",
      "type": "end",
      "title": "结束",
      "index": 1,
      "top": 292,
      "width": 44,
      "left": 0,
      "active": false
    }
  ],
  "trigger": "empty-event",
  "inputParams": [
    {
      "dataType": "string",
      "label": "name"
    }
  ],
  "outParams": [
    {
      "label": "status",
      "value": 0,
      "dataType": "number"
    },
    {
      "label": "msg",
      "value": "",
      "dataType": "string"
    }
  ],
  "globalValue": [],
  "variableParams": {},
  "fields": [],
  "updateFields": [],
  "filterMode": "normal",
  "filterFields": {},
  "triggerMode": "interval",
  "intervalSetting": {},
  "periodicSetting": {},
  "active": false,
  "isBranch": false
}

```

##### 条件枚举
```
[
  { label: '等于', value: 'equal', usedFieldType: ['int', 'text', 'date'] },
  { label: '不等于', value: 'not_equal', usedFieldType: ['int', 'text', 'date'] },
  { label: '模糊匹配', value: 'like', usedFieldType: ['text'] },
  { label: '不匹配', value: 'not_like', usedFieldType: ['text'] },
  { label: '匹配开头', value: 'starts_with', usedFieldType: ['text'] },
  { label: '匹配结尾', value: 'ends_with', usedFieldType: ['text'] },
  { label: '小于', value: 'less', usedFieldType: ['int', 'date'] },
  { label: '小于或等于', value: 'less_or_equal', usedFieldType: ['int', 'date'] },
  { label: '大于', value: 'greater', usedFieldType: ['int', 'date'] },
  { label: '大于或等于', value: 'greater_or_equal', usedFieldType: ['int', 'date'] },
  { label: '为空', value: 'is_empty', usedFieldType: ['int', 'text'] },
  { label: '不为空', value: 'is_not_empty', usedFieldType: ['int', 'text'] },
  { label: '属于范围', value: 'between', usedFieldType: ['date'] },
  { label: '不属于范围', value: 'not_between', usedFieldType: ['date'] }
]
```
### 更新记录
|字段|说明|默认值|数据类型|
|:---|:---|:---|:--|
|objectKey|数据表id||string \| number|
|fields|选择的数据表有哪些字段||array|
|updateFields|更新哪些字段 默认有哪些值【例如：[{"name":"name","ename":"姓名","type":"text","formula":"kk"},{"name":"time","ename":"日期","type":"date","formula":"4"}]】||array|
|filterFields|更新条件【例如：{"conjunction":"and","children":[{"field":"name","op":"equal","right":""}]}】||object|
```
{
  "id": "0juy9hzpx2ge",
  "type": "start",
  "title": "开始",
  "conditions": {},
  "children": [
    {
      "id": "b12a69c2-db8b-4fa4-81c6-4e489a7da78b",
      "type": "update-data-records",
      "title": "更新记录",
      "conditions": {},
      "children": [],
      "validateFailed": false,
      "index": 0,
      "top": 148,
      "width": 140,
      "left": 0,
      "active": false,
      "isBranch": false,
      "showCreateRelationRecord": true,
      "relationFields": [],
      "mFields": [],
      "rFields": [],
      "objectKey": "model:user",
      "fields": [
        {
          "name": "id",
          "ename": "主键",
          "type": "int"
        },
        {
          "name": "name",
          "ename": "姓名",
          "type": "text"
        },
        {
          "name": "time",
          "ename": "日期",
          "type": "date"
        }
      ],
      "filterMode": "normal",
      "filterFields": {
        "conjunction": "and",
        "children": [
          {
            "field": "name",
            "op": "equal",
            "right": "${inputParams.name}"
          }
        ]
      },
      "updateFields": [
        {
          "name": "name",
          "ename": "姓名",
          "type": "text",
          "formula": "kk"
        }
      ]
    },
    {
      "id": "ef4ae388395b",
      "type": "end",
      "title": "结束",
      "index": 1,
      "top": 292,
      "width": 44,
      "left": 0,
      "active": false
    }
  ],
  "trigger": "empty-event",
  "inputParams": [
    {
      "dataType": "string",
      "label": "name"
    }
  ],
  "outParams": [
    {
      "label": "status",
      "value": 0,
      "dataType": "number"
    },
    {
      "label": "msg",
      "value": "",
      "dataType": "string"
    }
  ],
  "globalValue": [],
  "variableParams": {},
  "fields": [],
  "updateFields": [],
  "filterMode": "normal",
  "filterFields": {},
  "triggerMode": "interval",
  "intervalSetting": {},
  "periodicSetting": {},
  "active": false,
  "isBranch": false
}

```

### 查询记录
|字段|说明|默认值|数据类型|
|:---|:---|:---|:--|
|objectKey|数据表id||string \| number|
|fields|选择的数据表有哪些字段||array|
|selectFields|查询导出哪些字段 【例子：[{"name":"name","ename":"姓名","type":"text","formula":"${outParams.status}"}]】||array|
|filterFields|更新条件【例如：{"conjunction":"and","children":[{"field":"name","op":"equal","right":""}]}】||object|

```
{
  "id": "0juy9hzpx2ge",
  "type": "start",
  "title": "开始",
  "conditions": {},
  "children": [
    {
      "id": "5c27368a-c99d-4ebb-94bf-31c40609bd6b",
      "type": "query-data-records",
      "title": "查询记录",
      "conditions": {},
      "children": [],
      "index": 0,
      "top": 148,
      "width": 140,
      "left": 0,
      "active": true,
      "isBranch": false,
      "selectType": "single",
      "objectKey": "model:user",
      "fields": [
        {
          "name": "id",
          "ename": "主键",
          "type": "int"
        },
        {
          "name": "name",
          "ename": "姓名",
          "type": "text"
        },
        {
          "name": "time",
          "ename": "日期",
          "type": "date"
        }
      ],
      "filterMode": "normal",
      "targetName": "rec",
      "selectFields": [
        {
          "name": "name",
          "ename": "姓名",
          "type": "text",
          "formula": "${outParams.status}"
        }
      ],
      "filterFields": {
        "conjunction": "and",
        "children": [
          {
            "field": "name",
            "op": "equal",
            "right": "n"
          }
        ]
      }
    },
    {
      "id": "ef4ae388395b",
      "type": "end",
      "title": "结束",
      "index": 1,
      "top": 292,
      "width": 44,
      "left": 0,
      "active": false
    }
  ],
  "trigger": "empty-event",
  "inputParams": [],
  "outParams": [
    {
      "label": "status",
      "value": 0,
      "dataType": "number"
    },
    {
      "label": "msg",
      "value": "",
      "dataType": "string"
    }
  ],
  "globalValue": [],
  "variableParams": {},
  "fields": [],
  "updateFields": [],
  "filterMode": "normal",
  "filterFields": {},
  "triggerMode": "interval",
  "intervalSetting": {},
  "periodicSetting": {},
  "active": false
}
```

### 循环
|字段|说明|默认值|数据类型|
|:---|:---|:---|:--|
|loopName|循环数组||string|
|loopItemName|循环变量||string|
|loopIndexName|循环下标名||string|
|firstIndex|起始下标||string|
|lastIndex|最大下标||string|