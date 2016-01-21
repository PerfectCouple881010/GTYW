// JavaScript Document
// alert($('.plan_complete .jindu_list li').length)



var serverIp = '123.56.44.104:8080';

function validateForm(obj){
	var itemsO = $(obj).attr("validate");
	var items = ""+itemsO;
	var result = true;
	var msg = "";
	var itemArr = items.split(";");
	out:
	for(var i=0;i<itemArr.length;i++){
		switch(itemArr[i]){
		case "*"://不为空验证
			if($(obj).val()==null||$(obj).val()==""){
				result = false;
				swal($(obj).attr("errorMsg"));
				break out;
			}
			break;
		case "n"://数字验证
			reg=/^[-+]?\d*$/;
			if(!reg.test($(obj).val())){
				result = false;
				swal($(obj).attr("errorMsg"));
				break out;
			}
			break; 
		case "n2"://有1-3位小数验证
			reg=/^[0-9]+(.[0-9]{1,3})?$/;
			if(!reg.test($(obj).val())){
				result = false;
				swal($(obj).attr("errorMsg"));
				break out;
			}
			break;
		case "e"://邮箱验证
			reg=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if(!reg.test($(obj).val())){
				result = false;
				swal($(obj).attr("errorMsg"));
				break out;
			}
			break;
		case "p"://电话验证
			reg=/^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
			if(!reg.test($(obj).val())){
				result = false;
				swal($(obj).attr("errorMsg"));
				break out;
			}
			break;
		case "mp"://手机号验证
			reg=/^[1]([3][0-9]{1}|59|58|88|89)[0-9]{8}$/;
			if(!reg.test($(obj).val())){
				result = false;
				swal($(obj).attr("errorMsg"));
				break out;
			}
			break;
		case "d"://开始和结束时间验证
			var start = $(".begin").val();  
	 	    var end = $(".end").val();
	 	        if(end<start){  
	 	        	swal($(obj).attr("errorMsg"));
	 	            result = false; 
	 	            break out;
	 	        }  
			break;
		}
	}
	return result;
}

//注销
function cancel(){
	swal({
	    title: "您确定要注销吗?",
	    type: "warning",
	    showCancelButton: true,
	    confirmButtonColor: "#DD6B55",
	    confirmButtonText: "确定",
	    closeOnConfirm: false
	},
	function() {
		localStorage.removeItem("id","nickname","orgId","postId","city","orgCode");
		location="login.html";
	});
	

}
//退出app	
function exitApp(){
	swal({
	    title: "您确定要退出应用吗?",
	    type: "warning",
	    showCancelButton: true,
	    confirmButtonColor: "#DD6B55",
	    confirmButtonText: "确定",
	    closeOnConfirm: false
	},
	function() {
		localStorage.removeItem("id","nickname","orgId","postId","city","orgCode");
   		navigator.app.exitApp(); 
	});
} 


