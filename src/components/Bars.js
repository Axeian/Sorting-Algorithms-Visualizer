import React, { Component } from 'react'

export class Bars extends Component {

    extraStyle = index => {

        let {borderedIndices} = this.props
        let style = {}

        if(borderedIndices.includes(index))
        {
            style['borderTop'] = '8px solid black'
            style['color'] = 'white'
        }

        return style
    }


    getColor = index => {

        let {idx1, idx2, leftSorted, rightSorted, swapIdx1, swapIdx2, swapStage, sortedIndices} = this.props

        if(index === swapIdx1 || index === swapIdx2)
        {
            if(swapStage === 'before')
                return '#F08080'
            else 
                return '#32CD32'
        }
        else if(index < leftSorted || index > rightSorted || sortedIndices.includes(index))
            return 'white'
        else if(index === idx1)
            return '#DDA0DD'
        else if(index === idx2)
            return '#000080'
        else
            return 'grey'
    }

    getStyle = (num, index) => {

        let width = 360/this.props.arr.length;

        return({
            height: `${5 * num}px`,
            backgroundColor: this.getColor(index),
            margin: '2px',
            width: `${width}px`, // 16px default
            color: 'white',
            fontSize: `${width/3}px`,
            textAlign: 'center'
        })
    }



    render() {

        let {arr} = this.props
        let width = 360/arr.length;

        return (

            <div className="d-flex justify-content-center">
                {arr.map( (num, index) => (

                    <div>
                        <div style={{
                                        textAlign: 'center',
                                        fontSize: `${width/3}px`,
                                        border: '1px solid white',
                                        fontWeight: 'bold',
                                        color: 'white'
                                    }}>{num}</div>
                        <div key={index} style={{...this.getStyle(num, index), ...this.extraStyle(index)}}>
                                
                        </div>
                    </div>
                    

                ))}
            </div>
                
                
        )
    }
}

export default Bars
