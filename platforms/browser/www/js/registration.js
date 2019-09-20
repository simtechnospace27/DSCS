$.support.cors = true;
var recivedOTP = "";
var otpSendNumber;

//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){


	var username = $("#usersname").val();
	var mobilenumber = $("#mobilenumber").val();
	var pincode = $("#pincode").val();
	var emailid = $("#emailid").val();
	var carnumber = $("#carnumber").val();
	
	

	if(username.length < 3 || pincode.length != 6 || mobilenumber.length != 10)
	{

	}
	else{

		$("#usersname").attr('readonly', true);
		$("#mobilenumber").attr('readonly', true);
		$("#pincode").attr('readonly', true);
		$("#emailid").attr('readonly', true);
		$("#carnumber").attr('readonly', true);

		//document.getElementById("otpreceivedstyle").style.display = "block";

		var url1 = "http://devigiritea.tech/api/user_registration_api.php";
		var json1 ={"user_name":username, "phone_number":mobilenumber, "pincode":pincode, "car_number":carnumber, "email_id":emailid, current_location:"", "validated_otp":recivedOTP};
	
		
		$.ajax({ 
			type: 'POST', 
			url: url1, 
			data: json1, 
			success: function (data) { 
				
			}
		});


		if(animating) return false;
		animating = true;
		
		current_fs = $(this).parent();
		next_fs = $(this).parent().next();
		
		//activate next step on progressbar using the index of next_fs
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		
		//show the next fieldset
		next_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale current_fs down to 80%
				scale = 1 - (1 - now) * 0.2;
				//2. bring next_fs from the right(50%)
				left = (now * 50)+"%";
				//3. increase opacity of next_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({
			'transform': 'scale('+scale+')'
		  });
				next_fs.css({'left': left, 'opacity': opacity});
			}, 
			duration: 1, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});


	}



});



function check()
{

	
	var mobile = document.getElementById('mobilenumber');
	var valueMobile= mobile.value;
	re = /[`a-z~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
	var isSplChar = re.test(valueMobile);
	//alert(valueMobile);
	//alert(isSplChar);
	if(isSplChar)
	{
		
		var no_spl_char = valueMobile.replace(/[`a-z~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
		$('#mobilenumber').val(no_spl_char);
	}
	else{
	
	
   var goodColor = "#FFFFFF";
    var badColor = "#FF0000";

    if(mobile.value.length!=10){

		mobile.style.backgroundColor = badColor;
	}

else{
	mobile.style.backgroundColor = goodColor;
	if(recivedOTP == "" || otpSendNumber != valueMobile)
	{
		
	var url = "http://devigiritea.tech/api/dscs_generate_otp.php";
	var json ={"mobilenumber":valueMobile};
	otpSendNumber = valueMobile;


	$.ajax({ 
		type: 'POST', 
		url: url, 
		data: json, 
		success: function (data) { 
			var obj = JSON.parse(data);
			recivedOTP = obj.otp;
		}
	});
}

}
}

}

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 1, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	
	

	
		document.getElementById("otpreceivedstyle").style.display = "block";


	

	return false;
});

