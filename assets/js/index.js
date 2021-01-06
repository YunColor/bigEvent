// 发送ajax获取用户登录的名字
let layer = layui.layer;
getUserInfo()
function getUserInfo(){
    $.ajax({
        url:"/my/userinfo",
        // headers:{
        //     //设置头部---带上登录的token--存储到浏览器的local中
        // Authorization: localStorage.getItem("token"),
        // },
        success(res){
            // console.log(res);
            //拿到用户的基本信息
            renderUserInfo(res.data)
        }
    })
}



//动态渲染用户的信息到页面上
function renderUserInfo(data){
    console.log(data);
    // 短路运算--二选一
    let name=data.nickname||data.username

    //把名字的第一个字转大写
    let first=name[0].toUpperCase()
    //获取到的名字以及他的首字母
    // console.log(name,first);

    //动态欢迎用户
    $("#welcome").text("欢迎--"+name)

    //判断是否有用户头像
    if(data.uesr_pic){
        $('.layui-nav-img').attr("src",data.user_pic).show()
        $(".text-avatar").hide()
    }else{
        $('.layui-nav-img').hide()
        $(".text-avatar").text(first).show()
    }
}

//实现退出功能
$("#loginoutBtn").click(function(){
    layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
        //do something

        //清除本地存储
        localStorage.removeItem("token");
        //跳转到主页
        location.href="/home/login.html"
        layer.close(index);
      });      
})
