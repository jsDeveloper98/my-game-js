class Gift {
  get left() {
    return this._left;
  }
  get top() {
    return this._top;
  }
  set left(x) {
    this._left = x;
    this.element.style.left = x + "px";
  }
  set top(y) {
    this._top = y;
    this.element.style.top = y + "px";
  }
  constructor(game) {
    this.game = game;
    this._left = getRndLeft();
    this._top = getRndTop();
    const element = document.createElement("div");
    element.classList.add("gift");
    this.element = element;
    this.left = this._left;
    this.top = this._top;
    this.game.gameZoneEl.appendChild(element);
  }
  eaten() {
    this.left = getRndLeft();
    this.top = getRndTop();
  }
}
