
$(function () {
  getuserInfo()
})

// 渲染登入页面
function getuserInfo() {
  axios({
    url: '/my/userinfo',
    method: 'GET',
    baseURL: 'http://www.liulongbin.top:3007',
    headers: { Authorization: localStorage.getItem('token') || '' },
  }
  ).then(function (res) {
    console.log(res);
    if (res.data.status !== 0) {
      return console.log('获取失败');
    }
    getuserimg(res);
    getusername(res);
    // console.log(res);
  })
}
// 判断头像是否为空，空则显示默认头像
function getuserimg(e) {
  let img = e.data.data.user_pic
  if (img) {
    $('.layui-nav-img').show()
    $('.uesr_img').hide()
  }
  else {
    $('.layui-nav-img').hide()
    $('.uesr_img').show()
  }
}
// 判断用户姓名是否为空，空则显示默认用户姓名
function getusername(e) {
  let names = e.data.data.nickname || e.data.data.username
  $('.uesr_name').text(names)
}

// 退出功能
// let layer = layui.layer
$('.user_exit').on('click', function () {
  localStorage.removeItem('token');
  location.href = 'login.html'

})
