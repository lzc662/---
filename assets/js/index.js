$('.btn-zc').on('click', function () {
  $('.login-dl').hide();
  $('.login-zc').show();
});
$('.btn-qdl').on('click', function () {
  $('.login-zc').hide();
  $('.login-dl').show();
});


let form = layui.form;
form.verify({
  username: function (value, item) { //value：表单的值、item：表单的DOM对象
    if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
      return '用户名不能有特殊字符';
    }
    if (/(^\_)|(\__)|(\_+$)/.test(value)) {
      return '用户名首尾不能出现下划线\'_\'';
    }
    if (/^\d+\d+\d$/.test(value)) {
      return '用户名不能全为数字';
    }

    //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
    if (value === 'xxx') {
      alert('用户名不能为敏感词');
      return true;
    }
  }

  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  , pass: [
    /^[\S]{6,12}$/
    , '密码必须6到12位,且不能出现空格'
  ],
  repass: function (value) {
    let reobj = $('.login-zc [name=password]').val();
    if (reobj !== value) {
      return '两次密码不一致'
    }
  }
});
// console.log($('.login-zc [name=username]').val());


// 监听注册表单
$('#form_zc').on('submit', function (e) {
  e.preventDefault();
  let data = {
    username: $('.login-zc [name=username]').val(),
    password: $('.login-zc [name=password]').val(),
  }

  $.post('/api/reguser', data, function (res) {
    if (res.status !== 0) {
      return layer.msg('注册失败', {
        icon: 2,
        time: 1500 //2秒关闭（如果不配置，默认是3秒）
      });
    }
    layer.msg('注册成功', {
      icon: 1,
      time: 1500 //2秒关闭（如果不配置，默认是3秒）
    }, function () {
      $('.btn-qdl').click();
    });
    $('.login-zc [name=username]').val('');
    $('.login-zc [name=password]').val('');
    $('.login-zc [name=repassword]').val('');
  })
});

// 监听登录表单
$('#login-dl').on('submit', function (e) {
  e.preventDefault();
  let data = {
    username: $('.login-dl [name=username]').val(),
    password: $('.login-dl [name=password]').val()
  };

  $.post('/api/login', data, function (res) {
    if (res.status !== 0) {
      return layer.msg('登录失败', {
        icon: 2,
        time: 1500 //2秒关闭（如果不配置，默认是3秒）
      });
    }
    localStorage.setItem('token', res.token)
    location.href = '/index.html'
    layer.msg('登录成功', {
      icon: 1,
      time: 1500 //2秒关闭（如果不配置，默认是3秒）
    });


  })
})