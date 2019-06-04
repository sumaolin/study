;(function(window, $) {
  var V = {
    isEmpty: function(obj) {
      //是否为空
      return typeof obj == 'undefined' || obj === null || this.trim(obj) === ''
    },

    isMobile: function(val) {
      //手机号码
      var _this = this
      if (_this.isEmpty(val)) {
        return false
      } else {
        var reg = /^0?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[01356789]|18[0-9]|19[0-9])[0-9]{8}$/
        return reg.test(val)
      }
    },

    isPinyin: function(val) {
      //拼音
      var reg = /^[A-Za-z]+$/
      return reg.test(val)
    },

    trim: function(str) {
      //删除字符 两端的空格
      return str.replace(/(^\s*)|(\s*$)/g, '')
    },

    isNum: function(val) {
      var _this = this
      if (_this.isEmpty(val)) {
        return false
      } else {
        var reg = /^[0-9]*$/
        return reg.test(val)
      }
    },

    isTel: function(s) {
      //座机号
      var patrn = /^[+]{0,1}(\d){1,4}[ ]{0,1}([-]{0,1}((\d)|[ ]){1,12})+$/
      if (!patrn.exec(s)) {
        return false
      }
      return true
    }
  }

  window.V = V
})(window, jQuery)
