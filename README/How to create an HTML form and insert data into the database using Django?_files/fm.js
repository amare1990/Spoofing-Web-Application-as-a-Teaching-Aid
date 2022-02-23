jQuery.noConflict();
(function($) {
    "use strict";

    // Post Thumbnail Loader
    function post_thumbnail_config() {
        $(".fm-post-thumbnail").each(function() {
            var $this = $(this);
            
            if ($('#wrapper').hasClass('post-thumbnail-preloaders-active')) {
                $this.prepend('<div class="fm-post-thumbnail-loader"><div class="spinner-dots"><div class="dot1"></div><div class="dot2"></div></div></div>');
                $this.imagesLoaded().done(function() {
                    $this.find('.fm-post-thumbnail-loader').delay('500').fadeOut('500', function() {
                        $(this).remove();
                    });
                    setTimeout(function() {
                        $this.addClass('fm-post-thumbnail-ready');
                    }, 1000);
                });
            } else {
                $this.imagesLoaded().done(function() {
                    $this.addClass('fm-post-thumbnail-ready');
                });
            }
        });
    }


    // Sticky Row
    function sticky_row_config() {
        if ($('.header-row-3').hasClass('header-row-sticky')) {
            $(".header-row-3").sticky({
                topSpacing: 0,
                center: false,
                className: "row-sticky",
                widthFromWrapper: false
            });
        }
    }


    // Tab Switcher (Filter)
    function tab_switch_config() {
        var filter_selector = ".tab-switcher";
        $(filter_selector).each(function() {
            var $tid = $(this).data('id'),
                filter = '#filter-tab-' + $tid,
                filter_content = '.fm-box-layout-content';
            
            $(filter).find('.tab-headers li').click(function() {
                var tab_id = $(this).attr('data-tab'),
                    $this = $(this);
                
                $(filter).find(filter_content).prepend('<div class="tab-holder"></div>').append('<div class="element-loader element-on-loader"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>');
                $this.addClass('holder-header-tab');
                $(filter).find("#" + tab_id).imagesLoaded().done(function() {
                    $(filter).find('.element-loader').delay('700').fadeOut('300');
                    setTimeout(function() {
                        $(filter).find('.tab-headers li').removeClass('current-header-tab');
                        $this.addClass('current-header-tab').removeClass('holder-header-tab');
                        $(filter).find('.tab-content').hide();
                        $(filter).find('.tab-holder').remove();
                        $(filter).find("#" + tab_id).find('.tab-content').fadeIn('500');
                    }, '1100');
                });
            });
        });
    }

    function tab_mobile_switch_config() {
        if ($(window).width() < 786) {
            $(".tab-headers").each(function() {
                var $this = $(this),
                    active_class = "tab-headers-mobile-active",
                    button_active_class = "tab-headers-mobile-button-active",
                    header_class = $(".tab-headers ul");
                
                if ($('.tab-headers-mobile-button').length === 0) {
                    $this.prepend('<a class="tab-headers-mobile-button"></a>');
                }
                
                $this.find($(".tab-headers-mobile-button")).click(function() {
                    if ($(this).hasClass(button_active_class)) {
                        $(this).removeClass(button_active_class);
                    } else {
                        $(this).addClass(button_active_class);
                    }
                    if ($this.find(header_class).hasClass(active_class)) {
                        $this.find(header_class).removeClass(active_class);
                    } else {
                        $this.find(header_class).addClass(active_class);
                    }
                });
                $this.find(header_class).find("li").click(function() {
                    $this.find(header_class).removeClass(active_class);
                    $this.find(".tab-headers-mobile-button").removeClass("tab-headers-mobile-button-active");
                });
            });
        }
    }


    // Main Menu
    function mainmenu_config() {
        if ($(window).width() < 1024) {
            $(".main-menu-button").click(function() {
                $(".main-menu-wrapper").addClass('main-menu-wrapper-show');
                $('html,body').css("overflow", "hidden");
            });
            $(".main-menu-close").click(function() {
                $(".main-menu-wrapper").removeClass('main-menu-wrapper-show');
                $('html,body').css("overflow", "auto");
            });
        }
    }


    // Header Search
    function search_config() {
        var $search_head = $('.header-search-open'),
            $search_class = $('.header-search-open .s-icon');
        
        $search_class.on('click', function(e) {
            if ($search_head.hasClass('search-open')) {
                $search_head.removeClass('search-open');
            } else {
                $search_head.addClass('search-open');
            }
        });
    }


    // Extend OWL config
    ! function(t) {
        var o = function(n) {
            this.owl = n, this.owl._options = t.extend(o.Defaults, this.owl.options), this._handlers = {
                "initialized.owl.carousel": t.proxy(function(t) {
                    this.init(t);
                }, this)
            }, this.owl.$element.on(this._handlers);
        };
        o.Defaults = {
            thumbs: !1
        }, o.prototype.init = function(o) {
            if (this.owl.settings.thumbs) {
                var n = t(o.target),
                    ggg, slidegrab;
                
                jQuery(n).each(function() {
                    ggg = jQuery(this).data("id"), t(".owl-dots").wrap('<div class="owl-new-dots"></div>'), $(this).find(".owl-slider-item").addClass(function(t) {
                        return +ggg + "-" + t;
                    }), $(this).find(".owl-dot").addClass(function(t) {
                        return +ggg + "-" + t;
                    }), jQuery(".owl-dot span", n).each(function(t) {
                        slidegrab = jQuery(".owl-slider-item." + ggg + "-" + t).attr("data-thumb"), console.log(slidegrab), jQuery(this).replaceWith('<img src="' + slidegrab + '">');
                    });
                });
            }
        }, t.fn.owlCarousel.Constructor.Plugins.thumbs = o;
    }(window.Zepto || window.jQuery, window, document), ! function(t, o, n) {
        var i = function(o) {
            this.owl = o;
            var s = o;
            this.owl._options = t.extend(i.Defaults, this.owl.options), t(s.$element, n).on("click", ".owl-gcn-next", function() {
                s.next();
            }), t(s.$element, n).on("click", ".owl-gcn-prev", function() {
                s.prev();
            }), this._handlers = {
                "initialized.owl.carousel": t.proxy(function(t) {
                    this.init(t);
                }, this)
            }, this.owl.$element.on(this._handlers);
        };
        i.Defaults = {
            customnav: !1
        }, i.prototype.init = function(o) {
            if (this.owl.settings.customnav) {
                var n = t(o.target);
                t(".owl-stage-outer", n).append('<div class="owl-custom-nav"><a class="owl-gcn-prev"></a><a class="owl-gcn-next"></a></div>');
            }
        }, t.fn.owlCarousel.Constructor.Plugins.customnav = i;
    }(window.Zepto || window.jQuery, window, document), ! function(t, o, n) {
        var i = function(o) {
            this.owl = o;
            var s = o;
            this.owl._options = t.extend(i.Defaults, this.owl.options), t(s.$element, n).on("click", ".owl-slider-next", function() {
                s.next();
            }), t(s.$element, n).on("click", ".owl-slider-prev", function() {
                s.prev();
            }), this._handlers = {
                "initialized.owl.carousel": t.proxy(function(t) {
                    this.init(t);
                }, this)
            }, this.owl.$element.on(this._handlers);
        };
        i.Defaults = {
            slnav: !1
        }, i.prototype.init = function(o) {
            if (this.owl.settings.slnav) {
                var n = t(o.target);
                t(".owl-stage-outer", n).append('<div class="owl-slider-nav"><a class="owl-slider-next"></a><a class="owl-slider-prev"></a></div>');
            }
        }, t.fn.owlCarousel.Constructor.Plugins.slnav = i;
    }(window.Zepto || window.jQuery, window, document);

    function owl_config() {
        var xrtl,
            gallery_selector = ".owl-gallery-slider";
        
        if ($('html').data('rtl') === "true") {
            xrtl = $('html').data('rtl');
        } else {
            xrtl = false;
        }

        $(gallery_selector).each(function() {
            var galleryID = ".galleryid-" + $(this).data("id"),
                xnav = $(this).data("nav"),
                xdots = $(this).data("dots"),
                xthumbs = $(this).data("thumbs"),
                xitems = $(this).data("columns"),
                xmargin;
            
            if ($(this).data("columns") > 1) {
                xmargin = 10;
            } else {
                xmargin = 0;
            }
            $(galleryID).owlCarousel({
                rtl: xrtl,
                loop: false,
                smartSpeed: 500,
                margin: xmargin,
                customnav: xnav,
                dots: xdots,
                thumbs: xthumbs,
                responsive: {
                    0: {
                        items: xitems
                    }
                }
            });
        });

        var blank_carousel_selector = ".blank-box-type-carousel";
        $(blank_carousel_selector).each(function() {
            var blank_carousel = "#carouselid-" + $(this).data("id"),
                blank_carousel_content,
                filter = $(this).data("filter");
            
            if (filter === true) {
                blank_carousel_content = '.tab-content';
            } else {
                blank_carousel_content = '.fm-box-layout-content';
            }
            
            var blank_cs_sel = $(blank_carousel).find(blank_carousel_content);
            $(blank_cs_sel).owlCarousel({
                rtl: xrtl,
                loop: false,
                smartSpeed: 500,
                margin: 30,
                nav: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 2
                    },
                    768: {
                        items: 3
                    }
                }
            });
        });


        var grid_carousel_selector = ".grid-box-type-carousel";
        $(grid_carousel_selector).each(function() {
            var grid_carousel = "#carouselid-" + $(this).data("id"),
                grid_carousel_content,
                filter = $(this).data("filter");
            
            if (filter === true) {
                grid_carousel_content = '.tab-content';
            } else {
                grid_carousel_content = '.fm-box-layout-content';
            }
            
            var grid_cs_sel = $(grid_carousel).find(grid_carousel_content);
            $(grid_cs_sel).owlCarousel({
                rtl: xrtl,
                loop: false,
                smartSpeed: 500,
                margin: 30,
                nav: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    660: {
                        items: 2
                    }
                }
            });
        });
    }


    // Img zoom
    function img_zoom_config() {
        $('.thumbnail-zoom').magnificPopup({
            type: 'image',
            tLoading: '',
            closeOnContentClick: true,
            closeBtnInside: false,
            image: {
                verticalFit: true,
                titleSrc: function(item) {
                    return item.el.attr('data-caption');
                }
            },
            gallery: {
                enabled: true
            },
            removalDelay: 300,
            fixedContentPos: false,
            callbacks: {
                change: function() {
                    if (this.isOpen) {
                        this.wrap.addClass('mfp-opened');
                    }
                },
                beforeOpen: function() {
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-anim-figure');
                    this.st.mainClass = this.st.el.attr('data-effect');
                },
                beforeClose: function() {
                    this.wrap.removeClass('mfp-opened');
                },
            }
        });
    }


    // Multi Carousel zoom
    function multi_carousel_config() {
        var checkWidth = $(window).width(),
            multi_group = $(".multi-carousel-group");
        
        multi_group.each(function() {
            var $this = $(this),
                items_num = $this.data("items");
            
            if (checkWidth <= 767) {
                $this.owlCarousel({
                    loop: false,
                    nav: true,
                    margin: 5,
                    responsive: {
                        0: {
                            items: 1
                        },
                        521: {
                            items: items_num
                        },
                    }
                });
            }
        });
    }


    // Multi Carousel zoom
    function slider_carousel_config() {
        var slider_group = $(".slider-carousel-group");
        slider_group.each(function() {
            var $this = $(this),
                items_num = $this.data("items");
            
            $this.owlCarousel({
                loop: false,
                slnav: true,
                margin: 0,
                animateIn: 'fadeIn',
                animateOut: 'fadeOut',
                responsive: {
                    0: {
                        items: 1
                    },
                    521: {
                        items: items_num
                    },
                }
            });
        });
    }


    // Sticky Elements
    function sticky_config() {
        if ($(window).width() > 1023) {
            $('.sidebar').theiaStickySidebar({
                'additionalMarginTop': 30
            });
            $('.single-post-prop-area').theiaStickySidebar({
                'additionalMarginTop': 30
            });
        }
    }


    // For Infinite Trigger 
    function pagin_trigger_config() {
        var pagin_more_class = '.pagin-type-more .pagination-loadmore';
        $(pagin_more_class).on('click', 'a', function() {
            $(pagin_more_class).fadeOut(0);
        });
    }
    

    function infinite() {    
        var ft_box_selector = ".fm-box-layout";
        $(ft_box_selector).each(function() {
            var box_id = $(this).data('id');
            var ft_box = '#fm-box-' + box_id;
            var pagin_type = $(this).data('pagin');
            var $layout_type = $(this).data('item-layout');
            var container = ft_box + ' .fm-box-layout-content';
            if ($(ft_box).hasClass('left-list-box-layout')) {
                var container_item = '.fm-box-layout-content .left-list-box-item';
            } else if ($(ft_box).hasClass('grid-box-layout')) {
                var container_item = '.fm-box-layout-content .grid-box-item';
            } else {
                var container_item = '';
            }
            if (pagin_type === 'more') {
                var bhtype = 'showmore';
            } else {
                var bhtype = '';
            }
            if (pagin_type === 'more' || pagin_type === 'scroll') {
                $(container).infinitescroll({
                    navSelector: ft_box + ' .pagination',
                    nextSelector: ft_box + ' .pagination a',
                    itemSelector: container_item,
                    behavior: bhtype,
                    loading: {
                        msgText: '',
                        finishedMsg: '',
                        loaderDiv: '<div class="element-loader element-loader-center"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>'
                    }
                }, function(newElements) {
                    var $newElems = $(newElements).css({
                        opacity: 0
                    });
                    post_thumbnail_config();
                    if (pagin_type === 'more') {
                        $(ft_box).find('.pagination-loadmore').delay('300').fadeIn('500');
                    }
                    $newElems.delay('300').animate({
                        opacity: 1
                    }, 500);
                });
            }
        });
    }

    $(document).ready(function($) {
        post_thumbnail_config();
        mainmenu_config();
        sticky_row_config();
        $(window).resize(mainmenu_config);
        search_config();
        $(window).resize(multi_carousel_config);
        tab_switch_config();
        tab_mobile_switch_config();
        $(window).resize(tab_mobile_switch_config);
        owl_config();
        img_zoom_config();
        multi_carousel_config();
        slider_carousel_config();
        sticky_config();
        $(window).resize(sticky_config);
        pagin_trigger_config();
        infinite();

        // Video Post Format (Fixing with FitVids)
        $("body").fitVids();
    });
})(jQuery);