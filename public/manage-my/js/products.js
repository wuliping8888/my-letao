$(function(){
    var mypage=1;
    var mypageSize=5;
    function getdata(){
        $.ajax({
            url:"/product/queryProductDetailList",
            data:{
                page:mypage,
                pageSize:mypageSize
            },
            success:function(backdata){
                // console.log(backdata)
                $('tbody').html(template('productsTmp',backdata))
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:mypage,//当前页
                    totalPages:Math.ceil(backdata.total/backdata.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent,type,page){
                      //为按钮绑定点击事件 page:当前点击的按钮值
                      mypage=page;
                      getdata()  
                    }
                  });
            }
        })
    }
    getdata()

   
    //上传图片
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
        //   console.log(data);
        $img='<img src="'+data.result.picAddr+'" alt="" style="width:100px;height:100px">'
        $('form .form-group:last').append($img)

        }
      });
      //判断上传图片的张数,如果是三张就不能再上传了，阻止事件的默认行为
      $('.filedset').click(function(e){
        //   console.log('999')
          if($('form .form-group:last img').length==3){
            e.preventDefault();
          }
      })
      //给img标签添加双击事件，当双击的时候删除这张图片
      $('form .form-group:last').on('dblclick','img',function(){
          $(this).remove()
      })

      //使用表单校验插件
$('form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    // excluded: [':disabled', ':hidden', ':not(:visible)'],
  
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
        }
      },
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
        }
      },
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
        }
      },
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
        }
      },
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
        }
      },
      statu: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
        }
      },
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
        }
      },
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
        }
      },
      pic1: {
        validators: {
          //不能为空
          notEmpty: {
            message: '必须上传三张照片'
          },
        }
      }
    }
  }).on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
        url:"/product/addProduct",
        type:'post',
        data:$('form').serialize(),
        success:function(backdata){
            window.location.reload();
             $('form input').val('');
        }
    })
   
});


})