var inputBox;
var button;
var simulate = {
  step : 0,
  pc : 1,
  i : -1,
  j : -1
};
var ary = [15,10,6,9];
var x = 2;
function setup(){
  createCanvas(windowWidth,windowHeight-(windowHeight/4));
  background(220);
  createP('');
  //inputBox = createInput();
  button = createButton('Simulate Next Step');
  button.mousePressed(sim);

}


function draw(){
  code(50,100,simulate.pc);
  var c = color('#696969');
  fill(c);
  textSize(50);
  text('Bubble Sort',50%windowWidth,50%windowHeight);
  fill(c);
  showVariable();
  showArray(simulate.j,simulate.j+1);

}

function code(x,y,pc){
  fill(255);
  rect(x,y,400,200,10);
  textSize(20);

  c = color('#000000')
  fill(c);
  if(pc == 1){
    c = color('#FA0C04')
    fill(c);
    text('for(int i = 0 ; i < ary.length ; i++)',x+10,y+20);
  }else{
    c = color('#000000');
    fill(c);
    text('for(int i = 0 ; i < ary.length ; i++)',x+10,y+20);
  }

  if (pc == 2) {
    c = color('#FA0C04')
    fill(c);
      text('  for(int j = 0 ; j < ary.length ; j++)',x+10,y+60);
  }else{
    c = color('#000000')
    fill(c);
      text('  for(int j = 0 ; j < ary.length ; j++)',x+10,y+60);
  }

  if(pc == 3){
    c = color('#FA0C04')
    fill(c);
    text('    if(ary[j] > ary[j+1])',x+10,y+100);
  }else{
    c = color('#000000')
    fill(c);
    text('    if(ary[j] > ary[j+1])',x+10,y+100);
  }

  if(pc == 4){
    c = color('#FA0C04')
    fill(c);
    text('      swap(ary[j],ary[j+1])',x+10,y+140);
  }else{
    c = color('#000000')
    fill(c);
    text('      swap(ary[j],ary[j+1])',x+10,y+140);
  }

}

function showVariable(){
  var c = color('#696969');
  textSize(30);
  fill(c);
  text('i : ',50,350)
  fill(255);
  rect(80,320,40,40,5);
  fill(c);
  text(simulate.i,90,352);

  text('j : ',50,400)
  fill(255);
  rect(80,370,40,40,5);
  fill(c);
  text(simulate.j,90,402);

  text('pc : ',50,450);
  fill(255);
  rect(100,420,40,40,5);
  fill(c);
  text(simulate.pc,110,452);

  text('ary.length : ',50,500);
  fill(255);
  rect(200,470,40,40,5);
  fill(c);
  text(ary.length,210,502);
}

function showArray(i,j){
  var x = windowWidth/2;
  var y = (windowHeight-(windowHeight/4))/2;
  line(x,y,x + 500,y);

  if(i == 0 || j == 0){

    c = color(220);
    fill(c);
    noStroke();
    rect(x+20,y,80,-300);
    c = color('#FA0C04')
    fill(c);
    rect(x+20,y,80,ary[0]*-10);
    rect(x+20,y+50,80,50,10);
    fill(255);
    text(ary[0],x+50,y+80);
  }else{
    c = color(220);
    fill(c);
    noStroke();
    rect(x+20,y,80,-300);
    c = color('#000000')
    fill(c);
    rect(x+20,y,80,ary[0]*-10);
    rect(x+20,y+50,80,50,10);
    fill(255);
    text(ary[0],x+50,y+80);
  }

  if(i == 1 || j == 1){
    c = color(220);
    fill(c);
    noStroke();
    rect(x+120,y,80,-300);
    c = color('#FA0C04')
    fill(c);
    rect(x+120,y,80,ary[1]*-10);
    rect(x+120,y+50,80,50,10);
    fill(255);
    text(ary[1],x+150,y+80);
  }else{
    c = color(220);
    fill(c);
    noStroke();
    rect(x+120,y,80,-300);
    c = color('#000000')
    fill(c);
    rect(x+120,y,80,ary[1]*-10);
    rect(x+120,y+50,80,50,10);
    fill(255);
    text(ary[1],x+150,y+80);
  }

  if(i == 2 || j == 2){
    c = color(220);
    fill(c);
    noStroke();
    rect(x+220,y,80,-300);
    c = color('#FA0C04')
    fill(c);
    rect(x+220,y,80,ary[2]*-10);
    rect(x+220,y+50,80,50,10);
    fill(255);
    text(ary[2],x+250,y+80);
  }else{
    c = color(220);
    fill(c);
    noStroke();
    rect(x+220,y,80,-300);
    c = color('#000000')
    fill(c);
    rect(x+220,y,80,ary[2]*-10);
    rect(x+220,y+50,80,50,10);
    fill(255);
    text(ary[2],x+250,y+80);
  }

  if(i == 3 || j == 3){
    c = color(220);
    fill(c);
    noStroke();
    rect(x+320,y,80,-300);
    c = color('#FA0C04')
    fill(c);
    rect(x+320,y,80,ary[3]*-10);
    rect(x+320,y+50,80,50,10);
    fill(255);
    text(ary[3],x+350,y+80);
  }else{
    c = color(220);
    fill(c);
    noStroke();
    rect(x+320,y,80,-300);
    c = color('#000000')
    fill(c);
    rect(x+320,y,80,ary[3]*-10);
    rect(x+320,y+50,80,50,10);
    fill(255);
    text(ary[3],x+350,y+80);
  }

}

function sim(){
  code(50,100,simulate.pc);
  if(simulate.pc == 1){
    if(step1(simulate.i,ary.length)){
      simulate.i++;
      simulate.pc = simulate.pc%4 + 1;
      simulate.j = -1;
    }else{
      simulate.pc = -1;
      fill('red');
      text('Simulation Halted!!', 500,100);
    }

  }else if(simulate.pc == 2){
    if(step2(simulate.j,ary.length)){
        simulate.j++;
          simulate.pc = simulate.pc % 4 + 1;
    }else{
      simulate.pc = 1;
    }
  }else if(simulate.pc == 3){
    if(step3(ary[simulate.j],ary[simulate.j+1])){
      simulate.pc = simulate.pc % 4 + 1;
    }else{

      if(step2(simulate.j,ary.length)){
        simulate.pc = 2;
      }else{
        simulate.pc = 1;
      }
    }
  }else if(simulate.pc == 4){
    var t = ary[simulate.j];
    ary[simulate.j] = ary[simulate.j+1];
    ary[simulate.j+1] = t;

    if(step2(simulate.j,ary.length)){
      simulate.pc = 2;
    }else{
      simulate.pc = 1;
    }
  }else if(simulate.pc == -1);



}

function step1(i,len){
  i++;
  if(i<len){
    return true;
  }else{
    return false;
  }
}

function step2 (j,len){
  j++;
  if(j<len){
    return true;
  }else{
    return false;
  }
}

function step3(a,b){
  if(a>b){
    return true;
  }else{
    return false;
  }
}
