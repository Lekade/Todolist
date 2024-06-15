import React from 'react';
import {City} from "./City";
import {BanknotsType, MoneyType} from "./App";
import styled from "styled-components";

type CountryPropsType = {
    data: MoneyType[]
    setFilterValue: (filterValue: BanknotsType) => void  // давайте подумаем, setFilter -это грузчик, у которого всегда в руках товар
    addMoney: (banknote: BanknotsType) => void
    removeMoney: (banknote: BanknotsType) => void
  }

export const Country = ({data, setFilterValue, addMoney, removeMoney}:CountryPropsType) => {
    // с деструктуризацией пожалуйста
    const setAll=(filterValue: BanknotsType)=>{
        setFilterValue(filterValue)
    }

    const setUSD=(filterValue: BanknotsType)=>{
        setFilterValue(filterValue)
    }

    const setRUB=(filterValue: BanknotsType)=>{
        setFilterValue(filterValue)
    }

   const addMoneyHandler=(banknote: BanknotsType)=>{
       addMoney(banknote)
   }

   const removeMoneyHandler=(banknote: BanknotsType)=>{
       removeMoney(banknote)
   }

    return (
        <Terminal>
            <div>
                <button onClick={() => setAll('All')}>All</button>
                <button onClick={()=> setUSD('USD')}>Dollars</button>
                <button onClick={() =>setRUB('RUB')}>Rubles</button>
            </div>
            <div>
                {/*сделаем в последнюю очередь*/}
                <button onClick={() => addMoneyHandler('USD')}>Положить 100$</button>
                <button onClick={() => addMoneyHandler('RUB')}>Положить 100р.</button>
                <button onClick={() => removeMoneyHandler('USD')}>Снять 100$</button>
                <button onClick={() => removeMoneyHandler('RUB')}>Снять 100р.</button>
            </div>
            <City data={data}/>
        </Terminal>
    );
};

const Terminal = styled.span`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  font-size: 30px;
  background-color: #282c34;
`