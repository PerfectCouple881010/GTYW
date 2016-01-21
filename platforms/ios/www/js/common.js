
// var URL = 'http://'+window.location.host;

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
    mui('#pullrefresh').scroll();
});