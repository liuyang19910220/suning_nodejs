$(function() {
	//ajax动态加载
	$.ajax({
		type: "get",
		url: "/list",
		async: true,
		dataType: "json",
		success: function(data) {
			var html = "";
			//通过a标签中的href的search？来控制跳转
			for(var i = 0; i < data.length; i++) {
				html += "<li><a href='detail.html?id="+data[i].id+"' target='_blank' ><img src='" + data[i].src[0] + "'/><p class='title'>" + data[i].title + "</p><p class='price'>" + data[i].price + "</p></a></li>";
			}
			$("#likes ul").append(html);
			//localStorage存储点击历史记录
			$("#likes ul li").click(function(){
				//记录下点击的id
				var attr=$(this).find("a").attr("href");
				var arr=attr.split("=");
				var a=arr[1];//10001,10002...
				//创建一个空数组用于存localStorage--》数据结构：[10001,10002,10003...]
				var record =[];
				//取出localStorage中的数据，进行数据处理
				var str=localStorage.getItem("record");
				if(!str){
					record.push(a);
				}else{
					//如果localStorage中有数据，将数据变成数组
					record=str.split(",");
					//再往现有的数据中添加当前点击的id--->a
					record.push(a);
				}
				//添加好后，存入
				localStorage.setItem("record",record);
			})
		}
	});
})
