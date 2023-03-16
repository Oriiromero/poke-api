let input$$ = document.querySelector('input');
let btn$$ = document.querySelector('button');
let ul$$ = document.querySelector('ul');
let text$$ = document.querySelector('.empty');

let initText = text$$.textContent;


let numTasks = 0;

btn$$.addEventListener('click', function(e) {
    let str = input$$.value;

    // if(str.replace(/\s/g, '').length == 0){
    //     return;
    // }

    numTasks++;

    text$$.textContent = '';


    let li$$ = document.createElement('li');
    e.preventDefault();

    let eraseBtn = document.createElement('button');
    eraseBtn.classList.add('erase');
    eraseBtn.textContent = 'X';

    
    li$$.textContent = input$$.value;
    li$$.appendChild(eraseBtn);
    
    eraseBtn.addEventListener('click', function() {
        numTasks--;
        
        if(numTasks <= 0){
            text$$.textContent = initText;
        }

        li$$.remove();
    })

    ul$$.appendChild(li$$);
    
   
});
