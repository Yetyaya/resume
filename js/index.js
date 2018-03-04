var headPic = document.querySelector(".headPic");

headPic.style.height = window.innerHeight + "px";
window.onresize = function(){
  headPic.style.height = window.innerHeight + "px";
}

// ---------------------------------------------------------//

// 導覽列
$(window).scroll(function (){
  if ($(window).scrollTop() >= window.innerHeight) {
    $("nav").css("position","fixed");
  } else {
    $("nav").css("position","absolute");
  }
});

$(".tag1,.tag2,.tag3,.tag4").click(function (e){
  e.preventDefault();
  var _href = $(this).attr("href");
  // $(selector).animate(styles,speed,easing,callback)
  $("html,body").animate({
    scrollTop: $( _href ).offset().top
  }, 1300);
});

$(".home").click(function (e){
  e.preventDefault();
  $("html,body").animate({
    scrollTop: 0 }, 1500
  );
});

$(".mouseIcon").click(function (e){
  e.preventDefault();
  $("html,body").animate({
    scrollTop: $(".tag1").offset().top
  }, 1300);
});

// ---------------------------------------------------------//

// contact條件判斷
var sendBtn = document.querySelector(".sendBtn");
var inputName = document.querySelector(".name");
var inputMail = document.querySelector(".mail");
var inputMessage = document.querySelector(".message");
var sendForm = document.querySelector(".sendBtn");

var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

inputName.addEventListener("blur", nameCheck);
inputMail.addEventListener("blur", mailCheck);
inputMessage.addEventListener("blur", messageCheck);

function nameCheck(){
  if(inputName.value.length > 0){
    $(".name").css("border","1px solid #FFF");
  }else{
    $(".name").css("border","2px solid #F28482");
  }
}

function mailCheck(){
  if(inputMail.value.search(emailRule) == -1 && inputMail.value.length > 0){
    $(".mail").css("border","2px solid #F28482");
    $(".sendBtn").attr("disabled", "true");
    $(".sendBtn").addClass("disable");
  }else if(inputMail.value.search(emailRule) != -1 && inputMail.value.length > 0){
    $(".mail").css("border","1px solid #FFF");
    $(".sendBtn").removeAttr("disabled", "true");
    $(".sendBtn").removeClass("disable");
  }else{
    $(".mail").css("border","2px solid #F28482");
  }
}

function messageCheck(){
  if(inputMessage.value.length > 0){
    $(".message").css("border","1px solid #FFF");
  }else{
    $(".message").css("border","2px solid #F28482");
  }
}

sendBtn.addEventListener("click",function (e) {
  // console.log(inputMail.value.search(emailRule));
  if(inputMail.value.search(emailRule) != -1){
    // 合格 0
    $(".mail").css("border","1px solid #FFF");
    
    if (inputName.value.length > 0 && inputMessage.value.length > 0){
      $(".name").css("border","1px solid #FFF");
      $(".message").css("border","1px solid #FFF");
      sendForm.submit();
      
      inputName.value = "";
      inputMail.value = "";
      inputMessage.value = "";
    }
  }else if (inputMail.value.search(emailRule) == -1){  
    // 不合格 -1
    nameCheck();
    mailCheck();
    messageCheck();
  }

});

// ---------------------------------------------------------//

// contact 語法
function zf_ValidateAndSubmit(){
		if(zf_CheckMandatory()){
			if(zf_ValidCheck()){
				if(isSalesIQIntegrationEnabled){
					zf_addDataToSalesIQ();
				}
				return true;
			}else{		
				return false;
			}
		}else{
			return false;
		}
	}
		function zf_CheckMandatory(){
		for(i = 0 ; i < zf_MandArray.length ; i ++) {
		  	var fieldObj=document.forms.form[zf_MandArray[i]];
		  	if(fieldObj) {  
				  	if(fieldObj.nodeName != null ){
				  		if ( fieldObj.nodeName=='OBJECT' ) {
								if(!zf_MandatoryCheckSignature(fieldObj)){
									zf_ShowErrorMsg(zf_MandArray[i]);
								 	return false;
								}
							}else if (((fieldObj.value).replace(/^\s+|\s+$/g, '')).length==0) {
							 if(fieldObj.type =='file')
								{ 
								 fieldObj.focus(); 
								 zf_ShowErrorMsg(zf_MandArray[i]);
								 return false;
								} 
				   	   	  	  fieldObj.focus();
				   	   	  	  zf_ShowErrorMsg(zf_MandArray[i]);
				   	   	  	  return false;
							}  else if( fieldObj.nodeName=='SELECT' ) {// No I18N
				  	   	   	 if(fieldObj.options[fieldObj.selectedIndex].value=='-Select-') {
								fieldObj.focus();
								zf_ShowErrorMsg(zf_MandArray[i]);
								return false;
							   }
							} else if( fieldObj.type =='checkbox' || fieldObj.type =='radio' ){
								if(fieldObj.checked == false){
									fieldObj.focus();
									zf_ShowErrorMsg(zf_MandArray[i]);
									return false;
			   					} 
							} 
				  	}else{
				  		var checkedValsCount = 0;
						var inpChoiceElems = fieldObj;
							for(var ii = 0; ii < inpChoiceElems.length ; ii ++ ){
						      	if(inpChoiceElems[ii].checked === true ){
						      		checkedValsCount ++;
						      	}
							}
							if ( checkedValsCount == 0) {
									inpChoiceElems[0].focus();
									zf_ShowErrorMsg(zf_MandArray[i]);
									return false;
							 	}
					}
			}
		}
		return true;
	}
	function zf_ValidCheck(){
		var isValid = true;
		for(ind = 0 ; ind < zf_FieldArray.length ; ind++ ) {
			var fieldObj=document.forms.form[zf_FieldArray[ind]];
		  	if(fieldObj) {
		  		if(fieldObj.nodeName != null ){
			  		var checkType = fieldObj.getAttribute("checktype"); 
			  		if( checkType == "c2" ){// No I18N
			  			if( !zf_ValidateNumber(fieldObj)){
							isValid = false;
							fieldObj.focus();
							zf_ShowErrorMsg(zf_FieldArray[ind]);
							return false;
						}
			  		}else if( checkType == "c3" ){// No I18N
			  			if (!zf_ValidateCurrency(fieldObj) || !zf_ValidateDecimalLength(fieldObj,10) ) {
							isValid = false;
							fieldObj.focus();
							zf_ShowErrorMsg(zf_FieldArray[ind]);
							return false;
						}
			  		}else if( checkType == "c4" ){// No I18N
			  			if( !zf_ValidateDateFormat(fieldObj)){
							isValid = false;
							fieldObj.focus();
							zf_ShowErrorMsg(zf_FieldArray[ind]);
							return false;
						}
			  		}else if( checkType == "c5" ){// No I18N
			  			if (!zf_ValidateEmailID(fieldObj)) {
							isValid = false;
							fieldObj.focus();
							zf_ShowErrorMsg(zf_FieldArray[ind]);
							return false;
						}
			  		}else if( checkType == "c6" ){// No I18N
			  			if (!zf_ValidateLiveUrl(fieldObj)) {
							isValid = false;
							fieldObj.focus();
							zf_ShowErrorMsg(zf_FieldArray[ind]);
							return false;
							}
			  		}else if( checkType == "c7" ){// No I18N
			  			if (!zf_ValidatePhone(fieldObj)) {
							isValid = false;
							fieldObj.focus();
							zf_ShowErrorMsg(zf_FieldArray[ind]);
							return false;
							}
			  		}else if( checkType == "c8" ){// No I18N
			  			zf_ValidateSignature(fieldObj);
			  		}
			  	}
		  	}
		}
         	return isValid;
	}
	function zf_ShowErrorMsg(uniqName){
		var fldLinkName;
		for( errInd = 0 ; errInd < zf_FieldArray.length ; errInd ++ ) {
			fldLinkName = zf_FieldArray[errInd].split('_')[0];
			document.getElementById(fldLinkName+"_error").style.display = 'none';
		}
		var linkName = uniqName.split('_')[0];
		document.getElementById(linkName+"_error").style.display = 'block';
	}
	function zf_ValidateNumber(elem) {
	 	var validChars = "-0123456789";
	 	var numValue = elem.value.replace(/^\s+|\s+$/g, '');
	 	if (numValue != null && !numValue == "") {
	 		var strChar;
	 		var result = true;
	 		if (numValue.charAt(0) == "-" && numValue.length == 1) {
	 			return false;
	 		}
	 		for (i = 0; i < numValue.length && result == true; i++) {
	 			strChar = numValue.charAt(i);
	 			if ((strChar == "-") && (i != 0)) {
	 				return false;
	 			}
	 			if (validChars.indexOf(strChar) == -1) {
	 				result = false;
	 			}
	 		}
	 		return result;
	 	} else {
	 		return true;
	 	}
	 }
	 function zf_ValidateDateFormat(inpElem){
	 	var dateValue = inpElem.value.replace(/^\s+|\s+$/g, '');
	 	if( dateValue == "" ){
	 		return true;
	 	}else{
			return( zf_DateRegex.test(dateValue) );
		}
	 }
	 function zf_ValidateCurrency(elem) {
	 	var validChars = "0123456789."; 
	 	var numValue = elem.value.replace(/^\s+|\s+$/g, '');
	 	if (numValue != null && !numValue == "") {
	 		var strChar;
	 		var result = true;
	 		for (i = 0; i < numValue.length && result == true; i++) {
	 			strChar = numValue.charAt(i);
	 			if (validChars.indexOf(strChar) == -1) {
	 				result = false;
	 			}
	 		}
	 		return result;
	 	} else {
	 		return true;
	 	}
	 }
	 function zf_ValidateDecimalLength(elem,decimalLen) {
	 	var numValue = elem.value;
	 	if (numValue.indexOf('.') >= 0) {
	 		var decimalLength = numValue.substring(numValue.indexOf('.') + 1).length;
	 		if (decimalLength > decimalLen) {
	 			return false;
	 		} else {
	 			return true;
	 		}
	 	}
	 	return true;
	 }
	 function zf_ValidateEmailID(elem) {
        var check = 0;
        var emailValue = elem.value;
        if (emailValue != null && !emailValue == "") {
            var emailArray = emailValue.split(",");
            for (i = 0; i < emailArray.length; i++) {
                var emailExp = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;
                if (!emailExp.test(emailArray[i].replace(/^\s+|\s+$/g, ''))) {
                    check = 1;
                }
            }
            if (check == 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
    function zf_ValidateLiveUrl(elem) {
    	var urlValue = elem.value;
		if(urlValue !== null && typeof(urlValue) !== "undefined") {
			urlValue = urlValue.replace(/^\s+|\s+$/g, '');
			if(urlValue !== "") {
				var urlregex =  new RegExp("^(((((h|H)(t|T){2}(p|P)(s|S)?)|((f|F)(t|T)(p|P)))://((w|W){3}.)?)|((w|W){3}.))[a-zA-Z0-9-\\P{InBasicLatin}\\s]+(\\.[a-zA-Z0-9-:;\\?#_]+)+(/[\\x21-\\x7e\\P{InBasicLatin}\\s]*)*$");
				return(urlregex.test(urlValue));
			}
        }
        return true;
    }
    function zf_ValidatePhone(inpElem){
    	var phoneFormat = parseInt(inpElem.getAttribute("phoneFormat")); 
    	var fieldInpVal = inpElem.value.replace(/^\s+|\s+$/g, '');
    	var toReturn = true ;
    	if( phoneFormat === 1 ){
			var IRexp = /^[+]*[()0-9- ]+$/;
 			if (fieldInpVal != "" && !IRexp.test(fieldInpVal)) {
 				toReturn = false;
 				return toReturn;
 			}
 			return toReturn;
    	}else if( phoneFormat === 2 ){
    		var InpMaxlength = inpElem.getAttribute("maxlength");
    		var USARexp = /^[0-9]+$/;
    		if  ( fieldInpVal != "" && USARexp.test(fieldInpVal) &&  fieldInpVal.length == InpMaxlength ) {
				toReturn = true;
			}else if( fieldInpVal == "" ){
				toReturn = true;
			}else{
				toReturn = false;
			}
			return toReturn;
    	}
    }
  
  function zf_ValidateSignature(objElem) {
  		var linkName = objElem.getAttribute("compname");
  		var canvasElem = document.getElementById("drawingCanvas-"+linkName);
  		var isValidSign = zf_IsSignaturePresent(objElem,linkName,canvasElem);
   		var hiddenSignInputElem = document.getElementById("hiddenSignInput-"+linkName);
		if(isValidSign){
			hiddenSignInputElem.value = canvasElem.toDataURL();
		}else{
			hiddenSignInputElem.value = "";// No I18N
		}
		return isValidSign;
  	}

  	function zf_MandatoryCheckSignature(objElem){
  		var linkName = objElem.getAttribute("compname");
  		var canvasElem = document.getElementById("drawingCanvas-"+linkName);
  		var isValid = zf_IsSignaturePresent(objElem,linkName,canvasElem);
		return isValid;
  	}

  	function zf_IsSignaturePresent(objElem,linkName,canvasElem){
   		var context = canvasElem.getContext('2d'); // No I18N
   		var canvasWidth = canvasElem.width;
   		var canvasHeight = canvasElem.height;
   		var canvasData = context.getImageData(0, 0, canvasWidth, canvasHeight);
   		var signLen = canvasData.data.length;
   		var flag = false;
   		for(var index =0; index< signLen; index++) {
   	     	if(!canvasData.data[index]) {
   	       		flag =  false;
   	     	}else if(canvasData.data[index]) {
   		   		flag = true;
   		   		break;
   	     	}
   		}
		return flag;
  	}

	function zf_FocusNext(elem,event) {  
	 	if(event.keyCode == 9 || event.keyCode == 16){
	      return;
	    }
	    if(event.keyCode >=37 && event.keyCode <=40){
	       return;
	    } 	
	    var compname = elem.getAttribute("compname");
	    var inpElemName = elem.getAttribute("name");
	 	if (inpElemName == compname+"_countrycode") { 
	 		if (elem.value.length == 3) {
	 			document.getElementsByName(compname+"_first")[0].focus();
	 		}
	 	} else if (inpElemName == compname+"_first" ) { 
	 		if (elem.value.length == 3) {
	 			document.getElementsByName(compname+"_second")[0].focus();
	 		}
	 	}
	}
	function zf_addDataToSalesIQ(){
		var visitorinfo = {};
		var elements = document.getElementById("form").elements;
		for (var i = 0; i<elements.length;i++) {
			var inpElem = elements[i];
			var name = inpElem.getAttribute("name");
			var fieldType = inpElem.getAttribute("fieldType");
			if(fieldType==="1" || fieldType==="7" || fieldType==="9" || fieldType==="11"){
				var invlovedinsalesiq = inpElem.getAttribute("invlovedinsalesiq");
				if(fieldType==="1"){
					var nameFieldInvolved = inpElem.getAttribute("nameFieldInvolved");
					var phoneFieldInvolved = inpElem.getAttribute("phoneFieldInvolved");
					if(invlovedinsalesiq==="true"){
						if(phoneFieldInvolved){
							var salesIQValue=inpElem.value;
							visitorinfo.contactnumber = salesIQValue;
						}if(nameFieldInvolved){
							var salesIQValue=inpElem.value;
							alert(salesIQValue);
							visitorinfo.name = salesIQValue;
						}
					}
				}if(fieldType==="7"){
					if(invlovedinsalesiq==="true"){
						var salesIQValue=inpElem.value;
						visitorinfo.name = salesIQValue;
					}
				}if(fieldType==="9"){
					if(invlovedinsalesiq==="true"){
						var salesIQValue=inpElem.value;
						visitorinfo.email = salesIQValue;
					}
				}if(fieldType==="11"){
					if(invlovedinsalesiq==="true"){
						var compName = inpElem.getAttribute("compname");
						var phoneFormat = inpElem.getAttribute("phoneFormat");
						var salesIQValue="";
						if(phoneFormat==="1"){
							salesIQValue = document.getElementById("international_"+compName+"_countrycode").value; 
						}else{
							var countryCode = document.getElementById(compName+"_countrycode").value;
							var first = document.getElementById(compName+"_first").value;
							var last = document.getElementById(compName+"_second").value;
							salesIQValue =countryCode+first+last;
						}
						visitorinfo.contactnumber = salesIQValue;
					}
				}
			}
		}
		parent.postMessage(JSON.stringify({ type: 'zoho.salesiq.apimessage', visitor: visitorinfo } ), '*');// No I18N
	}

// ---------------------------------------------------------//




$(".sendBtn").click(function (){
  var nameLen = $(".name").val().length;
  var mailLen = $(".mail").val().length;
  var messageLen = $(".message").val().length;
  if(nameLen > 0 && mailLen > 0 && messageLen > 0 && $(".mail").prop("required") == false){
    $(".name").val("");
    $(".mail").val("");
    $(".message").val("");
  }
});