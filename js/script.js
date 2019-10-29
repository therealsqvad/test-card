const $pan = $('#pan'),
      $exp = $('#exp'),
      $cvc = $('#cvc'),
      $cardLogo = $('#cardLogo'),
      $errorNumber =$('#errorNumber'),
      mastercard = [51, 52, 53, 54, 55],
      maestro = [5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763, 0604];

$pan.on('input', function (event) {
  let number = $(this).val().replace(/\s+/g, ' ');
  console.log(number);
  
  if (number.indexOf('4') === 0) {
    $cardLogo.attr('src', './img/card/cc-visa.svg');
  } else if (number.indexOf('2') === 0) {
    $cardLogo.attr('src', './img/card/cc-mir.svg');
  } else if (number.indexOf('62') === 0) {
    $cardLogo.attr('src', './img/card/cc-unionpay.svg');
  } else if (number.indexOf('34') === 0 || number.indexOf('37') === 0) {
    $cardLogo.attr('src', './img/card/cc-amex.svg');
  } else if (detectCard(number, mastercard)) {
    $cardLogo.attr('src', './img/card/cc-mastercard.svg');
  } else if (detectCard(number, maestro)) {
    $cardLogo.attr('src', './img/card/cc-maestro.svg');
  } else {
    $cardLogo.attr('src', './img/card/default.svg');
  }
});

$pan.on('blur', )

function detectCard(str, arr) {
  for ( let i = 0; i < arr.length; i++ ) {
    if (str.indexOf(arr[i].toString()) === 0) {
      return true;
    }
  }
  return false;
}

$pan.inputmask({
  'mask': '9999 9999 9999 9999'
});

$exp.inputmask({
  'mask': '99/99',
});
$cvc.inputmask({
  'mask': '999',
});

$('#tooltip-about').jTippy({
  trigger: 'click',
  theme: 'white',
  backdrop: 'black',
  class: 'tooltip-about montserrat text-default font-14',
  title: 'Вы можете сохранить эту карту для дальнейших покупок. Продавец не будет иметь доступа к этим данным, а каждый платеж мы будем подтверждать вводом кода. Никто не сможет списать деньги с карты без вашего желания',
});

$errorNumber.hidden;
