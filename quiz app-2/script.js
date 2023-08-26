const question = document.querySelector('#quest')
const nextQuestion = document.querySelector('#next_question')
const scoreBoard = document.querySelector('.scoreboard')
const timer = document.querySelector('#checktimer')
const options = document.querySelectorAll('.btn')
const optionValues = document.querySelectorAll('.values')
const checkIcons = document.querySelectorAll('#icon')
const progressBar = document.querySelector('.progress-bar')
const progress = document.querySelector('#progress')
const btn = document.querySelectorAll('button')
const questionsLeft = document.querySelector('#questions-left p')
const remarks = document.querySelector('.remarks')
const display_questions = document.querySelector('.display-questions')

let is_checked = false;
let is_correct = false
let is_completed = false
let questionNum = 1
let maxQuestions = 6
let currentScore = 0
let timeLeft = 10
let results = 0
let timerInterval;
timer.innerText = timeLeft



const generateRandomNumber = () => {
    let randomNum = Math.floor(Math.random() * 100)
    return randomNum
}

const generateQuestion = () => {
    updateTime()
    let firstNum = generateRandomNumber()
    let secondNum = 0
    if(secondNum !== firstNum) {
        secondNum = generateRandomNumber()
    }
    results = eval(firstNum + secondNum)
    question.innerHTML = `${questionNum}.   ${firstNum} + ${secondNum}`
    questionsLeft.textContent = `${questionNum} of ${maxQuestions - 1} questions left`
    questionNum++
    generateOptions(results)

}

const generateOptions = (results) => {
    for(let i = 0; i < optionValues.length; i++){
        optionValues[i].textContent =  generateRandomNumber() + generateRandomNumber()
    }
    optionValues[Math.floor(Math.random() * 3)].textContent = results

    handleCheckOptions()
}

const handleCheckOptions = () => {
    nextQuestion.disabled = true
    options.forEach((option) => {
        option.addEventListener('click', (e)=>{
            if(e.target.querySelector('.values').textContent == results) {
                clearInterval(timerInterval)
                option.style.borderColor = '#2bab2b'
                e.target.querySelector('#icon').innerHTML = `
                <span class="material-symbols-outlined">check</span>`
                is_correct = true
            } else {
                clearInterval(timerInterval)
                option.style.borderColor = 'red'
                e.target.querySelector('#icon').innerHTML = `
                <span class="material-symbols-outlined"></span>`
                e.target.querySelector("#icon").querySelector('span').textContent = 'close'
                is_correct = false
            }
            is_checked = true
            if(is_checked) {
                options.forEach(option => {
                    option.disabled = true;
                    option.style.color = '#000000'
                })
                nextQuestion.disabled = false
            }

    })}) 
}

nextQuestion.addEventListener('click', ()=>{
    display_questions.style.transform = 'scale(1)';
    document.querySelector('.intro').style.transform = 'scale(0)'
    generate()
})

const updateTime = () => {
    timeLeft = 10
    clearInterval(timerInterval)
    timerInterval = setInterval(()=>{
        if (timeLeft > 0) {
            timeLeft--;
            timer.innerText = timeLeft;
    
            let width = timeLeft * 10;
            progressBar.style.width = `${width}%`;
            width <= 40 ? progress.style.backgroundColor = 'red' : progress.style.backgroundColor = 'green'
        } else {
            generate()
        }
    }, 1000);
    if(timeLeft == 7) {
        console.log('yeah')
    }
}

const generate = () => {
    if(is_correct) {
        currentScore += 10
    }
    if(questionNum === maxQuestions) return showScoreBoard()
    generateQuestion()

    options.forEach((option) => {
        option.disabled = false
        option.style.borderColor = '#0090ff'
    })
    
    checkIcons.forEach((icon) => {
        icon.innerHTML = ''
    })
}

const showScoreBoard = () => {
    scoreBoard.style.display = 'block'
    clearInterval(timerInterval)
    remarks.innerHTML = `
        <p class="points">${currentScore} points</p>
        <p class="remarks_"></p>
        <span>${currentScore / 10} / 5 question</span>
    `
    const p = document.querySelector('.remarks_')
    if(currentScore == 50) {
        p.textContent = 'Excellent'
    } else if (currentScore >= 30 && currentScore < 50) {
        p.textContent = 'Well done';
    } else if(currentScore < 30) {
        p.textContent = 'Try again'
    }
    is_completed = true
}

document.addEventListener('click', (e) => {
    if(e.target === document.querySelector('body') && is_completed) {
        scoreBoard.style.display = 'none'
        questionNum = 1
        generateQuestion()
        options.forEach((option) => {
            option.disabled = false
            option.style.borderColor = '#0090ff'
        })
        
        checkIcons.forEach((icon) => {
            icon.innerHTML = ''
        })
        currentScore = 0
        is_completed = false
    }
    return
});