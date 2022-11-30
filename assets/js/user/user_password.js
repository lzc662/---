
function user_password() {
  let form = layui.form;
  form.verify({
    samepwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return console.log('与原密码一致');
      }
    },
    npwd: function (value) {
      if (value !== $('[name=rePwd]').val()) {
        return console.log('与新密码不一致');

      }
    },
    pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位,且不能出现空格'
    ]
  })
}
$('.layui-form-item #user_submit').on('click', function (e) {
  e.preventDefault();
  user_password();
  $('#user_form')[0].reset()

  // axios({
  //   url: '/my/updatepwd',
  //   method: 'POST',
  //   baseURL: 'http://www.liulongbin.top:3007',
  //   headers: { Authorization: localStorage.getItem('token') || '' },
  //   params: {
  //     oldPwd: $('[name=oldPwd]').val(),
  //     newPwd: $('[name=rePwd]').val()
  //   }
  // }).then(function (res) {
  //   if (res.status !== 0) {
  //   }
  // })

  // $.ajax({
  //   method: 'POST',
  //   url: 'http://www.liulongbin.top:3007/my/updatepwd',
  //   headers: { Authorization: localStorage.getItem('token') || '' },
  //   data: $(this).serialize(),
  //   success: function (e) {
  //     console.log(e);
  //   }
  // })
})
