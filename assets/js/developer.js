//dcoument ready
$(document).ready(function(){
    stateSelect();
    
});
function stateSelect() {
   
   
        var request_type = 'createStateSelectReturn';
        var data = {
            type: 'state',
            user_key: localStorage.user_id,
            action: 'bind_data_for_select',
            is_ajax: true
        };

        processFromUrl(data, request_type);    

}
var default_state_feed_company=0;
function createStateSelectReturn(state) {
  /*   localStorage.setObj('stored_states', state); */
    var state = state.result;
    localStorage.setItem('stored_states', JSON.stringify(state));
    var district_html = '<option value="-1" selected">All States</option>';
    $.each(state, function(index, value) {
        var selected = "";
        if(index==default_district)
        {
            selected = "selected";
            $("#executive_state_select").trigger("change");
        }
            district_html += `<option value="` + index + `" `+selected+`>` + value + `</option>`;
    });
    $('.executive_state').html(district_html);

}

function stateChange(state_id) {
    var request_type = 'createDistrictSelectFeedCompany';
    var data = {
        type: 'districts',
        user_key: localStorage.user_id,
        state_id: state_id,
        action: 'bind_data_for_select',
        is_ajax: true,
        state_id: state_id
    };

    processFromUrl(data, request_type);
}
function createDistrictSelectFeedCompany(district) {
    var districts = district.result;
    var district_html = '<option value="-1" selected">All Districts</option>';
    $.each(districts, function(index, value) {
            district_html += '<option value="' + index + '">' + value + '</option>';
    });
    $('.executive_district').html(district_html);
}

function searchExecutive()
{
    event.preventDefault();
    
    var request_type = 'searchExecutiveReturn';
     var district_id = $('.executive_district').val();
    var data = {
        type: 'districts',
        user_key: 1,
        action: 'json_list_agent_from_web',
        is_ajax: true,
        district_id: district_id
    };

    processFromUrl(data, request_type);
  
   
}


function searchExecutiveReturn(data)
{
var html = '';
var data = data.result;
$.each(data, function(index, value) {
    html += ` <div class="col-md-6 mb-2">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title text-info">`+value.display_name+`</h5>
        <h5>USER CODE : `+value.user_code+`</h5>
        <p class="card-text"></p>

        <a href="tel:`+value.mobile+`" class="btn btn-primary"><i class="custom-fas fas fa-phone"></i> `+value.mobile+`</a>
      </div>
    </div>
  </div>`;
});
$('.executive_data').html(html);
}