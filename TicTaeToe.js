const buttons = document.querySelectorAll('.box');
// console.log(buttons);e

const rst_buttn = document.querySelector('rst-butt');
// console.log(rst_buttn);
const newGameButt  = document.querySelector("#new-butt");
const msgContainer = document.querySelector(".msg-cont");
const message = document.querySelector("#msg");
const count = 0;


const winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let playerO = true;

const resetButt =  () => {
    playerO = 0;
    count = 0 ;
    enableButt();
    msgContainer.classList.add("hide")
}

buttons.forEach((box)=>{
    box.addEventListener('click',()=>{
       if(playerO){
        box.innerText = "O";
        playerO = false;
       }
       else{
        box.innerText = "X";
        playerO = true;
       }
       box.disabled = true;
       count++;

      let iswinner =  checkWinner();

      if(count === 9  && !iswinner){
        gameDraw();
      }

    });
   
});

const gameDraw = ()=>{
    message.innerText = "Round is draw"
    msgContainer.classList.remove("hide")
    disableButt();
}

const disableButt =  ()=>{
    for(let box of buttons){
        box.disabled =true;
        // box.innerText = "";
    }
}

const enableButt = () =>{
    for(let box of buttons){
        box.disabled = false;
        box.innerText = " ";
    }
}

const showWinner = ()=>{
    message.innerText = `Congratulations,Winner id ${winner}`
    msgContainer.classList.remove("hide")
    // enableButt();
    disableButt();
}

const checkWinner = ()=>{
    for(let pattern of winPattern){
    //    console.log(pattern[0]);
    //    console.log(buttons[pattern[0]]);
    let patt1 = buttons[pattern[0]].innerText;
    let patt2 = buttons[pattern[1]].innerText;
    let patt3 = buttons[pattern[2]].innerText;
    
    if(patt1 != "" && patt2 != "" && patt3 !=""){
        if(patt1 === patt2 && patt2 === patt3){
            showWinner(patt1)
            return true;
    }
    }
//     console.log(patt1);
//     console.log(patt2);
//     console.log(patt3);
}
};

newGameButt.addEventListener("click",resetButt);
rst_buttn.addEventListener("click",resetButt);
