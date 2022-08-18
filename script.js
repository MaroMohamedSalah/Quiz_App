let next = document.getElementById("next")
let pre = document.getElementById("pre")



let box = document.getElementById("box")
// let a = document.getElementById("a")
let a1 = document.querySelector(".a1")
let a2 = document.querySelector(".a2")
let a3 = document.querySelector(".a3")
let a4 = document.querySelector(".a4")
let ch;
a1.onmouseover = () =>{
    a1.style.backgroundColor = `${box.style.borderColor}`
}
// check answers
a1.onclick = ()=>{
    ch = a1.textContent;
    a1.id = 'ch';
    a2.id = '';
    a3.id = '';
    a4.id = '';
}
a2.onclick = ()=>{
    ch = a2.textContent;
    a1.id = '';
    a2.id = 'ch';
    a3.id = '';
    a4.id = '';
}
a3.onclick = ()=>{
    ch = a3.textContent;
    a1.id = '';
    a2.id = '';
    a3.id = 'ch';
    a4.id = '';
}
a4.onclick = ()=>{
    ch = a4.textContent;
    a1.id = '';
    a2.id = '';
    a3.id = '';
    a4.id = 'ch';
}
// create the AJAX Request
let currentQ = document.querySelector('.quizBody .container h3 span');
currentQ.innerHTML = '1';
let currentIndex = 0;

function getData(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = () =>{
        let result=0;
        if(myRequest.readyState === 4 && myRequest.status === 200){
            let myQuestion = JSON.parse(myRequest.responseText);
            console.log(myQuestion);
            // add the number of Q to span denamicly
            let myQuestionCount = myQuestion.length ;
            createQustionSpans(myQuestionCount);
            // add qustions 
            addData(myQuestion[currentIndex] , myQuestionCount);
            // check A
            next.onclick = () =>{
                if(ch === myQuestion[currentIndex].right_answer){
                    result++;
                }
                currentIndex++;
                currentQ.innerHTML++
                // next q 
                addData(myQuestion[currentIndex] , myQuestionCount);
                //handel spans
                handelBullets();
                // re emty
                re()
                // end
                end(result , myQuestionCount);
            }
        }
    }
    myRequest.open("GET", "HTML-questions.JSON" , true);
    myRequest.send();
}
getData();
// Create the bullets function
let qNum = document.getElementById("qNum");
let qSpans = document.getElementById("show");
function createQustionSpans(num){
    qNum.innerHTML = num;
    //create spans = NUM of Q
    for(let i=0; i<num ; i++){
        let span = document.createElement('span');
        // check if this is the first span 
        if(i===0){
            span.className = 'on';
        }
        qSpans.appendChild(span);
    }
}

// Add Data 
let q = document.getElementById("q");
function addData(obj , count){
    if(currentIndex < count){
        q.innerHTML = obj.title;
        a1.innerHTML = obj.answer_1;
        a2.innerHTML = obj.answer_2;
        a3.innerHTML = obj.answer_3;
        a4.innerHTML = obj.answer_4;
    }
}

// handel bullets
function handelBullets(){
    let allSpans = document.querySelectorAll('.bulets .container .show span')
    let arrayQspans = Array.from(allSpans);
    console.log(arrayQspans)
    arrayQspans.forEach((span , index) =>{
        if(currentIndex === index){
            span.className = "on";
        }
    })
}

// re defult answers
function re(){
    a1.id = '';
    a2.id = '';
    a3.id = '';
    a4.id = '';
}

// End Q and display result 
let qp = document.querySelector('.quizIntro .container p');
function end(res , count){
    if(currentIndex === count){
        let rate;
        if(res>=9){
            rate = 'We Are Best Friend';
        }else if (res >= 6 && res < 9){
            rate = 'We Are Friends but not the best';
        }else if(res >= 4 && res < 6){
            rate = 'We Are just Friends';
        }else{
            rate = 'We Are Not Friends';
        }
        box.innerHTML = "";
        qSpans.style.opacity = '0'
        next.style.opacity = '0'
        pre.style.opacity = '0'
        qNum.style.opacity = '0'
        qp.innerHTML = `Your Rate: <span style="color:var(--Q-color);
        font-size: 37px;">${rate}</span> `
        setTimeout(() => {
            box.innerHTML = `<h1 class="result">
            <span>${res}</span>  right Answers from <span>${count}</span>
            </h1>`
            box.style.cssText = `    display: flex;
            justify-content: center;
            align-items: center;`
        }, 3000);
    }
}