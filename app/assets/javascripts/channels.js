//$.ajax({
//  url: "posts.json",
//  type: "POST", //GET
//  data: {options.xxx},
//  dataType: "json"
//});
$(function(){
  //$.Channel('index');
  $('#channelList').hide();
  $('#new_channel ul li').on('click', 'button', function(event){
    event.preventDefault();
    $("#chat .status").text($(this).text() + " Chat Active");
    if($(this).children('input').length == 1) {
      $('.userNotifications').css({'background':'transparent', 'opacity': 1});
      $(this).css('border', '#9ACD32');
      $('.chatPane').removeClass('active').hide();
      GC.Channel.show($(this).children('input').val());
      GC.Notice.destroy($('.userNotifications').children('input[type=hidden]').val());
      $('.userNotifications').children('input[type=hidden]').remove();
    } else if($('.chatPane.' + $(this).attr('id')).length <= 0) {
      $('.chatPane').removeClass('active').hide();
      GC.Channel.create($(this),$.User);
      //$().append();
    } else {
      $('.chatPane.' + $(this).attr('id')).siblings().removeClass('active').hide();
    }
  });
});
(function( $ ){
  var display = function(data) {
    $(data).each(function(i,v){
      $('#channelsWrapper').append('');
    });
  };
  var route = "channels.json";
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
    create: function(){
      var obj = $('#new_channel');
      console.log(obj);
      $.post(obj[0].action, $(obj).serialize(), function(data, textStatus, jqXHR){
          console.log(data);
          $('#channellist').append("<li>" + data.name + "</li>");
          $('#channel_name').val('');
          //var strApp = '<input type="radio" value="'+data.name+'" onchange="getMessages2(\''+data.name+'\', \''+data.name+'\');" name="channel_id" id="channel_id_'+data.name+'"><label for="'+data.name+'">'+data.name+'</label>';
          //$('#channelIdsWithRadio').append(strApp);
        },
        'json'
      );
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

  $.Channel = function( method ) {
    // console.log(this);
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.index.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on Channel' );
    }    
  
  };

})( jQuery );