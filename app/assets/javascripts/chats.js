//$.ajax({
//  url: "posts.json",
//  type: "POST", //GET
//  data: {options.xxx},
//  dataType: "json"
//});
$(function(){
  $.Channel('index');
  $('#new_channel input[type=submit]').bind('click', function(event){
    event.preventDefault();
    $.Channel('create');
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
      $.ajax({
        type: "POST",
        url: obj[0].action + '/',
        data: $(obj[0]).serialize(),
        dataType: 'json',
        success: function(msg) {
          $('#channel_id').val('');
          $('#method_type').val('POST');
          $('#channel_name').val('');               	           
        },
        error: function(){
          console.log('Error creating channel');
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