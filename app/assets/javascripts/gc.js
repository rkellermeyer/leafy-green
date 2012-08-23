var GC = GC || (GC = {
  properties: {
    id: '',
    name: '',      
    uid: '',
    created_at: '',
    updated_at: ''
  },
  create: function(current_user){
    $.User = current_user;
  }
});
GC.Channel = {
  properties: {
    id: '',
    name: '',
    user_id: '',
    receiver: '',
    receiver_id: '',
    route: '/channels'
  },
  create: function(element, current_user){
    $.ajax({
      url: this.properties.route,
      type: 'POST',
      data: {
        channel: {
          name: element.text(),
          user_id: current_user.id,
          receiver_id: $(element).attr('id')
        },
        friend_id: element.attr('id'),
        user_id: current_user.id,
        notice_type: "chat"
      },
      dataType: 'json',
      success: function(data){
        $('#chatList').append(
          '<li class="chatPane ' + data.id + ' active"><input type="hidden" name="channel_id" value="' + data.id + '" /><input type="hidden" name="user_id" value="' + data.user_id + '" /><input type="hidden" name="receiver_id" value="' + data.receiver_id + '" /></li>'
        );
        //$('#notice').text('Channel has been sucessfully created.');
        GC.Notice.create(data.receiver_id, current_user.id, current_user.name + " wants to chat!", "chat", data.id);
        setInterval("GC.Message.reindex('" + data.id + "')",15000);
      },
      error: function(error){
        console.log(error);
      }
    });
  },
  show: function(channel_id) {
    $.ajax({
      url: this.properties.route + "/" + channel_id + ".json",
      type: 'GET',
      dataType: 'json',
      success: function(data){
        $('#chatList').children('.chatPane').removeClass('active');
        $('#chatList').append(
          '<li class="chatPane ' + data.id + ' active"><input type="hidden" name="channel_id" value="' + data.id + '" /><input type="hidden" name="user_id" value="' + data.user_id + '" /></li>'
        );
        //$('#notice').text('Channel has been sucessfully loaded.');
        GC.Message.reindex(data.id);
        setInterval("GC.Message.reindex('" + data.id + "')",15000);
      },
      error: function(error){
        console.log(error);
      }
    });
  },
  update: function(){
  
  },
  destroy: function(channel){
    $.ajax({
      url: this.properties.route + '/' + channel + '.json',
      type: 'DELETE',
      dataType: 'json',
      success: function(){
        //$('#notice').text('Channel has been sucessfully deleted.');
      }
    });
  }
}

GC.Message = {
  properties: {
    id: "",
    msg_body: "",
    sender: "",
    receiver: "",
    channel: "",
    route: "/messages"
  },
  create: function(element,current_user){
    $.ajax({
      url: this.properties.route,
      type: "POST",
      data: {
        message: {
          msg_body: $('input.sendChatInput').val(),
          sender: current_user.id,
          receiver: $('.chatPane.active input[name=receiver_id]').val(),
          channel: $('.chatPane.active input[name=channel_id]').val(),
          sender_name: current_user.name
        }
      },
      dataType: 'json',
      success: function(data){
        //$('#notice').text('Message has posted sucessfully.');
        $().val('');
        GC.Notice.create(data.receiver, data.sender, data.sender_name + " sent a message!", "message", data.channel);
        setInterval("GC.Message.reindex('" + data.channel + "')",15000);
      }
    });
  },
  show: function(){},
  update: function(){},
  destroy: function(){},
  reindex: function(channel){
    $.ajax({
      url: "/getMessagesOnChannel",
      type: "GET",
      data: {
        channel_id: channel
      },
      dataType: 'json',
      success: function(data){
        $('input[name=channel_id]').parents('.chatPane.' + channel).children('.chatMessage').remove();
        $(data).each(function(i,v){
          $('.chatPane.' + channel + '.active').append('<ul class="chatMessage"><li class="messenger">' + data[i].sender_name + '</li><li class="message">' + data[i].msg_body + '</li></ul>');
        });
      }
    });
  }
}

GC.Notice = {
  properties: {
    id: "",
    sender_id: "",
    receiver_id: "",
    notice_type: "",
    ref_id: "",
    message: "",
    route: "/notices"
  },
  create: function(receiverId, senderId, messageBody, noticeType, refId){
    $.ajax({
      url: this.properties.route,
      type: "POST",
      data: {
        notice: {
          message: messageBody,
          sender_id: senderId,
          receiver_id: receiverId,
          notice_type: noticeType,
          ref_id: refId
        }
      },
      dataType: 'json',
      success: function(){
        //$('#notice').text('Message has posted sucessfully.');
      }
    });
  },
  show: function(user){
    $.getJSON(this.properties.route + '/' + user + '.json', function(data){
      $('.userNotificationList li').remove();
      $(data).each(function(i,v){
      $('.userNotifications').addClass('notice');
      $('.userNotificationList').append('<li><a href="' + data[i].id + '" data-ref="' + data[i].ref_id + '" data-type="' + data[i].notice_type + '">' + data[i].message + '</a></li>');
      if($('button#' + data[i].sender_id + ' input').length <= 0 ){
        $('button#' + data[i].sender_id).css('border','1px solid red').append("<input type='hidden' value='" + data[i].ref_id + "' />");
      } else {
        $('button#' + data[i].sender_id).css('border','1px solid red');
      }
      });
    });
  },
  update: function(){
  
  },
  destroy: function(notice){
    $.ajax({
      url: this.properties.route + '/' + notice + '.json',
      type: 'DELETE',
      dataType: 'json',
      success: function(){
        //$('#notice').text('Notice has been sucessfully deleted.');
      }
    });
  }
}

GC.User = {
  properties: {
    name: "",
    last_name: "",
    categories: "",
    username: "",
    gender: "",
    month: "",
    day: "",
    year: ""
  },
  show: function(identity){
    $.post(this.action, $(this).serialize(), function(data, textStatus, jqXHR){
      //console.log('response from login save'+jqXHR);
      loggedInUserId = data.uid;
      afterLogin();
      document.getElementById("bodyContent").style.display="block";
      document.getElementById("loginForm").style.display="none";
      document.getElementById("newUserForm").style.display="none";
    }, 'json');
  },
  index: function(){
    $.getJSON('/users.json',function(data){
      $(data).each(function(i,v){
        $('#manageFriends .manageFriendsUserList').append('<li class="userListing"><button type="button" name="' + v.name + '" data-friendId="' + v.id + '">'  + v.name + '</button></li>');
      });
      $('#manageFriends ul li').on('click','button',function(event){
        event.preventDefault();
        GC.Friendship.create($('body input[name=userId]').val(),$(this).data('friendid'),$(this).text(),$.User.name);
      });
    });
  }
}

GC.Friendship = {
  properties: {
    user_id: "",
    friend_id: "",
    name: ""
  },
  create: function(current_user,friend,friendName,userName){
    $.ajax({
      url: '/friendships',
      type: 'POST',
      dataType: 'json',
      data: {
        friendship: {
          user_id: current_user,
          friend_id: friend,
          name: friendName
        }
      },
      success: function(friendship){
        console.log(friendship);
      }
    });
    $.ajax({
      url: '/friendships',
      type: 'POST',
      dataType: 'json',
      data: {
        friendship: {
          user_id: friend,
          friend_id: current_user,
          name: userName
        }
      },
      success: function(friendship){
        console.log(friendship);
      }
    });
  }
}

GC.Post = {
  properties: {
    title: '',
    content: '',
    score: 0,
    rate_up: 0,
    rate_down: 0,
    votes: 0,
    user_id: null,
    category_id: null,
    visible: null,
    image: "",
    remote_image_url: "",
    url: "",
    username: "",
    route: "/posts"
  },
  create: function(form,current_user){
    $.ajax({
      url: this.properties.route,
      type: 'POST',
      data: {
        post: {
          title: $(form[0]).children('#post_title').val(),
          content: $(form[0]).children('#post_content').val(),
          score: 0,
          rate_up: 0,
          rate_down: 0,
          votes: 0,
          user_id: $(form[0]).children('#user_id').val(),
          username: current_user.name,
          category_id: $(form[0]).children('select').val(),
          visible: $(form[0]).children('input[type=checkbox]').val(),
          image: "",
          remote_image_url: $(form[0]).children('#image_url').val(),
          url: $(form[0]).children('#url').val()
        }
      },
      dataType: 'json',
      success: function(post){
        //console.log(post);
        //$('#notice').text('Post Created.');
        $('#new_post input, #new_post textarea').val('');
        $('#postForm').hide();
        $('#postWrapper').show();
        GC.Post.reindex();
      }
    });
  },
  reindex: function(){
    $.getJSON('posts.json',function(data){
      $(data).each(function(i,v){
        $('#postsWrapper').append('<article>' +
          '<ul>' +
            '<li class="post">' +
              '<ul>' +
                '<li>' +
                  '<ul class="postMeta">' +
                    '<li class="username">' + v.username + ':</li>' +
                    '<li class="created">' + v.created_at + '</li>' +
                    '<li class="rateUp"><img src="images/icons/UpOpen.png" alt="" data-article="' + v.id + '" /></li>' +
                    '<li class="rateDown"><img src="images/icons/DownOpen.png" alt="" data-article="' + v.id + '" /></li>' +
                  '</ul>' +
                '</li>' +
                '<li class="postContent">' +
                  '<input type="hidden" value="' + v.title + '" class="postTitle" /><input type="hidden" value="' + v.url + '" class="postURL" />' +
                  '<p>' + v.content + '</p>' +
                  '<span class="postReadMore"><a href="' + v.url + '" target="_blank">More ></a></span>' +
                '</li>' +
                '<li class="postActions">' + 
                  '<ul>' +  
                    '<li class="commentsIcon">Comments</li>' +
                    '<li class="fbIcon"><img src="images/icons/sharing/Share_Facebook.png" /></li>' +
                    '<li class="twitterIcon"><img src="images/icons/sharing/Share_Twitter.png" /></li>' +
                    '<li class="ratingIndicator"><img src="images/icons/sharing/Rating_Thumb.png" /></li>' +
                    '<li class="rating">' + ((v.rate_up*100)/v.votes).toFixed(0) + '%</li>' +
                    '<li class="addToMy"><img src="images/icons/sharing/Share_AddToMy.png" /></li>' +
                    '<li class="addToFriend"><img src="images/icons/sharing/Share_Greenchat.png" /></li>' +
                  '</ul>' +
                '</li>' +
              '</ul>' +
            '</li>' +
            '<li class="postImage">' +
              '<img src="' + v.image.url + '" />' +
            '</li>' +
          '</ul>' +
        '</article>');
        //console.log(userData);
        $('.postReadMore a').bind('click', function(event){
          event.preventDefault();
          $('#postViewPort h2').text($(this).parents('span').siblings('.postTitle').val());
          $('#postViewPort #postViewContent').text($(this).parents('span').siblings('p').text());
          $('.postScore').text($(this).parents('span').parents('li').siblings('.postActions').children('ul').children('.rating').text());
          $('#appWrapper, #splash_header').css('opacity',.2);
          $('#postViewPort').show();
        });
        $('.closePostPort').bind('click',function(){
          $('#postViewPort').hide();
          $('#appWrapper, #splash_header').css('opacity',1);
        });
        $('.rateUp img').bind('click', function(){
          $(this).rateUp($(this).data('article'));
        });
        $('.rateDown img').bind('click', function(){
          $(this).rateDown($(this).data('article'));
        });
      });
    });
  }
}

GC.Album = {
  properties: {
    id: "",
    identity_id: "",
    name: "",
    caption: "",
    visibletype: "",
    accessusers: ""
  },
  create: function(obj){
    $.ajax({
      type: "POST",
      url: obj[0].action,
      data: $(obj[0]).serialize(),
      dataType: 'json',
      success: function(album){
        console.log(album);
        $('#alubmsTabContent').append('<li><button type="button"><img src="" /><br />' + album.name + '</button></li>');
      }
    });
  }
}

GC.Photo = {
  properties: {
  
  },
  create: function(obj){
    $.ajax({
      type: 'POST',
      url: obj[0].action,
      data: {
        photo: {
          visible: 1,
          caption: $('#photo_caption').val(),
          category_id: $('#new_photo select').val(),
          image: "/uploads/photo/" + $('#photo_image').val()
        }
      },
      dataType: 'json',
      success: function(photo) {
        console.log(photo);
      }
    });
  },
  index: function(limit){
    //limit
    $.getJSON('/photos',function(data){
      $(data).each(function(i,v){
        $('ul#photoStream').append('<li><div class="photoUser">' + v.publisher + '</div><div class="streamPhoto"><a href="' + v.image.url + '"><img src="' + v.image.url + '" /></a></div><span class="rateUp"><img src="images/icons/UpOpen.png" alt="" data-article="' + v.id + '"></span><span class="rateDown"><img src="images/icons/DownOpen.png" alt="" data-article="' + v.id + '"></span></li>').show();
      });
      $('.streamPhoto a').lightBox({fixedNavigation:true});
    });
  }
}
