$.support.cors = true;
var recivedOTP = "";
var otpSendNumber;
var goodColor = "#FFFFFF";
var badColor = "#FF0000";


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
	
	

	if(username.replace(/ /g,'').length < 3 || pincode.length != 6 || mobilenumber.length != 10)
	{
		if(username.replace(/ /g,'').length < 3)
		{
			$('#usersname').addClass('is-invalid');
			$('#usersname').removeClass('is-valid');
			document.getElementById('usernameerror').style.display = "block";
			document.getElementById('usersname').style.backgroundColor = badColor;


		}
		else if(mobilenumber.length != 10){


			document.getElementById('mobilenumber').style.backgroundColor = badColor;
			$('#mobilenumber').addClass('is-invalid');
			$('#mobilenumber').removeClass('is-valid');
			document.getElementById('mobilenumbererror').style.display = "block";

		}
		else if(pincode.length != 6)
		{
			$('#pincode').addClass('is-invalid');
			$('#pincode').removeClass('is-valid');
			document.getElementById('pincodeerror').style.display = "block";
			document.getElementById('pincode').style.backgroundColor = badColor;	

		}
		
	}
	else{

		$('#usersname').addClass('is-valid');
		$('#usersname').removeClass('is-invalid');
		document.getElementById('usernameerror').style.display = "none";
		document.getElementById('usersname').style.backgroundColor = goodColor;
	
		document.getElementById('mobilenumber').style.backgroundColor = goodColor;
		$('#mobilenumber').addClass('is-valid');
		$('#mobilenumber').removeClass('is-invalid');
		document.getElementById('mobilenumbererror').style.display = "none";

		$('#pincode').addClass('is-valid');
		$('#pincode').removeClass('is-invalid');
		document.getElementById('pincodeerror').style.display = "none";
		document.getElementById('pincode').style.backgroundColor = goodColor;
	


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

function validateCarNumber(carNumber)
{
	var reg = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/;
	var reg1 = /^[A-Z]{2}[0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)?[0-9]{4}$/;
	
	if ((reg.test(carNumber.value) == true) || (reg1.test(carNumber.value) == true)) 
	{
		$('#carnumber').addClass('is-valid');
		$('#carnumber').removeClass('is-invalid');
		document.getElementById('carnumbererror').style.display = "none";
		document.getElementById('carnumber').style.backgroundColor = goodColor;
	

		return true;
	}
	else{
	
		$('#carnumber').addClass('is-invalid');
		$('#carnumber').removeClass('is-valid');
		document.getElementById('carnumbererror').style.display = "block";
		document.getElementById('carnumber').style.backgroundColor = badColor;
	
		return false;
	}

}


function validateEmail(emailField){
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	if (reg.test(emailField.value) == false) 
	{
		$('#emailid').addClass('is-invalid');
		$('#emailid').removeClass('is-valid');
		document.getElementById('emailiderror').style.display = "block";
		document.getElementById('emailid').style.backgroundColor = badColor;
	
		return false;
	}
	else{

		$('#emailid').addClass('is-valid');
		$('#emailid').removeClass('is-invalid');
		document.getElementById('emailiderror').style.display = "none";
		document.getElementById('emailid').style.backgroundColor = goodColor;
	

		return true;
	}

	
}



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
	
	
   
    if(mobile.value.length!=10){

		mobile.style.backgroundColor = badColor;
		$('#mobilenumber').addClass('is-invalid');
		$('#mobilenumber').removeClass('is-valid');
		document.getElementById('mobilenumbererror').style.display = "block";
	}

else{
	mobile.style.backgroundColor = goodColor;
	$('#mobilenumber').addClass('is-valid');
	$('#mobilenumber').removeClass('is-invalid');
	document.getElementById('mobilenumbererror').style.display = "none";
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






function blockSpecialChar(e){
	var k;
	document.all ? k = e.keyCode : k = e.which;
	return ((k > 64 && k < 91) || (k > 96 && k < 123) || (k == 32));
	}

function validateUserName()
{
	if($("#usersname").val().replace(/ /g,'').length < 3)
	{
		$('#usersname').addClass('is-invalid');
		$('#usersname').removeClass('is-valid');
		document.getElementById('usernameerror').style.display = "block";
		document.getElementById('usersname').style.backgroundColor = badColor;
	}
	else{
		$('#usersname').addClass('is-valid');
		$('#usersname').removeClass('is-invalid');
		document.getElementById('usernameerror').style.display = "none";
		document.getElementById('usersname').style.backgroundColor = goodColor;
	}
}






function blockPinCodeValid(e){
	var k;
	document.all ? k = e.keyCode : k = e.which;
	return ((k > 47 && k < 58));
	}


function validatePinCode()
{
	if($("#pincode").val().length != 6)
	{
		$('#pincode').addClass('is-invalid');
		$('#pincode').removeClass('is-valid');
		document.getElementById('pincodeerror').style.display = "block";
		document.getElementById('pincode').style.backgroundColor = badColor;
	}
	else{
		$('#pincode').addClass('is-valid');
		$('#pincode').removeClass('is-invalid');
		document.getElementById('pincodeerror').style.display = "none";
		document.getElementById('pincode').style.backgroundColor = goodColor;
	}
}




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