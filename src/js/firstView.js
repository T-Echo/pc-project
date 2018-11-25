/**
 * Created by Administrator on 2018/11/24 0024.
 */
export default function () {
  //小圆点点击事件

  //获取dom元素
  const pointsNodes = document.querySelectorAll('.home-points li');
  const liNodes = document.querySelectorAll('.home-carousel li');
  const homeNode = document.querySelector('.home');

  //上一次下标
  let lastIndex = 0;
  //当前下标
  let nowIndex = 0;
  //上一次时间
  let lastTime = 0;

  let autoPlayTimer = null;

  //判断点击右边还是左边、点击同一个小圆点、同步索引和时间、函数节流
  for (let i = 0; i < pointsNodes.length; i++){
    pointsNodes[i].onclick = function () {

      const nowTime = Date.now();
      //函数节流
      if (nowTime - lastTime <= 2500) return;

      nowIndex = i;
      if (nowIndex === lastIndex) return;
      if (nowIndex > lastIndex){
        //点击的是右边
        liNodes[nowIndex].className = 'common-title rightShow';
        liNodes[lastIndex].className = 'common-title leftHide';
      }else{
        //点击的是左边
        liNodes[nowIndex].className = 'common-title leftShow';
        liNodes[lastIndex].className = 'common-title rightHide';
      }

      pointsNodes[lastIndex].className = '';
      pointsNodes[nowIndex].className = 'active';

      //同步索引和时间
      lastIndex = nowIndex;
      lastTime = nowTime;

    }
  }



  //自动轮播(相当于点击右边)
  function autoPlay(){
    autoPlayTimer = setInterval(() => {
      nowIndex++;
      if (nowIndex === 4) nowIndex = 0;

      liNodes[nowIndex].className = 'common-title rightShow';
      liNodes[lastIndex].className = 'common-title leftHide';

      pointsNodes[lastIndex].className = '';
      pointsNodes[nowIndex].className = 'active';

      lastIndex = nowIndex;
    },3000);
  };

  autoPlay();
  //鼠标移入移出事件
  homeNode.onmouseenter = function () {
    clearInterval(autoPlayTimer);
  };
  homeNode.onmouseleave = autoPlay;
}