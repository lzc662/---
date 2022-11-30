
let form = layui.form;
let layer = layui.layer;
form.verify({
  nickname: function (value, item) { //value：表单的值、item：表单的DOM对象
    if (value.length > 6) {
      return '用户名不能低于6个字符';
    }
  }
});
getuser_info()
// 获取数据
function getuser_info() {
  axios({
    url: '/my/userinfo',
    method: 'GET',
    baseURL: 'http://www.liulongbin.top:3007',
    headers: { Authorization: localStorage.getItem('token') || '' }
  }).then(function (res) {
    if (res.status != 200) {
      return layer.msg('获取失败')
    }
    renderuser_info(res)
  })
}
// 渲染数据
function renderuser_info(e) {
  let data = e.data.data;
  // form.val('user_info', data);
  form.val("user_info", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
    "username": data.username || '' // "name": "value"
    , "nickname": data.nickname || ''
    , email: data.email || ''
    , id: '12321'
  });
}

// 重置功能
$('.user_bottom #user_reset').on('click', function (e) {
  e.preventDefault();
  getuser_info()
})

// 表单提交
$('.user_bottom #user_submit').on('click', function (e) {
  e.preventDefault();
  axios({
    url: '/my/userinfo',
    method: 'POST',
    baseURL: 'http://www.liulongbin.top:3007',
    headers: { Authorization: localStorage.getItem('token') || '' },
    params: {
      id: $('.user_bottom input[name=id]').val(),
      nickname: $('.user_bottom input[name=nickname]').val(),
      email: $('.user_bottom input[name=email]').val()
    }
  }).then(function (res) {
    window.parent.getuserInfo()
    console.log(res);
  })
})














