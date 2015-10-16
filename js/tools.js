(function($) {

    $(document).ready(function() {

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
            $(this).validate({
              invalidHandler: function(form, validatorcalc) {
                  validatorcalc.showErrors();
                  $('.form-field').each(function() {
                      var curField = $(this);
                      if (curField.find('label.error').length > 0) {
                          curField.addClass('error');
                      } else {
                          curField.removeClass('error');
                      }
                  });
              }
            });
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
        });

        $('.detail-count-dec').click(function(e) {
            var curInput = $(this).parent().find('input');
            var curValue = Number(curInput.val());
            curValue--;
            if (curValue < 1) {
                curValue = 1;
            }
            curInput.val(curValue);

            e.preventDefault();
        });

        $('.detail-count-inc').click(function(e) {
            var curInput = $(this).parent().find('input');
            var curValue = Number(curInput.val());
            curValue++;
            curInput.val(curValue);

            e.preventDefault();
        });

        $('.catalogue-ctrl-count-select-value').click(function(e) {
            $('.catalogue-ctrl-count-select.open').removeClass('open');
            $(this).parent().addClass('open');
            e.preventDefault();
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.catalogue-ctrl-count-select').length == 0) {
                $('.catalogue-ctrl-count-select.open').removeClass('open');
            }
        });

        $('.filter-ctrl').click(function(e) {
            var curLink = $(this);
            var curText = curLink.html();
            curLink.html(curLink.attr('rel'));
            curLink.attr('rel', curText);
            curLink.toggleClass('active');

            $('.filter').toggleClass('active');

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