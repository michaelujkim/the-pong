import {SVG_NS} from '../settings'

export default class Ball {
  constructor(r, boardWidth, boardHeight, m, n) {
    this.r = r;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio('public/sounds/pong-01.wav');
    this.ping2 = new Audio('public/sounds/pong-03.wav');
    this.reset();
    document.addEventListener('keydown', event => {
      switch(event.key){
        case m:
        this.slow();
        
        break
        case n:
        this.fast();
        break
        
      }
    });
  }
  
  
  
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    this.vy = 0;
    while(this.vy ===0){
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
    
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }
  slow(){
    this.vy=this.vy/2;
    this.vx=this.vx/2;
  }
  fast(){
    this.vy=this.vy*2;
    this.vx=this.vx*2;
    
  }
  wallCollision(paddle1,paddle2){
    const hitLeft = this.x-this.r <= 0;
    const hitRight = this.x + this.r >= this.boardWidth;
    const hitTop = this.y - this.r <= 0;
    const hitBottom = this.y + this.r >= this.boardHeight;
    
   
    
    if(hitLeft){
      this.direction = -1;
      this.goal(paddle2);
      
      
    } else if(hitRight){
      this.direction = 1;
      this.goal(paddle1);
      
    } else if(hitTop || hitBottom){
      this.vy = -this.vy;
      this.ping2.play();
    }
  }
  
  paddleCollision(paddle1, paddle2){
    if(this.vx > 0){
      //detects collision on right side (paddle2)
      let paddle = paddle2.coordinates( paddle2.x, paddle2.y, paddle2.width, paddle2.height);
      let {leftX, topY, bottomY} = paddle;
      if(
        this.x + this.r >= leftX
        &&
        this.y >= topY
        &&
        this.y <= bottomY
        
        //ball Y is >= paddle top Y
        //ball Y is <= paddle bottom Y
      ){
        this.vx = -this.vx
        this.ping.play()
        
      }
      
    } else{
      //detects collision on left side (paddle1)
      let paddle = paddle1.coordinates( paddle1.x, paddle1.y, paddle1.width, paddle1.height);
      let {rightX, topY, bottomY} = paddle;
      if(
        this.x - this.r <= rightX
        &&
        this.y >= topY
        &&
        this.y <= bottomY
        
        //ball Y is >= paddle top Y
        //ball Y is <= paddle bottom Y
      ){
        this.vx = -this.vx
        this.ping.play()
      }
    }
    
    
    
  }




  blockerCollision(blocker1, blocker2){
    if(this.vx > 0){
      //detects collision on right side (paddle2)
      let blocker = blocker2.coordinates( blocker2.x, blocker2.y, blocker2.width, blocker2.height);
      let {leftX, topY, bottomY} = blocker;
      if(
        this.x + this.r >= leftX
        &&
        this.y >= topY
        &&
        this.y <= bottomY
        
        //ball Y is >= paddle top Y
        //ball Y is <= paddle bottom Y
      ){
        this.vx = -this.vx
        this.ping.play()
        // bottomY = topY
        
      }
      
    } else{
      //detects collision on left side (paddle1)
      let blocker = blocker1.coordinates( blocker1.x, blocker1.y, blocker1.width, blocker1.height);
      let {rightX, topY, bottomY} = blocker;
      if(
        this.x - this.r <= rightX
        &&
        this.y >= topY
        &&
        this.y <= bottomY
        
        //ball Y is >= paddle top Y
        //ball Y is <= paddle bottom Y
      ){
        this.vx = -this.vx
        this.ping.play()
        // bottomY = topY
      }
    }
    
    
    
  }
  goal(paddle){
    paddle.score ++;
    if (paddle.score > 10){
      paddle.score=0;
    }
    this.reset();
  }
  
  render(svg, paddle1, paddle2, blocker1, blocker2){
    this.y += this.vy;
    this.x += this.vx; 
    this.blockerCollision(blocker1,blocker2);
    this.wallCollision(paddle1,paddle2);
    this.paddleCollision(paddle1,paddle2);
    let ball = document.createElementNS(SVG_NS, 'circle');
    ball.setAttributeNS(null, 'r', this.r);
    ball.setAttributeNS(null, 'fill', 'white');
    ball.setAttributeNS(null, 'cx', this.x);
    ball.setAttributeNS(null, 'cy', this.y);
    svg.appendChild(ball);
    
  }
}