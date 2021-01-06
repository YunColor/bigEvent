$(function(){
    //设置校验规则
    let form=layui.form;
    let layer=layui.layer;
    form.verify({
        newpass:function(value){
            //获取旧密码与新密码作比较
           let oldpwd= $("[name=oldPwd]").val()
           if(value===oldpwd){
            //    return layer.msg("两次密码不能一致")
            return "新密码不能和原密码相同！"
           }
        }
        ,
        pass: [
            /^[\S]{6,12}$/
            // 数字在6-12位数字之间
          ],
          repass:function(value){
              let newpwd=$("[name=newPwd]").val()
              if(value !==newpwd){
                  return "两次密码不相同"
              }
          }
    })

    //修改密码
    $("#form").on("submit",function(e){
        //阻止默认行为
        e.preventDefault();
        
        //获取数据
        let data=$(this).serialize()

        //发送数据
        $.ajax({
            url:'/my/updatepwd',
            type:"POST",
            data,
            success(res){
                if(res.status !==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)

                //改完密码之后重置表单
                $("#form")[0].reset()
            }
        })
    })
})