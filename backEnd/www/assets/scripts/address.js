;(function(window, $) {
  var addForm = {
    init: function() {
      this.bind()
      this.initLoaction()
      this.bindDialog()
    },

    initLoaction: function() {
      var chain = new LocationChain({
        province: $('#province'),
        city: $('#city'),
        region: $('#region'), //区，可选（不需要时不做配置即可）
        provinceDefaultOption: '<option value="">省/直辖市</option>',
        cityDefalutOption: '<option value="">不限</option>',
        regionDefaultOption: '<option value="">不限</option>', //区默认选项，可选（不需要时不做配置即可）
        init: '11-5-1', //初始化指定省市（区），传数据对应id，格式： provinceId-cityId(-regionId)
        onchange: function() {} //change回调
      })
      chain.initialize()
    },

    bind: function() {
      var _this = this
      $('body').on('focusout', function(e) {
        $('body').animate({ scrollTop: 0 }, 1000)
      })
      $('.submit_btn').on('click touchend', function(e) {
        e.preventDefault()
        e.stopPropagation()
        // window.location.href = 'order.html'

        _this.getFormData()
      })

      $('#vcode_btn').on('click, touchend', function(e) {
        e.preventDefault()
        e.stopPropagation()
        if ($(this).hasClass('disabled')) {
          return false
        }

        var tel = $('#tel').val()
        // _this.setCountDownVcode()
        if (!V.isMobile(tel)) {
          _this.showErrTip('请输入正确的手机号码！')
          return false
        } else {
          _this.getVcode(tel)
        }
      })
    },

    getFormData: function() {
      var nameV = $('#name').val(),
        provinceV = $('#province').val(),
        // provinceV = $('#province option:selected').html(),
        cityV = $('#city').val(),
        // cityV = $('#city option:selected').html(),
        regionV = $('#region').val(),
        // regionV = $('#region option:selected').html(),
        addressV = $('#address').val(),
        zipcodeV = $('#zipcode').val(),
        telV = $('#tel').val(),
        vcodeV = $('#vcode').val(),
        order_id = $('#order_id').val(),
        genderV = $('.cradio:checked').val()

      if (V.isEmpty(nameV)) {
        this.showErrTip('填写姓名信息！')
        return false
      }
      if (nameV.indexOf('先生') > -1 || nameV.indexOf('小姐') > -1) {
        this.showErrTip(
          '<div class="postTip">邮管局通知09月01日起，所有运单<br/>需要实名登记，请勿要填写X先生<br/>X小姐，或者其他花名呦！</div>'
        )
        return false
      }

      if (V.isEmpty(provinceV)) {
        this.showErrTip('请选择省份信息！')
        return false
      }
      if (V.isEmpty(cityV)) {
        this.showErrTip('请选项城市信息！')
        return false
      }

      if (V.isEmpty(addressV)) {
        this.showErrTip('请输入地址信息！')
        return false
      }
      if (!V.isNum(zipcodeV) || zipcodeV.length !== 6) {
        this.showErrTip('请填写正确的邮编号码！')
        return false
      }

      if (!V.isMobile(telV)) {
        this.showErrTip('请输入正确的手机号码！')
        return false
      }
      if (V.isEmpty(vcodeV)) {
        this.showErrTip('请输入验证码')
        return false
      }

      var postData = {
        order_id: order_id,
        name: nameV,
        // province_id: province_id,
        province: provinceV,
        // city_id: city_id,
        city: cityV,
        // district_id: region_id,
        district: regionV,
        address: addressV,
        zipcode: zipcodeV,
        tel: telV,
        vcode: vcodeV,
        gender: genderV
      }
      this.postAddressInfo(postData)
      // console.log(postData)
    },

    postAddressInfo(postData) {
      var _this = this
      _this.showLoadingToast()
      $.post(urlMap.setAddress, postData).then(function(res) {
        _this.hideLoadingToast()
        // console.log(res)
        if (res.errno === 0) {
        } else if (res.errno === 2001) {
          window.location.href = res.err
        } else {
          _this.showErrTip(res.err)
        }
      })
    },

    getVcode(tel) {
      var openid = $('#unionid').val()
      var utime = $('#unix_time').val()
      var tken = $('#token').val()

      if (!token) return false

      var _this = this
      _this.showLoadingToast()
      $.post(urlMap.sendCode, {
        unionid: openid,
        unix_time: utime,
        token: tken,
        tel: tel
      }).then(function(res) {
        console.log(res)
        _this.hideLoadingToast()
        if (res.num === 0) {
          _this.setCountDownVcode()
        }
      })
    },
    /*
      倒计时
    */
    setCountDownVcode: function() {
      var $btn = $('#vcode_btn')
      $btn.addClass('disabled')
      var t = 61
      var timer = window.setInterval(function() {
        t--
        if (t === 0) {
          window.clearInterval(timer)
          $btn.text('发送验证码').removeClass('disabled')
        } else {
          $btn.text(t + ' 秒')
        }
      }, 1000)
    },

    bindDialog: function() {
      $('.dialog .icon-close').on('click touchend', function(e) {
        e.stopPropagation()
        $('#mask').fadeOut()
        $(this)
          .parents('.dialog')
          .fadeOut()
      })
    },
    initDialog($dialog) {
      if (!$dialog) return false
      var wh = $(window).height()
      var scrollTop = $(document).scrollTop()
      var $dh = $dialog.height()
      if (wh - $dh < 0) {
        $dialog.css({ top: 30 })
      } else {
        $dialog.css({ top: (wh - $dh) / 2 + scrollTop })
      }
    },
    showLoadingToast: function() {
      $('#loadingToast').show()
    },
    hideLoadingToast: function() {
      $('#loadingToast').hide()
    },
    showErrTip: function(msg) {
      // console.log(msg)
      $('#mask').height($(document).innerHeight())
      this.initDialog($('#errTip_dialog'))
      $('#errTip_dialog .errTip').html(msg)
      $('#mask').fadeIn()
      $('#errTip_dialog').fadeIn()
    },
    track: function(tname) {
      console.log('track: ' + tname)
      if (typeof mixpanel == 'undefined') {
        return false
      } else {
        mixpanel.track(tname)
      }
    }
  }

  addForm.init()
  window.AddressForm = addForm
})(window, jQuery)
