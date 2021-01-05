$(function(){
    //点击注册
    $('#gotoRegi').click(function(){
        //显示注册
    $(".regist").show()
    //隐藏登录
    $(".login").hide()
    })
    
    //点击登录
    $('#gotoLogin').click(function(){
        //隐藏注册
        $(".regist").hide()
        //显示登录
        $(".login").show()
    })

    // 表单验证

    //定义表单
    let form =layui.form;
    form.verify({
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],

        //注册的再次验证
        repass:(value,item)=>{
            //当前的value就是二次密码的值
            //拿到再次输入的比较密码元素
          let prepass=  $(".regist [name=password]").val()

          //判断两次密码是否一致
          if(value!==prepass){
              return "滴滴滴：两次密码不一致"
          }
        }
      });  
            
    // ===实现验证注册====

    //定义layer
    let layer = layui.layer;
    //为表单注册提交功能
    $(".regist .layui-form").on("submit",function(e){
        //阻止跳转
        e.preventDefault();

        //清除上一次的数据
        // $(".regist .layui-form").empty()

        //提取收集到的表单数据--serialize仅仅只是收集到文字信息--收集不到文件相关的信息
        let data=$(this).serialize()

        
        //发送ajax数据
        $.ajax({
            type:"POST",
            url:"/api/reguser",
            //名字一样 可简写
            data,
            success(res){
                if(res.data!=0){
            layer.msg(res.message)
                }
            }
        })
        $('#gotoLogin').click()

        //设置延时跳转到登录界面
        
            // $(".login").show()
            // $(".regist").hide()
            // 清除注册好了的数据资料
            $("[autocomplete=off]").val("")
  
    })



    //===实现登录

    //定义
    $(".login .layui-form").on("submit",function(e){
        e.preventDefault()
        //接受表单的数据
        let data=$(this).serialize()

        $.ajax({
            type:"POST",
            url:"/api/login",
            data,
            success(res){
                console.log(1212);
                // console.log(res);
                if(res.status!==0){
                    layer.msg(res.message)
                }
        localStorage.setItem("token", res.token);
                layer.msg(res.message,function(){
                    location.href="/home/index.html"
                })
            }
        })
    })
})