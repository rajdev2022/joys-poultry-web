// document ready
$(document).ready(function() {
    loadTermsAndCondition();
});
function loadTermsAndCondition()
{

    var request_type = 'terms_conditions_return';
    var data = {
        action: 'json_get_terms_and_conditions',
        is_ajax: true
    };

    getResult(data, request_type);    

}
function terms_conditions_return(result)
{
   var html = '';
   html = result;
    $('.terms-and-conditions').html(html);
   
}