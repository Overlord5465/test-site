let cnv, scr;

const MyButton = {
  x: 0,
  y: 0,
  width: 100,
  height: 50,
  url: "#",
  caption: "name",
  mx: 0,
  my: 0,
  lbm: false,
  rbm: false,
  cbm: false,
  mOver: false,
  create: function (x, y, width, height, caption, url) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.url = url;
    this.caption = caption;
    setInterval(function (obj) { obj.mouseCheck(); }, 10, this);
    this.draw('white', 'green');
  },

  draw: function (col1, col2) {
    let myGradient = scr.createLinearGradient(0, this.y, 0, this.y + this.height);

    myGradient.addColorStop(0, col1);
    myGradient.addColorStop(1, col2);
    scr.fillStyle = myGradient;
    scr.fillRect(this.x, this.y, this.width, this.height);

    scr.fillStyle = 'white';
    scr.textBaseline = 'top';
    scr.font = 'bold 30px sans-serif';
    scr.fillText(this.caption, this.x + 10, this.y + 10);
  },
  mouseCheck: function () {
    if (this.mx > this.x && this.mx < this.x + this.width &&
      this.my > this.y && this.my < this.y + this.height) {
      this.draw('white', 'blue');
      MyButton.mOver = true;
      if (cnv.style.cursor != 'pointer') {
        cnv.style.cursor = 'pointer'
      }
      if (this.lbm) {
        this.draw('white', 'black');
        // window.location = this.url; 
      }
      if (this.rbm) { this.draw('green', 'white'); }
      if (this.cbm) { this.draw('black', 'black'); }
    } else {
      this.draw('white', 'green');
    }
  }
}

function mousePos(e) {
  if (e.pageX != undefined && e.pageY != undefined) {
    x = e.pageX;
    y = e.pageY;
  }
  else {
    x = e.clientX + document.body.scrollLeft +
      document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop +
      document.documentElement.scrollTop;
  }
  x -= cnv.offsetLeft;
  y -= cnv.offsetTop;
  MyButton.mx = x;
  MyButton.my = y;
  if (MyButton.mOver) {
    MyButton.mOver = false;
  } else {
    cnv.style.cursor = 'default';
  }
}

function mouseButtonClick(e) {
  switch (e.button) {
    case 0:
      MyButton.lbm = true;
      setTimeout(draw, 300);
      break;
    case 1:
      MyButton.cbm = true;
      break;
    case 2:
      MyButton.rbm = true;
      break;
  }
}
function mouseButtonUp() {
  MyButton.lbm = false;
  MyButton.rbm = false;
  MyButton.cbm = false;
}

function initMain(canvas) {
  cnv = canvas;
  scr = cnv.getContext('2d');

  scr.fillStyle = '#00';
  scr.fillRect(0, 0, cnv.width, cnv.height);

  cnv.addEventListener("mousemove", mousePos);
  cnv.addEventListener("mousedown", mouseButtonClick);
  cnv.addEventListener("mouseup", mouseButtonUp);

  let butt1 = { __proto__: MyButton };
  butt1.create(canvas.width / 2 - 50, canvas.height - 350, 100, 50, 'Start');

  let butt2 = { __proto__: MyButton };
  butt2.create(canvas.width / 2 - 70, canvas.height - 250, 140, 50, 'Setting');

  let butt3 = { __proto__: MyButton };
  butt3.create(canvas.width / 2 - 40, canvas.height - 150, 80, 50, 'Exit');
}

initMain(document.querySelector("canvas"));