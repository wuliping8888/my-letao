$(function () {
    var mypage = 1;
    var mypageSize = 5;

    function getdata() {
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            data: {
                page: mypage,
                pageSize: mypageSize
            },
            success: function (backdata) {
                // console.log(backdata)
                $('#right tbody').html(template('firstTmp', backdata))

                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: mypage, //当前页
                    totalPages: Math.ceil(backdata.total / backdata.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        mypage = page;
                        getdata();
                    }
                });
            }
        })
    }

    getdata();

    // 使用表单校验插件
    $('#form').bootstrapValidator({
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
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '一级分类名称不能为空'
                    },
                }
            },
        }
    })

    //表单验证成功后就用ajax获得数据
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: "/category/addTopCategory",
            type: 'post',
            data: $('#form').serialize(),
            success: function (backdata) {
                getdata();
              
            }
        })
        $("#form").find('input').val('')
        var validator = $("#form").data('bootstrapValidator');  //获取表单校验实例
        validator.resetForm();//重置表单，并且会隐藏所有的错误提示和图标
        $('.modal-add').modal('hide');
       
    });

})