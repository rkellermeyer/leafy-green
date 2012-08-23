// Prep checkboxes for top-level selection/de-selection
$('.top_level_category > input').on('click',function(){
  if($(this).prop('checked') == true){
    $(this).siblings('ul').children('li').children('input').each(function(){
      $(this).prop("checked", true);
    });
  } else if($(this).prop('checked') == false) {
    $(this).siblings('ul').children('li').children('input').each(function(){
      $(this).prop("checked", false);
    });
  }
});

// Load Categories
$.getJSON('categories.json',function(data){
  $(data).each(function(){
    console.log($(this));
  });
});

// TODO: Build Category Lists