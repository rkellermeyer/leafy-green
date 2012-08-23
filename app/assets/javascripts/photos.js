//$.ajax({
//  url: "posts.json",
//  type: "POST", //GET
//  data: {options.xxx},
//  dataType: "json"
//});
$(function(){
  //$.Photo('index');
  $('#new_photo button').bind('click', function(event){
    event.preventDefault();
    $.Photo('create');
  });
});
(function( $ ){
  var display = function(data) {
    $(data).each(function(i,v){
      $('#postsWrapper').append('<article>' +
            '<ul>' +
              '<li class="post post_' + v.id + '">' +
                '<ul>' +
                  '<li>' +
                    '<ul class="postMeta">' +
                      '<li class="username"><%= User.find(' + v.user_id + ').name %>:</li>' +
                      '<li class="created">' + v.created_at + '</li>' +
                      '<li class="rateUp"><img src="images/icons/UpOpen.png" alt="" /></li>' +
                      '<li class="rateDown"><img src="images/icons/DownOpen.png" alt="" /></li>' +
                    '</ul>' +
                  '</li>' +
                  '<li class="postContent">' +
                    '<p>' + v.content + '</p>' +
                    '<span class="postReadMore"><a href="' + v.remote_image_url + '">More ></a></span>' +
                  '</li>' +
                  '<li class="postActions"></li>' +
                '</ul>' +
              '</li>' +
              '<li class="postImage">' +
                '<img src="' + v.image.url + '" />' +
              '</li>' +
            '</ul>' +
          '</article>');
    });
  };
  var getUploadPhotosData function(){
    $.get("/getUploadPhotosContent", null, function(data, textStatus, jqXHR){
      console.log('response getUploadPhotosContent');
      $("#uploadPhotosTabContent").empty();
      $("#uploadPhotosTabContent").append(data);
      //loadUploadifyForPhotos();
    }, 'html');
  };
  function getPhotosData(){
    $.get("/getPhotosContent", null, function(data, textStatus, jqXHR){
      console.log('response getPhotosData');
      $("#photosTabContent").empty();
      $("#photosTabContent").append(data);
    }, 'html');
  };
  function getAlbumsData(){
    $.get("/getAlbumsContent", null, function(data, textStatus, jqXHR){
      console.log('response getAlbumsContent');
      $("#alubmsTabContent").empty();
      $("#alubmsTabContent").append(data);
      getFriendsListForSelect();
      
      $.getJSON("/albums.json", function(data){
        for(c in data){
          if ( $.isPlainObject(data[c])){
            var JQry = jQuery.noConflict();
            var jj="#slider_"+data[c].id
            JQry(jj).easySlider({auto: true,continuous: true });
          }
        }
      });
    }, 'html');
  }
  var route = "posts.json";
  var methods = {
    // Fetch all posts
    index: function(){
      $.ajax({
        url: route,
        type: "GET",
        dataType: "json",
        success: function(data){
          display(data);
        }
      });
    },
    create: function(obj){
      $var obj = $('#new_photo');
      $.ajax({
        type: 'PUT',
        url: '/albums/' + $('#photo_id').val(),
        data: $(obj).serialize(),
        dataType: 'json',
        success: function(msg) {
          console.log('saved photos');
          getUploadPhotosData();
          getPhotosData();
          getAlbumsData();
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

  $.Post = function( method ) {
    // console.log(this);
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.index.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on Post' );
    }    
  
  };

})( jQuery );