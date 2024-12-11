const myArray = ["apple", "banana","grape","cherry","kiwi","peach","pineapple","mango","orange"]
let shuffleArray = [];
let firstCard = null;
let secondCard = null;
let cardContainer = document.getElementById('card-container');

let pointsElement = document.getElementById('points')
let points = 0;
let attemptsElement = document.getElementById('attempts')
let attempts = 0;
let failAttemptsElement = document.getElementById('failAttempts')
let failAttempts = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
}; 

function compare(firstCard, secondCard) {
    let content1 = firstCard.children[1].alt;
    let content2 = secondCard.children[1].alt;

    setTimeout(function() {
        if (content1 !== content2) {
            // CODE HERE: Compare and update the style to be block
            firstCard.children[0].style.display="block";
            secondCard.children[0].style.display = 'block';
            // END CODE  
        } else{
            points++
            pointsElement.textContent=points
            failAttempts--
        }
        console.log(failAttempts)
        console.log(failAttemptsElement)
       attempts++
       failAttempts++
       attemptsElement.textContent=attempts
       failAttemptsElement.textContent = failAttempts
       if (attempts>=5) {
        // alert("STOP!!!")
       }
    }, 500); 
}

function init() {
    let combineArray = myArray.concat(myArray); 
    
    shuffleArray = shuffle(combineArray);

    for(let i = 0; i < shuffleArray.length; i++) {
        let newCard = document.createElement('div');
        newCard.className = 'card';
        newCard.id = `card${i+1}`;

        // CODE HERE: Create a new div with class 'hidden-card'
        let hiddenCard = document.createElement('div');
        hiddenCard.className = 'hidden-card';
        // END CODE

        // CODE HERE: Create a new p with class 'content'
        // let content = document.createElement('p');
        // content.className = 'content';
        // content.textContent = shuffleArray[i];
        // END CODE
        let imageElement = document.createElement('img')
        imageElement.src = "image/"+ shuffleArray[i] + ".png"
        imageElement.alt = shuffleArray[i]
        imageElement.width = '100'
        imageElement.height = '100'

        // CODE HERE: Append hiddenCard and content to newCard
        newCard.appendChild(hiddenCard);
        newCard.appendChild(imageElement);
        // END CODE

        newCard.addEventListener('click', function(event) {
            // CODE HERE: apply style display none
            let hiddenCard = this.children[0]
            hiddenCard.style.display = 'none';
            // END CODE

            if(firstCard && secondCard) {
                console.log('both not empty')
                return;
            }
            if(firstCard == null) {
                firstCard = this;
            } else {
                if(secondCard == null) {
                    secondCard = this;
                }
            }
            if(firstCard && secondCard) {
                compare(firstCard, secondCard)
                firstCard = null;
                secondCard = null;  
            }
        })
        cardContainer.appendChild(newCard);
    }
}
init()