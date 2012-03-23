(function( $ ){

  var methods = {
    init : function( options ) {
      this.css('width','30%').css('height','48%');
    },
    max : function( ) {
      this.css('height', $(window).height()).css('width',$(window).width()-20);
    },
    hide : function( ) {
      this.hide();
    }
  };

  $.fn.resize = function( method ) {

    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }

  };

})( jQuery );