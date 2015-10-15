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

    });

})(jQuery);