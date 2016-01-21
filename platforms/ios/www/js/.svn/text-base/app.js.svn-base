var ua = navigator.userAgent.toLowerCase();
var sys = ua.match(/html5plus/);
if (sys != 'html5plus') {
	mui.openWindow = function openWindow(param,target,options) {
		if(param.target == '_blank'){
			window.open(param.url);
		}else{
			window.location.href = param.url;
		}
	}
}
function empty(val) {
					if (val == null || val == undefined || val == "") {
						return true;
					} else {
						return false;
					}　
				}
mui.ready(function() {
	// 失去焦点补救
	mui('.mui-inner-wrap').on('tap','input,textarea',function(){
		this.focus();
	});
 });
(function($, owner) {
	/**
	 * 机会新增
	 **/
	
	owner.addChance = function(info, callback) {
		callback = callback || $.noop;
		info = info || {};
		info.name = info.name || '';
		info.place = info.place || '';
		if (empty(info.name)) {
			return callback('机会名称不能为空');
		}
		if (empty(info.place)) {
			return callback('地点不能为空');
		}
		if (empty(info.currentIntent)) {
			return callback('请选择意向值');
		}
		if (empty(info.description)) {
			return callback('请填写描述');
		}
		
		return callback();
	};
	
	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

}(mui, window.app = {}));


(function($){
		$.fn.serializeJson=function(){
			var serializeObj={};
			var array=this.serializeArray();
			var str=this.serialize();
			$(array).each(function(){
				if(serializeObj[this.name]){
					if($.isArray(serializeObj[this.name])){
						serializeObj[this.name].push(this.value);
					}else{
						serializeObj[this.name]=[serializeObj[this.name],this.value];
					}
				}else{
					serializeObj[this.name]=this.value;	
				}
			});
			return serializeObj;
		};
	})(jQuery);