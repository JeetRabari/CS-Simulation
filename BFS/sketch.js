var b_place,i_edg,i_v1,i_v2,b_adde,b_edg,b_reset,b_nstep;
var totnods,maxnods,totedg,maxedg,count;
var bkcol='#d6a7d3',nodcol='#7a2d74';
var canvascol='#e8d7e7',canvasx=20,canvasy=20,canvasw=900,canvash=600;
var mainarr,disparr,msg=[],msgflag,place;
var bfsarr,queue,visited;
var vhl,qhl,next,nexttot;

msg[0]='';
msg[1]='*INVALID INPUT';
msg[2]='*AT LEAST 2 NODES REQUIRED';
msg[3]='*MAXIMUM NODE LIMIT REACHED';
msg[4]='*THOSE ARE TOO MANY EDGES!';
msg[5]='*EDGE ADDED';
msg[6]='*EDGES ALREADY EXISTS';

function setup(){
  createCanvas(window.innerWidth,window.innerHeight);

  b_place=createButton('PLACE');
  b_place.position(canvasx+canvasw+50,180)
  b_place.mousePressed(nodesplaced);

  i_edg=createInput();
  i_edg.position(canvasx+canvasw+50,255);

  b_edg=createButton('ENTER');
  b_edg.position(i_edg.x+i_edg.width,i_edg.y)
  b_edg.mousePressed(defedgs);

  i_v1=createInput();
  i_v1.position(canvasx+canvasw+50,325);
  i_v2=createInput();
  i_v2.position(i_v1.x+i_v1.width,i_v1.y);
  b_adde=createButton('ADD EDGE');
  b_adde.position(i_v2.x+i_v2.width,i_v2.y);
  b_adde.mousePressed(addedge);

  b_reset=createButton('RESET');
  b_reset.position(canvasx+canvasw+50,canvasy+canvash+70);
  b_reset.mousePressed(reset);

  reset();
}

function draw(){
  background(bkcol);
  noStroke();
  textAlign(LEFT,CENTER);
  fill(0);
  text('CLICK MOUSE TO CREATE A NODE\nPRESS "PLACE" WHEN DONE',canvasw+canvasx+41,50);
  text('ENTER TOTAL EDGES: ',canvasw+canvasx+41,140);
  text('NODE 1',canvasw+canvasx+41,212);
  text('NODE 2',canvasw+canvasx+200,212);
  text(msg[msgflag],canvasw+canvasx+40,300);
  textSize(25);
  text('QUEUE: '+qhl[next],canvasw+canvasx+41,500);
  text('BFS: '+vhl[next],canvasw+canvasx+81,530);
  textSize(18);
  fill(canvascol);
  rect(canvasx,canvasy,canvasw,canvash,20);

  if(placecondition()){
    fill(nodcol);
    ellipse(mouseX,mouseY,50,50);
  }
  stroke(128);
  strokeWeight(4);
  for(var i=0;i<totnods;i++){
    for(var j=0;j<i+1;j++){
      if(mainarr[i][j]==1){
        line(disparr[i][1],disparr[i][2],disparr[j][1],disparr[j][2]);
      }
    }
  }
  noStroke();

  for(var i=0;i<maxnods;i++){
    if(disparr[i][0]!=undefined){
      for(var x=0;x<vhl[next].length;x++){
        if(i==vhl[next][x]){
          fill('#341835');
          ellipse(disparr[i][1],disparr[i][2],70,70);
        }
      }
      fill(nodcol);
      ellipse(disparr[i][1],disparr[i][2],50,50);
      fill(255);
      textAlign(CENTER,CENTER);
      text(disparr[i][0],disparr[i][1],disparr[i][2]);
    }
  }

}

function placecondition(){
  if(place&&mouseX-30>=canvasx&&mouseX+30<=canvasx+canvasw&&mouseY-30>=canvasy&&mouseY+30<=canvasy+canvash)
    return true;
  else
    return false;
}

function nodesplaced(){
  if(count<=1){
    msgflag=2;//at least 2 nodes
    return;
  }
  totnods=count;
  b_place.attribute('disabled','');
  b_edg.removeAttribute('disabled');
  count=0;
  place=false;
}

function mouseClicked(){
  if(placecondition()){
    disparr[count][0]=count;
    disparr[count][1]=mouseX;
    disparr[count][2]=mouseY;
    count++;
    if(count==maxnods){
      place=false;
      count=0;
      totnods=maxnods;
      b_place.attribute('disabled','');
      b_edg.removeAttribute('disabled');
      msgflag=3;//max node limit
    }
  }
}

function defedgs(){
  var temp=i_edg.value().replace(/\s+/g,"");
  i_edg.value('');
  maxedg=(totnods*(totnods-1))/2;
  if(isFinite(temp)&&temp!=''){
    temp=int(temp);
    if(temp>maxedg){
      msgflag=4;//too many edges
      return;
    }
    if(temp==0){
      msgflag=1;//invalid ip
      return;
    }
    totedg=temp;
    msgflag=0;
    i_edg.value(totedg);
    i_edg.attribute('disabled',''); 
    b_edg.attribute('disabled','');
    b_adde.removeAttribute('disabled');
  }
  else{
    msgflag=1;//invalid input
  }
}

function addedge(){
  var v1=i_v1.value().replace(/\s+/g,"");
  i_v1.value('');
  var v2=i_v2.value().replace(/\s+/g,"");
  i_v2.value('');
  if(isFinite(v1)&&v1!=''&&isFinite(v2)&&v2!=''){
    v1=int(v1);
    v2=int(v2);
    if(v1>=totnods||v2>=totnods||v1==v2){
      msgflag=1;
      return;
    }
    if(mainarr[v1][v2]==0){
      mainarr[v1][v2]=1;
      mainarr[v2][v1]=1;
      msgflag=5;
      count++;
      if(count==totedg){
        i_v1.attribute('disabled','');
        i_v2.attribute('disabled','');
        b_adde.attribute('disabled','');
        count=0;
        msgflag=0;

        b_nstep=createButton('NEXT STEP');
        b_nstep.position(b_reset.x+b_reset.width,b_reset.y);
        b_nstep.mousePressed(step);

        traverseBFS();
      }
    }
    else{
      msgflag=6;//edges exists
      return;
    }
  }
  else{
    msgflag=1;//invalid input
  }
}

function traverseBFS(){
  var i=0,j=0;
  queue.push(i);

  while(queue.length!=0){
    qhl[next]=queue.slice();

    bfsarr.push(queue.shift());

    vhl[next++]=bfsarr.slice();
    
    
    i=bfsarr[j];
    visited[i]=true;
    for(var k=0;k<totnods;k++){
      if(i!=k&&mainarr[i][k]==1&&!visited[k]){
        queue.push(k);
        visited[k]=true;

        qhl[next]=queue.slice();
        vhl[next]=vhl[next-1].slice();
        next++;
      }
    }
    j++;
  }
  
  vhl[next]=vhl[next-1].slice();
  qhl[next++]=queue.slice();

  nexttot=next;
  console.log('nexttot: '+nexttot);
  console.log(vhl);
  console.log(qhl);
  next=0;
}

function step(){
  next++;
  if(next==nexttot){
    next--;
    b_nstep.remove();
  }
}

function reset(){
  totnods=0;
  maxnods=10;
  totedg=0;
  maxedg=0;
  count=0;
  msgflag=0;
  place=true;
  mainarr=[];
  disparr=[];
  bfsarr=[];
  queue=[];
  visited=[];
  next=0;
  vhl=[];
  qhl=[];

  for(var i=0;i<maxnods;i++){
    mainarr[i]=[];
    disparr[i]=[];
    visited[i]=false;
  }

  for(var i=0;i<maxnods;i++){
    for(var j=0;j<maxnods;j++){
      mainarr[i][j]=0;
    }
    for(var j=0;j<3;j++){
      disparr[i][j]=undefined;
    }
  }

  for(var i=0;i<30;i++){
    vhl[i]=[];
    qhl[i]=[];
  }

  i_edg.value('');
  b_place.removeAttribute('disabled');

  b_edg.attribute('disabled','');
  b_adde.attribute('disabled','');

  i_edg.removeAttribute('disabled');
  i_v1.removeAttribute('disabled');
  i_v2.removeAttribute('disabled');

  textSize(18);
  textStyle(NORMAL);
}