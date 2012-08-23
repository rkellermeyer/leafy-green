function index(source) { 
  $.getJSON('test_data/' + source + '.json', function(data){
    for(var i = 0; i < data.length; i++){
      console.log(data[i].content);
    }
  });
}

$(function(){
  $('.sizer').bind('click',function(){
    if($(this).hasClass('max')){
      $(this).removeClass('max')
             .addClass('min')
             .parents('section')
             .css('height','33em')
             .css('width','77em')
             .siblings()
             .hide();
    } else {
      $(this).removeClass('min')
           .addClass('max')
           .parents('section')
           .css('height','20em')
           .css('width','25em')
           .siblings()
           .show();
    }
  });
  $('.options').bind('click',function(){
    $(this).parents('section')
           .children('aside')
           .slideToggle();//
  });
});