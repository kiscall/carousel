// 创建对象
function Carousel(opt){
	opt = opt ? opt : {};
  var _this = this;
  this.conf = {};
  this.init(opt);
  this.next = 1;
  this.timer = setInterval(function(){_this.auto_play(_this)}, 3000);
  this.choiceA();
  this.slide();
}
// 初始化
Carousel.prototype.init = function(opt){
  this.car = opt.car || document.querySelector('#carousel');
  this.ul = opt.ul || this.car.querySelector('#carousel > ul');
  this.img = this.ul.querySelectorAll('img');
  this.choice = this.car.querySelector('.choice');
  this.conf.width = parseInt(this.getAttr(this.img[0],'width'));
  this.ul.style.width = parseInt(this.getAttr(this.img[0],'width')) * this.img.length + 'px';
};
// 获得属性的方法
Carousel.prototype.getAttr = function(tar, attr) {
  return tar.currentStyle ? tar.currentStyle[attr] : getComputedStyle(tar, null)[attr];
};
// 滑动函数
Carousel.prototype.auto_play = function(_this) {
  var btn = this.choice.querySelectorAll('span');
  (function(){
  	for (var i = 0; i<btn.length; i++) {
  		btn[i].setAttribute('class', '');
  	}
	})();
  if (_this.next === 4) {
    _this.move(0);
    _this.next = 1;
  } else {
    _this.move(-_this.next * _this.conf.width);
    _this.next++;
  }
  btn[_this.next-1].setAttribute('class', 'select');
};
// 点选
Carousel.prototype.choiceA = function(){
  var _this = this;
  this.choice.addEventListener('click', function(ev){
    var tarName = ev.target.nodeName;
    if (tarName === 'SPAN') {
      clearInterval(_this.timer);
      _this.next = ev.target.getAttribute('data-next');
      _this.auto_play(_this);
      _this.timer = setInterval(function(){_this.auto_play(_this)}, 5000);
    }
  }, false);
};
// 改变属性
Carousel.prototype.move = function(dis){
  //-webkit-transform: translateX(-800px);
  this.ul.style['-webkit-transform'] = 'translateX('+dis+'px)';
};

// 左右滑动按钮事件绑定
Carousel.prototype.slide = function(){
  var _this = this;
  document.querySelector('.left').addEventListener('click', function(){
    clearInterval(_this.timer);
    _this.auto_play(_this);
    _this.timer = setInterval(function(){_this.auto_play(_this)}, 3000);
  }, false);
  document.querySelector('.right').addEventListener('click', function(){
    if (_this.next === 1) {
      return;
    }
    clearInterval(_this.timer);
    _this.next -= 2;
    _this.auto_play(_this);
    _this.timer = setInterval(function(){_this.auto_play(_this)}, 3000);
  }, false);
};

new Carousel();






















