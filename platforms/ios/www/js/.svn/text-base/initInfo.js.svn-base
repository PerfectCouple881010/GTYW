/**
 * 初始化基于模块间的关联
 * @param pid
 * @param iName
 * @param method
 * @param callBackFunction
 */
function intiBaseDic(serverIp,pid,iName,method,callBackFunction){
	var currentBaseID;
	if("undefined" != typeof($("#"+pid).val())){
		currentBaseID=$("#"+pid).val();
	}
	$.ajax({
		url:'http://'+serverIp+'/gtims'+method,
		type:"post",
		async:false,
		dataType:"json",
		success:function(json){
			var selec = $("#"+iName);
			selec.empty();
			selec.append("<option value=''>请选择</option>");
			if(json!=null){
				$.each(json,function(i,value){
					if(value.id ==currentBaseID){
                       
		           		selec.append("<option value='"+value.id+"'selected>"+value.name+"</option>");
		           	}else{
		           		selec.append("<option value='"+value.id+"'>"+value.name+"</option>");
		           	}
				})
					//selec.append("<option value="+json[i].id+">"+json[i].name+"</option>");
			}
			if(callBackFunction!=null&&callBackFunction!=""){
				eval(callBackFunction);
			}
		}
	});
}
/**
 * 初始化基于数据字典
 * @param pid
 * @param iName
 * @param method
 * @param type
 * @param callBackFunction
 */
function intiBaseByType(serverIp,pid,iName,method,type,callBackFunction){
	var currentBaseID;
	if("undefined" != typeof($("#"+pid).val())){
		currentBaseID=$("#"+pid).val();
	}
	$.ajax({
		url:'http://'+serverIp+'/gtims'+method,
		data:{type:type},
		type:"post",
		async:false,
		dataType:"json",
		success:function(json){
			var selec = $("#"+iName);
			selec.empty();
			selec.append("<option value=''>请选择</option>");
			if(json!=null){
				$.each(json,function(i,value){
					if(value.id == currentBaseID){
		           		selec.append("<option value='"+value.id+"'selected>"+value.name+"</option>");
		           	}else{
		           		selec.append("<option value='"+value.id+"'>"+value.name+"</option>");
		           	}
				})
					//selec.append("<option value="+json[i].id+">"+json[i].name+"</option>");
			}
			if(callBackFunction!=null&&callBackFunction!=""){
				eval(callBackFunction);
			}
		}
	});
}
/**
 * 查询地区
 * @param ctx
 * @param pid
 * @param iName
 * @param method
 * @param regionCode
 * @param callBackFunction
 */
function intiRegionByregionCode(ctx,pid,iName,method,regionCode,callBackFunction){
	var currentBaseID;
	if("undefined" != typeof($("#"+pid).val())){
		currentBaseID=$("#"+pid).val();
	}
	$.ajax({
		url:'http://'+serverIp+'/gtims'+method,
		data:{regionCode:regionCode},
		type:"post",
		async:false,
		dataType:"json",
		success:function(json){
			var selec = $("#"+iName);
			selec.empty();
			selec.append("<option value=''>请选择</option>");
			if(json!=null){
				$.each(json,function(i,value){
					if(value.id == currentBaseID){
		           		selec.append("<option value='"+value.id+"'selected>"+value.name+"</option>");
		           	}else{
		           		selec.append("<option value='"+value.id+"'>"+value.name+"</option>");
		           	}
				})
					//selec.append("<option value="+json[i].id+">"+json[i].name+"</option>");
			}
			if(callBackFunction!=null&&callBackFunction!=""){
				eval(callBackFunction);
			}
		}
	});
}
