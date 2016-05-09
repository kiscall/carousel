class Carousel {

  constructor (opt = {}) {
    let _this = this;
    this.conf = {};
    this.init(opt);
    this.next = 1;
    this.timer = setInterval(()=>this.auto_play(), 3000);
    this.choiceA();
    this.slide();
  }

  init (opt) {
    this.car = opt.car || document.querySelector('#carousel');
    this.ul = opt.ul || this.car.querySelector('#carousel > ul');
    this.img = this.ul.querySelectorAll('img');
    this.choice = this.car.querySelector('.choice');
    this.conf.width = parseInt(this.getAttr(this.img[0],'width'));
    this.ul.style.width = parseInt(this.getAttr(this.img[0],'width')) * this.img.length + 'px';
  }

  getAttr (tar, attr) {
    return tar.currentStyle ? tar.currentStyle[attr] : getComputedStyle(tar, null)[attr];
  }

  auto_play() {
    let btn = this.choice.querySelectorAll('span');
    for (let b of btn) {
      b.setAttribute('class', '');
    }
    if (this.next === 4) {
      this.move(0);
      this.next = 1;
    } else {
      this.move(-this.next * this.conf.width);
      this.next++;
    }
    btn[this.next-1].setAttribute('class', 'select');
  }

  choiceA () {
    this.choice.addEventListener('click', ev => {
      var tarName = ev.target.nodeName;
      if (tarName === 'SPAN') {
        clearInterval(this.timer);
        this.next = ev.target.getAttribute('data-next');
        this.auto_play(this);
        this.timer = setInterval(()=>this.auto_play(), 3000);
      }
    }, false);
  }

  move (dis) {
    //-webkit-transform: translateX(-800px);
    this.ul.style['-webkit-transform'] = 'translateX('+dis+'px)';
  }

  slide () {
    document.querySelector('.left').addEventListener('click', () => {
      clearInterval(this.timer);
      this.auto_play(this);
      this.timer = setInterval(()=>this.auto_play(), 3000);
    }, false);
    document.querySelector('.right').addEventListener('click', () => {
      if (this.next === 1) {
        return;
      }
      clearInterval(this.timer);
      this.next -= 2;
      this.auto_play();
      this.timer = setInterval(()=>this.auto_play(), 3000);
    }, false);
  }

}

new Carousel();
























