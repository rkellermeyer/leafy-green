$(function(){
  $('a.create_an_account').click(function(event){
    event.preventDefault();
    $('#splash').hide();
    $('#signup').fadeIn();
  });
});