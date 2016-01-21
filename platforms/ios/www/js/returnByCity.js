//列表返回权限 （根据不同角色返回不同首页,并且根据不同城市查询条件 ）
	var postId =localStorage.getItem("postId");
	var code="";
	var id="";
	if(postId == '8'||postId == '15'){//岗位为资源、资源经理
		var backResult='<a class="headerL" href="index_ZY.html"><img src="images/return.png"></a>';
	}else if(postId == '9'){//岗位为拓展、
		var backResult='<a class="headerL" href="index_TZ.html"><img src="images/return.png"></a>';
	}else if(postId == '10'||postId == '13'){//岗位为建设、建设经理
		var backResult='<a class="headerL" href="index_JS.html"><img src="images/return.png"></a>';
	}else if(postId == '11'||postId=='14'){//岗位为运营、运营经理
		var backResult='<a class="headerL" href="index_YY.html"><img src="images/return.png"></a>';
	}else if(postId == '12'){//岗位为城市经理
		var backResult='<a class="headerL" href="index_CSJL.html"><img src="images/return.png"></a>';
	}else if(postId == '2'||postId=='16'||postId=='17'){//岗位为ceo、常务副总、综合总监
		code = location.href.split('?')[1].split('=')[1].split('&')[0];
		var backResult='<a class="headerL" href="index_CEO.html"><img src="images/return.png"></a>';
	}else{//其它行政人员
		var backResult='<a class="headerL" href="index_XZ.html"><img src="images/return.png"></a>';
	}
	$('#returnIndex').append(backResult);