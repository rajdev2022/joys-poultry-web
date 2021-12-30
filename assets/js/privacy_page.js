// document ready
$(document).ready(function() {
    loadTermsAndCondition();
});
function loadTermsAndCondition()
{

    var request_type = 'privacy_policy_return';
    var data = {
        action: 'json_get_privacy_policy',
        is_ajax: true
    };

    getResult(data, request_type);    

}
function privacy_policy_return(result)
{
   var html = '';
   html = result;
    $('.terms-and-conditions').html(html);
   
}