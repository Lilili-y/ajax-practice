$(function () {
    //补0函数
    function addZero(data) {
        return data >= 10 ? data : '0' + data;
    }
    //时间过滤器
    template.defaults.imports.getTimes = function (data) {
        let times = new Date(data);
        let years = addZero(times.getFullYear());
        let months = addZero(times.getMonth() + 1);
        let days = addZero(times.getDate());
        let hours = addZero(times.getHours());
        let minutes = addZero(times.getMinutes());
        let seconds = addZero(times.getSeconds());
        return years + '-' + months + '-' + days + '&nbsp;&nbsp;&nbsp;' + hours + ':' + minutes + ':' + seconds
    }

    //获取新闻列表
    function getNews() {
        $.get('http://www.liulongbin.top:3006/api/news', function (res) {
            if (res.status !== 200) {
                alert('刷新失败');
            }
            console.log(res);
            $.each(res.data, function (i, item) {
                item.tags = item.tags.split(',');
            })
            console.log(res);

            let list = template('tpl', res);
            $('#news-list').html(list);
        })
    }
    getNews();
})