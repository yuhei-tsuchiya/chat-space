$(function(){
  function buildHTML(message){

    var image = message.image? `<img class="messages__text-box__image" src="${message.image}"></img>`: ``
    var html =  `<div class="messages__top-box">
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

    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html)
      $('.message_content.input-box__text')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
    })
    .fail(function(){
      alert('error');
    })
  })
});