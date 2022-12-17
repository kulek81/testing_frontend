import { useEffect, useState } from "react";
import { useGetQuestionsQuery } from "../api/api";
import { Question } from "../Question/Question";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from './styles.module.css'

interface TestViewInterface {
    variant: number;
}

const TabsData = [
    "Конституция Республики Казахстан",
    "Закон РК \"О государственной службе Республики Казахстан\"",
    "Закон РК «О гос. Секретах»",
    "Закон РК «О правоохранительной службе»",
    "Закон РК «О противодействии коррупции»",
    "Закон РК «Об ОРД»",
    `Этический кодекс государственных служащих 
    (Правил служебной этики государственных служащих)
    `
]

const dataLength = 70


export const TestView = ({ variant }: TestViewInterface) => {
    const { data, isLoading, } = useGetQuestionsQuery(variant);
    const [tabIndex, setTabIndex] = useState(0);
    const [checkboxes, setCheckboxes] = useState(() => {
        if (!isLoading) {
            console.log(1);
            return Array(data?.length).fill(Array(4).fill(false));
        }
        else {
            console.log(2);
            return Array(dataLength).fill(Array(4).fill(false))
        }
    }); // количество вопросов
    const [checkAnswers, setCheckanswers] = useState(false);
    let count = -1;
    let counter = -1
    console.log(checkboxes);
    // const handleAnswers = (wrong: string, correct: String, index: number) => {
    //     if (checkAnswers) {

    //     }
    //     else {
    //         return '';
    //     }
    // };

    return (
        <>
            <h1>Вариант {variant}</h1>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    {TabsData.map((v, i) => (
                        <Tab>{v}</Tab>
                    ))}
                    <Tab>Ответы</Tab>
                </TabList>

                {TabsData.map((v, i) => (
                    <TabPanel>
                        {data?.filter(f => f.topic === i + 1).map((value, j) => {
                            count++;
                            return (
                                <>
                                    <Question
                                        {...value}
                                        checkboxes={checkboxes}
                                        // handleAnswers={handleAnswers}
                                        setCheckboxes={setCheckboxes}
                                        index={count}
                                    />
                                </>
                            )

                        })}

                    </TabPanel>

                ))}

                <TabPanel>
                    <table className={styles.table_answers}>
                        <thead>
                            <tr>
                                {TabsData.map((v, i) => (
                                    <th
                                        colSpan={data?.filter(f => f.topic === i + 1).length}
                                        className={styles.table_answers}>
                                        {v}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                {TabsData.map((v, i) => (
                                    data?.filter(f => f.topic === i + 1).map((value, index) => (
                                        <td
                                            className={styles.table_answers}
                                        >
                                            {index + 1}
                                        </td>
                                    ))
                                ))}
                            </tr>
                            <tr>
                                {TabsData.map((v, i) => (
                                    data?.filter(f => f.topic === i + 1).map((value, index) => {
                                        counter++;
                                        return (
                                            <td className={styles.table_answers}>
                                                {checkAnswers ? (value.answers.findIndex(ind => ind.rightAnswer === true) === checkboxes[counter].findIndex((ind: boolean) => ind === true) ? '+' : '-') : ''}
                                            </td>
                                        )
                                    })
                                )
                                )}
                            </tr>
                        </tbody>
                    </table>

                </TabPanel>
            </Tabs>
            <button onClick={() => setCheckanswers(true)}>Ответить</button>
        </>
    )
}


