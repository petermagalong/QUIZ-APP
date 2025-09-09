import { useState } from "react";
import Results from "./results";

function Quiz(){
    const questionBank = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Lisbon"],
            answer: "Paris"
        },
        {
            question: "What is JSX stand for?",
            options: ["JavaScript XML", "Java SourceX", "JavaScript and XML", "None of the above"],
            answer: "JavaScript XML"
        },
        {
            question: "Which of the following is not a React feature?",
            options: ["JSX", "Components", "Virtual DOM", "Two-way Data Binding"],
            answer: "Two-way Data Binding"
        }
    ]

    const initialAnswers = [null, null, null];

    const [userAnswers, setUserAnswers] = useState(initialAnswers);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [isQuizFinished, setIsQuizFinished] = useState(false);

    const selectedAnswer = userAnswers[currentQuestionIndex]
    function handleSelectOption(option){
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = option

        setUserAnswers(newAnswers);
    }

    function gotoNext(){
        if(currentQuestionIndex === questionBank.length -1)
        {
            setIsQuizFinished(true)
        }else{
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        }
        

    }

    function gotoPrev(){
        if(currentQuestionIndex > 0)
        {
            setCurrentQuestionIndex(currentQuestionIndex - 1)
        }

    }

    function restartQuiz(){
        setUserAnswers(initialAnswers)
        setCurrentQuestionIndex(0)
        setIsQuizFinished(false)
    }

    if(isQuizFinished){
        return <Results userAnswers={userAnswers} questionBank={questionBank} restartQuiz={restartQuiz}/>
    }

    return <div>
        <h2>Question {currentQuestionIndex+1}</h2>
        <p className="queston"> {questionBank[currentQuestionIndex].question} </p>
        {questionBank[0].options.map((option) => 
        <button 
            key={option} 
            className={"option" + (selectedAnswer === option ? " selected":"")}
            onClick={() => handleSelectOption(option)}
        >
        {option}
        </button>
        )}

        <div className="nav-buttons">
            <button onClick={gotoPrev} disabled={currentQuestionIndex===0}>Previous</button>
            <button onClick={gotoNext} disabled={!selectedAnswer}>
                {currentQuestionIndex === questionBank.length -1 ? "Finnish Question": "Next"}
            </button>
        </div>
    </div>
}

export default Quiz;