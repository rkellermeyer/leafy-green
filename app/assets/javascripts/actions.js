function index(source) { 
  $.getJSON('test_data/' + source + '.json', function(data){
    for(var i = 0; i < data.length; i++){
      console.log(data[i].content);
    }
  });
}

function hideForm(form) {
  $(form).hide;
}

function showsignup(){
  
  var bb= document.getElementById('newUserForm');
  var cc= document.getElementById('loginForm');
  if(bb.style.display =='none'){
    bb.style.display = "block";
    cc.style.display ="none";
  } else {
    bb.style.display = "none";
  }
}

function showlogin(){
  var bb = document.getElementById('loginForm');
  var cc = document.getElementById('newUserForm');
  if(bb.style.display == 'none'){
    bb.style.display = "block";
    cc.style.display = "none";
  } else {
    bb.style.display = "none";
  }
}

function activateChatNotifications() {
  
} 

//var numOfAttempts = 1;
function populatePostContent(spiderUrl){
  $.getJSON('/getPopulatePostContent?spiderUrl=' + spiderUrl, function (data) {
    console.log(data);
    $("#image_url").val(data.src);
    $("#post_title").val(data.title);
    $("#post_content").val(data.content);
    $('#new_form').append('<input type="hidden" name="postUrl" data-url="' + data.url + '" />');
  });  
}

/* Begin Uploadify function 
function loadUploadifyForPhotos() {
<% key = Rails.application.config.session_options[:key] %>
  var uploadify_script_data = {};
  var csrf_param = $('meta[name=csrf-param]').attr('content');
  var csrf_token = $('meta[name=csrf-token]').attr('content');
  uploadify_script_data[csrf_param] = encodeURI(encodeURIComponent(csrf_token));
  uploadify_script_data['<%= key %>'] = '<%= cookies[key] %>';
  var JQry = jQuery.noConflict();
<% session_key_name = Rails.application.config.session_options[:key] %>
  JQry('#photo_image').click(function (event) {
    event.preventDefault();
  });
  JQry('#photo_image').uploadify({
    uploader:'/uploadify.swf',
    script:'/photosimage',
    cancelImg:'assets/images/cancel.png',
    auto:true,
    fileExt:'*.png;*.jpg;*.gif',
    multi:false,
    scriptData:{
      '_http_accept':'application/javascript',
      'format':'json',
      '_method':'post',
      'user_id':<% if current_user1 %><%= current_identity1.id %><% else %>loggedInUserId<% end %>,
    },
    onProgress:function (event, queueID, fileObj, data) {
      $('#photo_imageQueue').html(fileObj.name + " - " + data.percentage + '%')
    },

    onComplete:function (a, b, c, response) {
      console.log(response);
      var dat = eval('(' + response + ')');
      $('#photo_id').val(dat.id);
      JQry.getScript(dat.upload);
    }

  });
  JQry('#photo_image').click(function (event) {
    event.preventDefault();
    JQry('#photo_image').uploadifyUpload();
  });

}
End Uploadify function */

function showActiveChat(){
  $('.chatPane.' + $('#chatForm form button.active').attr('id')).show().siblings().hide();
}

$(function(){
  if($.cookie('user_logged_in')){
    $('#splash, #signup, #signform').slideUp('slow').remove();
    $.getJSON('identities/' + $.cookie('user_logged_in'), function(data){
      //$.cookie('user_logged_in', true, { expires: 7});
      GC.create(data);
      $('#splash, #signup, #signform').remove();
      $('.userImage').append('<img src="' + data.image + '" />');
      $('.userName').append("<span>" + data.name + " " + data.last_name + "</span>");
      $('.userOptionsToggle').append('<img src="images/icons/Select_DropArrow.png" />');
      $('.userFriends').append('<img src="images/icons/Friends_20x20.png" />');
      $('.userNetwork').append('<img src="images/icons/Network.png" />');
      $('.userNotifications').append('<img src="images/icons/Messages.png" />');
      GC.Notice.show($.User.id);
      setInterval("GC.Notice.show('" + $.User.id + "')",25000);
      $.RateMy('index');
      $('body input[name=userId]').val($.User.id);
    });
    $('#appWrapper').slideDown('slow');
    $('.optionsShade').slideUp('slow');
  }
  GC.Photo.index();
  $('#social, #blog, #deals').hide();
  //var current_user = $.User;
  $('#ajaxLoad').hide();
  //$('#ajaxLoad').ajaxStart(function() {
		//$(this).css('height', $(window).height() + "px");
    //$(this).siblings().css('opacity','.3');
    //$(this).show();
	//}).ajaxStop(function() {
  //  $(this).css('height','0px').css('overflow', 'hidden');
    //$(this).siblings().css('opacity','1');
  //  $(this).hide();
  //});
  $('#ticker').ticker({controls: false});
  $('#appWrapper section').css('height', $(window).height() * .47);
  $('.sizer').bind('click',function(){
    if($(this).hasClass('max')){
      $(this).removeClass('max')
             .addClass('min')
             .parents('section')
             .css('height','100%')
             .css('width','100%')
             .siblings()
             .hide();
    } else {
      $(this).removeClass('min')
           .addClass('max')
           .parents('section')
           .css('height',$(window).height() * .47)
           .css('width','32.5%')
           .siblings()
           .show();
    }
  });
  $('.userOptionsToggle').on('click','img', function(){
    // Open user options pane.
    $('userOptions').show();
  });
  
  $('.userNotifications').on('click','img',function(){
    $('.userNotificationList').toggle('slideDown');
    $('ul.userNotificationList li').on('click','a',function(event){
      event.preventDefault();
      //console.log(event);
      GC.Channel.show($(this).data('ref'));
      GC.Notice.destroy($(this).attr('href'));
      $(this).remove();
      $('.userNotificationList').toggle('slideDown');
    });
  });
  
  $('.userFriends').on('click','img',function(){
    $('#manageFriends ul').empty();
    GC.User.index();
    $('#manageFriends').toggle('slideDown');
  });
  
  $('.options').bind('click',function(){
    $(this).parents('section')
           .children('aside')
           .slideToggle();//
  });
  $('.optionsShade span').bind('click', function(){
    newStatus = $(this).text();
    $(this).parents('section').children('header').children('ul').children('li').children('ul').children('li.status').text(newStatus);
    if(newStatus == "Post"){
      $('#postsWrapper').toggle();
      $('#postForm').toggle();
      $(this).parents('section')
             .children('aside')
             .slideToggle();
      $('#addPostImage').hide();
    }
  });
  /* Begin Auth */
  $('.create_an_account').bind('click', function(event){
    event.preventDefault();
    //console.log($(this));
    //showsignup();
    $('#newUserForm').toggle();
    $('#loginForm').toggle();
  });
  /* Begin Chat */
  //console.log($('.chatPane').parents('section').height());
  var parentHeight1 = $('section#chat ul#chatList li.chatPane').parents('section').height() - 80 + 'px';
  var parentHeight2 = $('section#chat ul#chatList li.chatPane').parents('section').height() - 20 + 'px';
  var parentHeight3 = $('section#chat ul#chatList li.chatPane').parents('section').height() - 28 + 'px';
  $('#alubmsTabContent, #postsWrapper').css('height', parentHeight3);
  $('section#chat ul#chatList li.chatPane').css('height', parentHeight1);
  $('section#chat #channelForm').css('height', parentHeight2);
  $('.conversationToggle').bind('click', function(){
    $('#channelForm').toggle('slide');
  });
  $('.sendChatInput').keyup(function(e){
    if(e.keyCode == 13){
      //event.preventDefault();
      $(e.currentTarget).parents('#sendChat').siblings('#chatList').children('.chatPane.active').append('<ul class="chatMessage">' +
        '<li class="messenger">' + $.User.name + ':</li>'+
        '<li class="message">' + $(e.currentTarget).val() + '</li>' +
        '</ul>');
      GC.Message.create($(this),$.User);
      $(e.currentTarget).val('');
      //console.log(e);
    }
  });
  $('.sendChatButton').bind('click',function(event){
    event.preventDefault();
    $(this).parents('#sendChat').siblings('#chatList').children('.chatPane.active').append('<ul class="chatMessage">' +
      '<li class="messenger">' + $.User.name + ':</li>'+
      '<li class="message">' + $(this).siblings('input').val() + '</li>' +
      '</ul>');
    GC.Message.create($(this),$.User);
    $(this).siblings('input').val('');
  });
  
  /* Begin Albums */
  $('#new_album form button').bind('click', function(){
    console.log($(this));
  });
  
  /* Begin Photos */
  $('#photo-1, #photo-2, #photo-5, #photo-4').hide();
  $('#photos aside .addPhoto').bind('click', function(){
    $(this).parents().children('#photo-2').toggle();
    $('#new_album').hide();
    $('#new_photo').show();
    $('#photoStream').toggle();
  });
  $('#photos aside .addAlbum').bind('click', function(){
    $(this).parents().children('#photo-2').toggle();
    $('#new_photo').hide();
    $('#new_album').show();
  });
  $('#photoStream li span.rateUp').bind('click',function(){
  
  });
  $('#photoStream li span.rateDown').bind('click',function(){
  
  });
  /* Begin RateMy */
  $('#postsWrapper').show();
  $('section#rateMy aside').on('click', 'span', function(event){
    posts = $.RateMy('index');
    //console.log(posts);
  });
  $('#post_remote_image_url').bind('blur', function(event){
    populatePostContent($(this).val());
    //console.log('Feed Me');
    $('#url').val($(this).val());
  });
  
  /* Begin Extensions */
  //$.fn.createChannel = function(){
    //console.log($(this));
    //$.post('/channels', $(this).serialize(), function(data, textStatus, jqXHR){
        //console.log(data);
        //$('#channellist').append("<li>" + data.name + "</li>");
        //$('#channel_name').val('');
      //}//,
      //'json'
    //);
    //return false;
  //}
  $.getMessages = function(channelId, channelName){
    console.log('channel = ' + channelName);
    //global_channelId = channelId;
    //global_channelName = channelName;
    $.get('\getMessagesOnChannel', {channel_id: channelId}, function(data, textStatus, jqXHR){
      //$('.chatPane.' + channelName).show();
      //$("#messages2").append("<br/>" + channelName + "&nbsp; Messages");
      //$("#messages2").append("<a href='\downloadMessagesOnChannel?channel_id=" + channelId + "'>Download Messages</a><hr/>");
      //for(var i in data) {
      //  $('.chatPane.' + channelName).append("<ul class='chatMessage'><li class='messenger'>" + data[i].sender + "</li><li class='message'>" + data[i].msg_body + "</li>");
      //}
      console.log(data);
    }, 'json');
  }
});