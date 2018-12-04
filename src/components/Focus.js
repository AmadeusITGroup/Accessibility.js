if (typeof jQuery === 'undefined') {
   throw new Error('Accessibility JavaScript requires jQuery');
}
+function ($) {
    'use strict';

    // focus management PUBLIC CLASS DEFINITION

    var AccFocus = function (element, options) {
        this.$element = $(element);
        this.$options = $.extend({}, AccFocus.DEFAULTS, options);
        this.$element.data("accFocus", this);
        this.init();
    };

    AccFocus.DEFAULTS = $.extend({}, {
    });

    AccFocus.prototype.getDefaults = function () {
        return AccFocus.DEFAULTS;
    };

    AccFocus.prototype.setFocus = function () {
        
        var that = this;
        if (this._toggle === 'click') {
            this.$element.click(focusCallback);
        } else if (this._toggle === 'tab') {
            this.$element.on('keyup', function (e) {
                if (/*that.$element.is(':focus') &&*/ e.keyCode === 9) {
                    focusCallback();
                }
            });
        }

        function focusCallback() {
            if(that._timeoutPeriod) {
                setTimeout(function () {
                    that._focusAction();
                }, that._timeoutPeriod);
            } else {
                that._focusAction();
            }
        }
    };
    AccFocus.prototype._focusAction = function () {
        $('[data-accessibility-focus-target="' + this._nextId + '"]').focus();
        if(this._ariaExpanded) {
            this._ariaexpandedToggle();
        }
        if(this._returnId) {
            $(document).bind('keyup',{that: this},this._escKeyHandler);
        }
    };
    AccFocus.prototype._ariaexpandedToggle = function () {
        if($('[data-accessibility-focus-target="' + this._nextId + '"]').is(':visible')) {
            $('[data-accessibility-focus-return="' + this._returnId + '"]').attr('aria-expanded','true');
        } else {
            $('[data-accessibility-focus-return="' + this._returnId + '"]').attr('aria-expanded','false');
        }
    };
    AccFocus.prototype._escKeyHandler = function (e) {
        var that = e.data.that;
        if (e.keyCode === 27) {
            if(that._timeoutPeriod) {
                setTimeout(function () {
                    that._escAction();
                }, that._timeoutPeriod);
            } else {
                that._escAction();
            }
        }
    };
    AccFocus.prototype._escAction = function () {
        $(document).unbind('keyup', this._escKeyHandler);
        $('[data-accessibility-focus-return="' + this._returnId + '"]').focus();
        this._ariaexpandedToggle();
    };

    AccFocus.prototype.init = function () {
        this._returnId = this.$element.attr('data-accessibility-focus-return');
        this._nextId = this.$element.attr('data-accessibility-focus-next');
        this._timeoutPeriod = this.$element.attr('data-accessibility-timeout');
        this._ariaExpanded = this.$element.attr('aria-expanded');
        this._toggle = this.$element.attr('data-accessibility-toggle-method');
        this.setFocus();
    };
    $.fn.accFocus = function (option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('accFocus');
            var options = typeof option === 'object' && option;

            if (!data && option === 'destroy') {
                return;
            }
            if (!data) {
                data = new AccFocus(this, options);
                $this.data('accFocus', data);
            }
            if (typeof option === 'string') {
                return data[option]();
            }
        });
    };
}(jQuery);

(function($) {
    //managing focus for popups
    $('[data-accessibility-focus-next]').each(function(){
        $(this).accFocus();
    });

})(jQuery);
