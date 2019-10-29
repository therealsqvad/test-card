/**
 * Credit.js
 * Version: 1.0.0
 * Author: Ron Masas
 */

(function ($) {
  
  $.fn.extend({
    credit: function (args) {
      
      $(this).each(function () {
        
        
        // Set defaults
        var defaults = {
          auto_select: true
        }
        
        var maxLength = 4;
        // Init user arguments
        var args = $.extend(defaults, args);
        
        // global var for the orginal input
        var credit_org = $(this);
        
        // Hide input if css was not set
        credit_org.css("display", "none");
        
        // Create credit control holder
        var credit_control = $('<div></div>', {
          class: "credit-input"
        });
        
        // Add credit cell inputs to the holder
        for (i = 0; i < 5; i++) {
          if (i !== 4) placeH = "0000"
          else placeH = "000"
          credit_control.append(
            $("<input />", {
              class: "credit-cell",
              placeholder: placeH,
              max: placeH.length,
              type: "tel",
              id: "cell" + i
            })
          );
        }
        
        // Print the full credit input
        credit_org.after(credit_control);
        
        // Global var for credit cells
        var cells = credit_control.children(".credit-cell");
        
        /**
         * Set key press event for all credit inputs
         * this function will allow only to numbers to be inserted.
         * @access public
         * @return {bool} check if user input is only numbers
         */
        
        var prevCode = "";
        
        cells.keypress(function (event) {
          
          // Check if key code is a number
          if (event.keyCode > 31 && (event.keyCode < 48 || event.keyCode > 57)) {
            // Key code is a number, the `keydown` event will fire next
            return false;
          }
          // Key code is not a number return false, the `keydown` event will not fire
          return true;
          
        });
        
        //$('#payButton').attr('disabled', 'disabled');
        
        /**
         * Set key down event for all credit inputs
         * @access public
         * @return {void}
         */
        
        cells.keydown(function (event) {
          // Check if key is backspace
          
          if (event.keyCode == 17) {
            
            val = $(":focus").val()
            $(":focus").val("").val(val)
            
          }
          
          var backspace = (event.keyCode == 8);
          // Switch credit text length
          
          switch ($(this).val().length) {
            case maxLength:
              // If key is backspace do nothing
              if (backspace) {
                return;
              }
              // Select next credit element
              var n = $(this).next(".credit-cell");
              // If found
              if (n.length) {
                // Focus on it
                n.focus();
              }
              break;
            case 0:
              // Check if key down is backspace
              if (!backspace) {
                // Key is not backspace, do nothing.
                return;
              }
              // Select previous credit element
              var n = $(this).prev(".credit-cell");
              // If found
              if (n.length) {
                // Focus on it
                n.focus();
              }
              break;
          }
          
        });
        
        // On cells focus
        cells.focus(function () {
          // Add focus class
          credit_control.addClass('c-focus');
        });
        
        // On focus out
        cells.blur(function () {
          // Remove focus class
          credit_control.removeClass('c-focus');
        });
        
        /**
         * Update orginal input value to the credit card number
         * @access public
         * @return {void}
         */
        
        $(".credit-cell").eq(4).hide()
        
        var prevCode = [0, 0, 0, 0, 0]
        
        cells.keyup(function () {
          // Init card number var
          var card_number = '';
          // For each of the credit card cells
          
          cells.each(function () {
            // Add current cell value
            card_number = card_number + $(this).val();
          });
          
          // Set orginal input value
          credit_org.val(card_number);
          
          if ($(".credit").val()[0] === "3") {
            $(".credit-cell").eq(1).attr("placeholder", "000000").attr("max", "6");
            $(".credit-cell").eq(2).attr("placeholder", "00000").attr("max", "5");
            $(".credit-cell").eq(3).hide()
            $(".credit-cell").eq(4).hide()
            $(".credit-cell").css("width", "25%");
            max = 15;
            hideVal();
            //checkFull()
          }
          
          else {
            $(".credit-cell").eq(1).attr("placeholder", "0000").attr("max", "4");
            $(".credit-cell").eq(2).attr("placeholder", "0000").attr("max", "4");
            $(".credit-cell").eq(3).show().attr("max", "4");
            $(".credit-cell").css("width", "20%");
            
            hideVal()
            
            if (checkOper($(".credit").val()) === "РњР°СЌСЃС‚СЂРѕ") {
              max = 19;
              $(".credit-cell").eq(3).show()
              $(".credit-cell").css("width", "18%");
              $(".credit-cell").eq(4).show().attr("max", "3")
              $(".credit-cell").eq(4).css("width", "15%");
              
              
            }
            else {
              $(".credit-cell").eq(4).hide()
              max = 16;
              $(".credit-cell").css("width", "20%");
            }
            
            //checkFull()
          }
          
          maxLength = parseInt($(this).attr("max"))
          
          if ($(this).val().length == maxLength + 1) {
            $(this).val($(this).val().substring(0, 4))
            $(".credit").val("")
            for (var j = 0; j < 5; j++) {
              $(".credit").val($(".credit").val() + $(".credit-cell").eq(j).val())
            }
          }
          
          changeCardImage($(".credit").val());
          
          if ($(".credit").val().length === max) {
            if (!luhnAlgorithm($(".credit").val())) {
              $("#message").show().text("РќРµРІРµСЂРЅС‹Р№ С„РѕСЂРјР°С‚ РЅРѕРјРµСЂР° РєР°СЂС‚С‹");
              $(".credit-input").addClass("inputAlert")
            }
            else {
              $("#exp").focus()
              $(".credit-input").removeClass("inputAlert")
            }
          }
          else {
            $(".credit-input").removeClass("inputAlert")
            $("#message").hide()
          }
          
          for (var s = 0; s < 5; s++) {
            prevCode[s] = $(".credit-cell").eq(s).val().length
          }
          
          curet = getCursorPosition(document.getElementById($(":focus").attr("id")));
          prevVal = $(":focus").val();
        });
        
        cells.click(() => {
          curet = getCursorPosition(document.getElementById($(":focus").attr("id")));
          prevVal = $(":focus").val();
        })
        
        cells.on("input", (e) => {
          
          var m = 0;
          for (var k = 0; k < 5; k++) {
            if ($(".credit-cell").eq(k).val().length > maxLength + 2) {
              m = k;
              break;
            }
          }
          
          len = $(".credit-cell").eq(m).val().length
          
          if (len > maxLength + 2) {
            
            cardCode = $(".credit-cell").eq(m).val().substring(prevCode[m], len);
            
            $(".credit-cell, .credit").val("");
            for (var k = 0, j = Math.min(cardCode.length, 16); k < j; k++) {
              if (k === 0) {
                if (cardCode[0] === "3") {
                  j = Math.min(cardCode.length, 15);
                  $(".credit-cell").css("width", "25%");
                  $(".credit-cell").eq(3).hide()
                  $(".credit-cell").eq(4).hide()
                }
              }
              
              $(".credit").val($(".credit").val() + cardCode[k])
              
              if (cardCode[0] === "3") {
                
                if (k < 4) $(".credit-cell").eq(0).val($(".credit-cell").eq(0).val() + cardCode[k])
                if (k >= 4 && k < 10) $(".credit-cell").eq(1).val($(".credit-cell").eq(1).val() + cardCode[k])
                if (k >= 10) $(".credit-cell").eq(2).val($(".credit-cell").eq(2).val() + cardCode[k])
                
              }
              else {
                $(".credit-cell").eq(3).show();
                if (k < j) $(".credit-cell").eq(Math.floor(k / 4)).val($(".credit-cell").eq(Math.floor(k / 4)).val() + cardCode[k]);
                if (k == 6) {
                  if (checkOper($(".credit").val()) === "РњР°СЌСЃС‚СЂРѕ") {
                    j = Math.min(cardCode.length, 19);
                    $(".credit-cell").eq(4).show();
                    $(".credit-cell").css("width", "18%");
                  }
                  else {
                    $(".credit-cell").eq(4).hide();
                    $(".credit-cell").css("width", "20%");
                  }
                }
              }
              
            }
          }
        })
        
        $("#exp").keyup(() => {
          
          if ($("#exp").val()[0] > 1) $("#exp").val(1 + $("#exp").val().substring(1, 5))
          
          if ($("#exp").val().length === 2 && $("#exp").val()[0] !== "/" && $("#exp").val()[1] !== "/") {
            sub1 = $("#exp").val().substring(0, 2);
            sub2 = $("#exp").val().substring(2, 4);
            $("#exp").val(sub1 + "/" + sub2)
          }
          
          if ($("#exp").val()[1] >= "3" && $("#exp").val()[0] == "1") $("#exp").val(12 + $("#exp").val().substring(2, 5));
          
          if ($("#exp").val().length === 5) {
            var dateSplit = $("#exp").val().split("/");
            dateSplit[0] = parseInt(dateSplit[0])
            dateSplit[1] = parseInt(dateSplit[1])
            if (dateSplit[0] > 12) {
              $("#message").show().text("РќРµРїСЂР°РІРёР»СЊРЅС‹Р№ С„РѕСЂРјР°С‚ РјРµСЃСЏС†Р°")
              $("#exp").addClass("inputAlert")
            }
            else {
              var date1 = new Date();
              if (date1.getFullYear() <= 2000 + dateSplit[1]) {
                if (date1.getMonth() > dateSplit[0] - 2 && date1.getFullYear() === 2000 + dateSplit[1]) {
                  $("#message").show().text("Р’РІРµРґРµРЅРЅР°СЏ РґР°С‚Р° РјРµРЅСЊС€Рµ С‚РµРєСѓС‰РµР№");
                  $("#exp").addClass("inputAlert")
                }
                else if (2000 + dateSplit[1] - date1.getFullYear() > 10) {
                  $("#message").show().text("Р“РѕРґ РЅРµ РјРѕР¶РµС‚ Р±С‹С‚СЊ Р±РѕР»СЊС€Рµ 10 Р»РµС‚ РѕС‚ С‚РµРєСѓС‰РµРіРѕ");
                  $("#exp").addClass("inputAlert")
                }
                else {
                  $("#message").hide();
                  $("#exp").removeClass("inputAlert")
                  $("#cvc").focus()
                }
              }
              else {
                $("#message").show().text("Р’РІРµРґРµРЅРЅС‹Р№ РіРѕРґ РјРµРЅСЊС€Рµ С‚РµРєСѓС‰РµРіРѕ");
                $("#exp").addClass("inputAlert")
              }
            }
            
          }
          else {
            $("#message").hide();
            $("#exp").removeClass("inputAlert")
          }
          
        })
        
        $("#cvc").keyup(() => {
          if ($("#cvc").val().length > 3) $("#cvc").val($("#cvc").val().substring(0, 3))
        })
        
        if (args["auto_select"] === true) {
          // Focus on the first credit cell input
          credit_control.children(".credit-cell:first").focus();
        }
        if (PageMode === "cvcOnly") {
          cardCode = MaskedPAN.split("").filter(el => el !== " ").join("");
          
          $(".credit-cell, .credit").val("");
          for (var k = 0, j = Math.min(cardCode.length, 16); k < j; k++) {
            if (k === 0) {
              if (cardCode[0] === "3") {
                j = Math.min(cardCode.length, 15);
                $(".credit-cell").css("width", "25%");
                $(".credit-cell").eq(3).hide()
                $(".credit-cell").eq(4).hide()
              }
            }
            
            $(".credit").val($(".credit").val() + cardCode[k])
            
            if (cardCode[0] === "3") {
              
              if (k < 4) $(".credit-cell").eq(0).val($(".credit-cell").eq(0).val() + cardCode[k])
              if (k >= 4 && k < 10) $(".credit-cell").eq(1).val($(".credit-cell").eq(1).val() + cardCode[k])
              if (k >= 10) $(".credit-cell").eq(2).val($(".credit-cell").eq(2).val() + cardCode[k])
              
            }
            else {
              $(".credit-cell").eq(3).show();
              if (k < j) $(".credit-cell").eq(Math.floor(k / 4)).val($(".credit-cell").eq(Math.floor(k / 4)).val() + cardCode[k]);
              if (k == 6) {
                if (checkOper($(".credit").val()) === "РњР°СЌСЃС‚СЂРѕ") {
                  j = Math.min(cardCode.length, 19);
                  $(".credit-cell").eq(4).show();
                  $(".credit-cell").css("width", "18%");
                }
                else {
                  $(".credit-cell").eq(4).hide();
                  $(".credit-cell").css("width", "20%");
                }
              }
            }
            
          }
          
          $(".card__area img").hide();
          $("#exp").val("**/**")
          $(".credit-cell, #exp").attr("disabled", "disabled");
          $(".load-card-block").hide();
          $("#cvc").focus();
        }
        
        $("#payButton").click(() => {
          $(".loadingBlock").css("display", "flex");
          $("#message").css("background", "white").show();
        })
        
      });
      
      mobileHeight = $(".iosHoverMobele").height();
      $(".iosHoverMobele").css({
        "padding": "0 10px",
        "height": "0"
      })
      
      var tooltip = false;
      
      $(".tooltip").on("click", () => {
        if (!tooltip) {
          $(".iosHoverMobele").css({
            "padding": "10px",
            "height": mobileHeight + 45,
            "transition": "0.3s"
          })
          tooltip = true;
        }
        else {
          $(".iosHoverMobele").css({
            "padding": "0 10px",
            "height": "0"
          })
          tooltip = false;
        }
        
      })
      
      $('title').text($(".pay-for").text() + " " + $(".price").text());
    }
    
    
    
  });
  
})(jQuery);


function changeCardImage(code) {
  switch (checkOper(code)) {
    case "РњРР ": $(".card__area img").attr("src", 				pageRoot + "img/mir-logo.svg"); break;
    case "РњР°СЃС‚РµСЂРєР°СЂРґ": $(".card__area img").attr("src", 		pageRoot + "img/mastercar.svg"); break;
    case "РњР°СЌСЃС‚СЂРѕ": $(".card__area img").attr("src",			pageRoot + "img/maestro.svg"); break;
    case "China UnionPay": $(".card__area img").attr("src", 	pageRoot + "img/UnionPay.svg"); break;
    case "Visa Electron": $(".card__area img").attr("src", 		pageRoot + "img/visa-electron.svg"); break;
    case "Visa": $(".card__area img").attr("src", 				pageRoot + "img/visa.svg"); break;
    default: $(".card__area img").attr("src", 					pageRoot + "img/card.svg")
  }
}

function checkOper(code) {
  var a = code, oper = "";
  for (var i = 0; i < 6; i++) {
    if (a.substring(0, i) === "4") oper = "Visa"
    else if (a.substring(0, i) === "4026" || a.substring(0, i) === "417500" || a.substring(0, i) === "4405" ||
      a.substring(0, i) === "4508" || a.substring(0, i) === "4844" || a.substring(0, i) === "4913" || a.substring(0, i) === "4917") oper = "Visa Electron";
    else if (parseInt(a.substring(0, i)) >= 51 && parseInt(a.substring(0, i)) <= 55) oper = "РњР°СЃС‚РµСЂРєР°СЂРґ"
    else if (a.substring(0, i) === "5018" || a.substring(0, i) === "5020" || a.substring(0, i) === "5038" || a.substring(0, i) === "5893"
      || a.substring(0, i) === "6304" || a.substring(0, i) === "6759" || a.substring(0, i) === "6761" || a.substring(0, i) === "6762"
      || a.substring(0, i) === "6763" || a.substring(0, i) === "0604") oper = "РњР°СЌСЃС‚СЂРѕ"
    else if (a.substring(0, i) === "62") oper = "China UnionPay"
    else if (a.substring(0, i) === "2") oper = "РњРР "
  }
  return oper;
}

function hideVal() {
  if ($(".credit-cell").eq(4).css('display') == 'none' || $(".credit-cell").eq(4).css("visibility") == "hidden") $(".credit-cell").eq(4).val("");
  if ($(".credit-cell").eq(3).css('display') == 'none' || $(".credit-cell").eq(3).css("visibility") == "hidden") $(".credit-cell").eq(3).val("");
}

jQuery(function ($) {
  $(".credit").credit();
});



// РєРѕРЅС‚РµР№РЅРµСЂ РґР»СЏ РѕС€РёР±РѕРє РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ СЃРєСЂС‹С‚
$('#message').hide();

// РїРѕРєР°Р·С‹РІР°РµРј РєРѕРЅС‚РµР№РЅРµСЂ, РµСЃР»Рё Сѓ С„РѕСЂРјС‹ РµСЃС‚СЊ РєР»Р°СЃСЃ error
// РґРµР»Р°РµРј РѕС‚СЃС‚СѓРї Сѓ РєР°СЂС‚РѕС‡РєРё СЂР°РІРЅС‹Р№ РІС‹СЃРѕС‚Рµ РєРѕРЅС‚РµР№РЅРµСЂР° СЃ РѕС€РёР±РєРѕР№ + 14
if ($('.form').hasClass('error')) {
  $('#message').show();
  
  var errorContainerHeight = $('#message').outerHeight();
  $('.form').css('padding-top', errorContainerHeight + 14);
}

function luhnAlgorithm(digits) {
  let sum = 0;
  
  for (let i = 0; i < digits.length; i++) {
    let cardNum = parseInt(digits[i]);
    
    if ((digits.length - i) % 2 === 0) {
      cardNum = cardNum * 2;
      
      if (cardNum > 9) {
        cardNum = cardNum - 9;
      }
    }
    
    sum += cardNum;
  }
  
  return sum % 10 === 0;
}

function getCursorPosition(ctrl) {
  var CaretPos = 0;
  if (document.selection) {
    ctrl.focus();
    var Sel = document.selection.createRange();
    Sel.moveStart('character', -ctrl.value.length);
    CaretPos = Sel.text.length;
  } else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
    CaretPos = ctrl.selectionStart;
  }
  return CaretPos;
}
