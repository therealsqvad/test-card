var ClientRootURL = "#clientRootURL#";
var Nonce = "#nonce#";
var SessionID = "#sessionID#";
var PageMode = "#pageMode#";
var MaskedPAN = "#maskedPAN#";

var NonceAddition = 0;


function number_format (number, decimals, dec_point, thousands_sep) {
  // Strip all characters but numerical ones.
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

function ShowMessage(message)
{
  $("#message").html(message);
}

function ShowAlertMessage(message)
{
  $("#message").html(message);
}


$(document).ready(function() {
  $.ajaxSetup({ cache: false });
});


$("#payButton").click(function() {
  NonceAddition++;
  
  switch (PageMode)
  {
    case "cvcOnly":
      var URL = ClientRootURL + "payment/";
      var InData = $.base64.encode('{"card":{"cvc2":"' + $("#cvc").val() + '"}}');
      
      break;
    
    
    default:
      var URL = ClientRootURL + "payment/";
      var InData = $.base64.encode('{"card":{"pan":"' + $("#pan").val().replace(/\s/g, "") + '","expDate":{"year":"20' + $("#exp").val().split("/")[1] + '","month":"' + parseInt($("#exp").val().split("/")[0], 10) + '"},"cvc2":"' + $("#cvc").val() + '"}' + ($("#cardTokenization").is(':checked') ? ',"cardTokenization":1' : '') + '}');
      
      break;
  }
  
  $("#payButton").prop("disabled", true);
  ShowMessage("Операция обрабатывается. Пожалуйста, подождите...");
  
  $.getJSON(
    URL,{
      inData: InData,
      nonce: Nonce + ":" + String(NonceAddition),
      sessionID: SessionID,
      errorOutFormat: "json"
    })
    .done(function(json) {
      if (json.result.code == 0)
      {
        switch (json.outData.confirmationType)
        {
          case 1:
            ShowMessage("Осуществляется переход на страницу с результатом операции...");
            
            window.location.replace($("#termURL").val());
            
            break;
          
          
          case 2:
            ShowMessage("Осуществляется переход на страницу подтверждения операции...");
            
            $("#3dsForm").attr("action", json.outData.tdsRequest.acsURL);
            $("#paReq").val(json.outData.tdsRequest.paReq);
            $("#md").val(json.outData.tdsRequest.md);
            
            $("#3dsForm").submit();
            
            break;
          
          
          default:
            ShowAlertMessage("Ошибка! Неизвестный тип подтверждения операции: "  +  json.outData.confirmationType);
            
            break;
        }
      }
      else if (json.result.code == 100009)
      {
        ShowAlertMessage('Время Вашей сессии истекло! Вернитесь на исходную страницу и повторите платеж.');
        
        $("#payButton").prop("disabled", false);
      }
      else
      {
        ShowAlertMessage("Ошибка! Код: "  +  json.result.code  +  "; сообщение: "  +  json.result.message);
        
        $("#payButton").prop("disabled", false);
      }
    })
    .fail(function(jqxhr, textStatus, error) {
      ShowAlertMessage("Ошибка запроса в платежный шлюз: " + textStatus + "; " + error);
      
      $("#payButton").prop("disabled", false);
    });
});
