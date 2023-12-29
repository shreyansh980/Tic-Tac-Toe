

document.addEventListener('DOMContentLoaded', () => {
    // Your entire JavaScript code here

    let boxes = document.querySelectorAll(".box");  // for all the buttons
    let resetBtn = document.querySelector("#rst-butt"); // reset button
    let newGameBtn = document.querySelector("#new-butt"); // new game button
    let msgContainer = document.querySelector(".msg-cont"); // container to show the message of winner
    let msg = document.querySelector("#msg"); // message of the winner

    let turnO = true; //playerX, playerO
    let count = 0; //To Track Draw

    const winPatterns = [      /// winning pattern
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];

    // Reset game if you want to do in the middle of the game
    // we should reset everything
    const resetGame = () => {
        turnO = true;   // turn should be reset
        count = 0;        // count should be reset
        enableBoxes();    // for enabling boxes again
        msgContainer.classList.add("hide");  // adding hide class to the message container
    };

    // logic for adding X and O to the boxes and check winner or draw
    
    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            // O turn
            if (turnO) {
                //playerO
                box.innerText = "O";
                turnO = false;
            } else {
                //playerX
                box.innerText = "X";
                turnO = true;
            }
            // disabling  the boxes so that after a turn it cant be changed
            box.disabled = true;
            count++; // increase count for checking the turn and it will help in determining the draw condition

            let isWinner = checkWinner();

            //Draw logic
            if (count === 9 && !isWinner) {
                gameDraw();
            }
        });
    });
     

    // Function to show draw message
    const gameDraw = () => {
        msg.innerText = `Game was a Draw.`;
        msgContainer.classList.remove("hide"); // removing the hide class so that the message can be shown
        disableBoxes(); // disabling the boxes so that player cant play without clicking the new or reset buttons
    };


    // Function to disabling the boxes
    const disableBoxes = () => {
        // loop to disable all the boxes
        for (let box of boxes) {
            box.disabled = true;
        }
    };


    // function to enable the boxes
    const enableBoxes = () => {
        //loop to enable all the boxes
        for (let box of boxes) {
            box.disabled = false;
            box.innerText = ""; // making the boxes empty again after enabling it so that player can start new ,it will help in reset button and new game buttons
        }
    };


    // function to show the winner message
    const showWinner = (winner) => {
        console.log(winner);
        msg.textContent = `Congratulations ${winner} won`; // adding the winner text to the paragraph in message container
        msgContainer.classList.remove("hide"); // removing hide class so that message can  be shown
        disableBoxes(); // disabling boxes so that user use new game or reset buttons
    };


    // function to check the winner
    const checkWinner = () => {
        for (let pattern of winPatterns) {  // looping all the winning patterns 
            let pos1Val = boxes[pattern[0]].innerText;  /// getting all the pattern atv index 0
            let pos2Val = boxes[pattern[1]].innerText;  /// getting all the pattern atv index 1
            let pos3Val = boxes[pattern[2]].innerText;  /// getting all the pattern atv index 2

            if (pos1Val != "" && pos2Val != "" && pos3Val != "") {  // checking if the patterns are null or not
                if (pos1Val === pos2Val && pos2Val === pos3Val) {   // if all the columns match then we got the winner
                    showWinner(pos1Val); 
                    return true;
                }
            }
        }
    };

    newGameBtn.addEventListener("click", resetGame); // adding the functionality to the new game button
    resetBtn.addEventListener("click", resetGame);  // adding the functionality to the reset game button
});
