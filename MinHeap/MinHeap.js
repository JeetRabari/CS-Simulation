var input, button, greeting,copy,d,count,l1,i,r,flag,px,py,bplay,fc,j,child,p,t,name1;
var NodeValue=[],Nodexy=[],index,tempi,x,y,x1,y1,queue=[];

function setup() {

  // create canvas
  createCanvas(windowWidth,windowHeight);
  index=0;
  
  fr=0.8;
  frameRate(fr)

  input = createInput();
  input.position(20, 65);

  button = createButton('submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(greet);
 
  
   
  greeting = createElement('h2', 'Enter node value');
  greeting.position(20, 5);

  
  
  textAlign(CENTER);
  textSize(50);

  
  name1 = createElement('h1', 'Min Heap');
  name1.position(windowWidth/2-150, 5);
  

  flag=true;
  fc=false;
  j=0;
  p=0;
  //noLoop();
}



function draw(){
    background('white');
    x=600;
    y=95;
   x1=x;
   y1=y;
   
   while(queue.length){
      queue.shift();
   }
   d=100;
   i=0;
   l1=0;
   count=pow(2, i);
   r=50;
   px=0;
   py=0;
for(tempi=0;tempi<index;tempi++){
    //background('white');
    
     l1++;
    if(tempi>0){
        x1=queue.shift();
    y1=queue.shift();
    px=x1;
    py=y1;
    if(tempi%2==1){
        x1=x1-(d/2);
        y1=y1+100;
       
        }
        else if(tempi%2==0){
         
         
            x1=x1+(d/2);
            y1=y1+100;
            
            
        }
    }

    fill('Black')
    if(px!=0){
        stroke(122);
    line(px,py,x1,y1);
    }
    fill('skyblue')
    if(tempi==p||tempi==j){
        fill('yellow');
    }
    ellipse(x1, y1, r, r);
    fill('Black')
    textSize(20);
    text(NodeValue[tempi], x1, y1+5);
    queue.push(x1);
    queue.push(y1);
    queue.push(x1);
    queue.push(y1);
    
    if(count==l1){
        l1=0;
      i++;
      if(i==4){

         flag=false;
        break;

      }
      count=pow(2,i);
      d=400/i;
      r-=7;
    }


}

button.attribute('disable','');


if(j!=0){
  child=j;
 
  j=j-1;
   j=floor(j/2);
   p=j;
   
  if(int(NodeValue[child])<int(NodeValue[p]) ){
   
       t=NodeValue[p] ;
      NodeValue[p] =NodeValue[child];
      NodeValue[child]=t;
      
      
   //draw();

  }
 
}


    button.removeAttribute('disable');
    





}

function greet() {

    if(!flag){
        limit();
        return;
    }
  NodeValue[index++]= input.value();
   j=index-1;
   
 // draw();
  
}
function limit(){
    fill('Red')
    textSize(32);
    text("Reach Max Limit", 150,150);
    flag=false;
    noLoop();
}