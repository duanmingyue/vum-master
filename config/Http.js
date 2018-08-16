import $http from 'axios'
class Http {
  static request (apiUrl, params, model, callback) {
    // let apiBaseUrl = 'http://192.168.7.150:8080/sharepay/'
    let apiBaseUrl = 'http://sharepayapi.usr.cn:8080/sharepay/'
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
export default Http
