// JavaScript Document
// alert($('.plan_complete .jindu_list li').length)


//服务器ip地址
var serverIp = '123.56.44.104:8080';

//定时器方法和每隔多久执行一次 这也是最大的时间误差，不计算调用百度地图的时间
setInterval(GetRTime,1*1000);

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
			
		case "nn"://数字验证且不为空
			reg=/^[-+]?\d*$/;
			if((!reg.test($(obj).val()))||($(obj).val()==null||$(obj).val()=="")){
				result = false;
				swal($(obj).attr("errorMsg"));
				break out;
			}
			break;
			
		case "nz"://正整数验证且不为空
			reg=/^\+?[1-9][0-9]*$/;
			if((!reg.test($(obj).val()))||($(obj).val()==null||$(obj).val()=="")){
				result = false;
				swal($(obj).attr("errorMsg"));
				break out;
			}
			break;
		case "c"://传真验证
			reg=/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
			if($(obj).val()!=""||$(obj).val()!=null){
				if(!reg.test($(obj).val())){
					result = false;
					swal($(obj).attr("errorMsg"));
					break out;
				}
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
			reg=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}/;
			
				if(!reg.test($(obj).val())){
					result = false;
					swal($(obj).attr("errorMsg"));
					break out;
				
				}
			break;
		case "mp"://手机号验证
			reg=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
			if(!reg.test($(obj).val())){
				result = false;
				swal($(obj).attr("errorMsg"));
				break out;
			}
			break;
		case "d"://开始和结束时间验证
			var start = $(".begin").val();  
	 	    var end = $(".end").val();
	 	        if(end<=start){  
	 	        	swal($(obj).attr("errorMsg"));
	 	            result = false; 
	 	            break out;
	 	        }  
			break;
		case "yb"://邮编验证
			reg=/^[0-9]{6}$/;
			if(!reg.test($(obj).val())){
				result = false;
				swal($(obj).attr("errorMsg"));
				break out;
			}
			break; 
		}
	}
	return result;
}
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
	
	function backMain(){
		location="workManage.html";
	} 
	
	var userId =localStorage.getItem("id");
	if(userId==null){
		window.location.href='login.html';
	}
	
	function urlencode (str) {  
	    str = (str + '').toString();   
	    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').  
	    replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');  
	} 
	
	
/**足迹定位相关的方法**/
	
	var	timer =localStorage.getItem("timer");
	var NowTime = new Date().getTime();
	//时间间隔
	var stepTimer = 10*1000;
	if(Number(NowTime)>=Number(timer)+Number(stepTimer)){
		timer =localStorage.setItem("timer",NowTime);
		getMapMark();
	}

  function GetRTime(){
    var NowTime = new Date().getTime();
	var	timer =localStorage.getItem("timer");
    if(Number(NowTime)>Number(timer)+Number(stepTimer)){
		localStorage.setItem("timer",NowTime);
		getMapMark();
    }
  }
	
	function getMapMark(){
		 if(navigator.geolocation){
			    var getOptions = {
			            //是否使用高精度设备，如GPS。默认是true
			            enableHighAccuracy:true,
			            //超时时间，单位毫秒，默认为0
			            timeout:10000,
			            //使用设置时间内的缓存数据，单位毫秒
			            //默认为0，即始终请求新数据
			            //如设为Infinity，则始终使用缓存数据
			            maximumAge:0
			       };
			    
			    
			     //成功回调
			     function getSuccess(position){
					   var lon = position.coords.longitude;
			           var lat = position.coords.latitude;
					   var accuracy = position.coords.accuracy;   
			           // alert("您位置的经度是："+lon+" 纬度是："+lat);
			                var point = new BMap.Point(""+lon+"",""+lat+"");
			                var gc = new BMap.Geocoder();
			                      translateCallback = function (point){
			                          gc.getLocation(point, function(rs){
										  //alert(JSON.stringify(rs));
			                              var addComp = rs.addressComponents;
										  var surroundingPois = rs.surroundingPois;//获取周围的json数据
										  //alert("point:"+rs.point.lat+","+rs.point.lng);
										 // alert("address:"+rs.address);
										 var marklat = rs.point.lat;
										 var marklng = rs.point.lng;
										  makeFootMarket(marklat,marklng);
			                              //  var infoWindow = new BMap.InfoWindow(sContent);
			                              //  map.openInfoWindow(infoWindow,point);
			                          }); 
			                      }                    
			                  BMap.Convertor.translate(point,0,translateCallback);
			     }
			 
			     //失败回调
			     function getError(error){
			          // 执行失败的回调函数，会接受一个error对象作为参数
			          // error拥有一个code属性和三个常量属性TIMEOUT、PERMISSION_DENIED、POSITION_UNAVAILABLE
			          // 执行失败时，code属性会指向三个常量中的一个，从而指明错误原因
			          switch(error.code){
			               case error.TIMEOUT:
			                    //alert('超时,请检测你的GPS和网络是否已经打开');
			                    break;
			               case error.PERMISSION_DENIED:
			                  //  alert('用户拒绝提供地理位置');
			                    break;
			               case error.POSITION_UNAVAILABLE:
			                   // alert('地理位置不可用');
			                    break;
			               default:
			                    break;
			          }
			     }
			 
			 navigator.geolocation.getCurrentPosition(getSuccess, getError, getOptions);
		     var watcher_id = navigator.geolocation.watchPosition(getSuccess, getError, getOptions);
		     navigator.geolocation.clearWatch(watcher_id);         
		 }else{
			 alert("不支持 GeoLocation.")
		 }
	}
	
	function makeFootMarket(marklat,marklng){
		
		var platform = localStorage.getItem("platform");
		var model = localStorage.getItem("model");
		var uuid = localStorage.getItem("uuid");
		var version = localStorage.getItem("version");
		
		$.ajax({
			type:'post',
			url: 'http://'+serverIp+'/gtims/footMark/insert.do',
			data: {'userId':localStorage.getItem("id"),'longitude':marklng,'latitude':marklat,'equipmentNumber':platform},
			dataType: 'json',
			crossDomain: true,	
			success: function(data) {
				if(data.result==1){
					console.log("插入足迹成功");
				}
			},
			error:function(msg){
				alert("访问出错！");
			}
		});
	}