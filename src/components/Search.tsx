import { useContext, useEffect, useState } from 'react';
import styles from '../styles/components/search.module.css'
import axios from 'axios';
import { Context } from '../services/Context';

export default function Search() {

    const [exchangeList, setExchangeList] = useState<any[]>([]);
    const [filteredList, setFilteredList] = useState<any[]>([]);
    const [checkedList, setCheckedList] = useState<any[]>([]);
    const { setListData } = useContext(Context);

    useEffect(() => {
        getExchangeData();
    }, []);

    async function getExchangeData() {
        axios.get('https://api.binance.com/api/v3/exchangeInfo')
            .then(response => {
                setExchangeList(response.data.symbols);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function handleInput(element: any) {
        const searchInput = element.target.value;
        const filter = exchangeList.filter((item) => {
            const symbol = item.symbol.toLowerCase();
            return symbol.includes(searchInput);
        })
        if (searchInput) {
            setFilteredList(filter);
        } else {
            setFilteredList([])
        }
    }

    function handleClick() {
        let tempList: any[] = [];
        tempList = tempList.concat(checkedList)
        setListData(tempList)
    }

    function handleCheck(event: any) {
        const symbol = event.target.value
        if (event.target.checked) {
            checkedList.push(symbol)
            setCheckedList(checkedList)
        } else {
            const index = checkedList.indexOf(symbol)
            checkedList.splice(index, 1)
            setCheckedList(checkedList)
        }
    }

    return (
        <div className={styles.container}>
            <input id="inputSearch" type="text" onChange={handleInput} className={styles.input} placeholder="Search"></input>

            <div className={styles.checkboxContainer}>
                <div className={styles.checkboxHeader}>
                    <input type="checkbox" name="checkAll" id="checkAll" />
                    <label htmlFor="checkAll"> Symbol </label>
                </div>
                <div className={styles.scrollBox}>
                    {
                        filteredList.map((exchange) => {
                            return (
                                <div className={styles.checkboxItem} key={exchange.symbol}>
                                    <input type="checkbox" onChange={handleCheck} name={exchange.symbol} id={exchange.symbol} value={exchange.symbol} />
                                    <label htmlFor={exchange.symbol}> {exchange.symbol} </label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <button className={styles.button} onClick={handleClick}>Add to List</button>
        </div>
    )
}