import {SVG_NS} from '../settings'

export default class Ball {
  constructor(r, boardWidth, boardHeight, cx, cy) {
    this.r = r;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.cx =cx;
    this.cy=cy;
   
    }
  
 
  render(svg){
    let ball = document.createElementNS(SVG_NS, 'circle');
    ball.setAttributeNS(null, 'r', this.r);
    ball.setAttributeNS(null, 'fill', 'white');
    ball.setAttributeNS(null, 'cx', this.cx);
    ball.setAttributeNS(null, 'cy', this.cy);
    svg.appendChild(ball);

  }
}