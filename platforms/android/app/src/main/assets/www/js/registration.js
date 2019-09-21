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
				$('#exampleModalCenter').modal('show');
			}
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

$('#modaldismis').on('click', function(event){
	$('#exampleModalCenter').modal('hide');
});



$('#submitotp').on('click', function (event) {
	
	var myOTP1 = $('#codeBox1').val();
	var myOTP2 = $('#codeBox2').val();
	var myOTP3 = $('#codeBox3').val();
	var myOTP4 = $('#codeBox4').val();

	var finalEnterOTP = myOTP1+""+myOTP2+""+myOTP3+""+myOTP4;


	if(finalEnterOTP == recivedOTP)
	{
		alert('OTP Matched');
	}
	else{
		alert("OTP not Matched");
	}
	
    event.preventDefault();
});

function getCodeBoxElement(index) {
	return document.getElementById('codeBox' + index);
  }
  function onKeyUpEvent(index, event) {
	const eventCode = event.which || event.keyCode;
	if (getCodeBoxElement(index).value.length === 1) {
	  if (index !== 4) {
		getCodeBoxElement(index+ 1).focus();
	  } else {
		getCodeBoxElement(index).blur();
		// Submit code
		console.log('submit code ');
	  }
	}
	if (eventCode === 8 && index !== 1) {
	  getCodeBoxElement(index - 1).focus();
	}
  }
  function onFocusEvent(index) {
	for (item = 1; item < index; item++) {
	  const currentElement = getCodeBoxElement(item);
	  if (!currentElement.value) {
		  currentElement.focus();
		  break;
	  }
	}
  }