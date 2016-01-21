/* 省、地区、县市、街道四级联动下拉列表
		*/
		//省、地区、市县、街道四级联动下拉列表，初始只有前3个，只有当前3个都选中，并且存在街道列表的时候才显示第4级下拉列表
		$(document).ready(function(){init();sel();});
		function init(){
			//初始化 省份下拉列表里面列出所有可选省份，地区下拉列表清空，市县下拉列表清空
			$("#addressProvince").empty();
				intiBaseDic(serverIp,"cid","addressProvince","/region/findProvince.do");//addressProvince
			//清空地区下拉列表
			$("#addressCity").empty();
			$("<option value=\"0\">请选择</option>").appendTo($("#addressCity"));

			//清空市县下拉列表
			$("#addressState").empty();
			$("<option value=\"0\">请选择</option>").appendTo($("#addressState"));

			//清空街道下拉列表
			$("#addressStreet").empty();
			$("<option value=\"0\">请选择</option>").appendTo($("#addressStreet"));
		}
		function sel(){
			//省份下拉列表改变的时候调用的方法，此时联动把地区内容显示到地区下拉列表中
			$("#addressProvince").change(
				function(){
					//把数组中的地区数据显示到地区列表中
					$("#addressCity").empty();
					intiRegionByregionCode(serverIp,"acid","addressCity","/region/findCityOrState.do",$("#addressProvince option:selected").val());

					//清空县市下拉列表
					$("#addressState").empty();
					$("<option value=\"0\">请选择</option>").appendTo($("#addressState"));

					//清空街道下拉列表
					$("#addressStreet").empty();
					$("<option value=\"0\">请选择</option>").appendTo($("#addressStreet"));
				}
			);

			//地区下拉列表改变的时候调用的方法，此时联动把县市内容显示到下拉列表中
			$("#addressCity").change(
				function(){
					//把数组中的县市数据追加到列表中
					$("#addressState").empty();
					intiRegionByregionCode(serverIp,"acid","addressState","/region/findCityOrState.do",$("#addressCity option:selected").val());
					
					//清空街道下拉列表
					$("#addressStreet").empty();
					$("<option value=\"0\">请选择</option>").appendTo($("#addressStreet"));
				}
			);

			//县市下拉列表改变的时候调用的方法，此时判断是否有街道信息，有点话则显示街道下拉列表框并显示内容
			$("#addressState").change(
				function(){
					
					//根据选择的省、地区、县市信息显示街道信息 
					$("#addressStreet").empty();
					intiRegionByregionCode(serverIp,"acid","addressStreet","/region/findCityOrState.do",$("#addressState option:selected").val());
				}
			);
		}