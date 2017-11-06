import { SVG_NS, KEYS } from '../settings'
import Board from './Board'
import Paddle from './Paddle'
import Ball from './Ball'
import Score from './Score'
import Blocker from './Blocker'

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;

		this.gameElement = document.getElementById(this.element);
		this.board = new Board(this.width, this.height);

		this.boardGap = 10;
		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.r = 8;
		this.size = 10;
		this.paddle1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			(this.height - this.paddleHeight) / 2,
			KEYS.a,
			KEYS.z);

		this.paddle2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.width - this.boardGap - this.paddleWidth, (this.height - this.paddleHeight) / 2,
			KEYS.up,
			KEYS.down);

		this.ball = new Ball(
			this.r,
			this.width,
			this.height, KEYS.m, KEYS.n);

		document.addEventListener('keydown', event => {
			if (event.key === KEYS.spaceBar) {
				this.pause = !this.pause;
			}
		});

		this.score1 = new Score(
			this.width / 4,
			this.paddleHeight,
			30


		);

		this.score2 = new Score(
			this.width / 4 * 3,
			this.paddleHeight,

			30

		);
		this.blocker1 = new Blocker(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap*4,
			(this.height - this.paddleHeight) / 2,
			KEYS.a,
			KEYS.z)

		;
		this.blocker2 = new Blocker(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.width - this.boardGap - this.paddleWidth  - this.boardGap - this.paddleWidth, (this.height - this.paddleHeight) / 2,
			KEYS.up,
			KEYS.down
		);
	}

	render() {
		if (this.pause) {
			return;
		}

		this.gameElement.innerHTML = '';
		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		svg.setAttributeNS(null, 'version', '1.1');

		this.gameElement.appendChild(svg);

		this.board.render(svg);
		this.paddle1.render(svg);
		this.paddle2.render(svg);
		this.ball.render(svg, this.paddle1, this.paddle2,this.blocker1, this.blocker2);
		this.score1.render(svg, this.paddle1.score);
		this.score2.render(svg, this.paddle2.score);
		this.blocker1.render(svg, this.blocker1);
		this.blocker2.render(svg, this.blocker2);

	}

}