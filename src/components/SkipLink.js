if (typeof jQuery === 'undefined') {
   throw new Error('Accessibility JavaScript requires jQuery');
}
+function ($) {
    'use strict';

    // Skip Link PUBLIC CLASS DEFINITION
    // ===============================

    var AccSkipLink = function (element, options) {
        this.$element = $(element);
        this.$element.data("accSkipLink", this);
        this.init();
    };

    AccSkipLink.prototype.init = function () {
        var skipLinks = this.$element.find('[data-accessibility-skip-link]');
        this.$skipLinksCount = skipLinks.length;
        /*var popup = ' <div class="modal fade" tabindex="-1" role="dialog" id="mainpop"><div class="modal-dialog" role="document"><div class="modal-content">';
        popup = popup + '<div class="modal-header" align="center"><h4 class="modal-title">Skip Links</h4></div><div class="modal-body">';*/
        var popup = '<div class="modal-dialog" role="document"><div class="modal-content"><div id="myModal1" class="modal just"><div class="modal-content"><span id="remove" class="close">&times;</span>';
        popup = popup + "<div class='modal-header' align='center'><h4 class='modal-title'>Skip Links</h4></div><ul id='linklist'>";
        var link;
        for(link = 0; link < this.$skipLinksCount; link++) {
            popup = popup + '<li><a href="#' + skipLinks[link].getAttribute('data-accessibility-skip-link') + '">' + skipLinks[link].getAttribute('data-accessibility-skip-link') + '</a> </li>'
        }
        
        $('body').append(popup);
        popup = popup + "</ul></div></div></div></div>";
        var modal = document.getElementById('myModal1');
        //var modal2 = document.getElementById('mainpop');
        var span1 = document.getElementById("remove");
        var linklist = document.getElementById("linklist");
        var keys1 = {17: false, 89: false};
        $(document).keydown(function(e) {
            if (e.keyCode in keys1) {
                keys1[e.keyCode] = true;
                if (keys1[17] && keys1[89]) {
                    modal.style.display = "block";
                    $('#linklist').children().first().children().focus();
                }
            };
        }).keyup(function(e) {
            if (e.keyCode in keys1) {
                keys1[e.keyCode] = false;
            }
        });
         span1.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        } 
        $(linklist.getElementsByTagName('a')).each(function () {
            this.onclick = function() {
                modal.style.display = "none";
            }
        });
    };
    
    $.fn.accSkipLink = function (option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('accSkipLink');
            var options = typeof option === 'object' && option;

            if (!data && option === 'destroy') {
                return;
            }
            if (!data) {
                data = new AccSkipLink(this, options);
                $this.data('accSkipLink', data);
            }
            if (typeof option === 'string') {
                return data[option]();
            }
        });
    };
}(jQuery);
