$(function () {
  var flag1 = false;
  var flag2 = false;
  //1手机号码
  var pattern1 = /^1(\d){10}$/;
  $(".phonenum input").change(function () {
    if (!$(this).val()) {
      $(this).parent(".phonenum").next(".error").html("请输入注册手机号").show();
      flag1 = false;
      return false;
    }
    else if (pattern1.test(Number($(this).val()))) {
      $(this).parent(".phonenum").next(".error").html("格式正确").show();
      flag1 = true;
    } else {
      $(this).parent("div").next(".error").html("格式错误").show();
      flag1 = false;
    }
  })

  //2验证码---》随便填
  //3设置密码:密码只能输入6-20个字母、数字、下划线
  var pattern3 = /^(\w){6,20}$/;
  $(".setpsd input").change(function () {
    //无值时，提示输入密码
    if (!$(this).val()) {
      $(this).parent(".phonenum").next(".error").html("请输入密码").show();
      flag2 = false;
      return false;
    }
    //格式正确提示
    else if (pattern3.test($(this).val())) {
      $(this).parent(".setpsd").next(".error").html("格式正确").show();
      flag2 = true;
      //格式错误提示
    } else {
      $(this).parent(".setpsd").next(".error").html("格式错误").show();
      flag2 = false;
    }
  })

  //4submit
  $("#submit").click(function () {
    //正则判断
    if (flag1 && flag2) {
      //ajax请求后台数据
      var name = $(".phonenum input").val();
      var psd = $(".setpsd input").val();
      $.ajax({
        type: "POST",
        url: "/register",
        data: "username=" + name + "&password=" + psd+ "&act=register",
        success: function (data) {//data即后台send过来的数据
          // var data=JSON.parse(data);//mongodb过来的数据就是对象
          // console.log(data);
          //判断接口数据
          if (data.error == 0) {
            alert("注册成功！");
            window.location = "login.html";

          } else if (data.error == "1") {
            alert("用户名已存在");
          }
        }
      });
    } else {
      alert("请重新输入信息！");
    }
  })


})

			
			
			
			
			
			
			
    		
