import React, { Component } from 'react'
import PropTypes from 'prop-types'



export class BubbleSort extends Component {


    sleep = delay => new Promise(resolve => setTimeout(resolve, delay))

    sort = async () => {    

        let {arr, updateArr, updateHighlightedIndices, updateSwapIndices, updateParameters} = this.props;

        updateParameters(false, 'bubble'); // skip = false, currentlySorting = true

        let i, j;

        for(i = arr.length - 1; i > 0; i--)
        {
            for(j = 0; j < i; j++)
            {
                if(!this.props.skip)
                {
                    updateHighlightedIndices(-1, -1, -1, i);  
                    // updateHighlightedIndices has arguemnts: (idx1, idx2, leftSorted, rightSorted)
                    updateSwapIndices(j, j + 1, 'before');
                    await this.sleep(this.props.delay);
                }
                
                if(arr[j] > arr[j + 1])
                {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    //updateArr(arr);
                }

                if(!this.props.skip)
                {
                    updateSwapIndices(j, j + 1, 'after') ;
                    await this.sleep(this.props.delay);
                }
                
            }

        }

        // Sorting complete
        updateHighlightedIndices(-1, -1, -1, -1);
        updateSwapIndices(-1, -1);
        updateParameters(false, false);
        await this.sleep(500, false)
        updateHighlightedIndices(-1, -1, -1, 1000);

        return Promise.resolve();

    }

    render() {

        return (
            <button onClick={this.sort.bind(this)} disabled={this.props.currentlySorting}
            className={this.props.currentlySorting === 'bubble' ? 'btn btn-success' : 'btn btn-secondary'}
            >Bubble Sort</button>
        )
    }

}

BubbleSort.propTypes = {
    arr: PropTypes.array.isRequired,
    updateArr: PropTypes.func.isRequired
}


export default BubbleSort
