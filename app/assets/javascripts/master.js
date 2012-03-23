$(function () {
  // Load Categories
  var getCategories = $.getJSON('categories.json', function(categories){
	console.log(categories);
  });
  
  // Splash Functions
  // Load splash template
  //$('#splash').load('splash.html');
  $.getScript('splash.js');
  $('.arrow-up-right').bind('click', function () {
    $(this).parents('section').resize('max');
    $(this).removeClass('arrow-up-right').addClass('arrow-down-left');
    $('.arrow-down-left').bind('click', function () {
      $(this).parents('section').resize();
      $(this).removeClass('arrow-down-left').addClass('arrow-up-right');
    });
  });
});