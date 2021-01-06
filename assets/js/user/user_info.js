// 用户信息页面
$(function(){
    let form =layui.form;
    let layer=layui.layer;
    form.verify({
        nickname: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(value.length>6){
                return "您输入的字数超过6个啦"
            }
        }
      }); 

      //发送数据
      getInfo();
      function getInfo(){
        $.ajax({
            url:"/my/userinfo",
            success(res){
                form.val("form",res.data)
              //   $("[name=username]").attr("val",JSON.parse(res.data));
            }
        })
      }

    //   重置一下

    $("#resetBtn").click(function(e){
        e.preventDefault();
        
    //重新发送ajax
    getInfo()
    })
      
    //监听表单的submit  时限修改功能
    $("#form").on("submit",function(e){

        //阻止默认行为
        e.preventDefault()
        //收集到的数据处理
        let data=$(this).serialize()
        //在发送修改ajax
        $.ajax({
            url:"/my/userinfo",
            type:'POST',
            data,
            success: function(res){
                if(res.status !==0){
                    return layer.msg(res.message)
                }
                //window.parent 可以找到父页面的元素
                window.parent.getUserInfo()

                layer.msg(res.message)
            }
        })
    })
})