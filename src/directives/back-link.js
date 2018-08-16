export default {
  inserted (el) {
    el.addEventListener('popstate', function () {
      // window.history.back()
      alert('111')
    })
  }
}
