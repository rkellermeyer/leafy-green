$(function(){
 
  $('a.create_an_account').click(function(event){
    event.preventDefault();
    $('#splash').hide();
    // Load sign up template
  //  $('#signup').load('identities/getCategories');
    $.getScript('signup.js');
    $('#signup').fadeIn();
  });
});