const bar = document.getElementById('bar')
let percentage = 0;

function dynamicBar() {

  percentage += 0.5
  console.log(percentage)
  bar.style.width = `${percentage}%`
  if (percentage == 100) {
    clearInterval(barProgress)
    window.location.href = 'index.html'

  }
}

let barProgress = setInterval(dynamicBar, 10);
