$(document).ready(function() {
	
	// creating the PAYG calculation form
	
	$('.entryField').keyup( function() {
			var sum, 
				entryField = $(this).val(),
				ratePrice = $('.ratePrice');
			// declaring sum as an empty variable. 
			// you comma separate so that 'var' is in front of all the 
			// variable w/out you having to type it multiple times
			
			entryField = parseInt(entryField);
			// parseInt is turing the text string inside the input field
			// into a number
			
			ratePrice = parseFloat(ratePrice.text());
			// the inner function of .text() is grabbing the text 
			// string inside the element w/ class="ratePrice"
			// after that, the output becomes a parameter in the 
			// parseFloat function and the output of that becomes 
			// new value inside of ratePrice
			
			sum = ratePrice * entryField;
			// let's multiply that shit
			
			sum = Math.round(sum*100) / 100;
			// Math.round is a native JS function that rounds up 
			// the decimal point to 2
			
			$('.priceOutput').html(sum);
			// output out the answer sherlock
	});
	// end of the PAYG calculation form
	
	var monthlyRate = $(".detailsMonthly");
	var semiAnnualRate = $(".detailsSemiAnnual");
	var annualRate = $(".detailsAnnual");
	var proPackage = $(".proPackage");
	var discount = "<p class='appliedDiscount'>15% Discount Applied</p>";
	
	$(".formMonthly .calculationForm").html(monthlyRate);
	$(".formMonthly .calculationForm .detailsMonthly").css("display","block");
	
	$(".renewalEachMonth").click(function() {
  		$(".calculationForm").html(monthlyRate);
		$(".calculationForm .detailsMonthly").css("display","block");
	});	
	$(".renewalSemiAnnual").click(function() {
  		$(".calculationForm").html(semiAnnualRate);
		$(".calculationForm .detailsSemiAnnual").css("display","block");
	});	
	$(".renewalAnnual").click(function() {
  		$(".calculationForm").html(annualRate);
		$(".calculationForm .detailsAnnual").css("display","block");
	});	
	$("#upgradePro").click(function() {
  		$(".calculationForm").html(proPackage);
		$(".calculationForm .proPackage").css("display","block");
	});
	$(".btnPromoApply").click(function() {
  		$(".priceArea").prepend(discount);
	});
	
	$("#purchaseUnlock").click(function() {
  		$("#purchaseFlow").show();
	});	
	
	
});
