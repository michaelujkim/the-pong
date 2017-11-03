import {SVG_NS} from '../settings'

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;
    document.addEventListener('keydown', event => {
      switch(event.key){
          case up:
          this.up();
          break;
        case down:
          this.down();
          break;

      }
    });
  }

  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return {leftX, rightX, topY, bottomY};
  }

  up(){
    //get max number
    this.y = Math.max(this.y - this.speed,0);
    
    // either 0 or the y position minus the speed
   

  }
  down(){
    //gete min number
    this.y = Math.min(this.y + this.speed, this.boardHeight-this.height);
    //either the hieght of the board minus the height of the paddle
    //or the y position plus the speed
    
  }
  render(svg){
    let paddle = document.createElementNS(SVG_NS, 'rect');
    paddle.setAttributeNS(null, 'width', this.width);
    paddle.setAttributeNS(null, 'height', this.height);
    paddle.setAttributeNS(null, 'x', this.x);
    paddle.setAttributeNS(null, 'y', this.y);
    paddle.setAttributeNS(null, 'fill', 'white');
    svg.appendChild(paddle);

  }
}