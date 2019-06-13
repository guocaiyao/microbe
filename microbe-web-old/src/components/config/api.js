//let serverUrl = '/api';  //本地调试时 
//let serverUrl = 'http://172.16.100.113:8081';  //打包部署上线时 
let serverUrl = 'http://101.132.181.162/Microbe';
export default {
  browserMenu: serverUrl + '/api/microdb/browser-menu',
  microdbSummary: serverUrl + '/api/microdb/summary',
  associationSummary: serverUrl + '/api/association/summary', 
  // 辅助输入
  diseaseSuggestion: serverUrl + '/api/disease/suggestion',
  microbeSuggestion: serverUrl + '/api/microbe/suggestion',
  // 表单提交
  submissionSave: serverUrl + '/api/submission/save',
  // association 详情
  association: serverUrl + '/api/association/',
  // 根据微生物名称搜索
  associationMicrobe: serverUrl + '/api/association/microbe',
  associationMicrobeDownload: serverUrl + '/api/association/microbe/download',
  // 根据疾病名称搜索
  associationDisease: serverUrl + '/api/association/disease',
  associationDiseaseDownload: serverUrl + '/api/association/disease/download',
  // 文件下载
  downloadUrl2: serverUrl + '/download',
  geneDownload: serverUrl + '/api/core/gene/download',
  // 文件上傳
  uploadFile: serverUrl + '/api/tool/api/file',
  toolRun: serverUrl + '/api/tool/run',
  toolMicrobeResult: serverUrl + '/api/tool/microbeResult/',
  toolOutputResult: serverUrl + '/api/tool/outputResult/',
  toolSequence: serverUrl + '/api/tool/sequence/',
  toolStatus: serverUrl + '/api/tool/status/'
}