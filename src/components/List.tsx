import { useContext, useEffect, useState } from 'react';
import styles from '../styles/components/list.module.css'
import { Context } from '../services/Context';
import useWebSocket, { ReadyState } from "react-use-websocket"

export default function List() {

    const { listData } = useContext(Context);
    const [listArray, setListArray] = useState([{ listName: 'List 1', listValues: [] as any[] }]);
    const [currentList, setCurrentList] = useState('List 1');
    const [listCount, setListCount] = useState(2);
    const [shownArray, setShownArray] = useState<any[]>([]);
    const [WS_URL] = useState("wss://data-stream.binance.com/stream?streams=ethbtc");
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        WS_URL,
        {
            share: false,
            shouldReconnect: () => true,
        },
    )

    useEffect(() => {
        if (readyState === ReadyState.OPEN) {
            sendJsonMessage({
                method: "SUBSCRIBE",
                params: [
                    "btcusdt@aggTrade",
                ],
                id: 1
            })
        }
    }, [readyState])

    useEffect(() => {
    }, [lastJsonMessage])

    useEffect(() => {
        setList(currentList)
    }, [listData]);

    useEffect(() => {
        setShownList(currentList)
    }, [currentList]);

    function setList(list: string) {
        const index = listArray.findIndex(item => item.listName === list);
        listArray[index].listValues = listData
        setShownArray(listArray[index].listValues)
    }

    function addList() {
        setListCount(listCount + 1)
        let tempList: any = [];
        tempList = tempList.concat(listArray);
        tempList.push({ listName: `List ${listCount}`, listValues: [] })
        setListArray(tempList)
    }

    function setShownList(list: string) {
        const index = listArray.findIndex(item => item.listName === list);
        setShownArray(listArray[index].listValues)
    }

    function handleSelect(event: any) {
        setCurrentList(event.target.value)
    }

    return (
        <div className={styles.container}>
            <div className={styles.selectContainer}>
                <select className={styles.input} onChange={handleSelect} name="selectList" id="selectList">
                    {
                        listArray.map((item: any) => {
                            return (
                                <option value={item.listName} key={item.listName} >{item.listName}</option>
                            )
                        })
                    }

                </select>
                <button className={styles.button} type="button" onClick={addList}>+</button>
            </div>
            <table className={styles.table} cellSpacing={0}>
                <tbody>
                    <tr>
                        <th>Symbol</th>
                        <th>Last Price</th>
                        <th>Bid Price</th>
                        <th>Ask Price</th>
                        <th>Price Change</th>
                    </tr>
                    {
                        shownArray.map((item: any) => {
                            return (
                                <tr key={item}>
                                    <td>{item}</td>
                                    <td>0.0012</td>
                                    <td>0.0025</td>
                                    <td>0.0014</td>
                                    <td>0.0023</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}