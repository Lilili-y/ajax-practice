$(function () {
  // 初始化右侧滚动条
  // 这个方法定义在scroll.js中
  resetui();

  // 为发送按钮绑定鼠标点击事件
  $('#btnSend').click(function () {
    let txt = $('#ipt').val().trim();
    if (txt) {
      $('.talk_list').append(`<li class="right_word">
      <img src="img/person02.png" /> <span>${txt}</span>
    </li>`);
      resetui();
      getReply(txt);
    }
    $('#ipt').val('');
  })
  function getReply(txt) {
    $.get('http://www.escook.cn:3006/api/robot', { spoken: txt }, function (res) {
      let word = res.data.info.text;
      $('.talk_list').append(` <li class="left_word">
        <img src="img/person01.png" /> <span>${word}</span>
      </li>`);
      resetui();
      getVoice(word);
    })
  }
  function getVoice(text) {
    $.get('http://www.escook.cn:3006/api/synthesize', { text: text }, function (res) {
      if (res.status === 200) {
        $('#voice').prop('src', res.voiceUrl);
      }
    })
  }
  $('#ipt').keyup(function (e) {
    if (e.keyCode == 13) {
      $('#btnSend').click();
    }
  })
})