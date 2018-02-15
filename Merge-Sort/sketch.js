var a = [10, 50, 2, 40, 15, 47, 23, 8, 49, 27, 13, 40, 35, 17, 30, 19];
var program = [];

//level-0 elements
var c01 = new coordinate(562,100);
var c02 = new coordinate(612,100);
var c03 = new coordinate(662,100);
var c04 = new coordinate(712,100);
var c05 = new coordinate(762,100);
var c06 = new coordinate(812,100);
var c07 = new coordinate(862,100);
var c08 = new coordinate(912,100);

//level-1 element
var c11 = new coordinate(489,230);
var c12 = new coordinate(539,230);
var c13 = new coordinate(589,230);
var c14 = new coordinate(639,230);
var c15 = new coordinate(844,230);
var c16 = new coordinate(894,230);
var c17 = new coordinate(944,230);
var c18 = new coordinate(994,230);

//level-2 elements
var c21 = new coordinate(370,360);
var c22 = new coordinate(420,360);
var c23 = new coordinate(584,360);
var c24 = new coordinate(634,360);
var c25 = new coordinate(797,360);
var c26 = new coordinate(847,360);
var c27 = new coordinate(1010,360);
var c28 = new coordinate(1060,360);

//level-3 elements
var c31 = new coordinate(284,490);
var c32 = new coordinate(411,490);
var c33 = new coordinate(538,490);
var c34 = new coordinate(666,490);
var c35 = new coordinate(793,490);
var c36 = new coordinate(921,490);
var c37 = new coordinate(1048,490);
var c38 = new coordinate(1176,490);


//element
var e1 = new element(c01,10,1);
var e2 = new element(c02,5,1);
var e3 = new element(c03,15,1);
var e4 = new element(c04,11,1);
var e5 = new element(c05,6,1);
var e6 = new element(c06,8,1);
var e7 = new element(c07,63,1);
var e8 = new element(c08,54,1);

//arrays for each level
var array0 = [e1,e2,e3,e4,e5,e6,e7,e8];
var array1 = [e1,e2,e3,e4,e5,e6,e7,e8];
var array2 = [];
var array3 = [e2];
var randomize;
var next, previous, reset;

//variable for allowing only one time animation

var ii = 1, jj = 1, n = 16;
var counter=0;

function setup () {
  createCanvas(windowWidth, windowHeight - 40);

  merge_sort(a,0,15);
  console.log(program);

}
var x=612,y=230,i=1,curInstr=0;
function draw () {
  background(51);
  frameRate(30);
  showArray(array0);
  showArray(array1);
  showArray(array2);
  showArray(array3);

// //  if(i==1){
//     staticSplit1();
// //  }else if(i==2){staticSplit2();}
// console.log(program[curInstr]);
//   if(program[curInstr].op==1){
//
//       for(var i = 0 ; i < program[curInstr].args.length;i++){
//         var c = stringToObject("c1"+(i+1))
//         animation(array1[program[curInstr].args[i]],c)
//       }
if(counter<5000)
{staticSplit1();
}
console.log("counter:",counter);
if(counter>=5000)
{staticSplit2();
}


  


  //animation(e1,c12);
  //animation(e03,e13);
//   frameRate(10);


}

function stringToObject(str){
  console.log("ff");
  if(str=="c11"){
    return c11;
  }
  if(str=="c12"){
    return c12;
  }
  if(str=="c13"){
    return c13;
  }
  if(str=="c14"){
    return c14;
  }
  if(str=="c15"){
    return c15;
  }
  if(str=="c16"){
    return c16;
  }
  if(str=="c17"){
    return c17;
  }if(str=="c18"){
    return c18;
  }
}

function staticSplit1(){
  animation(e1,c11);
  animation(e2,c12);
  animation(e3,c13);
  animation(e4,c14);
  animation(e5,c15);
  animation(e6,c16);
  animation(e7,c17);
  animation(e8,c18);
//  pause();
//  i = 2;
staticSplit2();
}

function staticSplit2(){

  animation(e1,c21);
  animation(e2,c22);
  animation(e3,c23);
  animation(e4,c24);
  animation(e5,c25);
  animation(e6,c26);
  animation(e7,c27);
  animation(e8,c28);
}


drawArray = function (ary,level){
  var y = 130 * level + 100;
  var mod = 8/Math.round(Math.pow(2,level));
  var gap = 0;
  for(var i = 0 ; i < 8 ; i++){

    if(i%mod == 0){
      if(level==0){
        gap = 100;
      }else{
        gap = 70/(level+1) + gap + (5-level) * 30;
      }
    }

    var x = windowWidth/(3+level)+50*i - 50 + gap;


    rect(x,y,40,40);
    console.log(x,y);

    textSize(15);
    text(array[i],x+15,y+25);
  }
}

function showArray(ary){
  for(var i = 0 ; i < ary.length ; i++){
    showElement(ary[i]);
  }
}

function showElement(e){
  rect(e.x,e.y,40,40);
  textSize(15);
  text(e.val,e.x+15,e.y+25);
}


function animation(e1,e2){

  //console.log(e1);
   //console.log(e2);
  //
  var del_x = e2.x - e1.x;
  var del_y = e2.y - e1.y;

  var len = Math.round(Math.pow((del_x)*(del_x)+(del_y)*(del_y),0.5));

  var cx = del_x/len;
  var cy = del_y/len;
if(e1.x!=e2.x){
  e1.x = e1.x + cx;
  e1.y = e1.y + cy;
  // var xflag,yflag;
  // if(e2.x>e1.x)
  // {
  //   xflag = 1;
  // }
  // else {
  //   xflag = -1;
  // }
  // if(e1.x<=e2.x)
  // {
  //   x = x+1;
  // }
  // if(e2.y>=e2.x)
  // {
  //   y = y-1;
  // }
  rect(e1.x,e1.y,40,40);
  textSize(15);
  text(e1.val,e1.x+15,e1.y+25);
}
counter = counter + 1;
}

function element(cor,val,col){
  this.x = cor.x;
  this.y = cor.y;
  this.val = val;
  this.col = col;
}

function coordinate(x,y){
  this.x = x;
  this.y = y;
}


function merge_sort(a,i,j){
  if(i<j){
    var mid = Math.floor((i+j)/2);
    i = new instruction(1,[i,mid]);
    program.push(i);
    merge_sort(a,i,mid);
    i = new instruction(1,[mid+1,j]);
    program.push(i);
    merge_sort(a,mid+1,j);
    merge(a,i,mid,j);
  }
}



function merge(ary,p,q,r)
{
  var i,j,k;
  var n1 = q-p+2;
  var n2 = r-q+1;
  var leftAry = [];
  var rightAry = [];
  for(i=0;i<n1;i++){
    leftAry[i] = ary[p+i];
  }
  for(j=0;j<n2;j++){
    rightAry[j] = ary[q+j+1];
  }
  //infinity = 100
  leftAry[n1-1] = 100;
  rightAry[n2-1] = 100;
  i=0;j=0;
  for(k=p;k<=r;k++){
    if(leftAry[i] <= rightAry[j])
      ary[k] = leftAry[i++];
    else {
      ary[k] = rightAry[j++];
    }
  }
}

function instruction(op,args){
  this.op = op;
  this.args = args;
}
