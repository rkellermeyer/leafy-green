//$.ajax({
//  url: "posts.json",
//  type: "POST", //GET
//  data: {options.xxx},
//  dataType: "json"
//});
$(function(){
  $.fn.rateUp = function(article,type){
    var ratedArticle = $(this);
    $.ajax({
      type: "PUT",
      url: 'identities/posts/rate_up/' + article + '.json',
      dataType: 'json',
      success: function(rating){
        $(ratedArticle).parents('.post').children('ul').children('.postActions').children('ul').children('.rating').text(((rating.rate_up*100)/rating.votes).toFixed(0) + '%');
      },
      error: function(err){
        console.log(err);
      }
    });
  }
  
  $.fn.rateDown = function(article){
    var ratedArticle = $(this);
    $.ajax({
      type: "PUT",
      url: 'identities/posts/rate_down/' + article + '.json',
      dataType: 'json',
      success: function(rating){
        $(ratedArticle).parents('.post').children('ul').children('.postActions').children('ul').children('.rating').text(((rating.rate_up*100)/rating.votes).toFixed(0) + '%');
      },
      error: function(err){
        console.log(err);
      }
    });
  }
});

(function( $ ){
  var display = function(data) {
    //console.log(data);
    $(data).each(function(i,v){
      var rating = ((v.rate_up*100)/v.votes).toFixed(0);
      if(rating == "NaN") {
        rating = 0;
      }
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
                '<input type="hidden" value="' + v.title + '" class="postTitle" /><input type="hidden" value="' + v.url + '" class="postURL" /><input type="hidden" value="' + v.id + '" class="postID" />' +
                '<p>' + v.content + '</p>' +
                '<span class="postReadMore"><a href="' + v.url + '" target="_blank">More ></a></span>' +
              '</li>' +
              '<li class="postActions">' + 
                '<ul>' +  
                  '<li class="commentsIcon">Comments</li>' +
                  '<li class="fbIcon"><img src="images/icons/sharing/Share_Facebook.png" /></li>' +
                  '<li class="twitterIcon"><img src="images/icons/sharing/Share_Twitter.png" /></li>' +
                  '<li class="ratingIndicator"><img src="images/icons/sharing/Rating_Thumb.png" /></li>' +
                  '<li class="rating">' + rating + '%</li>' +
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
    });
    $('.created').i18Now({
      format : "%l, %F %j, %Y"
    });
    $('.postReadMore').on('click','a',function(event){
      console.log($(this));
      event.preventDefault();
      $('#postViewPort h2').text($(this).parents('span').siblings('.postTitle').val());
      //$('#postViewPort #postViewContent').text($(this).parents('span').siblings('p').text());
      //$('#postViewPort #postImage').append('<img src="' + $(this).parents('.post').siblings('.postImage').attr('src') + '" />');
      //$('#postViewPort #postImage').append('<img src="' + $(this).parents('article').children('ul').children('.postImage').children('img').attr('src') + '" />');
      $('#postViewPort').append('<iframe class="fullURL" src="' + $(this).attr('href') + '"></iframe>');
      $('.postScore').text($(this).parents('span').parents('li').siblings('.postActions').children('ul').children('.rating').text());
      $('#postViewPort .rateUp').append('<img data-article="' + $(this).parents('span').siblings('.postID').val() + '" alt="" src="images/icons/UpOpen.png">');
      $('#postViewPort .rateDown').append('<img data-article="' + $(this).parents('span').siblings('.postID').val() + '" alt="" src="images/icons/DownOpen.png">');
      $('#appWrapper, #splash_header').css('opacity',0);
      $('#postViewPort').show();
      $('.rateUp img').bind('click', function(){
        $(this).rateUp($(this).data('article'));
      });
      $('.rateDown img').bind('click', function(){
        $(this).rateDown($(this).data('article'));
      });
    });
    $('.closePostPort').bind('click',function(){
      $('#postViewPort iframe').remove();
      $('#postViewPort #postImage, #postViewPort .rateUp, #postViewPort .rateDown').empty();
      $('#postViewPort').hide();
      $('#appWrapper, #splash_header').css('opacity',1);
    });
    $('.rateUp img').bind('click', function(){
      $(this).rateUp($(this).data('article'));
    });
    $('.rateDown img').bind('click', function(){
      $(this).rateDown($(this).data('article'));
    });
  };
  var route = "posts";
  var methods = {
    // Fetch all posts
    index: function(){
      $.ajax({
        url: route + '.json',
        type: "GET",
        dataType: "json",
        success: function(data){
          display(data);
        }
      });
    },
    create: function(){
      var obj = $('#new_post');
      console.log(obj);
      $.ajax({
        type: "POST",
        url: obj[0].action + '/' + $('#post_id').val(),
        data: $(obj[0]).serialize(),
        dataType: 'json',
        success: function(msg) {
          spiderUrl = $('#post_remote_image_url').val();
          //getRateMy();
          $('#post_id').val('');
          $('#method_type').val('POST');
          $('#post_title').val('');
          $('#post_content').val('');
          $('#image_url').val('');
          $('#post_remote_image_url').val('');
          $('#post_visible').attr('checked',false);
          $("#post_imageQueue").html('');               
          $.getJSON('/storeSpiderUrlsAnemone?spiderUrl='+ spiderUrl, function (data) {
            console.log('stored the sub spider urls = '+ data);
          }); 	           
        }
      });
      return false;
    },
    read: function(options){
      $.ajax({
        statusCode: {
          200: function(){
          
          },
        },
      });
    },
    update: function(options){
      $.ajax({
        statusCode: {
          200: function(){
          
          },
        },
      });
    },
    delete: function(options){
      $.ajax({
        statusCode: {
          200: function(){
          
          },
        },
      });
    }
  };

  $.RateMy = function( method ) {
    // console.log(this);
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.index.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on RateMy' );
    }    
  
  };

})( jQuery );