$(function(){
  function buildHTML(message){

    var image = message.image? `<img class="messages__text-box__image" src="${message.image}"></img>`: ``
    var html =  `<div class="messages__top-box" data-id= "${message.id}">
                  <div class="messages__top-box__mini-box">
                    <div class="messages__top-box__mini-box__name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="messages__text-box">
                    <p class="messages__text-box__text">
                      ${message.content}
                    </p>
                  </div>
                  <div class="messages__text-box">
                    ${image}
                  </div>
                </div> `

  return html
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $('.submit-btn').removeAttr('data-disable-with');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('#message_content').val('');
      $('#message_image').val('');
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
    })
    .fail(function(){
      alert('error');
    })
  })

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.messages__top-box:last').data("id")

    $.ajax({

      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })

    .done(function(messages) {

      messages.forEach(function( message ) {
        var html =""
        html = buildHTML(message);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
      });

    })
    .fail(function() {

    });
  };
    // setInterval(reloadMessages, 5000);
});