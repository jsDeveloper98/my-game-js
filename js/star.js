class Star extends Gift {
  constructor(game) {
    super(game);
    this.element.classList.replace("gift", "star");
    game.gameZoneEl.appendChild(this.element);
  }
  destroy() {
    if (!this.element) {
      return;
    }
    this.element.remove();
    this.element = null;
  }
}
