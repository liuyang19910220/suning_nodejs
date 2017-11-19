$(function () {
  //1基于ajax返回的数据动态渲染头部页面
  $.ajax({
    type: "get",
    url: "/list",//要与app.js中路由端口保持一致
    async: true,
    success: function (data) {
      var str = location.search;
      var a = str.split("=");
      var proId = a[1];
      var html = "";
      var btn = "";
      for (var i in data) {
        if (data[i].id == proId) {
          //1)生成title等文字信息
          $("#itemDisplayName").html(data[i].title);
          $("#goods-r .price").find("b").html(data[i].price);

          //2)生成图片
          for (var j in data[i].src) {
            html += "<img src='" + data[i].src[j] + "'/>";
            //append后zoom的层级低了，要上调,或者改成insertbefore
          }
          $("#small-pics, #middleArea,#bigArea").append(html);
          //3)生成带有特殊属性的btn
          btn = "<a class='cart-btn' data-id='" + data[i].id + "'>加入购物车</a>";
          $(".to-cart h5").append(btn);
        }
      }

      //2动态加载成功后，实现tab切换
      $("#small-pics img").click(function () {
        console.log($(this).index());
        $(this).addClass("active").siblings().removeClass("active");
        $("#middleArea img").eq($(this).index()).show().siblings().hide();
        $("#bigArea img").eq($(this).index()).show().siblings().hide();
      })

      //3实现放大镜
      $("#zoomArea").mousemove(function (evt) {
        //1)显示
        $("#bigArea,#zoom").show();
        var cx = evt.pageX - $("#zoomArea").offset().left - $("#zoom").outerWidth() / 2;
        var cy = evt.pageY - $("#zoomArea").offset().top - $("#zoom").outerHeight() / 2;
        //2)边界判断
        if (cx < 0) {
          cx = 0;
        } else if (cx >= $("#zoomArea").outerWidth() - $("#zoom").outerWidth()) {
          cx = $("#zoomArea").outerWidth() - $("#zoom").outerWidth();
        }
        if (cy < 0) {
          cy = 0;
        } else if (cy >= $("#zoomArea").outerHeight() - $("#zoom").outerHeight()) {
          cy = $("#zoomArea").outerHeight() - $("#zoom").outerHeight();
        }
        //3)进行拖动
        $("#middleArea #zoom").css("left", cx);
        $("#middleArea #zoom").css("top", cy);
        //4)让大图动起来
        var bcx = -($("#zoom").position().left / $("#middleArea").outerWidth() * $("#bigArea img").outerWidth());
        var bcy = -($("#zoom").position().top / $("#middleArea").outerHeight() * $("#bigArea img").outerHeight());
        $("#bigArea img").css("left", bcx);
        $("#bigArea img").css("top", bcy);
        //5)鼠标移出
        $("#zoomArea").mouseout(function () {
          $("#bigArea,#zoom").hide();
        })
      })


      //4，input输入框数量增减
      var num = $(".to-cart input").val();
      $(".to-cart .reduce").click(function () {
        num--;
        if (num <= 1) {
          num = 1;
          $(".to-cart input").val(num);
          alert("请至少选中一件商品");
        } else {
          $(".to-cart input").val(num);
        }

      })

      $(".to-cart .plus").click(function () {
        num++;
        $(".to-cart input").val(num);
      })
      //console.log(num);

      //5实现存入购物车---localStorage
      $(".cart-btn").click(function () {
        //点击时要存入购物车，要判断点击的是哪个ID，用到前面为btn绑定的data-id属性
        var proId = $(this).attr("data-id");
        //console.log(proId);
        var str = localStorage.getItem("cart");//先取出来看看
        var obj = str ? JSON.parse(str) : {};
        //存cookie的逻辑:同种商品添数量，不同商品添属性--数据结构-->{10001: 27, 10003: 19, 10005: 6}
        if (!obj[proId]) {
          obj[proId] = Number(num);
        } else {
          //console.log(num,typeof num);
          //??为什么类型是Number,实际却是字符串拼接效果？
          //刷新后再添加拼接bug？？？？？？？？？？？？？？？？？
          obj[proId] += Number(num);
        }

        //5-1存localStorage
        var str = JSON.stringify(obj);
        localStorage.setItem("cart", str);
        //5-2取localStorage,将数量统计到购物车图标位置
        var str = localStorage.getItem("cart");
        ;
        var obj = JSON.parse(str);
        var sum = 0;
        for (var i in obj) {
          sum += obj[i];
        }
        console.log(sum);
        $("#top .cart").html(sum);
      })

      //6为了刷新时就显示购物车数量，提前调用一次
      var str = localStorage.getItem("cart");
      ;
      if (str) {
        var obj = JSON.parse(str);
        var sum = 0;
        for (var i in obj) {
          sum += obj[i];
        }
        $("#top .cart").html(sum);
      } else {
        $("#top .cart").html(0);
      }

    }
  });

  //2动态生成左侧边栏
  $.ajax({
    type: "get",
    url: "/list",
    async: true,
    success: function (data) {
      var html = "";
      for (var i = 0; i < 19; i++) {
        html += "<li><img src='" + data[i].src[0] + "' /><p>" + data[i].title + "</p><span>" + data[i].price + "</span></li>"
      }
      $("#detail-main .main-l ul").append(html);
    }
  });

  //7浏览记录,为了方便取值，改用cart表格
  //这个浏览记录有点小问题--localStorage存的数据结构["10006", "10001","10006", "10001"...]
  //没有去重，所有多次点击同种商品，会多次加载同一个商品
  $.ajax({
    type: "get",
    url: "/cart",
    async: true,
    success: function (data) {
      // console.log(data,typeof data)//得到后台send(result)传过来的数据，后台toArray会加上一层
      var data=data[0];
      var str = localStorage.getItem("record");
      if (str) {
        var arr = str.split(",");
        // console.log(arr, arr[0]);
        //["10006", "10001"...]
        //可以在此实现去重复！！！！！！！！！！！！！！！
        var html = "";
        for (var i in arr) {
          // console.log(i);//0,1,2,3...
          var a = parseInt(arr[i]); //a是id!!!
          // console.log(a)
          html += "<li><a href='detail.html?id=" +
            a +
            "'><img src='" + data[a].src[1] + "'><p class='des'>" +
            data[a].title +
            "</p><p class='price-tag'>" + data[a].price + "</p></a></li>";
        }
        $("#record .box ul").append(html);
      } else {
        $("#record .box ul").html("亲，您还没有浏览记录~")
      }
    }
  });

})