
// chr后台数据库类型
export const dbTypeEntityEntity = {
  id: { type: String, _renderConfig: { label: '主键', type: 'select', options: ['Mysql', 'ADS', 'Oracle', 'Postgresql', 'SqlServer', 'Dm', 'Gauss', 'GBase', 'ODPS', 'Greenplum', 'Impala', 'MongoDB', 'Elasticsearch', 'OSS', 'FTP', 'SFTP', 'Nebula', 'Kafka', 'Hive', 'Kingbase', 'Doris'] } },
  name: { type: String, _renderConfig: { label: '名称' } },
  seq: { type: Number, _renderConfig: { label: '排序', type: 'number' } },
  url: { type: String, _renderConfig: { label: '连接' } }
}
