$(function() {
	//初始化
	var i = 0;
	var size = $(".pic li").size();
	letShow();

	//设置主控函数
	function mainfn() {
		i++;
		if(i == size) {
			i = 0;
		}
		letShow();
		setNav()
	}
	var timer = setInterval(mainfn, 1500);

	//设置图片滚动
	function letShow() {
		$(".pic li").eq(i).fadeIn(300);
		$(".pic li").eq(i).siblings().fadeOut(300);
	}

	//设置按钮class切换
	function setNav() {
		$(".nav li").eq(i).addClass("select");
		$(".nav li").eq(i).siblings().removeClass("select");
	}

	//设置点击事件
	$(".nav li").click(function() {
		i = $(this).index(); 
		letShow();
		setNav();
	})

	//设置鼠标移入移出事件
	$("#banner").hover(function() {
		clearInterval(timer);
	}, function() {
		timer = setInterval(mainfn, 1500);
	})

	//2ajax动态加载
	$.ajax({
		type: "get",
		url: "/guess",//接口，需要和app.js里接口保持一致
		async: true,
		dataType: "json",
		success: function(data) {
			var html = "";
			for(var i = 0; i < data.length; i++) {
			  //用一下es6的字符串模板
				html += `<li><a href='detail.html?id=${data[i].id}' target='_blank' ><img src='${data[i].src}'/><p class='title'>${data[i].title}</p><p class='price'>${ data[i].price}</p></a></li>`;
			}
			$("#likes ul").append(html);
		}
	});


//3，楼梯
	var flag = true;
	//滚动事件的处理程序
	function scroll(){
		//获取滚动条滚动的距离
		var scrollTop = $(window).scrollTop();
		//判断，让左边的楼层显示出来
		scrollTop > 974 ? $("#LoutiNav").fadeIn(300) : $("#LoutiNav").fadeOut(300);
		//滚动条滚动到相应区域时，对应楼层添加class->hover
		$(".outer").each(function(){
			//console.log($(this).offset().top);
			//当内容区域显示一半时，开始添加类
			if(scrollTop > $(this).offset().top - $(this).outerHeight()/2){
				$("#LoutiNav li").eq($(this).index()).addClass("hover").siblings().removeClass("hover");
			}
		})

	}
	
	$(window).scroll(function(){
		if(flag){
			scroll();
		}
		
	});
	

	$("#LoutiNav li:not(:last)").click(function(){
		flag = false;
		$(this).addClass("hover").siblings().removeClass("hover");
		//窗口滚动条动画，滚动到楼层对应区域的位置
		$("body,html").stop().animate({"scrollTop":$(".outer").eq($(this).index()).offset().top},500,function(){
			flag  = true;
		});
		
	})
	
	$("#LoutiNav li:last").click(function(){
		flag = false;
		$("body,html").stop().animate({"scrollTop":0},500,function(){
			flag  = true;
		});
	})
})
