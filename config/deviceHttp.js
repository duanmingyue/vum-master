import $http from 'axios'
class deviceHttp {
  static request (apiUrl, params, model, callback) {
    let apiBaseUrl = 'http://47.100.177.208:8060/fireCloud/'
    // let apiBaseUrl = 'http://192.168.0.5:8080/fireCloud/'
    $http({
      transformRequest: [function (data) {
        // Do whatever you want to do
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      method: model,
      url: apiBaseUrl + apiUrl,
      data: params,
      onDownloadProgress: function (event) {
        callback(JSON.parse(event.currentTarget.response))
      }
    })
  }
}
export default deviceHttp
