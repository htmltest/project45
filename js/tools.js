var sliderPeriod    = 5000;
var sliderTimer     = null;

(function($) {

    $(document).ready(function() {

        $('.slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);
            curSlider.find('.slider-content li:first').css({'z-index': 2, 'left': 0, 'top': 0});
            var curHTML = '';
            curSlider.find('.slider-content li').each(function() {
                curHTML += '<a href="#"></a>';
            });
            $('.slider-ctrl').html(curHTML);
            $('.slider-ctrl a:first').addClass('active');
            sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
        });

        function sliderNext() {
            var curSlider = $('.slider');

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex + 1;
                if (newIndex >= curSlider.find('.slider-content li').length) {
                    newIndex = 0;
                }

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);

                curSlider.find('.slider-content li').eq(curIndex).css({'z-index': 2});
                curSlider.find('.slider-content li').eq(newIndex).css({'z-index': 1, 'left': 0, 'top': 0}).show();

                curSlider.find('.slider-ctrl a.active').removeClass('active');
                curSlider.find('.slider-ctrl a').eq(newIndex).addClass('active');

                curSlider.find('.slider-content li').eq(curIndex).fadeOut(function() {
                    curSlider.data('disableAnimation', true);
                    sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
                });
            }
        }

        $('.slider').on('click', '.slider-ctrl a', function(e) {
            if (!$(this).hasClass('active')) {
                window.clearTimeout(sliderTimer);
                sliderTimer = null;

                var curSlider = $('.slider');
                if (curSlider.data('disableAnimation')) {
                    var curIndex = curSlider.data('curIndex');
                    var newIndex = $('.slider-ctrl a').index($(this));

                    curSlider.data('curIndex', newIndex);
                    curSlider.data('disableAnimation', false);

                    curSlider.find('.slider-content li').eq(curIndex).css({'z-index': 2});
                    curSlider.find('.slider-content li').eq(newIndex).css({'z-index': 1, 'left': 0, 'top': 0}).show();

                    curSlider.find('.slider-ctrl a.active').removeClass('active');
                    curSlider.find('.slider-ctrl a').eq(newIndex).addClass('active');

                    curSlider.find('.slider-content li').eq(curIndex).fadeOut(function() {
                        curSlider.data('disableAnimation', true);
                        sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
                    });
                }
            }

            e.preventDefault();
        });

        $('.form-checkbox div input:checked').parent().addClass('checked');
        $('.form-checkbox div').click(function() {
            $(this).toggleClass('checked');
            $(this).find('input').prop('checked', $(this).hasClass('checked')).trigger('change');
        });

        $('.form-radio div input:checked').parent().addClass('checked');
        $('.form-radio div').click(function() {
            var curName = $(this).find('input').attr('name');
            $('.form-radio input[name="' + curName + '"]').parent().removeClass('checked');
            $(this).addClass('checked');
            $(this).find('input').prop('checked', true).trigger('change');
        });

        $('input.maskPhone').mask('+7 (999) 999-99-99');

        $('form').each(function() {
            if ($(this).parents().filter('.header-phones-callback').length == 0) {
                $(this).validate({
                  igrone: '',
                  invalidHandler: function(form, validatorcalc) {
                      validatorcalc.showErrors();
                      $('.form-field').each(function() {
                          var curField = $(this);
                          if (curField.find('input.error').length > 0 || curField.find('textarea.error').length > 0) {
                              curField.addClass('error');
                          } else {
                              curField.removeClass('error');
                          }
                      });
                      $('.form-checkbox').each(function() {
                          var curField = $(this);
                          if (curField.find('input.error').length > 0) {
                              curField.addClass('error');
                          } else {
                              curField.removeClass('error');
                          }
                      });
                  }
                });
            }
        });

        $('.header-phones-callback form').validate({
            invalidHandler: function(form, validatorcalc) {
                validatorcalc.showErrors();
                $('.header-phones-callback form').hide();
                $('.header-phones-callback-error-text').html('');
                if ($('.header-phones-callback-input input:first').hasClass('error')) {
                    $('.header-phones-callback-error-text').html('не введено имя');
                } else if ($('.header-phones-callback-input input:last').hasClass('error')) {
                    $('.header-phones-callback-error-text').html('неверно указан формат телефона');
                } else if ($('.header-phones-callback .form-checkbox input').hasClass('error')) {
                    $('.header-phones-callback-error-text').html('необходимо принять условия политики конфиденциальности');
                }
                $('.header-phones-callback-error').show();
            },
            submitHandler: function(form) {
                $.ajax({
                    type: 'POST',
                    url: $(form).attr('action'),
                    data: $(form).serialize(),
                    dataType: 'html',
                    cache: false
                }).done(function(html) {
                    $('.header-phones-callback form').hide();
                    $('.header-phones-callback-success').show();
                });
            }
        });

        $('.header-phones-callback-error-close').click(function(e) {
            $('.header-phones-callback form').show();
            $('.header-phones-callback-error').hide();
            e.preventDefault();
        });

        $('.header-phones-callback-success-close').click(function(e) {
            $('.header-phones-callback form').show();
            $('.header-phones-callback-success').hide();
            $('.header-phones-inner').removeClass('open');
            e.preventDefault();
        });

        $('.detail-photo-big a').fancybox({
            tpl : {
                closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next     : '<a title="Следующая" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev     : '<a title="Предыдущая" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            }
        });

        $('.detail-photo-preview a').click(function(e) {
            var curLink = $(this);
            var curLi = curLink.parent();

            if (!curLi.hasClass('active')) {
                $('.detail-photo-preview li.active').removeClass('active');
                curLi.addClass('active');
                $('.detail-photo-big a').attr('href', curLink.attr('rel'));
                $('.detail-photo-big img').attr('src', curLink.attr('href'));
            }

            e.preventDefault();
        });

        $('.detail-color-item input:checked').parent().addClass('checked');
        $('.detail-color-item').click(function() {
            var curName = $(this).find('input').attr('name');
            $('.detail-color-item input[name="' + curName + '"]').parent().removeClass('checked');
            $(this).addClass('checked');
            $(this).find('input').prop('checked', true).trigger('change');
        });

        $('.detail-count input').change(function() {
            var curInput = $(this);
            var curValue = Number(curInput.val());
            if (!curValue || (curValue < 1)) {
                curValue = 1;
                curInput.val('1');
            }
            recalcBasket();
        });

        $('.detail-count-dec').click(function(e) {
            var curInput = $(this).parent().find('input');
            var curValue = Number(curInput.val());
            curValue--;
            if (curValue < 1) {
                curValue = 1;
            }
            curInput.val(curValue);
            recalcBasket();

            e.preventDefault();
        });

        $('.detail-count-inc').click(function(e) {
            var curInput = $(this).parent().find('input');
            var curValue = Number(curInput.val());
            curValue++;
            curInput.val(curValue);
            recalcBasket();

            e.preventDefault();
        });

        function recalcBasket() {
            var curSumm = 0;
            $('.basket-count input').each(function() {
                curSumm += Number($(this).val());
            });
            $('.basket-summ span').html(curSumm);
        }

        $('.catalogue-ctrl-count-select-value').click(function(e) {
            var curSelect = $(this).parent();
            if (curSelect.hasClass('open')) {
                curSelect.removeClass('open');
            } else {
                $('.catalogue-ctrl-count-select.open').removeClass('open');
                curSelect.addClass('open');
            }
            e.preventDefault();
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.catalogue-ctrl-count-select').length == 0) {
                $('.catalogue-ctrl-count-select.open').removeClass('open');
            }
        });

        $('.header-callback').click(function(e) {
            $('.header-phones-inner').toggleClass('open');
            e.preventDefault();
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.header-phones-inner').length == 0) {
                $('.header-phones-inner').removeClass('open');
            }
        });

        $('.filter-ctrl').click(function(e) {
            var curLink = $(this);
            var curText = curLink.html();
            curLink.html(curLink.attr('rel'));
            curLink.attr('rel', curText);
            curLink.toggleClass('active');

            $('.filter').toggleClass('active');
            $('.filter-preview').toggleClass('active');
            updateFilterPreview();

            e.preventDefault();
        });

        $('.filter-type-item input:checked').parent().addClass('checked');
        $('.filter-type-item').click(function() {
            $(this).toggleClass('checked');
            $(this).find('input').prop('checked', $(this).hasClass('checked')).trigger('change');
        });

        $('.filter-reset').click(function() {
            window.setTimeout(function() {
                $('.filter .detail-color-item.checked').removeClass('checked');
                $('.filter .detail-color-item input:checked').parent().addClass('checked');
                $('.filter-type-item.checked').removeClass('checked');
                $('.filter-type-item input:checked').parent().addClass('checked');
            }, 100);
        });

        $('.filter').each(function() {
            updateFilterPreview();
        });

        function updateFilterPreview() {
            var newHTML = '';
            $('.filter-row').each(function() {
                var curRow = $(this);
                var curValues = '';
                if (curRow.find('.detail-color-list').length == 1) {
                    curRow.find('.detail-color-item.checked').each(function() {
                        if (curValues == '') {
                            curValues += $(this).attr('title');
                        } else {
                            curValues += ', ' + $(this).attr('title');
                        }
                    });
                }
                if (curRow.find('.filter-type-list').length == 1) {
                    curRow.find('.filter-type-item.checked').each(function() {
                        if (curValues == '') {
                            curValues += $(this).find('span').text();
                        } else {
                            curValues += ', ' + $(this).find('span').text();
                        }
                    });
                }
                if (curValues != '') {
                    newHTML += '<strong>' + curRow.find('.filter-label').html() + '</strong> <span>' + curValues + '</span>';
                }
            });
            $('.filter-preview').html(newHTML);
        }

        if (!Modernizr.touch) {
            $('body').addClass('hoverable');
        } else {
            $('.best-item').click(function() {
                $('.best-item.open').removeClass('open');
                $(this).addClass('open');
            });

            $(document).click(function(e) {
                if ($(e.target).parents().filter('.best-item').length == 0) {
                    $('.best-item.open').removeClass('open');
                }
            });

            $('.list-item').click(function() {
                $('.list-item.open').removeClass('open');
                $(this).addClass('open');
            });

            $(document).click(function(e) {
                if ($(e.target).parents().filter('.list-item').length == 0) {
                    $('.list-item.open').removeClass('open');
                }
            });
        }

        $('.best-item-detail-photo-preview a').click(function(e) {
            var curBlock = $(this).parents().filter('.best-item-detail-photos');
            curBlock.find('.best-item-detail-photo-big img').attr('src', $(this).attr('href'));
            e.preventDefault();
        });

        $('.best-item-detail-ctrl, .detail-order').submit(function(e) {
            $.ajax({
                type: 'POST',
                url: $(this).attr('action'),
                data: $(this).serialize(),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                if ($('.window').length > 0) {
                    windowClose();
                }
                windowOpen(html);
            });
            e.preventDefault();
        });

        $('.top-menu-mobile-link').click(function(e) {
            $('.top-menu-mobile').toggleClass('open');
            $('body').toggleClass('open-menu-mobile');
            e.preventDefault();
        });

        $('.top-menu-mobile-nav > li > a').click(function(e) {
            if ($(this).find('span').length > 0) {
                $(this).parent().toggleClass('open');
                e.preventDefault();
            }
        });

        $('.top-search-mobile-link').click(function(e) {
            $('.top-search-mobile').toggleClass('open');
            e.preventDefault();
        });

        $('.catalogue-block-prev').click(function(e) {
            var curBlock = $(this).parent();
            curBlock.find('.catalogue-block-list a:first').stop(true, true);
            var curLeft = Number(curBlock.find('.catalogue-block-list a:first').css('margin-left').replace(/px/, ''));
            if (curLeft < 0) {
                curBlock.find('.catalogue-block-list a:first').animate({'margin-left': (curLeft + curBlock.find('.catalogue-block-list a:first').width()) + 'px'});
            }
            e.preventDefault();
        })

        $('.catalogue-block-next').click(function(e) {
            var curBlock = $(this).parent();
            curBlock.find('.catalogue-block-list a:first').stop(true, true);
            var curLeft = Number(curBlock.find('.catalogue-block-list a:first').css('margin-left').replace(/px/, ''));
            if (curBlock.find('.catalogue-block-list a:first').width() * (curBlock.find('.catalogue-block-list a').length - 1) > -curLeft) {
                curBlock.find('.catalogue-block-list a:first').animate({'margin-left': (curLeft - curBlock.find('.catalogue-block-list a:first').width()) + 'px'});
            }
            e.preventDefault();
        })

        $('.best-list-prev').click(function(e) {
            var curBlock = $(this).parent();
            curBlock.find('.best-item:first').stop(true, true);
            var curLeft = Number(curBlock.find('.best-item:first').css('margin-left').replace(/px/, ''));
            if (curLeft < 0) {
                curBlock.find('.best-item:first').animate({'margin-left': (curLeft + curBlock.find('.best-item:first').width()) + 'px'});
            }
            e.preventDefault();
        })

        $('.best-list-next').click(function(e) {
            var curBlock = $(this).parent();
            curBlock.find('.best-item:first').stop(true, true);
            var curLeft = Number(curBlock.find('.best-item:first').css('margin-left').replace(/px/, ''));
            if (curBlock.find('.best-item:first').width() * (curBlock.find('.best-item').length - 1) > -curLeft) {
                curBlock.find('.best-item:first').animate({'margin-left': (curLeft - curBlock.find('.best-item:first').width()) + 'px'});
            }
            e.preventDefault();
        })

        $('.content-crop-open').click(function(e) {
            $(this).parent().toggleClass('open');
            e.preventDefault();
        });

        $('.main .main-news-content').data('curIndex', 0);

        $('.main-news-prev').click(function(e) {
            var curBlock = $(this).parent();
            curBlock.find('.main-news-content').stop(true, true);
            curBlock.find('.main .main-news-item:first').stop(true, true);
            var curLeft = Number(curBlock.find('.main-news-item:first').css('margin-left').replace(/px/, ''));
            var curIndex = $('.main .main-news-content').data('curIndex');
            curIndex--;
            if (curIndex < 0) {
                curIndex = 0;
            }
            if (curLeft < 0) {
                curBlock.find('.main-news-item:first').animate({'margin-left': (curLeft + curBlock.find('.main-news-item:first').width()) + 'px'});
                curBlock.find('.main-news-content').animate({'height': curBlock.find('.main-news-item').eq(curIndex).outerHeight()});
            }
            e.preventDefault();
        })

        $('.main-news-next').click(function(e) {
            var curBlock = $(this).parent();
            curBlock.find('.main-news-content').stop(true, true);
            curBlock.find('.main-news-item:first').stop(true, true);
            var curLeft = Number(curBlock.find('.main-news-item:first').css('margin-left').replace(/px/, ''));
            var curIndex = $('.main .main-news-content').data('curIndex');
            curIndex++;
            if (curIndex > curBlock.find('.main-news-item').length - 1) {
                curIndex = curBlock.find('.main-news-item').length - 1;
            }
            if (curBlock.find('.main-news-item:first').width() * (curBlock.find('.main-news-item').length - 1) > -curLeft) {
                curBlock.find('.main-news-item:first').animate({'margin-left': (curLeft - curBlock.find('.main-news-item:first').width()) + 'px'});
                curBlock.find('.main-news-content').animate({'height': curBlock.find('.main-news-item').eq(curIndex).outerHeight()});
            }
            e.preventDefault();
        })

    });

    $(window).bind('load resize', function() {
        $('.catalogue-block-list a:first').stop(true, true).removeAttr('style');

        $('.best-item:first').stop(true, true).removeAttr('style');

        $('.content-crop').each(function() {
            var curBlock = $(this);
            if (curBlock.find('.content-crop-inner').height() > curBlock.height()) {
                curBlock.addClass('active');
            } else {
                curBlock.removeClass('active');
            }
        });

        $('.main-news-content').stop(true, true).removeAttr('style');
        $('.main-news-content').data('curIndex', 0);
        $('.main .main-news-item:first').stop(true, true).removeAttr('style');
        if ($(window).width() <= 940) {
            $('.main .main-news-content').height($('.main-news-item:first').outerHeight());
        }
    });

    function windowOpen(contentWindow) {
        var windowWidth     = $(window).width();
        var windowHeight    = $(window).height();
        var curScrollTop    = $(window).scrollTop();

        var bodyWidth = $('body').width();
        $('body').css({'height': windowHeight, 'overflow': 'hidden'});
        var scrollWidth =  $('body').width() - bodyWidth;
        $('body').css({'padding-right': scrollWidth + 'px'});
        $(window).scrollTop(0);
        $('.top').css({'margin-top': -curScrollTop});
        $('.top').data('scrollTop', curScrollTop);

        $('body').append('<div class="window"><div class="window-overlay"></div><div class="window-loading"></div><div class="window-container window-container-load"><div class="window-content">' + contentWindow + '<a href="#" class="window-close"></a></div></div></div>')

        if ($('.window-container img').length > 0) {
            $('.window-container img').each(function() {
                $(this).attr('src', $(this).attr('src'));
            });
            $('.window-container').data('curImg', 0);
            $('.window-container img').load(function() {
                var curImg = $('.window-container').data('curImg');
                curImg++;
                $('.window-container').data('curImg', curImg);
                if ($('.window-container img').length == curImg) {
                    $('.window-loading').remove();
                    $('.window-container').removeClass('window-container-load');
                    windowPosition();
                }
            });
        } else {
            $('.window-loading').remove();
            $('.window-container').removeClass('window-container-load');
            windowPosition();
        }

        $('.window-overlay').click(function() {
            windowClose();
        });

        $('.window-close, .window-close-bottom').click(function(e) {
            windowClose();
            e.preventDefault();
        });

        $('body').bind('keyup', keyUpBody);
    }

    function windowPosition() {
        var windowWidth     = $(window).width();
        var windowHeight    = $(window).height();

        if ($('.window-container').width() > windowWidth - 110) {
            $('.window-container').css({'margin-left': 55, 'left': 'auto'});
            $('.window-overlay').width($('.window-container').width() + 110);
        } else {
            $('.window-container').css({'margin-left': -$('.window-container').width() / 2});
        }

        if ($('.window-container').height() > windowHeight - 80) {
            $('.window-overlay').height($('.window-container').height() + 80);
        } else {
            $('.window-container').css({'margin-top': -$('.window-container').height() / 2});
        }
    }

    function keyUpBody(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    }

    function windowClose() {
        $('body').unbind('keyup', keyUpBody);
        $('.window').remove();
        $('.top').css({'margin-top': '0'});
        $('body').css({'height': 'auto', 'overflow': 'visible', 'padding-right': 0});
        $(window).scrollTop($('.top').data('scrollTop'));
    }

})(jQuery);