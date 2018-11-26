/**
 * Created by Administrator on 2018/11/26 0026.
 */
/*第五屏*/
export default function(){
  /*获取元素*/
  const ulNode = document.querySelector('.team-list');
  const liNodes = document.querySelectorAll('.team-list li');

  const width = liNodes[0].offsetWidth;
  const height = liNodes[0].offsetHeight;

  //初始化画布
  let canvas = null;
  let createCircleTimer = null;
  let bubbleTime = null;


  //鼠标移入改变li的透明度、创建画布
  for (let i = 0; i < liNodes.length; i++){
    liNodes[i].onmouseenter = function () {
      for (var j = 0; j < liNodes.length; j++){
        liNodes[j].style.opacity = 0.5;
      }
      this.style.opacity = 1;

      //创建canvas
      addCanvas(i);
    }
  };
  //鼠标移出ul：改变li透明度、清除画布、清除定时器
  ulNode.onmouseleave = function () {
    for (let i = 0; i < liNodes.length; i++){
      liNodes[i].style.opacity = 1;
    }
    //清除画布
    canvas.remove();
    canvas = null;
    //清除定时器
    clearInterval(createCircleTimer);
    clearInterval(bubbleTime);
  }

  //添加canvas(封装),
  //如果没有canvas，就创建canvas添加到ul中，通过改变位置
  //canvas中画圆、气泡运动
  function addCanvas (index){
    //如果没有canvas
    if(!canvas){
      //创建canvas
      canvas = document.createElement('canvas');
      //指定宽高
      canvas.width = width;
      canvas.height = height;

      //指定位置
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = index * width + 'px';
      //画圆、气泡
      bubble();

      //生效
      ulNode.appendChild(canvas);
    }else{
      //第二次开始只需要改变canvas的位置
      canvas.style.left = index * width + 'px';
    };
  }

  //气泡运动(封装)：生成随机圆参数、画圆（弧度递增改变圆心位置、设置颜色、画圆）
  function bubble(){
    let circleArr = [];

    //生成随机圆（圆的参数）
    createCircleTimer = setInterval(() => {
      //颜色随机
      const r = Math.round(Math.random() * 255);
      const g = Math.round(Math.random() * 255);
      const b = Math.round(Math.random() * 255);
      //半径随机
      const circle_r = Math.round(Math.random() * 8 + 2);
      //位置随机(y轴的位置是固定的，x轴要改变)
      const x = Math.round(Math.random() * width);
      const y = height + circle_r;
      //初始弧度
      const rad = 0;
      //缩放系数
      const s = Math.round(Math.random() * 50 + 20);

      //添加到数组
      circleArr.push({
        r,
        g,
        b,
        circle_r,
        x,
        y,
        rad,
        s
      })
    },40);

    //画圆
    bubbleTime = setInterval(() => {
      if (canvas.getContext){
        //获取画笔
        const painting = canvas.getContext('2d');
        //清除上一次画布
        painting.clearRect(0,0,width,height);

        //开始画圆
        circleArr.forEach(item => {
          //每次弧度递增（随机圆往上运动）
          item.rad += 0.1;
          //改变圆心的位置（item.s决定摆动幅度）
          const x = Math.round(item.x + Math.sin(item.rad) * item.s);
          const y = Math.round(item.y - item.rad * item.s);
          //设置颜色
          painting.fillStyle = `rgb(${item.r},${item.g},${item.b})`;

          painting.beginPath();
          //画圆
          painting.arc(x, y, item.circle_r, 0, 2 * Math.PI);
          painting.fill();
        })
      }
    },1000/60);
  }

}