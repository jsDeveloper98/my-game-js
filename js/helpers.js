function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getRndLeft() {
  return Math.floor(Math.random() * (window.innerWidth - 80));
}
function getRndTop() {
  return Math.floor(Math.random() * (window.innerHeight - 80));
}
