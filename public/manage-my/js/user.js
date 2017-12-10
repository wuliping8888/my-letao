$(function(){
    var mypage=1;
    var mypageSize=5;
    
    function getdata(){
        $.ajax({
            url:"/user/queryUser",
            data:({
                page:mypage,
                pageSize:mypageSize
            }),
            success:function(backdata){
                // console.log(backdata)
                $('tbody').html(template('userTmp',backdata))
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: mypage, //当前页
                    totalPages: Math.ceil(backdata.total/backdata.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                       mypage=page;
                       getdata();
                    }
                });
            }
        })
    }

    getdata()

    //给禁用启用按钮添加点击事件，当点击的时候禁用变成启用，启用变成禁用。要调用接口数据
    $('tbody').on('click','a',function(){
        var id=$(this).parent().attr('data-id')
        var isdelete;

        if($(this).html()=="禁用"){
            isdelete=0;
        }else if($(this).html()=="启用"){
            isdelete=1;
        }
        $.ajax({
            url:"/user/updateUser",
            type:'post',
            data:{
                id:id,
                isDelete:isdelete
            },
            success:function(backdata){
                // console.log(backdata)
                getdata()
            }
        })
    })
  
   
})