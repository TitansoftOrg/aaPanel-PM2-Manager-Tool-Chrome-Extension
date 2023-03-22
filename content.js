if( $(".footer.bgw").length > 0 && $(".footer.bgw").text().includes('aaPanel') ){
  $(document).on('click', '.btlink', function() {
    var refreshSelector;
    var clearIntervalId = null;
    var refreshFunc = function() {
      if ($(".bt-form-submit-btn").children('button.btn.btn-success.btn-sm.btn-title').length > 0) {
        refreshSelector.trigger('click');
      } else {
        clearInterval(clearIntervalId);
      }
    };
    var clearSelector = $(".bt-form-submit-btn").children('button.btn.btn-danger.btn-sm.btn-title');
    clearSelector.click(function() {
      clearInterval(clearIntervalId);
      var code = $("div.vcode > span").text().trim();
      var parts = code.split(" ");
      var num1 = parseInt(parts[0]);
      var num2 = parseInt(parts[2]);
      var operator = parts[1];
      var result;
      switch (operator) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
        case "/":
          result = num1 / num2;
          break;
        case "*":
          result = num1 * num2;
          break;
        default:
          result = "Invalid operator";
      }
      $("#vcodeResult").val(result);
    });
    $(".bt-form-submit-btn").prepend('<div class="auto_refresh" style="display: inline-block;">'+
      '<input type="checkbox" id="oto_refresh" name="oto_refresh" value="enable" />'+
      '<label for="oto_refresh"> Oto Refresh?</label>'+
      '<input type="number" min="1" value="5" id="refresh_rate" style="margin-left: 5px;width: 50px;" />'+
      '</div>');
    $(document).on('change', '#oto_refresh', function() {
      if ($(this).is(':checked')) {
		refreshSelector = $(".bt-form-submit-btn").children('button.btn.btn-success.btn-sm.btn-title');
        var refreshRate = parseInt($('#refresh_rate').val()) * 1000;
        clearInterval(clearIntervalId);
        clearIntervalId = setInterval(refreshFunc, refreshRate);
      } else {
        clearInterval(clearIntervalId);
      }
    });
    $(document).on('change', '#refresh_rate', function() {
      if ($('#oto_refresh').is(':checked')) {
		refreshSelector = $(".bt-form-submit-btn").children('button.btn.btn-success.btn-sm.btn-title');
        var refreshRate = parseInt($(this).val()) * 1000;
        clearInterval(clearIntervalId);
        clearIntervalId = setInterval(refreshFunc, refreshRate);
      }
    });
	$(document).on('click', '#toSubmit', function(){
		setTimeout(function(){
			$(".bt-form-submit-btn").children('button.btn.btn-success.btn-sm.btn-title').trigger('click');
		}, 500);
	});
  });
}
