$(function () {
  getCmt();
  function getCmt() {
    $.get('http://www.liulongbin.top:3006/api/cmtlist', function (res) {
      if (res.status !== 200) {
        return alert('评论刷新失败');
      }
      let arr = [];
      $.each(res.data, function (i, item) {
        arr.push(` <li class="list-group-item">
        <span class="badge" style="background-color: #F0AD4E;">评论时间：${item.time}</span>
        <span class="badge" style="background-color: #5BC0DE;">评论人：${item.username}</span>
        ${item.content}
      </li>`)
      })
      $('#cmt-list').empty().append(arr.join(''));
    });
  }
  //发表评论
  $('#formAddCmt').submit(function (e) { 
    e.preventDefault();
    let newdat = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: 'http://www.liulongbin.top:3006/api/addcmt',
      data: newdat,
      success: function (res) {
        if (res.status !== 201) {
          return alert('评论失败');
        }
        getCmt();
        $('#formAddCmt')[0].reset();
      }
    })
  })
});