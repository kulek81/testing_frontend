import { Dispatch, SetStateAction } from "react"
import { QuestionModel } from "../models"
// import styles from './styles.module.css'

interface QuestionInterface extends QuestionModel {
    checkboxes: boolean[][];
    // handleAnswers: (wrong: string, correct: string, index: number) => string;
    setCheckboxes: Dispatch<SetStateAction<boolean[][]>>;
    index: number;
}

export const Question = ({
    answers,
    question,
    // handleAnswers,
    checkboxes,
    setCheckboxes,
    index
}: QuestionInterface) => {


    const handleCheckboxes = (answersIndex: number) => {
        // setCheckboxes(checkboxes[index].map((v, i) => i === answersIndex ? true : false));\

        let newArray = [...checkboxes]
        newArray[index] = checkboxes[index].map((v, i) => i === answersIndex ? true : false)
        setCheckboxes(newArray);

    };

    return (
        <>
            <h4>{index + 1 + '.' + question}</h4>
            {answers.map((v, i) => (
                <div key={i}>
                    <input type="checkbox"
                        checked={checkboxes[index] && checkboxes[index][i]}
                        onChange={() => handleCheckboxes(i)}
                    />
                    <label
                    // className={handleAnswers(styles.wrong_answer, styles.correct_answer, i)}
                    >
                        {v.answer}
                    </label>
                </div>
            ))}

        </>
    )
}