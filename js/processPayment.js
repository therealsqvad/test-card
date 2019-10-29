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
  ShowMessage("РћРїРµСЂР°С†РёСЏ РѕР±СЂР°Р±Р°С‚С‹РІР°РµС‚СЃСЏ. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РїРѕРґРѕР¶РґРёС‚Рµ...");
  
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
            ShowMessage("РћСЃСѓС‰РµСЃС‚РІР»СЏРµС‚СЃСЏ РїРµСЂРµС…РѕРґ РЅР° СЃС‚СЂР°РЅРёС†Сѓ СЃ СЂРµР·СѓР»СЊС‚Р°С‚РѕРј РѕРїРµСЂР°С†РёРё...");
            
            window.location.replace($("#termURL").val());
            
            break;
          
          
          case 2:
            ShowMessage("РћСЃСѓС‰РµСЃС‚РІР»СЏРµС‚СЃСЏ РїРµСЂРµС…РѕРґ РЅР° СЃС‚СЂР°РЅРёС†Сѓ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ РѕРїРµСЂР°С†РёРё...");
            
            $("#3dsForm").attr("action", json.outData.tdsRequest.acsURL);
            $("#paReq").val(json.outData.tdsRequest.paReq);
            $("#md").val(json.outData.tdsRequest.md);
            
            $("#3dsForm").submit();
            
            break;
          
          
          default:
            ShowAlertMessage("РћС€РёР±РєР°! РќРµРёР·РІРµСЃС‚РЅС‹Р№ С‚РёРї РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ РѕРїРµСЂР°С†РёРё: "  +  json.outData.confirmationType);
            
            break;
        }
      }
      else if (json.result.code == 100009)
      {
        ShowAlertMessage('Р’СЂРµРјСЏ Р’Р°С€РµР№ СЃРµСЃСЃРёРё РёСЃС‚РµРєР»Рѕ! Р’РµСЂРЅРёС‚РµСЃСЊ РЅР° РёСЃС…РѕРґРЅСѓСЋ СЃС‚СЂР°РЅРёС†Сѓ Рё РїРѕРІС‚РѕСЂРёС‚Рµ РїР»Р°С‚РµР¶.');
        
        $("#payButton").prop("disabled", false);
      }
      else
      {
        ShowAlertMessage("РћС€РёР±РєР°! РљРѕРґ: "  +  json.result.code  +  "; СЃРѕРѕР±С‰РµРЅРёРµ: "  +  json.result.message);
        
        $("#payButton").prop("disabled", false);
      }
    })
    .fail(function(jqxhr, textStatus, error) {
      ShowAlertMessage("РћС€РёР±РєР° Р·Р°РїСЂРѕСЃР° РІ РїР»Р°С‚РµР¶РЅС‹Р№ С€Р»СЋР·: " + textStatus + "; " + error);
      
      $("#payButton").prop("disabled", false);
    });
});
