var items = document.getElementsByClassName("item");
var points = document.getElementsByClassName("circle");
var left = document.getElementById("btn-left");
var right = document.getElementById("btn-right");
var all = document.querySelector('.content');
var index = 0;
var time = 0; //定时器跳转参数初始化

console.log("test")

//封装一个清除active方法
var clearActive = function () {
    for (i = 0; i < items.length; i++) {
        items[i].className = 'item';
        console.log(i)
    }
    for (j = 0; j < points.length; j++) {
        points[j].className = 'circle';
    }
}

//改变active方法
var goIndex = function () {
    clearActive();
    items[index].className = 'item active';
    points[index].className = 'circle active'
}
//左按钮事件
var goLeft = function () {
    if (index == 0) {
        index = 4;
    } else {
        index--;
    }
    goIndex();
}

//右按钮事件
var goRight = function () {
    if (index < 4) {
        index++;
    } else {
        index = 0;
    }
    goIndex();
}


//绑定点击事件监听
left.addEventListener('click', function () {
    goLeft();
    time = 0; //计时器跳转清零
})

right.addEventListener('click', function () {
    goRight();
    time = 0; //计时器跳转清零
})

for (i = 0; i < points.length; i++) {
    points[i].addEventListener('click', function () {
        var pointIndex = this.getAttribute('num')
        index = pointIndex;
        goIndex();
        time = 0; //计时器跳转清零
    })
}
//计时器轮播效果
var timer;

function play() {
    timer = setInterval(() => {
        time++;
        if (time == 20) {
            goRight();
            time = 0;
        }
    }, 100)
}
play();
//移入清除计时器
all.onmousemove = function () {
    clearInterval(timer)
}
//移出启动计时器
all.onmouseleave = function () {
    play();
}