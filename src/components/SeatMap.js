if (typeof jQuery === 'undefined') {
   throw new Error('Accessibility JavaScript requires jQuery');
}
+function ($) {
    'use strict';

    // Accessible Seat Map PUBLIC CLASS DEFINITION
    // ===============================

    var AccSeatMap = function (element, options) {
        this.$element = $(element);
        this.$element.data("accSeatMap", this);
        this.init();
    };

    AccSeatMap.prototype.init = function () {

        var rowItems = this.$element.find('[data-accessibility-row-index][data-accessibility-col-index = "' + 1 + '"]');
        var colItems = this.$element.find('[data-accessibility-col-index][data-accessibility-row-index = "' + 1 + '"]');
        var rowItemsCount = rowItems.length;
        var colItemsCount = colItems.length;
        var that = $('[data-accessibility-seat-map]');

        $(that).keydown(function (e) {

            var current = $(":focus");
            var colNo = Number($(current).attr('data-accessibility-col-index'));
            var rowNo = Number($(current).attr('data-accessibility-row-index'));
            // up arrow
            if (e.keyCode === 38) {
                e.preventDefault();
                e.stopPropagation();
                if (rowNo === 1) {
                    $('[data-accessibility-row-index="' + rowItemsCount + '"][data-accessibility-col-index="' + colNo + '"]').focus();
                }
                else{
                    $('[data-accessibility-row-index="' + (rowNo - 1) + '"][data-accessibility-col-index="' + colNo + '"]').focus();
                }
            }
            // down arrow
            if (e.keyCode === 40) {
                e.preventDefault();
                e.stopPropagation();
                if (rowNo === rowItemsCount) {
                    $('[data-accessibility-row-index="' + 1 + '"][data-accessibility-col-index="' + colNo + '"]').focus();
                }
                else{
                    $('[data-accessibility-row-index="' + (rowNo + 1) + '"][data-accessibility-col-index="' + colNo + '"]').focus();
                }
            }
            // left arrow
            if (e.keyCode === 37) {
                e.preventDefault();
                e.stopPropagation();
                if (colNo === 1) {
                    $('[data-accessibility-col-index="' + colItemsCount + '"][data-accessibility-row-index="' + rowNo + '"]').focus();
                }
                else{
                    $('[data-accessibility-col-index="' + (colNo - 1) + '"][data-accessibility-row-index="' + rowNo + '"]').focus();
                }
            }
            // right arrow
            if (e.keyCode === 39) {
                e.preventDefault();
                e.stopPropagation();
                if (colNo === colItemsCount) {
                    $('[data-accessibility-col-index="' + 1 + '"][data-accessibility-row-index="' + rowNo + '"]').focus();
                }
                else{
                    $('[data-accessibility-col-index="' + (colNo + 1) + '"][data-accessibility-row-index="' + rowNo + '"]').focus();
                }
            }

        });
    };

    $.fn.accSeatMap = function (option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('accSeatMap');
            var options = typeof option === 'object' && option;

            if (!data && option === 'destroy') {
                return;
            }
            if (!data) {
                data = new AccSeatMap(this, options);
                $this.data('accSeatMap', data);
            }
            if (typeof option === 'string') {
                return data[option]();
            }
        });
    };
}(jQuery);