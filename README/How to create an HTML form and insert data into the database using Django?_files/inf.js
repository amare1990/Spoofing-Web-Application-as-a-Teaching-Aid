// Manual Trigger for Infinite Scroll
(function($, undefined) {
    "use strict";
    $.extend($.infinitescroll.prototype, {
        _setup_showmore: function infscr_setup_showmore() {
            var opts = this.options,
                instance = this;
            // Bind nextSelector link to retrieve
            $(opts.nextSelector).click(function(e) {
                if (e.which == 1 && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    instance.retrieve();
                }
            });
            // Define loadingStart to never hide pager
            instance.options.loading.start = function(opts) {
                opts.loading.msg.appendTo(opts.loading.selector).show(opts.loading.speed, function() {
                    instance.beginAjax(opts);
                });
            }
        },
        _showdonemsg_showmore: function infscr_showdonemsg_showmore() {
            var opts = this.options,
                instance = this;
            //Do all the usual stuff
            opts.loading.msg.find('img').hide().parent().find('div').html(opts.loading.finishedMsg).animate({
                opacity: 1
            }, 0, function() {
                $(this).parent().fadeOut('0');
            });
            //And also hide the navSelector
            $(opts.navSelector).fadeOut('0');
            // user provided callback when done
            opts.errorCallback.call($(opts.contentSelector)[0], 'done');
        }
    });
})(jQuery);