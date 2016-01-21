(function(window){
function IScrollLoadData(wrapperEl,contentEl,dropTopAction,dropBottomAction,limit){
	this.wrapper=wrapperEl;
	this.content=contentEl;
	this.pullUpEl=this.wrapper.querySelector('#scroller-pullUp');
	this.scrollerEl=this.wrapper.querySelector('.scroller');
	this.dropTopAction=dropTopAction;
	this.dropBottomAction=dropBottomAction;
	this.limit=limit||6;
	
	this.clickTop_bind=this.clickTop.bind(this);
	this.clickBottom_bind=this.clickBottom.bind(this);
	
	this.pullUpLabel_Text='上拉显示更多...';
	this.pullDownLabel_Text='下拉显示更多...';
	this.pullLoading_Text='加载中...';
	this.releaseLoading_Text='松手开始加载...';
	this.loading_top_flag=false;
	this.loading_bottom_flag=false;
	this.checkIScroll(true);
	this.createIScroll();
};
IScrollLoadData.prototype.refresh=function(direct){
	//this.updateContentLen(direct);
	console.log("checkIScroll")
	this.checkIScroll();
	console.log("delete waitLoadTop")
	delete this.myScroll.waitLoadTop;
	this.myScroll.refresh();
}
IScrollLoadData.prototype.updateContentLen=function(direct){
	var children=this.content.children;
	if(children.len>this.limit){
		if(direct=='bottom'){
			
		}else{
			
		}
	}
}
IScrollLoadData.prototype.checkIScroll=function(flag){
	var soh=this.content.offsetHeight+this.pullUpEl.offsetHeight;
	var woh=this.wrapper.clientHeight;
	var holder=this.scrollerEl.querySelector('.scroller-holder');
	if(soh<woh){
		if(!holder){
			var ul=document.createElement('ul');
			ul.className='scroller-holder';
			this.scrollerEl.appendChild(ul);
			holder=ul;
		}
		holder.style.height=(woh-soh+2)+'px';
	}else if(holder){
		this.scrollerEl.removeChild(holder);
	}
}
IScrollLoadData.prototype.pullDownAction=function(){
	var self=this;
	//this.myScroll.scrollTo(0,this.pullDownEl.offsetHeight);
	
	if(this.dropTopAction){
		this.dropTopAction(function(out){
			var firstChild=self.content.querySelector(':first-child');
			if(firstChild)
			  self.content.insertBefore(out,firstChild);
			else
			  self.content.appendChild(out);
			self.refresh('top');
		});
	}else{
		this.refresh('top');
	} 
};
IScrollLoadData.prototype.pullUpAction=function(){
	var self=this;
	if(this.dropBottomAction){
		this.dropBottomAction(function(out){
			console.log('pullUpAction',out)
			if(out!=null){
			self.content.appendChild(out);
			self.refresh('bottom');
			}else{
				self.pullUpEl.className = '';
				self.pullUpEl.querySelector('.pullUpLabel').innerHTML = "木有数据了";	
			}
		});
	}else{
		this.refresh('bottom');
	}
};
IScrollLoadData.prototype.clickTop=function(){
	var self=this;
	if(this.dropTopAction){
		this.dropTopAction(function(out){
			var firstChild=self.content.querySelector(':first-child');
			if(firstChild)
			  self.content.insertBefore(out,firstChild);
			else
			  self.content.appendChild(out);
			self.initIScroll(false);
			
		});
	}
};
IScrollLoadData.prototype.clickBottom=function(){
	var self=this;
	if(this.dropBottomAction){
		this.dropBottomAction(function(out){
			if(out!=null){
				self.content.appendChild(out);
				self.initIScroll(false);
				}else{
					self.pullUpEl.className = 'nonedb';
					self.pullUpEl.querySelector('.pullUpLabel').innerHTML = "木有数据了";	
				}
		});
	}
};
IScrollLoadData.prototype.initIScroll=function(flag){
	//console.log("11");
	if(this.overflow_window){
		return;
	}
	
	if(this.scrollerEl.offsetHeight
			//-this.pullDownEl.offsetHeight
			>=document.documentElement.clientHeight){
		this.wrapper.style.bottom='30px';
		this.wrapper.style.top=(-1/*(-1)*this.pullDownEl.offsetHeight*/)+'px';
		this.pullUpEl.querySelector('.pullUpLabel').innerText=this.pullUpLabel_Text;
		//this.pullDownEl.querySelector('.pullDownLabel').innerText=this.pullDownLabel_Text;
		this.pullUpEl.removeEventListener('click',this.clickBottom_bind);
		//this.pullDownEl.removeEventListener('click',this.clickUp_bind);
		this.myScroll.refresh();
		this.overflow_window=true;
	}else{
		this.wrapper.style.bottom=(document.documentElement.clientHeight-this.scrollerEl.offsetHeight)+'px';
		this.pullUpEl.querySelector('.pullUpLabel').innerText='点击获取最近...';
		//this.pullDownEl.querySelector('.pullDownLabel').innerText='点击获取最新...';
		if(flag){
			this.pullUpEl.addEventListener('click',this.clickBottom_bind);
			//this.pullDownEl.addEventListener('click',this.clickTop_bind);
		}
		
	}
	
	/*console.log('initIScroll this.content.offsetHeight='+this.content.offsetHeight
		    +' this.wrapper.clientHeight='+this.wrapper.clientHeight+
		    '  html.height='+document.documentElement.clientHeight);*/
}
IScrollLoadData.prototype.createIScroll=function(){
	var self=this;
	this.myScroll = new IScrollLoadData.IScroll(this.wrapper, {
		probeType: 2, mouseWheel: false,bindToWrapper:true,scrollY:true,click:true
	}).on('scroll',function(){
		/*if (this.y > 50 &&  
			(!self.pullDownEl.className.match('flip') && 
			 !self.pullDownEl.className.match('loading'))) {
			self.pullDownEl.className = 'flip';
			self.pullDownEl.querySelector('.pullDownLabel').innerHTML = self.releaseLoading_Text;
			this.waitLoadTop=self.pullDownEl.offsetHeight;
		} else if (this.y < 50 && self.pullDownEl.className.match('flip')) {
			self.pullDownEl.className = '';
			self.pullDownEl.querySelector('.pullDownLabel').innerHTML = self.pullDownLabel_Text;
			 delete this.waitLoadTop;
		} else*/ 
		if (this.y < (this.maxScrollY -5) && (!self.pullUpEl.className.match('flip')&&!self.pullUpEl.className.match('loading'))) {
			self.pullUpEl.className = 'flip';
			self.pullUpEl.querySelector('.pullUpLabel').innerHTML = self.releaseLoading_Text;
		} else if (this.y > (this.maxScrollY + 5) && self.pullUpEl.className.match('flip')) {
			self.pullUpEl.className = '';
			self.pullUpEl.querySelector('.pullUpLabel').innerHTML = self.pullUpLabel_Text;
			 //delete this.waitLoadTop;
		}
		
	}).on('scrollEnd',function(){
		/*if (self.pullDownEl.className.match('flip')) {
			self.pullDownEl.className = 'loading';
			self.pullDownEl.querySelector('.pullDownLabel').innerHTML = self.pullLoading_Text;	
			self.pullDownAction();// Execute custom function (ajax call?)
		} else*/ if (self.pullUpEl.className.match('flip')) {
			self.pullUpEl.className = 'loading';
			self.pullUpEl.querySelector('.pullUpLabel').innerHTML = self.pullLoading_Text;				
			self.pullUpAction();	// Execute custom function (ajax call?)
		}
	}).on('refresh',function(){
		console.log('refresh ',self.pullUpEl.className);
		/*console.log('refresh this.y='+this.y+
				' , this.maxScrollY='+this.maxScrollY+
				' , this.scrollerHeight='+this.scrollerHeight+
				' , this.wrapperHeight='+this.wrapperHeight);*/
		/*if (self.pullDownEl.className.match('loading')) {
			self.pullDownEl.className = '';
			self.pullDownEl.querySelector('.pullDownLabel').innerHTML = self.pullDownLabel_Text;
		} else */if (self.pullUpEl.className.match('loading')) {
			self.pullUpEl.className = '';
			self.pullUpEl.querySelector('.pullUpLabel').innerHTML = self.pullUpLabel_Text;
		}
	});
	
};
if("function" == typeof define &&  define.amd){
  define("IScrollLoadData", ['IScroll'], function(IScroll) {
        IScrollLoadData.IScroll=IScroll;
        return IScrollLoadData;
    });   
}else {
    IScrollLoadData.IScroll=window.IScroll;
    window.IScrollLoadData = IScrollLoadData;
}

})(window);