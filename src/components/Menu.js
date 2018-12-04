+function ($) {
    'use strict';

    // List elements PUBLIC CLASS DEFINITION
    // ===============================

    var AccMenu = function (element, options) {
        this.$element = $(element);
        this.$options = $.extend({}, AccMenu.DEFAULTS, options);
        this.$element.data("accMenu", this);
        this.init();
    };

    AccMenu.DEFAULTS = $.extend({}, {
    });

    AccMenu.prototype.getDefaults = function () {
        return AccMenu.DEFAULTS;
    };

    AccMenu.prototype._initializeIndexes = function () {
        var menuItems = this.$element.find('li > [role="menuitem"]');
        this.$menuItemCount = menuItems.length;
        this.$currentIndex = 0;
        var that = this;
        menuItems.each(function (index) {
           if($(this).attr('data-accessibility-menu-active') === 'true') {
               that.$currentIndex = index;
           }
            $(this).attr('data-accessibility-menu-item-index', index);
        });
    };
    AccMenu.prototype._initializeEvents = function () {
        var that = this;
        that.$element.on('focus', function () {
            that.$element.find('[data-accessibility-menu-item-index="' + that.$currentIndex + '"]').focus();
        });
        $(that.$element).keyup(function (e) {
            // up arrow
            if (e.keyCode === 38) {
                e.preventDefault();
                e.stopPropagation();
                if (that.$currentIndex - 1 === -1) {
                    that.$currentIndex = that.$menuItemCount;
                }
                that.$element.find('[data-accessibility-menu-item-index="' + (that.$currentIndex - 1) + '"]').focus();
                that.$currentIndex--;
            }
            // down arrow
            if (e.keyCode === 40) {
                e.preventDefault();
                e.stopPropagation();
                if (that.$currentIndex + 1 === that.$menuItemCount) {
                    that.$currentIndex = -1;
                }
                that.$element.find('[data-accessibility-menu-item-index="' + (that.$currentIndex + 1) + '"]').focus();
                that.$currentIndex++;
            }
            // escape key
            if (e.keyCode == 27) {
                
                e.preventDefault();
                e.stopPropagation();
                that.$element.siblings().focus();
            }
            // enter key
            if (e.keyCode === 13) {
                var value=$(document.activeElement).text();
                that.$element.siblings().text(value);
                that.$element.siblings().focus();
            }

        });
    };

    AccMenu.prototype.init = function () {
        this._initializeIndexes();
        this._initializeEvents();
    };
    $.fn.accMenu = function (option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('accMenu');
            var options = typeof option === 'object' && option;

            if (!data && option === 'destroy') {
                return;
            }
            if (!data) {
                data = new AccMenu(this, options);
                $this.data('accMenu', data);
            }
            if (typeof option === 'string') {
                return data[option]();
            }
        });
    };
}(jQuery);

(function($) {
    
    $('[data-accessibility-menu]').each(function(){
        $(this).accMenu();
    });

})(jQuery);