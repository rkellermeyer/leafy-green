$(function() {
  $(".rateMyTabs").tabs();
  $('a.rate_up').on({
    click: function(event) {
      event.preventDefault();
      console.log();
      $.getJSON($(this).data('source'), function(data) {
        console.log(data);
        $('span.post_' + data.id + '.score').text(parseFloat(data.score * 100).toFixed(1) + "%");
      });
      $(this).text("You Like This!")
    }
  });
});