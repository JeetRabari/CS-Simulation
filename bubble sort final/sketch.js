//var array = [10, 50, 2, 40, 15, 47, 23, 8, 49, 27, 13, 40, 35, 17, 30, 19];
var array = [new myArray(10,0), new myArray(50,0), new myArray(2,0), new myArray(40,0), new myArray(15,0), new myArray(47,0), new myArray(23,0), new myArray(8,0), new myArray(49,0), new myArray(27,0), new myArray(13,0), new myArray(14,0) ,new myArray(35,0), new myArray(17,0), new myArray(30,0), new myArray(19,0)];
var randomize;
var next, previous,run,pause,slider;
var snapShots = [];
var curSnapShot=0;
var ary = JSON.parse(JSON.stringify(array));
var isStart = false;
var fr = 1;
function setup () {
  createCanvas(windowWidth, windowHeight - 40);
  randomize = createButton("Randomize Array");
  randomize.mouseClicked(randomizeArray);
  randomize.id('randomize');

  next = createButton("Next Step");
  next.mouseClicked(nextStep);

  previous = createButton("Previous Step");
  previous.mouseClicked(prevStep);

  run = createButton("Run");
  run.mouseClicked(start);

  pause = createButton("pause");
  pause.mouseClicked(pauseSim);


  slider = createSlider(1,30,1,1);


  bubbleSort();
  console.log(snapShots);
  console.log(ary);
}

function draw () {
  background(51);
  drawName();
  drawColorCode();
  if(isStart){
    fr = slider.value();
    frameRate(fr);
    if(curSnapShot < snapShots.length){
    //console.log(curSnapShot);
    array = snapShots[curSnapShot];
    curSnapShot++;
    }
  }
  printArrayBar(array);
}

function drawName(){
  textFont('monospace');
  textSize(25);
  text("Bubble Sort", 15, 40);
  fill(100);
}
function pauseSim(){
  isStart = false;
  document.getElementById('randomize').disabled = false;
}
function start(){
  isStart = true;
  document.getElementById('randomize').disabled = true;
}

function nextStep(){
  console.log(snapShots);
  array = snapShots[curSnapShot];
  curSnapShot++;
  console.log(curSnapShot);
}

function prevStep(){
  if(curSnapShot>0){
  curSnapShot--;
  array = snapShots[curSnapShot];
}
}

function takeSnapeShot(curEmt,nxtEmt,curState,nxtState)
{
	// if(curEmt!=0){
		// ary[curEmt-1].state = 1;
		// ary[nxtEmt-1].state = 1;
	// }
	for(var i=0;i<16;i++){
		if(ary[i].state!=3){
			ary[i].state = 0;
		}
	}
	if(ary[curEmt].state!=3)
		ary[curEmt].state = curState;
	if(ary[nxtEmt].state!=3)
		ary[nxtEmt].state = nxtState;
	snapShots.push(JSON.parse(JSON.stringify(ary)));
}
// function takeSnapeShot(previMin,prevProc,index,newState){
	
  // if(prevProc !=-1){if(ary[prevProc].state == 3){ary[prevProc].state = 0;}}
  // if(previMin != -1){ary[previMin].state = 0;}
  // ary[index].state = newState;
  // snapShots.push(JSON.parse(JSON.stringify(ary)));
// }


function bubbleSort(){
	var p,q;
	for(var i=0;i<ary.length-1;i++){
		for(var j=0;j<ary.length-1;j++){
			p=j
			q=j+1
			takeSnapeShot(p,q,1,1);
			if(ary[p].element>ary[q].element)
			{
				var temp1=ary[p].element;
				ary[p].element=ary[q].element;
				ary[q].element=temp1;
				takeSnapeShot(p,q,2,2);
			}
		}
		takeSnapeShot(p,15-i,2,3);
	}
	takeSnapeShot(0,0,3,3);
  // var iMin;

  // for(var i = 0 ; i < ary.length-1 ; i++){
    // iMin = i;
    // takeSnapeShot(-1,i-1,iMin,1);
    // for(var j = i+1 ; j < ary.length ; j++){
      // takeSnapeShot(-1,j-1,j,3);
      // if(ary[j].element < ary[iMin].element){
        // takeSnapeShot(iMin,j-1,j,1);
        // iMin = j;
      // }

    // }
    // takeSnapeShot(-1,j-1,j-1,0);
    // if(iMin != i){
      // var temp = ary[i].element;
      // ary[i].element = ary[iMin].element;
      // ary[iMin].element = temp;
      // takeSnapeShot(iMin,-1,i,2);
    // }else{
      // takeSnapeShot(iMin,-1,i,2);
    // }
  // }
  // takeSnapeShot(-1,-1,ary.length-1,2);
}


//myArray object
function myArray(element,state){
  /*
  state can have 4 value
  0 - normal state , in this state color will be ==#ffffff
  1 - current min element, in this state coloe will be == #ff5c50
  2 - sorted state , in this state color wil be == #50d0ff
  3 - current processing , in this state color will be == #90ff50
  */
  this.element = element;
  this.state = state;
}

function drawColorCode(){
  fill('#ff5c50');
  rect(windowWidth-windowWidth/4,windowHeight/8,50,30);
  fill(250);
  textSize(16);
  text(" - Red is current items.",windowWidth-windowWidth/4 + 70,windowHeight/8 + 17);

  fill('#50d0ff');
  rect(windowWidth-windowWidth/4,windowHeight/8 + 50,50,30);
  fill(250);
  textSize(16);
  text(" - Blue is swaped items.",windowWidth-windowWidth/4 + 70,windowHeight/8 + 50 + 17);

  fill('#90ff50');
  rect(windowWidth-windowWidth/4,windowHeight/8 + 100,50,30);
  fill(250);
  textSize(16);
  text(" - Green is sorted items.",windowWidth-windowWidth/4 + 70,windowHeight/8 + 100 + 17);
}

function randomizeArray () {
  for (var i = 0; i < array.length; i++) {
    array[i].state = 0;
    array[i].element = Math.floor(Math.random() * 50 + 1);
  }
  ary = JSON.parse(JSON.stringify(array));
  snapShots.length = 0;
  curSnapShot = 0;
  bubbleSort();
}

function printArrayBar (array) {
  var c;
  for (var i = 0; i < array.length; i++) {
    switch (array[i].state) {
      case 0:
        c = color('#ffffff');
        break;
      case 1:
        c = color('#ff5c50');
        break;
      case 2:
        c = color('#50d0ff');
        break;
      case 3:
        c = color('#90ff50');
        break;
        default:
        c = color('#ffffff');
    }
    printBar(300 + i * 50, y = height - 100, array[i].element,c);
  }
}

function printBar (x, y, number,c) {
  fill(c);
  var ratio = number * 7;
  rect(x, y - ratio, 30, ratio);
  text(number, x + 5, y + 20);
}
