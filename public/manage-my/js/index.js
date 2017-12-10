$(function () {
    //刚开始的时候要判断用户是否登录，调用登录的接口
    $.ajax({
        url: "/employee/checkRootLogin",
        success: function (backdata) {
            console.log(backdata);
            if (backdata.error == 400) {
                window.location.href = "login.html"
            }
        }
    })
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main-left'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数']
        },
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [1000, 2000, 3600, 1400, 1300, 2200]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


    var myChartright = echarts.init(document.getElementById('main-right'));
    option2 = {
        title: {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '阿迪', '百伦', '安踏', '李宁']
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{
                    value: 335,
                    name: '耐克'
                },
                {
                    value: 310,
                    name: '阿迪'
                },
                {
                    value: 234,
                    name: '百伦'
                },
                {
                    value: 135,
                    name: '安踏'
                },
                {
                    value: 1548,
                    name: '李宁'
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChartright.setOption(option2);



    $('#right .header a').first().click(function () {
        $('#left').toggle();
        $('#right').toggleClass('pad')
    })
    $('#right .header a').last().click(function () {
        $('#myModal').modal('show')
    })

    //点击确定退出的时候跳转到登录页,点击退出的时候要调用退出的接口，否则下次输入首页地址会直接登录进来
    $('.modal-footer button').last().click(function () {
        
        $.ajax({
            url: "/employee/employeeLogout",
            success: function (backdata) {
                // console.log(backdata)
                window.location.href = "./login.html"
            }
        })
    })

})