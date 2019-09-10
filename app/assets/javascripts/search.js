$(function(){

  var search_list = $("#user-search-result");

  function appendUser(user) {                                                                           //先ほど削除した映画情報のhtmlをもう一度作成しているだけ
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div> `
    search_list.append(html);
    }

    function appendErrMsgToHTML(msg) {
      var html = ` <div class='chat-group-user clearfix'>${ msg }</div>`
      search_list.append(html);
    }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    if (input == ""){
      return
    }

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('エラー');
    })
  });

  var member_list = $(".chat-group-users.js-add-user");

  function member(user) {
    var html = `<div class='chat-group-user clearfix js-chat-member'>
                  <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                  <p class='chat-group-user__name'>${user.name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    member_list.append(html);
  }

  $('#user-search-result').on('click', '.user-search-add',function(){
    var datas =  {id: $(this).data('user-id'),name: $(this).data('user-name')}
    $(this).parent().remove();
    member(datas);

    })

    $(document).on('click', '.user-search-remove',function(){
      $(this).parent().remove();

    })
});