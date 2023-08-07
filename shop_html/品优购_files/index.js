// 外联的js需要加load事件
window.addEventListener('load', function () {
    // 1. 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    var isLogin = document.querySelector('.isLogin');
    // 登录后显示用户名
    if (localStorage.userName) {
        isLogin.innerHTML = localStorage.userName;
        isLogin.style.color = 'red';
        isLogin.style.fontWeight = 'bolder';
        isLogin.style.fontSize = '16px';
    }
    // 2. 鼠标经过focus 就显示隐藏左右按钮  停止播放
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清除定时器变量
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () { //开启定时器
            //手动调用点击事件
            arrow_r.click();
        }, 2000);
    });

    // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {

        var li = document.createElement('li'); // 创建一个小li 

        li.setAttribute('index', i); // 记录当前小圆圈的索引号 通过自定义属性来做 

        ol.appendChild(li); // 把小li插入到ol 里面

        // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            // 干掉所有人 把所有的小li 清除 current 类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下我自己  当前的小li 设置current 类名
            this.className = 'circle-current';

            // 5. 点击小圆圈，移动图片 当然移动的是 ul 

            var index = this.getAttribute('index'); // 当我们点击了某个小li 就拿到当前小li 的索引号

            num = index; // 当我们点击了某个小li 就要把这个li 的索引号给 num  
            circle = index; // 当我们点击了某个小li 就要把这个li 的索引号给 circle 
            //或 num = circle = index;
            console.log(focusWidth);
            console.log(index);

            animate(ul, -index * focusWidth); // 动画 注意是ul动不是li动
        })
    }

    ol.children[0].className = 'circle-current'; // 把ol里面的第一个小li设置类名为 current
    // 6. 克隆第一张图片(li)放到ul 最后面
    var first = ul.children[0].cloneNode(true); //克隆在添加小圆圈后面，所以不会多一个小圆圈
    ul.appendChild(first);
    // 7. 点击右侧按钮， 图片滚动一张
    var num = 0;
    // circle 控制小圆圈的播放
    var circle = 0;
    //   flag节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false; // 关闭节流阀
            // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true; // 打开节流阀
            });
            // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 调用函数
            circleChange();
        }
    });

    // 9. 左侧按钮做法
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle--;
            circle = circle < 0 ? ol.children.length - 1 : circle;
            // 调用函数
            circleChange();
        }
    });
    // 小圈圈函数
    function circleChange() {
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className = 'circle-current';
    }
    // 10. 自动播放轮播图  实际就类似于点击了右侧按钮
    var timer = setInterval(function () {
        //手动调用右侧按钮点击事件
        arrow_r.click();
    }, 2000);

})
// 电梯导航栏jq
$(function () {
    var flag = true;
    var toolTop = $('.recommend').offset().top;
    toolToggle()
    // 1.显示隐藏电梯导航
    function toolToggle() {
        if ($(document).scrollTop() >= toolTop) {
            $('.fixedtool').fadeIn();
        } else {
            $('.fixedtool').fadeOut();

        }
    }
    $(window).scroll(function () {
        toolToggle();
        if (flag) {
            // 3. 页面滚动到某个内容区域，左侧电梯导航小li相应添加和删除current类名
            $('.floor .w').each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass();
                }
            })
        }
    })
    // 2. 点击电梯导航页面可以滚动到相应内容区域
    $(".fixedtool li").click(function () {
        flag = false;
        var current = $(".floor .w").eq($(this).index()).offset().top;
        // 页面动画滚动效果
        $("body, html").stop().animate({
            scrollTop: current
        }, function () {
            flag = true;
        });
        $(this).addClass("current").siblings().removeClass();
    })

})