/**
 * Created by Administrator on 2018/11/23 0023.
 */
export default function (){

  //获取元素
  const navLiNodes = document.querySelectorAll('.nav li');
  const arrowNode = document.querySelector('.arrow');
  const ulNode = document.querySelector('#content>ul');
  const content = document.querySelector('#content');
  const contentNavLiNodes = document.querySelectorAll('.content-nav li');
  const musicNode = document.querySelector('.music');
  const audioNode = document.querySelector('audio');

  const homecarouselNode = document.querySelector('.home-carousel');
  const plane1Node = document.querySelector('.course-plane1');
  const plane2Node = document.querySelector('.course-plane2');
  const plane3Node = document.querySelector('.course-plane3');
  const pencil1Node = document.querySelector('.works-pencil1');
  const pencil2Node = document.querySelector('.works-pencil2');
  const pencil3Node = document.querySelector('.works-pencil3');
  const aboutUpNode = document.querySelector('.about-up');
  const aboutDownNode = document.querySelector('.about-down');
  const teamTitleNode = document.querySelector('.team-title');
  const teamTextNode = document.querySelector('.team-text');


  //缓存内容区content的高
  let contentHeight = content.offsetHeight;
  //缓存小箭头一半的宽度
  const arrowHalfWidth = arrowNode.offsetWidth / 2;

  //li的下标
  let nowIndex = 0;
  let lastIndex = 0;

  //出入场动画，定义成数组
  const animationArr = [
    {
      anIn () {
        homecarouselNode.style.transform = 'translateY(0)';
        homecarouselNode.style.opacity = 1;
      },
      anOut () {
        homecarouselNode.style.transform = 'translateY(-50%)';
        homecarouselNode.style.opacity = 0.2;
      }
    },
    {
      anIn () {
        plane1Node.style.transform = 'translateY(0)';
        plane2Node.style.transform = 'translateY(0)';
        plane3Node.style.transform = 'translateY(0)';
      },
      anOut () {
        plane1Node.style.transform = 'translate(-100px,-100px)';
        plane2Node.style.transform = 'translate(-100px,100px)';
        plane3Node.style.transform = 'translate(100px,-100px)';
      }
    },
    {
      anIn () {
        pencil1Node.style.transform = 'translateY(0)';
        pencil2Node.style.transform = 'translateY(0)';
        pencil3Node.style.transform = 'translateY(0)';
      },
      anOut () {
        pencil1Node.style.transform = 'translateY(-100px)';
        pencil2Node.style.transform = 'translateY(100px)';
        pencil3Node.style.transform = 'translateY(100px)';
      }
    },
    {
      anIn () {
        aboutUpNode.style.transform = 'rotate(0)';
        aboutDownNode.style.transform = 'rotate(0)';
      },
      anOut () {
        aboutUpNode.style.transform = 'rotate(45deg)';
        aboutDownNode.style.transform = 'rotate(-45deg)';
      }
    },
    {
      anIn () {
        teamTitleNode.style.transform = 'translateX(0)';
        teamTextNode.style.transform = 'translateX(0)';
      },
      anOut () {
        teamTitleNode.style.transform = 'translateX(-100px)';
        teamTextNode.style.transform = 'translateX(100px)';
      }
    },
  ];

  //一开始就让所有屏做出场动画
  for (let i = 0; i < animationArr.length; i++){
    animationArr[i].anOut();
  }
  //默认第一屏做入场动画
  setTimeout(() => {
    animationArr[0].anIn();
  },2000);

  /*//测
  animationArr[4].anOut();
  setTimeout(() => {
    animationArr[4].anIn();
  },2000);*/

  //鼠标滚轮事件
  //  IE、Chrome
  document.onmousewheel = wheel;
  //firefox
  document.addEventListener && document.addEventListener('DOMMouseScroll' , wheel);

  let wheelTimer = null;

  //封装鼠标滚轮事件wheel（event的兼容、函数防抖、禁止浏览器默认行为）
  function wheel (event){
    //event的兼容问题
    event = event || window.event;

    //函数防抖问题（执行最后一次事件，定时器）
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => {
      let flag = '';
      if (event.wheelDelta){
        //IE、Chrome
        if (event.wheelDelta > 0){
          flag = 'up';
        }else{
          flag = 'down';
        }
      }else if (event.detail){
        //firefox，滚轮往上滚时值为负
        if (event.detail > 0){
          //flag是代表滚轮的滚动方向，鼠标往下滚>0，页面往上走，内容区的ul里的li索引值增大
          flag = 'down';
        }else{
          flag = 'up';//鼠标往上滚<0，页面往下走，内容区的ul里的li索引值减小
        }
      };

      //根据flag的值确定nowIndex的值， 内容区ul、小箭头的移动、头部导航字体颜色的改变
      switch (flag){
        case 'up'://滚轮往上滚，页面往下走，li索引值减小
          if (nowIndex > 0){
            nowIndex--;
            //调用封装的移动函数
            move(nowIndex);
          }
          break;
        case 'down'://滚轮往下滚，页面往上走，li索引值增大
          if (nowIndex < 4){
            nowIndex++;
            move(nowIndex);
          }
          break;
      }
    },300);

    //禁止浏览器默认行为
    event.preventDefault && event.preventDefault();//dom2
    return false;//dom0

  };

  //封装移动事件：内容区ul的top值改变、小箭头的移动、头部导航字体颜色的改变、出入场动画
  function move(nowIndex){
    //将所有头部导航li的class清空(通过缓存上一次的索引值，可以避免for循环)
    navLiNodes[lastIndex].className = '';
    contentNavLiNodes[lastIndex].className = '';

    //给当前点击的元素添加className
    navLiNodes[nowIndex].className = 'active';
    contentNavLiNodes[nowIndex].className = 'active';
    //小箭头移动
    arrowNode.style.left = navLiNodes[nowIndex].getBoundingClientRect().left + navLiNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
    //内容区ul移动（因为ul的top值不可能为正，必须加上负号）
    ulNode.style.top = - nowIndex * contentHeight + 'px';

    //让上一屏做出场动画
    animationArr[lastIndex].anOut();
    //让当前屏做入场动画
    animationArr[nowIndex].anIn();
    //同步索引值
    lastIndex = nowIndex;
  }

  //遍历绑定事件监听(头部导航点击事件、侧边导航小圆点点击事件)
  for (let i = 0;i < navLiNodes.length; i++){
    navLiNodes[i].onclick = function(){
      //同步nowIndex的值
      nowIndex = i;
      move(nowIndex);
    };
    contentNavLiNodes[i].onclick = function(){
      //同步nowIndex的值
      nowIndex = i;
      move(nowIndex);
    };
  }


  //点击音乐播放
  musicNode.onclick = function () {
    if (audioNode.paused){
      //播放
      audioNode.play();
      //改变音乐播放图片
      musicNode.style.backgroundImage = 'url("data:img/jpg;base64,R0lGODlhDgAOAIABAAB8Z////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI4M0ZGM0UzNEU5NjExRTg5Nzc2QzhCNDhDNTcxM0VBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI4M0ZGM0U0NEU5NjExRTg5Nzc2QzhCNDhDNTcxM0VBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjgzRkYzRTE0RTk2MTFFODk3NzZDOEI0OEM1NzEzRUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjgzRkYzRTI0RTk2MTFFODk3NzZDOEI0OEM1NzEzRUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJKAABACwAAAAADgAOAAACHoyPqasAjBw8ksm67rMPB6x9nTOKJlmG6JmSLKu2BQAh +QQJKAABACwAAAAADgAOAAACHoyPqcvtCMCKhyobKM7S6O6BHyRKY3Saaspx7PeqBQAh+QQFKAABACwAAAAADgAOAAACHYyPqcvtDxUAcC5rcKZaBwtO3PiNYYmK5KmmK1AAADs=")';
    }else{
      //暂停
      audioNode.pause();
      //改变音乐播放图片
      musicNode.style.backgroundImage = 'url("data:img/jpg;base64,R0lGODlhDgAOAJEAAAAAAP///wB8Z////yH5BAEAAAMALAAAAAAOAA4AAAIenI+pqyKMHDySybrusw8PrH2dM4omWYbomZIsq7YFADs=")';
    }
  }

  //初始化让小箭头来到第一个li下面
  arrowNode.style.left = navLiNodes[0].getBoundingClientRect().left + navLiNodes[0].offsetWidth / 2 - arrowHalfWidth + 'px';
  //一开始就调用一下move，让小箭头移动到第二屏的位置
  //move(4);
  //绑定窗口缩放事件：修改小箭头位置、内容区ul位置
  window.onresize = function (){
    //修改小箭头的位置(窗口发生变化后，是由于li的left值改变造成的小箭头位置出错，这里重新获取对应li的left值，再求小箭头的位置)
    arrowNode.style.left = navLiNodes[nowIndex].getBoundingClientRect().left + navLiNodes[nowIndex].offsetWidth /2 - arrowHalfWidth + 'px';
    //修改内容区ul的位置（内容区可视区域的高改变造成的ul位置错，重新获取内容区的高，再求ul的位置）
    contentHeight = content.offsetHeight;
    ulNode.style.top = - nowIndex * contentHeight + 'px';

  }



}