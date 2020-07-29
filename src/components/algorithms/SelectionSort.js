import React, { Component } from 'react'
import PropTypes from 'prop-types'



export class SelectionSort extends Component {


    sleep = delay => new Promise(resolve => setTimeout(resolve, delay))


    sort = async () => {    

        let {arr, updateArr, updateHighlightedIndices, updateSwapIndices, updateParameters} = this.props

        updateParameters(false, true); // skip = false, currentlySorting = true

        for(let i = 0; i < arr.length; i++)
        {
            let minIdx = i , j
            for(j = i; j < arr.length; j++)
            {
                if(!this.props.skip)
                {
                    updateHighlightedIndices(minIdx, j, i, 1000) //updateHighlightedIndices has arguements (idx1, idx2, leftSorted, rightSorted)
                    await this.sleep(this.props.delay/2)
                }
                
                if(arr[j] < arr[minIdx])
                    minIdx = j   
            }
            
            if(!this.props.skip)
            {
                // highlighting the indices that are about to be swapped
                updateHighlightedIndices(-1, j, i, 1000) 
                updateSwapIndices(i, minIdx, 'before')
                await this.sleep(1.5*this.props.delay);
            }

            [arr[minIdx], arr[i]] = [arr[i], arr[minIdx]]
            //updateArr(arr)

            if(!this.props.skip)
            {
                updateSwapIndices(i, minIdx, 'after')
                await this.sleep(1.5*this.props.delay)

                updateHighlightedIndices(-1, j, i + 1, 1000) 
                updateSwapIndices(-1, -1, 'before') // Unhighlighting the swapped indices
                await this.sleep(1.5*this.props.delay)
            }
        }

        // Sorting complete
        updateSwapIndices(-1, -1);
        updateParameters(false, false);
        updateHighlightedIndices(-1, -1, arr.length, 1000);
        await this.sleep(500)
        updateHighlightedIndices(-1, -1, -1, 1000);
    }

    render() {

        return (
            <button onClick={this.sort.bind(this)} disabled={this.props.currentlySorting}>Selection Sort</button>
        )
    }

}

SelectionSort.propTypes = {
    arr: PropTypes.array.isRequired,
    updateArr: PropTypes.func.isRequired
}

export default SelectionSort
