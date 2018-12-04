+function ($) {
    'use strict';
     var AccStyle = function () {
        this.init();
    };

    AccStyle.prototype.init = function () {
        var keys = {17: false, 81: false};
        $(document).keydown(function(e) {
            if (e.keyCode in keys) {
                keys[e.keyCode] = true;
                if (keys[17] && keys[81]) { 
                    $('[data-accessibility-class]').each(function() {
                        if ($(this).hasClass($(this).attr('data-accessibility-class'))){
                             $(this).removeClass($(this).attr('data-accessibility-class'));
                        }
                        else{
                            $(this).addClass($(this).attr('data-accessibility-class'));
                        }
                    });
                }
            }
        }).keyup(function(e) {
            if (e.keyCode in keys) {
                keys[e.keyCode] = false;
            }
        });
    };

    $.fn.accStyle = function (option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('accStyle');
            var options = typeof option === 'object' && option;

            if (!data && option === 'destroy') {
                return;
            }
            if (!data) {
                data = new AccStyle(this, options);
                $this.data('accStyle', data);
            }
            if (typeof option === 'string') {
                return data[option]();
            }
        });
    };
}(jQuery);


(function($) {
    $('[data-accessibility-class]').each(function(){
        $('body').accStyle();
    });
})(jQuery);