
		/* 省、地区、县市、街道四级联动下拉列表
		*/
		//省、地区、市县、街道四级联动下拉列表，初始只有前3个，只有当前3个都选中，并且存在街道列表的时候才显示第4级下拉列表
		$(document).ready(function(){init(sheng);sel(shi);seladd();});
		
		function init(sheng){
			var shengval;
			if("undefined" != typeof($("#sheng").val())){
				shengval=$("#sheng").val();
			}
			//初始化 省份下拉列表里面列出所有可选省份，地区下拉列表清空，市县下拉列表清空
			$("#addressProvince").empty();
			$("<option value=\"0\">请选择省/市</option>").appendTo($("#addressProvince"));
			$.each(GP,function(n,ele){
				if(ele==shengval){
					$("<option value="+ele+" selected>"+ele+"</option>").appendTo($("#addressProvince"));
				}else{
					$("<option value="+ele+">"+ele+"</option>").appendTo($("#addressProvince"));
				}
				}
			);
			
			//清空地区下拉列表
			$("#addressCity").empty();
			$("<option value=\"0\">请选择市/地区</option>").appendTo($("#addressCity"));

			//清空市县下拉列表
			$("#addressState").empty();
			$("<option value=\"0\">请选择县/市</option>").appendTo($("#addressState"));

			//如果有街道列表则删除，因为此时还没有必要显示街道列表
			if($("#addressStreet").length > 0)
				$("#addressStreet").remove();
		}
		function sel(shi,qu,jie){
			//省份下拉列表改变的时候调用的方法，此时联动把地区内容显示到地区下拉列表中
					var shival;
					if("undefined" != typeof($("#shi").val())){
						shival=$("#shi").val();
					}
					//把数组中的地区数据显示到地区列表中
					$("#addressCity").empty();
					$("<option value=\"0\">请选择市/地区</option>").appendTo($("#addressCity"));
					$.each(GC1[$("#addressProvince option:selected").html()],function(n,ele){
						if(ele==shival){
							$("<option value="+ele+" selected>"+ele+"</option>").appendTo($("#addressCity"));
						}else{
							$("<option value="+ele+">"+ele+"</option>").appendTo($("#addressCity"));
						}	
						
						}
					);

					//清空县市下拉列表
					$("#addressState").empty();
					$("<option value=\"0\">请选择县/市</option>").appendTo($("#addressState"));

					//如果有街道列表则删除，因为此时还没有必要显示街道列表
					if($("#addressStreet").length > 0)
							$("#addressStreet").remove();

			//地区下拉列表改变的时候调用的方法，此时联动把县市内容显示到下拉列表中
					//把数组中的县市数据追加到列表中
					var quval;
					
					if("undefined" != typeof($("#qu").val())){
						quval=$("#qu").val();
					}
					//alert(quval);
					$("#addressState").empty();
					$("<option value=\"0\">请选择县/市</option>").appendTo($("#addressState"));
					$.each(GC2[$("#addressProvince option:selected").html()][$("#addressCity option:selected").html()],function(n,ele){
						if(ele==quval){
							$("<option value="+ele+" selected>"+ele+"</option>").appendTo($("#addressState"));
						}else{
							$("<option value="+ele+">"+ele+"</option>").appendTo($("#addressState"));
						}	
						}
					);
					
					//如果有街道列表则删除，因为此时还没有必要显示街道列表
					if($("#addressStreet").length > 0)
							$("#addressStreet").remove();

			//县市下拉列表改变的时候调用的方法，此时判断是否有街道信息，有点话则显示街道下拉列表框并显示内容
					
					//根据选择的省、地区、县市信息判断是否有街道信息，有点话则显示街道下拉列表并显示其内容
					if(GC3[$("#addressProvince option:selected").html()] && 
						GC3[$("#addressProvince option:selected").html()][$("#addressCity option:selected").html()] &&
						GC3[$("#addressProvince option:selected").html()][$("#addressCity option:selected").html()][$("#addressState option:selected").html()]){
						
						if($("#addressStreet").length > 0)
							$("#addressStreet").remove();
						$('<div class="row cl" id="rowjie"><label class="form-label col-2"><span class="c-red">*</span>所在街道 ：</label><div class="formControls col-2"> <span class="select-box"><select id=\"addressStreet\" name=\"addressStreet\" class=\"select\" datatype="*" ><option value=\"0\">请选择街道/镇</option></select></span></div></div>').appendTo($("#city"));
						var jieval;
						if("undefined" != typeof($("#jie").val())){
							jieval=$("#jie").val();
						}
						$("#addressStreet").empty();
						$("<option value=\"0\">请选择街道/镇</option>").appendTo($("#addressStreet"));
						$.each(GC3[$("#addressProvince option:selected").html()][$("#addressCity option:selected").html()][$("#addressState option:selected").html()],function(n,ele){
							if(ele==jieval){
								$("<option value="+ele+" selected>"+ele+"</option>").appendTo($("#addressStreet"));
							}else{
								$("<option value="+ele+">"+ele+"</option>").appendTo($("#addressStreet"));
							}
								
							}
						);
					}else{
						if($("#addressStreet").length > 0)
							$("#addressStreet").remove();
					}
			
			
		}
		//**********************************
		function seladd(){
			//省份下拉列表改变的时候调用的方法，此时联动把地区内容显示到地区下拉列表中
			$("#addressProvince").change(
				function(){
					//把数组中的地区数据显示到地区列表中
					$("#addressCity").empty();
					$("<option value=\"0\">请选择市/地区</option>").appendTo($("#addressCity"));
					$.each(GC1[$("#addressProvince option:selected").html()],function(n,ele){
							$("<option value="+ele+">"+ele+"</option>").appendTo($("#addressCity"));
						}
					);

					//清空县市下拉列表
					$("#addressState").empty();
					$("<option value=\"0\">请选择县/市</option>").appendTo($("#addressState"));

					//如果有街道列表则删除，因为此时还没有必要显示街道列表
					if($("#addressStreet").length > 0)
							$("#addressStreet").remove();
				}
			);

			//地区下拉列表改变的时候调用的方法，此时联动把县市内容显示到下拉列表中
			$("#addressCity").change(
				function(){
					//把数组中的县市数据追加到列表中
					$("#addressState").empty();
					$("<option value=\"0\">请选择县/市</option>").appendTo($("#addressState"));
					$.each(GC2[$("#addressProvince option:selected").html()][$("#addressCity option:selected").html()],function(n,ele){
							$("<option value="+ele+">"+ele+"</option>").appendTo($("#addressState"));
						}
					);
					
					//如果有街道列表则删除，因为此时还没有必要显示街道列表
					if($("#addressStreet").length > 0)
							$("#addressStreet").remove();
				}
			);

			//县市下拉列表改变的时候调用的方法，此时判断是否有街道信息，有点话则显示街道下拉列表框并显示内容
			$("#addressState").change(
				function(){
					$("#rowjie").remove();
					//根据选择的省、地区、县市信息判断是否有街道信息，有点话则显示街道下拉列表并显示其内容
					if(GC3[$("#addressProvince option:selected").html()] && 
						GC3[$("#addressProvince option:selected").html()][$("#addressCity option:selected").html()] &&
						GC3[$("#addressProvince option:selected").html()][$("#addressCity option:selected").html()][$("#addressState option:selected").html()]){
						
						if($("#addressStreet").length > 0)
							$("#addressStreet").remove();
						$('<div class="row cl" id="rowjie"><label class="form-label col-2"><span class="c-red">*</span>所在街道 ：</label><div class="formControls col-2"> <span class="select-box"><select id=\"addressStreet\" name=\"addressStreet\" class=\"select\" datatype="*" ><option value=\"0\">请选择街道/镇</option></select></span></div></div>').appendTo($("#city"));
						$("#addressStreet").empty();
						//$("<option value=\"0\">请选择街道/镇</option>").appendTo($("#addressStreet"));
						$.each(GC3[$("#addressProvince option:selected").val()][$("#addressCity option:selected").val()][$("#addressState option:selected").val()],function(n,ele){
								$("<option value="+ele+">"+ele+"</option>").appendTo($("#addressStreet"));
							}
						);
					}else{
						if($("#addressStreet").length > 0)
							$("#addressStreet").remove();
					}
				}
			);
		}
