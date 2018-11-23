/**
 * Created by Administrator on 2018/11/23 0023.
 */
export default function (){

  //获取元素
  const navLiNodes = document.querySelectorAll('.nav li');
  const arrowNode = document.querySelector('.arrow');
  const ulNode = document.querySelector('#content ul');
  const content = document.querySelector('#content');

  //缓存内容区content的高
  let contentHeight = content.offsetHeight;
  //缓存小箭头一半的宽度
  const arrowHalfWidth = arrowNode.offsetWidth / 2;

  //li的下标
  let nowIndex = 0;

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

  //封装移动事件：内容区ul、小箭头的移动、头部导航字体颜色的改变
  function move(nowIndex){
    //将所有头部导航li的class清空
    for (let i = 0; i < navLiNodes.length; i++){
      navLiNodes[i].className = '';
    }
    //给当前点击的元素添加className
    navLiNodes[nowIndex].className = 'active';
    //小箭头移动
    arrowNode.style.left = navLiNodes[nowIndex].getBoundingClientRect().left + navLiNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
    //内容区ul移动（因为ul的top值不可能为正，必须加上负号）
    ulNode.style.top = - nowIndex * contentHeight + 'px';
  }

  //遍历绑定事件监听
  for (let i = 0;i < navLiNodes.length; i++){
    navLiNodes[i].onclick = function(){
      //同步nowIndex的值
      nowIndex = i;
      move(nowIndex);
    };
  }

  //初始化让小箭头来到第一个li下面
  arrowNode.style.left = navLiNodes[0].getBoundingClientRect().left + navLiNodes[0].offsetWidth / 2 - arrowHalfWidth + 'px';

  //绑定窗口缩放事件：修改小箭头位置、内容区ul位置
  window.onresize = function (){
    //修改小箭头的位置(窗口发生变化后，是由于li的left值改变造成的小箭头位置出错，这里重新获取对应li的left值，再求小箭头的位置)
    arrowNode.style.left = navLiNodes[nowIndex].getBoundingClientRect().left + navLiNodes[nowIndex].offsetWidth /2 - arrowHalfWidth + 'px';
    //修改内容区ul的位置（内容区可视区域的高改变造成的ul位置错，重新获取内容区的高，再求ul的位置）
    contentHeight = content.offsetHeight;
    ulNode.style.top = - nowIndex * contentHeight + 'px';

  }

}