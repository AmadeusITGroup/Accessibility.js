if (typeof jQuery === 'undefined') {
   throw new Error('Accessibility JavaScript requires jQuery');
}
+function ($) {
    'use strict';

    // Accessible MenuBar PUBLIC CLASS DEFINITION
    // ===============================

    var AccMenuBar = function (element, options) {
        this.$element = $(element);
        this.$options = $.extend({}, AccMenuBar.DEFAULTS, options);
        this.$element.data("accMenuBar", this);
        this.init();
    };

    AccMenuBar.DEFAULTS = $.extend({}, {
    });

    AccMenuBar.prototype.getDefaults = function () {
        return AccMenuBar.DEFAULTS;
    };

    AccMenuBar.prototype._initializeIndexes = function () {
        var menus = this.$element.find('[data-accessibility-menu-item-parent]');
        this.$menuCount = menus.length;
        this.$currentParentIndex = 0;
        var that = this;
        menus.each(function (index) {
           if($(this).attr('data-accessibility-menu-active') === 'true') {
               that.$currentParentIndex = index;
           }
            $(this).attr('data-accessibility-menu-parent-item-index', index);
        });
    };

    AccMenuBar.prototype._initializeEvents = function () {
        var that = this;
        that.$element.on('focus', function () {
            that.$element.find('[data-accessibility-menu-parent-item-index="' + that.$currentParentIndex + '"]').focus();
        });

        $(that.$element).keyup(function (e) {
            // left arrow
            if (e.keyCode === 37) {
                e.preventDefault();
                e.stopPropagation();
                if (that.$currentParentIndex - 1 === -1) {
                    that.$currentParentIndex = that.$menuCount;
                }
                that.$element.find('[data-accessibility-menu-parent-item-index="' + (that.$currentParentIndex - 1) + '"]').focus();
                that.$currentParentIndex--;
            }
            // right arrow
            if (e.keyCode === 39) {
                e.preventDefault();
                e.stopPropagation();
                if (that.$currentParentIndex + 1 === that.$menuCount) {
                    that.$currentParentIndex = -1;
                }
                that.$element.find('[data-accessibility-menu-parent-item-index="' + (that.$currentParentIndex + 1) + '"]').focus();
                that.$currentParentIndex++;
            }
            // escape key and k ('k' is to check if bootstrap model is used)
            if ((e.keyCode === 75)||(e.keyCode === 27)) {
                e.preventDefault();
                e.stopPropagation();
                that.$element.find('[data-accessibility-menu-parent-item-index="' + that.$currentParentIndex + '"]').siblings().toggle(); //change this
                that.$element.find('[data-accessibility-menu-parent-item-index="' + that.$currentParentIndex + '"]').focus();
            }
            // down arrow and enter key
            if ((e.keyCode === 40)||(e.keyCode === 13)) {
                e.preventDefault();
                e.stopPropagation();
                that.$element.find('[data-accessibility-menu-parent-item-index="' + that.$currentParentIndex + '"]').siblings().toggle();
                that.$element.find('[data-accessibility-menu-parent-item-index="' + that.$currentParentIndex + '"]').siblings().find('[role="menuitem"]').first().focus();
            }

        });
    };

    AccMenuBar.prototype.init = function () {
        this._initializeIndexes();
        this._initializeEvents();
    };

    $.fn.accMenuBar = function (option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('accMenuBar');
            var options = typeof option === 'object' && option;

            if (!data && option === 'destroy') {
                return;
            }
            if (!data) {
                data = new AccMenuBar(this, options);
                $this.data('accMenuBar', data);
            }
            if (typeof option === 'string') {
                return data[option]();
            }
        });
    };
}(jQuery);