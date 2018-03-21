var canvas = document.getElementById('myCanvas');
var c = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

c.fillRect(0,0,canvas.width,canvas.height);

var score = 0;

function getRandom(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function Food(size){
   this.x = getRandom(50,canvas.width-50);
   this.y = getRandom(50,canvas.height-50);
   this.size = size;
    this.color = "yellow";
    
    
this.draw = function(){
    c.beginPath();
        c.arc(this.x,this.y,this.size,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
}    

this.update = function(){
    
    var distance = Math.sqrt(Math.pow((this.x-player.x),2) +                        Math.pow((this.y-player.y),2));
    
    var r = this.size + player.size;
    
    
    
    if(r >= distance)
        {
          this.color = "red";
          const index = food.indexOf(this);
            if(index!=-1)
             {food.splice(index,1);
               var size = getRandom(3,6);
              food.push(new Food(size));
              score+=this.size - 2;
             }
        }
    this.draw();
    //console.log(player.x);
}
    
}

var food =[];
    
for(var i = 0;i<2;i++){  
   var size = getRandom(3,6);
    food[i] = new Food(size);
}

//for(var i = 0;i<10;i++)
//{   var width = getRandom(10,15);
//    var length = getRandom(100,150);
//    rectangle[i] = new Rectangles(width,length);
//}

var gravity = 0.19;


function Player(x,y,size){
    this.x = canvas.width/2;
    this.y = canvas.height - 100;
    this.size = size;
    this.dy = -4;
    this.dx = 0;
    this.pause = false;
    
    this.draw = function(){
        
        c.beginPath();
        c.arc(this.x,this.y,this.size,0,Math.PI*2,false);
        c.fillStyle = "white";
        c.fill();      
    };
    
    this.update = function(){
        
        this.y += this.dy;
        this.dy += gravity;
        this.x += this.dx;
        this.draw();
    }

    this.jump = function(){
        this.dx = 0;
        this.dy = -4;
    }
    
    this.jumpLeft = function(){
        this.dx = -1;
    }
    
    this.jumpRight = function(){
        this.dx = 1;
    }
    
    this.togglePause = function(){
        
        this.pause = !this.pause;
    }
    
    
}

var player = new Player(100,10,9);


//LISTENERS

window.addEventListener("click",function(){
 player.jump();
});

document.addEventListener('keypress',function(event){
if(event.charCode == 32)
    player.jump();
else if(event.charCode == 97) //a
 {   player.jump();
        player.jumpLeft();}
else if(event.charCode == 100) //d
   {   player.jump();
       player.jumpRight();
   }
else if(event.charCode == 119) //w
    player.jump();

else if(event.charCode == 112) //w
 player.togglePause();
    
    
//console.log(event);
    
});








function animate(){
    requestAnimationFrame(animate);
   
    if(!player.pause){
    c.fillStyle = "rgba(0,0,0,0.2)";
    c.fillRect(0,0,window.innerWidth,window.innerHeight);    
    //console.log("a");
//    for(var i = 0;i<food.length;i++)
//      food[i].draw();
    

    player.update();
   
//    for(var i = 0;i<food.length;i++)
//    {
//        var distance = Math.sqrt(Math.pow((food[i].x-player.x),2) +                        Math.pow((food[i].x-player.x),2));
//        
//        var r = food[i].size + player.size;
//        
//        if(distance <= r)
//       {
//           food.splice(i,1);
//           var size = getRandom(3,6);
//           food.push(new Food(size));
//       }
//}
   // console.log(player.x + " "+player.y);a
 
    
    
//    for(var i=0;i<rectangle.length;i++)
//      rectangle[i].update();
    
    
    for(var i = 0;i<food.length;i++)
   {food[i].update();}
    

c.font = "20px Arial";
        c.fillStyle = "white";
c.fillText("Score: "+score,0,20);
    
c.font = "10px Arial";    
c.fillText("Made with <3 by Ashwani Dubey",canvas.width/2,canvas.height-5);        
}
    else{
        c.font = "20px Arial";
c.fillText("Paused",100,20);
    }
    
}

animate();