import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class InsertionSort extends Component {


    sleep = delay => new Promise(resolve => setTimeout(resolve, delay))

    sort = async () => {    

        let {arr, updateArr, updateHighlightedIndices, updateSwapIndices, updateParameters} = this.props

        updateParameters(false, true); // skip = false, currentlySorting = true

        for(let i = 1; i < arr.length; i++)
        {
            let pos = i

            if(!this.props.skip)
            {   
                updateSwapIndices(pos, pos - 1, 'before')
                await this.sleep(this.props.delay)
            }
            

            while(pos !== 0 && arr[pos - 1] > arr[pos])
            {
                if(!this.props.skip)
                {
                    updateSwapIndices(pos, pos - 1, 'before');
                    await this.sleep(this.props.delay);
                }
                
                [arr[pos], arr[pos - 1]] = [arr[pos - 1], arr[pos]];
                //updateArr(arr)

                if(!this.props.skip)
                {
                    updateSwapIndices(pos, pos - 1, 'after');
                    await this.sleep(this.props.delay);
                }
                
                --pos;
            }

            if(!this.props.skip)
            {
                updateSwapIndices(pos, pos - 1, 'after');
                await this.sleep(this.props.delay);
                updateHighlightedIndices(-1, -1, i + 1, 1000);
                await this.sleep(this.props.delay);
            }
            
        }

        // Sorting complete
        updateSwapIndices(-1, -1);
        updateParameters(false, false);
        updateHighlightedIndices(-1, -1, arr.length, 1000);
        await this.sleep(500);
        updateHighlightedIndices(-1, -1, -1, 1000);

    }

    render() {

        return (
            <button onClick={this.sort.bind(this)} disabled={this.props.currentlySorting}>Insertion Sort</button>
        )
    }

}

InsertionSort.propTypes = {
    arr: PropTypes.array.isRequired,
    updateArr: PropTypes.func.isRequired
}

export default InsertionSort