$(function(){
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
                console.log(backdata)
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
   

   
  
})