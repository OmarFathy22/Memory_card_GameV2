let counter = 0;
(firstSelection = 0),
  (secondSelection = 0),
  (id1 = 0),
  (id2 = 0),
  (startGame = -1),
  (matchingNum = 0);

const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("click", () => {

    if (startGame === -1) {
      console.log(startGame)
      startGame = 1;
      timer();
    }
    

    card.classList.add("clicked");
    if (counter === 0) {
      firstSelection = card.getAttribute("Num");
      id1 = card.getAttribute("id");
      counter++;
    } else {
      id2 = card.getAttribute("id");
      if (id1 !== id2) {
        secondSelection = card.getAttribute("Num");
        counter = 0;
        if (firstSelection === secondSelection) {
          matchingNum++;
          const correctMatching = document.querySelectorAll(
            ".card[Num='" + firstSelection + "']"
          );
          correctMatching[0].classList.add("checked");
          correctMatching[1].classList.add("checked");
          correctMatching[0].classList.remove("clicked");
          correctMatching[1].classList.remove("clicked");


        } else {
          const incorrectMatching = document.querySelectorAll(".card.clicked");
          setTimeout(() => {
            incorrectMatching[0].classList.add("shake");
            incorrectMatching[1].classList.add("shake");
          }, 300);
          setTimeout(() => {
            incorrectMatching[0].classList.remove("clicked");
            incorrectMatching[1].classList.remove("clicked");
            incorrectMatching[1].classList.remove("shake");
            incorrectMatching[0].classList.remove("shake");
          }, 800);
        }
        
      }
    }
  });
});

function shuffleCard() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    let imgTag = card.querySelector("img");
    imgTag.src = `Memory Card Game Images/img-${arr[i]}.png`;
    let Numname = card.getAttribute("Num");
    card.setAttribute("Num", arr[i]);
  });
}
function timer() {
  let count = 40;
  const myInterval = setInterval(myTimeout1, 1000);
  function myTimeout1() {
    const forTime = document.getElementById("start");
    forTime.innerHTML = `Time | ${count} `;
    if (count >= 0) {
      if (matchingNum === 8) {
        forTime.innerHTML = `You Win`;
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        clearInterval(myInterval);
      }
    } else {
      clearInterval(myInterval);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      forTime.innerHTML = `Time Up`;
    }
    count--;
  }
}
 
  const hidStart = document.getElementById("Time");
  hidStart.addEventListener("click" , ()=>{
    if (startGame === -1)
    {
      const Interval = setInterval(cards.forEach(card => {
        card.getElementsByTagName("img")[0].style.opacity = "1";
       }),1000)
       setTimeout(() => {
        clearInterval(Interval)
         cards.forEach(card => {
          card.getElementsByTagName("img")[0].style.opacity = "0";
         })
        
        }, 2000);
        timer();
        startGame = 1;
       
     }
 
   })
  
  
shuffleCard()
