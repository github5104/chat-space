$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = 
      `<div class="message" data-message-id=${message.id}>
        <div class="chat-main__main-content__box">
          <div class="chat-main__main-content__box__user">
            <div class="chat-main__main-content__box__user__name">
              ${message.user_name}
            </div>
            <div class="chat-main__main-content__box__user__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main-content__box__message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img class="lower-message__image" src=${message.image}>
        </div>
      </div>`
      return html;
    } else {
      var html = 
      `<div class="message" data-message-id=${message.id}>
        <div class="chat-main__main-content__box">
          <div class="chat-main__main-content__box__user">
            <div class="chat-main__main-content__box__user__name">
              ${message.user_name}
            </div>
            <div class="chat-main__main-content__box__user__date">
            ${message.created_at}
            </div>
          </div>
          <div class="chat-main-content__box__message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
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
        $('.chat-main__main-content').append(html);
        $('form')[0].reset();
        $('.chat-main__form__for__submit').prop('disabled', false);
        $('.chat-main__main-content').animate({ scrollTop: $('.chat-main__main-content')[0].scrollHeight });     
    })
    .fail(function () {
      $('.chat-main__form__for__submit').prop('disabled', false);
      alert("メッセージ送信に失敗しました");    
    });
  })
});