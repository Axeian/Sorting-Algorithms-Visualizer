import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class InsertionSort extends Component {

    sort = async () => {    

        let {arr, updateArr, updateHighlightedIndices, updateSwapIndices, updateParameters} = this.props

        updateParameters(false, 'insertion'); // skip = false, currentlySorting = true

        for(let i = 1; i < arr.length; i++)
        {
            let pos = i

            if(!this.props.skip)
            {   
                updateSwapIndices(pos, pos - 1, 'before')
                await this.props.sleep(this.props.delay)
            }
            

            while(pos !== 0 && arr[pos - 1] > arr[pos])
            {
                if(!this.props.skip)
                {
                    updateSwapIndices(pos, pos - 1, 'before');
                    await this.props.sleep(this.props.delay);
                }
                
                [arr[pos], arr[pos - 1]] = [arr[pos - 1], arr[pos]];
                //updateArr(arr)

                if(!this.props.skip)
                {
                    updateSwapIndices(pos, pos - 1, 'after');
                    await this.props.sleep(this.props.delay);
                }
                
                --pos;
            }

            if(!this.props.skip)
            {
                if(pos !== 0)
                {
                    updateSwapIndices(pos, pos - 1, 'after');
                    await this.props.sleep(this.props.delay);
                }
                updateSwapIndices(-1, -1);
                updateHighlightedIndices(-1, -1, i + 1, 1000);
                await this.props.sleep(this.props.delay);
            }
            
        }

        // Sorting complete
        updateSwapIndices(-1, -1);
        updateParameters(false, false);
        updateHighlightedIndices(-1, -1, arr.length, 1000);
        await this.props.sleep(500);
        updateHighlightedIndices(-1, -1, -1, 1000);

    }

    render() {

        return (
            <button onClick={this.sort.bind(this)} disabled={this.props.currentlySorting}
            className={this.props.currentlySorting === 'insertion' ? 'btn btn-success' : 'btn btn-secondary'}>Insertion Sort</button>
        )
    }

}

InsertionSort.propTypes = {
    arr: PropTypes.array.isRequired,
    updateArr: PropTypes.func.isRequired
}

export default InsertionSort
