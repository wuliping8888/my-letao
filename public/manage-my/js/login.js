$(function () {
    // $('button[type=submit]').click(function(event){
    //     event.preventDefault();
    //     $.ajax({
    //         url:"/employee/employeeLogin",
    //         type:'post',
    //         data:$('form').serialize(),
    //         success:function(backdata){
    //             console.log(backdata)
    //         }
    //     })
    // })
//初始化表单
    $('form').bootstrapValidator({

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 12,
                        message: '用户名长度必须在3到12之间'
                    },
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '密码长度必须在6到16之间'
                    },
                     callback:{
                        message:'密码错误'
                    }
                }
            }
        }

    })

//验证用户输入的用户名和密码是否正确
    $("form").on('success.form.bv', function (e) {
        e.preventDefault();
        NProgress.start();
        $.ajax({
            url:"/employee/employeeLogin",
            type:'post',
            data:$('form').serialize(),
            success:function(backdata){
                console.log(backdata)
                if(backdata.success==true){
                    window.location.href="./index.html"
                }else{
                    var validator = $("form").data('bootstrapValidator');  //获取表单校验实例
                    if(backdata.error==1000){
                        // console.log('用户名不存在')
                        validator.updateStatus('username', 'INVALID', 'callback')
                    }
                    else if(backdata.error==1001){
                        validator.updateStatus('password', 'INVALID', 'callback')
                    }
                    
                }
                setTimeout(function(){
                    NProgress.done();
                },1000)
            }
        })
    });

//给重置按钮添加点击事件
    $('button[type=reset]').click(function(){
        var validator = $("form").data('bootstrapValidator');
        validator.resetForm()
    })  
})

//设置进度条
