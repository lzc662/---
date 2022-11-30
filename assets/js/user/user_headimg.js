var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

$('.btn_upload').on('click', function () {
  $('.upload').click()
})

$('.upload').on('change', function (e) {
  let files = e.target.files
  if (files.length === 0) {
    return alert('请上传');
  }
  var file = e.target.files[0];
  var newImgURL = URL.createObjectURL(file)
  $image.cropper('destroy').attr('src', newImgURL).cropper(options)
})


$('.btn_uploads').on('click', function () {
  var dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    }).toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
  console.log(dataURL);
  axios({
    url: 'http://www.liulongbin.top:3007/my/update/avatar',
    method: 'POST',
    // baseURL: '',
    headers: {
      Authorization: localStorage.getItem('token' || '')
    },
    data: {
      avatar: dataURL
    }
  }).then(function (e) {
    console.log(e)
  })
  window.parent.getuserInfo()
})