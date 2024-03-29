const $pan = $('#pan'),
  $exp = $('#exp'),
  $addExp = $('#addExp'),
  $cvc = $('#cvc'),
  $cardLogo = $('#cardLogo'),
  $errorNumber = $('#errorNumber'),
  $payButton = $('#payButton'),
  mastercard = [51, 52, 53, 54, 55],
  maestro = [5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763, 0604, 506, 639],
  mir = [2200, 2201, 2202, 2203, 2204, 35],
  year = new Date().getFullYear() % 100;

let payEnable = false,
    numValid = false,
    expValid = false,
    cvcValid = false;

$pan.on('input', function (event) {
  let number = $(this).val().replace(/\s+/g, ' ');
  if (number.indexOf('4') === 0) {
    $cardLogo.attr('src', './img/card/cc-visa.svg');
  } else if (detectCard(number, mir)) {
    $cardLogo.attr('src', './img/card/cc-mir.svg');
  } else if (number.indexOf('34') === 0 || number.indexOf('37') === 0) {
    $cardLogo.attr('src', './img/card/cc-amex.svg');
  } else if (detectCard(number, mastercard)) {
    $cardLogo.attr('src', './img/card/cc-mastercard.svg');
  } else if (detectCard(number, maestro)) {
    $cardLogo.attr('src', './img/card/cc-maestro.svg');
  } else if (number.indexOf('62') === 0) {
    $cardLogo.attr('src', './img/card/cc-unionpay.svg');
  }  else {
    $cardLogo.attr('src', './img/card/default.svg');
  }
});

$pan.on('blur', function (event) {
  let number = $(this).val().replace(/\s+/g, '');
  if (luhnAlgorithm(number)) {
    numValid = true;
    if (!$errorNumber.hasClass('d-none')) {
      $errorNumber.addClass('d-none');
    }
  } else {
    numValid = false;
    if ($errorNumber.hasClass('d-none')) {
      $errorNumber.removeClass('d-none');
    }
  }
  btnPayStatus();
});

function luhnAlgorithm(digits) {
  let sum = 0;
  
  if (digits === '') {
    return false;
  }
  
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

$exp.on('input', (e) => expValidate(e));
$exp.on('change', (e) => expValidate(e));

function expValidate(e) {
  const exp = e.target.value.replace(/_|\//g, '');
  
  if ((exp.length === 1) && (!exp.match(/0|1/))) {
    e.target.value = '';
  }
  if ((exp.length >= 2) && (exp.match(/([0][1-9]|[1][0-2])/) === null)) {
    e.target.value = exp[0];
  }
  if (exp.length === 4) {
    if (parseInt(exp.substr(-2), 10) < year
      || parseInt(exp.substr(-2), 10) > year + 10) {
      e.target.value = exp.slice(0, 2);
      expValid = false;
    } else {
      expValid = true;
    }
  } else {
    expValid = false;
  }
  btnPayStatus();
}

$addExp.on('input', (e) => {
  let exp = e.target.value;
  
  if (exp.match(/([0][1-9]|[1][0-2])(\/|\.)\d{4}/) !== null) {
    $exp.val(exp.slice(0, 2) + '/' + exp.slice(5, 7));
  }
});

$cvc.on('input', function (e) {
  const cvc = e.target.value.replace(/_/g, '');

  if (cvc.length === 3) {
    cvcValid = true;
  } else {
    cvcValid = false;
  }
  btnPayStatus();
})

function detectCard(str, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (str.indexOf(arr[i].toString()) === 0) {
      return true;
    }
  }
  return false;
}

function btnPayStatus() {
  payEnable = numValid && expValid && cvcValid;
  if (payEnable) {
    $payButton.prop("disabled", false);
  } else {
    $payButton.prop("disabled", true);
  }
}

if (PageMode === 'cvcOnly') {
  $pan.mask('**** **** **** 9999');
  $pan.val(MaskedPAN);
  $pan.prop("disabled", true);
  $exp.mask('**/**');
  $exp.val('**/**');
  $exp.prop("disabled", true);
  $("#load-card-block").hide();
} else {
  $pan.payment('formatCardNumber');
  $exp.mask('99/99');
}

$cvc.mask('999');

$('#tooltip-about').jTippy({
  trigger: 'click',
  theme: 'white',
  backdrop: 'black',
  class: 'tooltip-about montserrat text-default font-14',
  title: 'Вы можете сохранить эту карту для дальнейших покупок. Продавец не будет иметь доступа к этим данным, а каждый платеж мы будем подтверждать вводом кода. Никто не сможет списать деньги с карты без вашего желания',
});
