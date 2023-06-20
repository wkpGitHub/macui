
// 数据库信息
export const dbInfoEntityEntity = {
  appId: { type: Number, _renderConfig: { label: '应用id', type: 'number' } },
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  creatorId: { type: String, _renderConfig: { label: '创建者id' } },
  creatorName: { type: String, _renderConfig: { label: '创建者姓名' } },
  dbType: { type: String, _renderConfig: { label: '数据库类型', type: 'select', options: ['Mysql', 'ADS', 'Oracle', 'Postgresql', 'SqlServer', 'Dm', 'Gauss', 'GBase', 'ODPS', 'Greenplum', 'Impala', 'MongoDB', 'Elasticsearch', 'OSS', 'FTP', 'SFTP', 'Nebula', 'Kafka', 'Hive', 'Kingbase', 'Doris'] } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  name: { type: String, _renderConfig: { label: '名称' } },
  password: { type: String, _renderConfig: { label: '密码' } },
  remark: { type: String, _renderConfig: { label: '描述' } },
  updateTime: { type: Date, _renderConfig: { label: '更新时间', type: 'date', viewType: 'datetime' } },
  updatorId: { type: String, _renderConfig: { label: '更新者id' } },
  updatorName: { type: String, _renderConfig: { label: '更新者姓名' } },
  url: { type: String, _renderConfig: { label: '数据库连接' } },
  username: { type: String, _renderConfig: { label: '用户名' } }
}
