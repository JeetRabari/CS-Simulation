var totalVertex = 5;
var vertices = [new Vertex(700,200,0,0),new Vertex(1000,200,0,0),new Vertex(700,500,0,0),new Vertex(1000,300,0,0),new Vertex(540,350,0,0)];
var adjMat = [[0,1,4,5,2],[1,0,2,0,0],[4,2,0,3,0],[5,0,3,0,2],[2,0,0,2,0]];
var processed;
var isTakingInput;
var isAddingVertex;
var snapShots = [];
var IsPause;
var curSnap;
var randomize;
var next, previous,run,pause,slider;
var ipWTLX; //input window top left x coordinate
var ipWTLY;
var ipWBRX; //input window bottom right x coordinate
var ipWBRY;
var n1,n2,w,add,submit,srcTB,sBtn,r;
var isSubmited = false;
// for creating matrix
Array.matrix = function(numrows, numcols, initial){
   var arr = [];
   for (var i = 0; i < numrows; ++i){
      var columns = [];
      for (var j = 0; j < numcols; ++j){
         columns[j] = initial;
      }
      arr[i] = columns;
    }
    return arr;
}

function setup() {
 createCanvas(windowWidth, windowHeight - 40);
 //adjMat = Array.matrix(totalVertex,totalVertex,0);

 processed = new Array(totalVertex);
 for (var i = 0 ; i < totalVertex ; i++){
  processed[i] = 0;
 }

 IsPause = true;

 curSnap = 0 ;

 isTakingInput = false;
 isAddingVertex = true;

 ipWTLX = windowWidth/3; //input window top left x coordinate
 ipWTLY = 70;
 ipWBRX = windowWidth/3 + windowWidth-550; //input window bottom right x coordinate
 ipWBRY = 70+windowHeight-150;


 takeInput = createButton("Enter Graph");
 takeInput.mouseClicked(input);
 takeInput.id('inputBtn');


 next = createButton("Next Step");
 next.mouseClicked(nextStep);
 next.id('nextBtn');

 previous = createButton("Previous Step");
 previous.mouseClicked(prevStep);
 previous.id('previousBtn');

 run = createButton("Run");
 run.mouseClicked(start);
 run.id('runBtn');

 pause = createButton("pause");
 pause.mouseClicked(pauseSim);
 pause.id('pauseBtn');

 slider = createSlider(1,30,1,1);
 slider.id('slider');


 dijkstra(vertices,adjMat,0);

 //console.log(snapShots);
}

function draw() {
   background(51);

   drawname();

   if(isTakingInput){
     noLoop();

     strokeWeight(0);
     textSize(20);
     fill(255);
     text('Input Interface',50,100);
     text('Click on beside area to enter vertex.',60,150);
     text('Once done click below button.',60,200);
     var b = createButton('Add edges');
     b.id('b');
     b.position(60,230);
     b.mouseClicked(addEdges);

     r = createButton('Reset');
     r.id('r');
     r.position(60,windowHeight-150);
     r.mouseClicked(reset);

     noFill();
     strokeWeight(1);
     rect(ipWTLX,ipWTLY,windowWidth-550,windowHeight-150);



   }
   else{
     drawLegend();
   frameRate(slider.value());

   if(IsPause == false){
     if(curSnap +  1< snapShots.length)
        curSnap = curSnap+1;
   }

   /*drawGraph(snapShots[curSnap]);*/

   drawGraph(snapShots[curSnap]);
 }
}

function Vertex(x,y,value,state){
  /*
    state - 0 == normal state -- #ffffff
    state - 1 == currently min -- #ff5c50
    state - 2 == selected in shortest path -- #50d0ff
    state - 3 == comparison -- #90ff50
    state - 4 == succesfully relaxed -- #b946e2
  */
	this.x = x;
	this.y = y;
	this.value = value;
  this.state = state;
  this.parent = -1;
}

function f_snapShot(vAry){
  var temp = JSON.parse(JSON.stringify(vAry));

  snapShots.push(temp);
}

function dijkstra(vAry,aMat,src){
  IsPause = true;
  curSnap = 0 ;
  snapShots.length = 0;
  //initializing all vertex
  for (var i = 0 ; i < totalVertex ; i++){
    vAry[i].value = 9999;
  }

  vAry[src].value = 0;

  f_snapShot(vAry);

  for(var p = 0 ; p < totalVertex ; p++){

    //finding minimum value vertex from list
    var iMin = 0;
    var min = 9999;

    for (var i = 0 ; i < totalVertex ; i++){
      if(processed[i] == 0 && min > vAry[i].value){
        min = vAry[i].value;
        iMin = i;
      }
    }

    processed[iMin] = 1;
    vAry[iMin].state = 1;

    f_snapShot(vAry);

    //processing all of it's child
    for(var k = 0 ; k < totalVertex ; k++){


      var tmpVAry = JSON.parse(JSON.stringify(vAry));
      tmpVAry[iMin].state = 3;
      tmpVAry[k].state = 3;

      snapShots.push(tmpVAry);

      if(aMat[iMin][k] > 0 && processed[k] == 0){

          if(vAry[k].value > vAry[iMin].value + aMat[iMin][k]){
            vAry[k].value = vAry[iMin].value + aMat[iMin][k];
            vAry[k].parent = iMin;

            var tmpVAry = JSON.parse(JSON.stringify(vAry));
            tmpVAry[iMin].state = 4;
            tmpVAry[k].state = 4;

            snapShots.push(tmpVAry);


          }

      }
    }

    vAry[iMin].state = 2;
    f_snapShot(vAry);
  }
}


function drawGraph(vAry){

  //draw edges
  for(var i = 0 ; i < vAry.length ; i++){

    for(var j = 0 ; j < vAry.length ; j++){

      if(adjMat[i][j] > 0){

        if(vAry[i].state == 3 && vAry[j].state == 3){
          stroke('#90ff50');
          fill('#90ff50');
        }else if(vAry[i].state == 4 && vAry[j].state == 4){
          stroke('#b946e2');
          fill('#b946e2');
        }else if((vAry[j].parent == i || vAry[i].parent == j) && vAry[j].state == 2 && vAry[i].state == 2){
          stroke('#50d0ff');
          fill('#50d0ff');
        }
        else{
          fill(200);
          stroke(200);
        }

        strokeWeight(2);
        line(vAry[i].x,vAry[i].y,vAry[j].x,vAry[j].y);
        noStroke();
        textSize(16);
        text(adjMat[i][j],(vAry[i].x+vAry[j].x)/2,(vAry[j].y+vAry[i].y)/2);

      }
    }

  }



  //draw vertices
  for(var i = 0 ; i < vAry.length ; i++){

    var c;

    switch(vAry[i].state){
      case 0:{
        c = color(230);
        break;
      }case 1:{
        c = color('#ff5c50');
        break;
      }case 2:{
        c = color('#50d0ff');
        break;
      }case 3:{
        c = color('#90ff50');
        break;
      }case 4:{
        c = color('#b946e2');
        break;
      }
    }

    stroke(255);
    fill(c);
    strokeWeight(2);
    ellipse(vAry[i].x,vAry[i].y,50);
    fill(50);
    textSize(12);
    text(vAry[i].value,vAry[i].x-8,vAry[i].y+5);

  }



}

function nextStep(){
  if(curSnap+1 < snapShots.length)
    curSnap++;
}

function prevStep(){
  if(curSnap>0)
    curSnap--;
}

function start(){
  IsPause = false;
}

function pauseSim(){
  IsPause = true;
}

function input(){
  isTakingInput = true;
  isAddingVertex = true;
  totalVertex = 0;
  vertices.length = 0;
  snapShots.length = 0;
  processed.length = 0;
  document.getElementById('nextBtn').disabled = true;
  document.getElementById('previousBtn').disabled = true;
  document.getElementById('runBtn').disabled = true;
  document.getElementById('pauseBtn').disabled = true;
  document.getElementById('slider').disabled = true;
}

function isInBoundry(x,y,tlx,tly,brx,bry){
  if(x >= tlx && x <= brx && y >= tly && y <= bry){
    return true;
  }else{
    return false;
  }
}

function mouseClicked(){
  if(isAddingVertex){
    if(isInBoundry(mouseX,mouseY,ipWTLX+15,ipWTLY+15,ipWBRX-15,ipWBRY-15)){
      totalVertex = totalVertex + 1;
      var v = new Vertex(mouseX,mouseY,0,0);
      vertices.push(v);
      fill(200);
      ellipse(mouseX,mouseY,30,30);
      fill(0);
      textSize(12);
      text(totalVertex,mouseX-2,mouseY+2);
    }
  }
}

function addEdges(){
  isAddingVertex = false;
  strokeWeight(0);
  textSize(20);
  fill(255);

  text('From Node : ',60,300);
   n1 = createInput('');
   n1.position(200,285);
   n1.id('n1');

   text('To Node : ',60,350);
    n2 = createInput('');
    n2.position(200,335);
    n2.id('n2');

    text('Weight : ',60,400);
     w = createInput('');
     w.position(200,385);
     w.id('w');

    add = createButton('Add');
    add.position(60,420);
    add.id('add');
    add.mouseClicked(addToMat);

    adjMat = Array.matrix(totalVertex,totalVertex,0);
    document.getElementById('b').disabled = true;

    submit = createButton('Submit');
    submit.position(200,420);
    submit.id('submit');
    submit.mouseClicked(f_submit);

}

function addToMat(){
  fill(51);
  rect(60,460,windowWidth/3-80,25);
  if(totalVertex == 0){
    fill(51);
    rect(60,460,windowWidth/3-80,25);
    strokeWeight(0);
    textSize(20);
    fill(255);
    text('Graph with 0 vertex. Add some vertex first.',60,480);
  }else{
      var i = n1.value();
      var j = n2.value();
      var wt = w.value();


      if(i == j || i<0 || j < 0 || wt<0 || i > totalVertex || j > totalVertex || i.length == 0 || j.length ==0 || w.length==0 || isNaN(i) || isNaN(j) || isNaN(wt)){
        fill(51);
        rect(60,460,windowWidth/3-80,25);
        strokeWeight(0);
        textSize(20);
        fill(255);
        text('INVALID INPUT.',60,480);
      }else{
        if(adjMat[i-1][j-1] > 0){
          if(wt == adjMat[i-1][j-1]){
            fill(51);
            strokeWeight(0);
            rect(60,460,windowWidth/3-75,30);
            strokeWeight(0);
            textSize(20);
            fill(255);
            text('Edge already exsist!',60,480);
          }else{
            strokeWeight(0);
            fill(51);
            textSize(12);
            text(adjMat[i-1][j-1],(vertices[i-1].x+vertices[j-1].x)/2,(vertices[i-1].y+vertices[j-1].y)/2);

            adjMat[i-1][j-1] = parseInt(wt,10);
            adjMat[j-1][i-1] = parseInt(wt,10);
            strokeWeight(1);
            line(vertices[i-1].x,vertices[i-1].y,vertices[j-1].x,vertices[j-1].y);
            strokeWeight(0);
            fill('#53e8db');
            textSize(12);
            text(wt,(vertices[i-1].x+vertices[j-1].x)/2,(vertices[i-1].y+vertices[j-1].y)/2);

            fill(51);
            strokeWeight(0);
            rect(60,460,windowWidth/3-75,30);
            strokeWeight(0);
            textSize(20);
            fill(255);
            text('weight updated',60,480);

            strokeWeight(1);
            fill(200);
            ellipse(vertices[i-1].x,vertices[i-1].y,30,30);
            fill(0);
            textSize(12);
            text(i,vertices[i-1].x-2,vertices[i-1].y+2);

            fill(200);
            ellipse(vertices[j-1].x,vertices[j-1].y,30,30);
            fill(0);
            textSize(12);
            text(j,vertices[j-1].x-2,vertices[j-1].y+2);
          }
        }else{
          adjMat[i-1][j-1] = parseInt(wt,10);
          adjMat[j-1][i-1] = parseInt(wt,10);
          strokeWeight(1);
          line(vertices[i-1].x,vertices[i-1].y,vertices[j-1].x,vertices[j-1].y);
          strokeWeight(0);
          fill('#53e8db');
          textSize(12);
          text(wt,(vertices[i-1].x+vertices[j-1].x)/2,(vertices[i-1].y+vertices[j-1].y)/2);

          fill(51);
          strokeWeight(0);
          rect(60,460,windowWidth/3-75,30);
          strokeWeight(0);
          textSize(20);
          fill(255);
          text('edge added',60,480);

          strokeWeight(1);
          fill(200);
          ellipse(vertices[i-1].x,vertices[i-1].y,30,30);
          fill(0);
          textSize(12);
          text(i,vertices[i-1].x-2,vertices[i-1].y+2);

          fill(200);
          ellipse(vertices[j-1].x,vertices[j-1].y,30,30);
          fill(0);
          textSize(12);
          text(j,vertices[j-1].x-2,vertices[j-1].y+2);
        }
      }
  }
}

function reset(){

  if(isAddingVertex == false){
    document.getElementById('n1').remove();
    document.getElementById('n2').remove();
    document.getElementById('w').remove();
    document.getElementById('add').remove();
    document.getElementById('submit').remove();
    if(isSubmited){
      document.getElementById('srcTB').remove();
      document.getElementById('sBtn').remove();
    }

  }

  isAddingVertex = true;
  isTakingInput = true;

  totalVertex = 0;
  vertices.length = 0;

  isSubmited = false;

  redraw();
}

function f_submit(){
  isSubmited = true;
  fill(51);
  strokeWeight(0);
  rect(60,460,windowWidth/3-75,30);

  strokeWeight(0);
  textSize(20);
  fill(255);
  text('Enter Source :',60,480);

  srcTB = createInput();
  srcTB.id('srcTB');
  srcTB.position(200,460);

  sBtn = createButton('Run');
  sBtn.id('sBtn');
  sBtn.position(60,500);
  sBtn.mouseClicked(f_run);

  document.getElementById('n1').disabled = true;
  document.getElementById('n2').disabled = true;
  document.getElementById('w').disabled = true;
  document.getElementById('add').disabled = true;

}

function f_run(){
  var src = parseInt(srcTB.value());
  if(totalVertex == 0){
    fill(51);
    strokeWeight(0);
    rect(60,530,windowWidth/3-75,30);
    strokeWeight(0);
    textSize(20);
    fill(255);
    text('No Vertex Added. Reset I/P',60,550);
    document.getElementById('sBtn').disabled = true;
  }else if(src<=0 || src > totalVertex || isNaN(src)){
    fill(51);
    strokeWeight(0);
    rect(60,530,windowWidth/3-75,30);
    strokeWeight(0);
    textSize(20);
    fill(255);
    text('INVALID SOURCE',60,550);
  }else{
    document.getElementById('n1').remove();
    document.getElementById('n2').remove();
    document.getElementById('w').remove();
    document.getElementById('add').remove();
    document.getElementById('submit').remove();
    document.getElementById('srcTB').remove();
    document.getElementById('sBtn').remove();
    document.getElementById('b').remove();
    document.getElementById('r').remove();


    document.getElementById('nextBtn').disabled = false;
    document.getElementById('previousBtn').disabled = false;
    document.getElementById('runBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('slider').disabled = false ;

    isTakingInput = false;
    processed = new Array(totalVertex);
    for (var i = 0 ; i < totalVertex ; i++){
     processed[i] = 0;
    }
    dijkstra(vertices,adjMat,src-1);
    console.log(vertices);
    console.log(snapShots);
    curSnap = 0;
    loop();
  }
}

function drawname(){
  textSize(25);
  fill(255);
  strokeWeight(0);
  text("Dijkstra's Algorithm",10,40);
}

function drawLegend(){

  textSize(20);

  strokeWeight(2);
  stroke(0);
  fill('#ffffff');//normal
  rect(50,200,50,30);

  fill(255);
  stroke(255);
  strokeWeight(0);
  text('- Normal State',130,220);

  strokeWeight(2);
  stroke(240);
  fill('#ff5c50'); //cur min
  rect(50,270,50,30);

  fill(255);
  stroke(255);
  strokeWeight(0);
  text('- Minimun',130,290);

  strokeWeight(2);
  stroke(240);
  fill('#50d0ff'); //selectd in shortest path
  rect(50,340,50,30);

  fill(255);
  stroke(255);
  strokeWeight(0);
  text('- In Shortest Path',130,360);

  strokeWeight(2);
  stroke(240);
  fill('#b946e2'); //succesfully relaxed
  rect(50,410,50,30);

  fill(255);
  stroke(255);
  strokeWeight(0);
  text('- Succesfully Relaxed',130,430);

  strokeWeight(2);
  stroke(240);
  fill('#90ff50'); //trying to relax
  rect(50,480,50,30);

  fill(255);
  stroke(255);
  strokeWeight(0);
  text('- Trying to relax',130,500);
}
