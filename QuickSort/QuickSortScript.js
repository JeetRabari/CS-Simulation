
var x, y,i,b1,q,b2,count,flag,z,r,fr,e,y,b3,b4,pnext,action,slider;
var size=[],trace=[],cpivot=[],dup=[];
var spacing;
function setup() {
  createCanvas(windowWidth,windowHeight);
  
  fr=0.8
  frameRate(fr)
  x = 150;
  y = height-150;
  spacing=60;
  i=1;
  c=1;
  count=0;
  countPivot=0;
  flag=false;
  pnext=false;
  action=1;
  b1=createButton("Random Values");
  b1.position(x-100,y+100);
  b1.mousePressed(createRandom);
  
  b2=createButton("play next / Pause ");
  b2.position(x+25,y+100);
  b3=createButton("Play")
  b3.position(x+160,y+100);
  b2.mousePressed(playnext);
  b3.mousePressed(auto);
  slider=createSlider(0.1, 5,0.8, 0.1)
  slider.position(x+220,y+100)
  slider.style('width','80px')
  z=0;
  q=0;
  size=[10,20,40,50,30,60,70,25,90,42]
  
 trace[count]=[0,0,0,0,0,0,0,0,0,0]
 dup[count]=[10,20,40,50,30,60,70,25,90,42]
 for(var m=0;m<cpivot.length;m++)
 {
   trace[count][cpivot[m]]=4
 }
 count++;


 
 
}



function draw() {
  background(050);
  fill('skyblue')
  textSize(32)
  text("QuickSort",50,50)
  fill('white')
  rect(windowWidth-250,50,30,30)
  textSize(22)
  text("Default color",windowWidth-200,75)
  
  fill('#B03A2E')
  rect(windowWidth-250,100,30,30)
  textSize(22)
  text("selected as pivot",windowWidth-200,125)
  fill('#3498DB  ')
  rect(windowWidth-250,150,30,30)
  textSize(22)
  text("current pointer",windowWidth-200,175)
  fill('#28B463')
  rect(windowWidth-250,200,30,30)
  textSize(22)
  text("sorted items",windowWidth-200,225)
  fill('#F1C40F')
  
  rect(windowWidth-250,250,30,30)
  textSize(22)
  text("fixed pivot",windowWidth-200,275)
   if(action==2){
    quickSortAlgo(0,9)
    action=0
   }
 
  fr=slider.value();
  frameRate(fr)
  if(pnext){
  if(q>(count-1)){
    drawRect(1,count-1)
    textSize(32)
    text(dup[count-1],250,50)
  }
  else{
  drawRect(1,q)
  textSize(32)
  text(dup[q],250,50)
  
  }
  }
  else if (flag){
    if(q>(count-1)){
      drawRect(1,count-1)
      textSize(32)
      text(dup[count-1],250,50)
    }
    else{
    drawRect(1,q)
    textSize(32)
    text(dup[q],250,50)
    q++;
    }
   
  }
  else{
    drawRect(1,0)
    textSize(32)
    text(dup[0],250,50)
  }


}
  
   function auto(){
     flag=true;
     pnext=false;
     if(action!=0){
     action=2;
     }
   }

  function playnext(){
    pnext=true;
    flag=false;
    if(action!=0){
      action=2;
      }
   q++;
  }

function quickSortAlgo(low, high){
 
      if (low < high)
      {
       
         var pi =  partition(low, high);
       
         quickSortAlgo( low, pi - 1);  
         quickSortAlgo(pi + 1, high); 
      }
      else if(low==high)
      {
        cpivot[countPivot]=high
    countPivot++;
    trace[count]=[0,0,0,0,0,0,0,0,0,0]
   
   dup[count]=[]
    for(var e=0;e<10;e++){
      dup[count][e]=dup[count-1][e]
    }
   


    for(var m=0;m<cpivot.length;m++)
    {
      trace[count][cpivot[m]]=4
    }
    count++
      }
      
      
}
function partition (low, high)
{
 
    
    var pivot = size[high];  
   
   
    var li = (low - 1)  
    var lj
    trace[count]=[0,0,0,0,0,0,0,0,0,0]
    dup[count]=[];
    
    for( e=0;e<10;e++){
      
       
      
       dup[count][e]=dup[count-1][e]
      
    }
    
      
    trace[count][high]=1
    for(var m=0;m<cpivot.length;m++)
    {
      trace[count][cpivot[m]]=4
    }
    count++
    for (lj = low; lj <= high- 1; lj++)
    {
     
      trace[count]=[0,0,0,0,0,0,0,0,0,0]
      dup[count]=[];
      for( e=0;e<10;e++){
        dup[count][e]=dup[count-1][e]
      }
      
      
      trace[count][high]=1
    trace[count][lj]=2
    if(li>(low-1)){
     trace[count][li]=3
    }
    for(var m=0;m<cpivot.length;m++)
    {
      trace[count][cpivot[m]]=4
    }
    count++;
        if (size[lj] <= pivot)
        {
            li++;   
         
           var t=size[li];
            size[li]=size[lj]
            size[lj]=t
            
            trace[count]=[0,0,0,0,0,0,0,0,0,0]
            dup[count]=[];
            for(var e=0;e<10;e++){
             dup[count][e]=dup[count-1][e]
            }
           
            var t1=dup[count][li];
            dup[count][li]=dup[count][lj]
            dup[count][lj]=t1
             
            trace[count][high]=1
            trace[count][lj]=2
            if(li>(low-1)){ 
            trace[count][li]=3
            }
            for(var m=0;m<cpivot.length;m++)
            {
              trace[count][cpivot[m]]=4
            }
            count++;
       }

    }
    

    var t=size[li+1];
    size[li+1]=size[high]
    size[high]=t

    cpivot[countPivot]=li+1
    countPivot++;
   
    trace[count]=[0,0,0,0,0,0,0,0,0,0]
    dup[count]=[];
    for(var e=0;e<10;e++){
      dup[count][e]=dup[count-1][e]
    }

    var t1=dup[count][li+1];
    dup[count][li+1]=dup[count][high]
    dup[count][high]=t1

    for(var m=0;m<cpivot.length;m++)
    {
      trace[count][cpivot[m]]=4
    }
    count++
    
    return (li + 1)
}

function createRandom(){
   var j;
   for(j=0;j<10;j++){
     size[j]=int(random(10,100));
     dup[0][j]=size[j]
   }
  
   //drawRect(1,0);
}
function drawRect(i,r){
  
   if(i==11){
    return;
  }
  switch(trace[r][i-1])
  {
    case 0:  fill('white')
    break
    case 1: fill('#B03A2E  ')
    break
    case 2: fill('#3498DB  ')
    break
    case 3: fill('#28B463')
    break
    case 4: fill('#F1C40F')
    break
  }
  rect(x+i*spacing, (y-dup[r][i-1]*3),30 ,20+dup[r][i-1]*3);
  
  textSize(20)
  text(dup[r][i-1],x+5+i*spacing,y+45)
  drawRect(++i,r);
}
