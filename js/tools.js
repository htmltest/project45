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

    });

})(jQuery);