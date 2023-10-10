export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;

    this.onCellClick = this.onCellClick.bind(this);
    this.button = document.querySelector('[data-id=board]');
    this.button.addEventListener('click', this.onCellClick);

    this.points = document.querySelector('.points');
    this.misses = document.querySelector('.misses');
  }

  getCell() {
    return Math.floor(
      Math.random() * (this.gamePlay.boardSize * this.gamePlay.boardSize),
    );
  }

  init() {
    this.gamePlay.drawUi();

    setInterval(() => {
      if (this.gamePlay.shots < this.gamePlay.tries) {
        this.gamePlay.miss += 1;
        this.misses.textContent = (`Промахи: ${this.gamePlay.miss}`);
        this.gamePlay.shots += 1;
        if (this.gamePlay.miss === 5) {
          this.gameOver();
          return;
        }
      }
      let newCell = this.getCell();
      while (newCell === this.gamePlay.activeCell) {
        newCell = this.getCell();
      }
      this.gamePlay.redrawPositions(newCell);
      this.gamePlay.activeCell = newCell;
      this.gamePlay.tries += 1;
    }, 1000);
  }

  gameOver() {
    alert(`Игра окончена!\nПоймано гоблинов: ${this.gamePlay.catch}`);
    this.gamePlay.catch = 0;
    this.gamePlay.miss = 0;
    this.points.textContent = (`Очки: ${this.gamePlay.catch}`);
    this.misses.textContent = (`Промахи: ${this.gamePlay.miss}`);
  }

  onCellClick(cell) {
    const { target } = cell;
    this.gamePlay.shots += 1;
    if (target.classList.contains('goblin')) {
      this.gamePlay.catch += 1;
      target.classList.remove('goblin');
      this.points.textContent = (`Очки: ${this.gamePlay.catch}`);
    } else {
      this.gamePlay.miss += 1;
      this.misses.textContent = (`Промахи: ${this.gamePlay.miss}`);
    }

    if (this.gamePlay.miss === 5) {
      this.gameOver();
    }
  }
}
