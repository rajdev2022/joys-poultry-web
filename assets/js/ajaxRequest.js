
function processResponse(request_type, response) {

    if (request_type == 'login') {
        processLogin(response);
    } else if (request_type == 'signup') {
        processSignup(response);
    } else if (request_type == 'batch_request') {
        showAlert(response);
    } else if (request_type == 'sponsor_by_id') {
        createSponsorTree(response);
    } else if (request_type == 'get_chicken_price') {
        bindChikenPrice(response);
    } else if (request_type == 'districts') {
        createDistrictSelect(response);
    } else if (request_type == 'integrator') {
        creatIntegratorSelect(response);
    } else if (request_type == 'get_my_farm_requests') {
        createMyFarmRequestsList(response);
    } else if (request_type == 'farm_request_details') {
        createMyFarmRequestDetails(response);
    } else if (request_type == 'get_user_overview') {
        createMyFarmOverviewDetails(response);
    } else if (request_type == 'get_farmer_summary') {
        createSummaryPage(response);
    } else if (request_type == 'get_farm_status') {
        createFarmRequestPills(response);
    } else if (request_type == 'get_farms_status_by_id') {
        createFarmRequestList(response);
    } else if (request_type == 'supervisors') {
        creatSupervisorsSelect(response);
    } else if (request_type == 'adding_user') {
        showAlert(response);
    } else if (request_type == 'assign_farm') {
        showAlert(response);
    } else if (request_type == 'site-visit') {
        showAlert(response);
    } else if (request_type == 'farm_request_visit_details') {
        createMyFarmRequestVisitDetails(response);

    } else if (request_type == 'batch-request') {
        batchRequestResponseProcess(response);
    } else if (request_type == 'farms') {
        createFarmsSelect(response);
    } else if (request_type == 'my_batches') {
        createBatchRequestList(response);
    } else if (request_type == 'batch_request_details') {
        createMyBatchRequestDetails(response);
    } else if (request_type == 'agent_details') {
        createSingleAgentDetails(response);
    } else {
        window[request_type](response);
    }
}


var process_type = '';

function processFromUrl(data, request_type, action = '', total_formdata = '') {
    process_type = '';
    if (action == '') {
        action = data.action;
    }

    if (typeof data == 'object') {
        data = serializeFn(data);
    }
    var formdata = {};

    if (total_formdata) {
        formdata = total_formdata;
        process_type = 'image';
    } else {
        formdata = {
            formdata: data,
            action: action
        };
    }

    getResult(formdata, request_type, process_type);
}

function getResult(formdata, request_type) {
    var ajax_obj = {
        type: "POST",
        url: base_url,
        data: formdata, //only input
        dataType: "html",
        beforeSend: function() {
            showLoader();
        },
        success: function(response) {
            response = JSON.parse(response);
            hideLoader();
            processResponse(request_type, response);
        },
    };

    if (process_type == 'image') {
        ajax_obj.contentType = false;
        ajax_obj.processData = false;
    }
    $.ajax(ajax_obj);
}

function serializeFn(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}


function showLoader() {

    setTimeout(function () {
        $(".data-loader").show();
    }, page_loading_delay_time)

}

function hideLoader() {
    $(".data-loader").hide();
}