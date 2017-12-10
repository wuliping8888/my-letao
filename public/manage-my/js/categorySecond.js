$(function(){
    //将一级分类的名称显示在模态框中
    $.ajax({
        url:"/category/queryTopCategoryPaging",
        data:{
            page:1,
            pageSize:250
        },
        success:function(backdata){
            // console.log(backdata)
            $('.dropdown-menu').html('')
            $.each(backdata.rows,function(i,n){
                console.log(n)
                var $li="<li><a href='javascript:void(0)'>"+n.categoryName+"</a></li>"
                $('.dropdown-menu').append($li)
            })
        }
    })
    //给里面的a标签添加点击事件，点击的时候将内容显示在上面
    $('.dropdown-menu').on('click','a',function(){
        var text=$(this).html();
        console.log(text)
        $('.selecttext').html(text)
    })

    var mypage=1;
    var mypageSize=5;
    //封装页面加载数据的函数
    function getdata(){
        $.ajax({
            url:"/category/querySecondCategoryPaging",
            data:{
                page:mypage,
                pageSize:mypageSize
            },
            success:function(backdata){
                // console.log(backdata)
                $('tbody').html(template('secondTmp',backdata))
    
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:mypage,//当前页
                    totalPages:Math.ceil(backdata.total/backdata.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,page){
                      //为按钮绑定点击事件 page:当前点击的按钮值
                      mypage=page;
                      getdata();
                    }
                  });
            }
        })
    }

    getdata();

    $('.modal-add .modal-footer button').last().click(function(e){
        // console.log('888')
        e.preventDefault()
        console.log($('form').serialize())
    })
    //点击上传文件按钮，上传文件
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
        //   console.log(data);
        //   console.log(data.result.picAddr)
        $('.imgs').attr('src',data.result.picAddr);
        }
      });

      
      
   

   
  
})