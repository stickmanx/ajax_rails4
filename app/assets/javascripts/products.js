// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var ready = function () {
	
		alert("test");

		// simple_form example
		$('#new_product_simple_form').submit(function() {
			console.log("form submit hit"); // for debug
			$.post(
				$(this).attr('action'),
				$(this).serialize(),
				function(data) {
					console.log(data); // output response from backend; for debug
					$('#product_result').html(data.msg) // update product_result html contents
				},
				"json"
			)
			return false;
		});
	
	
		// regular html form example
		$('#new_product').submit(function() {
			console.log("form submit hit"); // for debug
			$.post(
				$(this).attr('action'),
				$(this).serialize(),
				function(data) {
					console.log(data); // output response from backend; for debug
					$('#product_result').html(data.msg) // update product_result html contents
				},
				"json"
			)
			return false;
		});
	
};

$(document).ready(ready); 
$(document).on('page:load', ready); 

// http://api.jquery.com/ready/
// http://api.jquery.com/on/
