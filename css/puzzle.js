const circles = document.querySelectorAll(".circle");
const hint = document.querySelector(".hint");
const moves = [null,1,1,1,1];
let lose = 0;

const addMove = circle => {
  if(moves[circle]===6){
    moves[circle] = 1;
  } else {
    moves[circle]++
  }
}

const subMove = circle => {
  if(moves[circle]===1){
    moves[circle] = 6;
  } else {
    moves[circle]--
  }
}

circles[1].addEventListener("click", function(){
  this.style.transform += "rotate(15deg)";
  circles[4].style.transform += "rotate(15deg)";
  addMove(1);
  addMove(4);
});


circles[2].addEventListener("click", function(){
  this.style.transform += "rotate(15deg)";
  circles[4].style.transform += "rotate(15deg)";
  addMove(2);
  addMove(4);
});


circles[3].addEventListener("click", function(){
  this.style.transform += "rotate(15deg)";
  circles[1].style.transform += "rotate(-15deg)";
  subMove(1);
  addMove(3);
});

circles[4].addEventListener("click", function(){
  this.style.transform += "rotate(15deg)";
  addMove(4);
});

hint.addEventListener("click",function(){
  hint.classList.toggle("showHint");
  if(hint.className.match(/\bshowCheck\b/)){
    hint.innerHTML = `<img src="https://i.imgur.com/cm3i5pG.png"/>`;
    this.className = "";
    circles[1].style.transform += "rotate(-195deg)";
    circles[2].style.transform += "rotate(360deg)";
    circles[3].style.transform += "rotate(-450deg)";
    circles[4].style.transform += "rotate(195deg)";
    circles[0].className = "circle inner";
    if(lose===3){
      document.querySelector(".hexagon").className = "hexagon hinted";
    }
  }
});

circles[0].addEventListener("click", function(){
  const W = moves[1]===3 && moves[2]===5 && moves[3]===2 && moves[4]===5;
  setTimeout(function(){
    hint.classList.toggle("showCheck");
    hint.innerHTML = `<video autoplay loop><source src="${W?"https://i.imgur.com/gx8i449.mp4":"https://i.imgur.com/jEm6hON.mp4"}" type="video/mp4"></video><h1>${W?"Unlocked :D":"<span style=\"color:#800\">YOU DIED</span>"}</h1>`;
    circles[0].className = "circle inner check";
  });
  circles[1].style.transform += "rotate(195deg)";
  circles[2].style.transform += "rotate(-360deg)";
  circles[3].style.transform += "rotate(450deg)";
  circles[4].style.transform += "rotate(-195deg)";
  if(!W){
    lose++;
  }  else {
    lose = 0;
    document.querySelector(".hexagon").className = "hexagon";
  }
});