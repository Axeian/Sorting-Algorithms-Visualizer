import React, { createContext, useState } from 'react'


export const ArrayContext = createContext();

export const randomizeArray = () => {

    let arr = []
    for(let i = 0; i < 20; i++)
        arr.push(Math.floor(Math.random() * 60) + 1)
    
    return arr
  }

export const ArrayStateProvider = props => {
    const [arrayState, setArrayState] = useState(
        {arr: randomizeArray(),
        idx1: -1,
        idx2: -1,
        leftSorted: -1,
        rightSorted: 1000,
        swapIdx1: -1,
        swapIdx2: -1,
        swapStage: '',
        skip: false});

    return (
        <ArrayContext.Provider value='hello' >
            {props.children}
        </ArrayContext.Provider>
    )
}
 

