import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class QuickSort extends Component {


    sleep = delay => new Promise(resolve => setTimeout(resolve, delay))

    partition = async (arr, low, high) => {

        let {updateArr, updateHighlightedIndices, updateSwapIndices, updateBorderedIndices, updateSortedIndices, sortedIndices} = this.props

        let pivot = arr[low], j = low;

        for(let i = low + 1; i <= high; i++)
        {
            if(!this.props.skip)
            {
                let borderedIndices = Array.from({length: j - (low + 1) + 1}, (x, i) => i + low + 1)
                updateHighlightedIndices(low, i, -1, 1000);
                updateBorderedIndices(borderedIndices);
                await this.sleep(this.props.delay);
            }

            if(arr[i] <= pivot)
            {
                if(!this.props.skip)
                {
                    updateSwapIndices(i, j + 1, 'before');
                    await this.sleep(this.props.delay);
                }

                ++j;
                [arr[i], arr[j]] = [arr[j], arr[i]];

                if(!this.props.skip)
                {
                    updateSwapIndices(i, j, 'after');
                    await this.sleep(this.props.delay);
                    updateSwapIndices(-1, -1, '');
                    await this.sleep(this.props.delay);
                }   

                //updateArr(arr);
            }
        }

        if(!this.props.skip)
        {
            updateSwapIndices(low, j, 'before');
            await this.sleep(2*this.props.delay);
        }

        [arr[low], arr[j]] = [arr[j], arr[low]];
        //updateArr(arr);

        if(!this.props.skip)
        {
            updateSwapIndices(low, j, 'after');
            await this.sleep(2*this.props.delay);
            updateSwapIndices(-1, -1, '');
            updateSortedIndices([...sortedIndices, j]);
        }

        return Promise.resolve(j);

    }

    quickSort = async (arr, low, high) => {

        if(low <= high)
        {
            let pi = await this.partition(arr, low, high);
            await this.quickSort(arr, low, pi - 1);
            await this.quickSort(arr, pi + 1, high);
        }

        return Promise.resolve();
    }

    sort = async () => {    

        let {arr, updateArr, updateHighlightedIndices, updateSwapIndices, updateParameters, updateSortedIndices, updateBorderedIndices} = this.props

        updateParameters(false, true); // skip = false, currentlySorting = true

        console.log(this.props.skip)

        await this.quickSort(arr, 0, arr.length - 1);

        // Sorting complete
        updateSwapIndices(-1, -1);
        updateParameters(false, false);
        updateBorderedIndices([]);
        updateHighlightedIndices(-1, -1, arr.length, 1000);
        await this.sleep(500, false)
        updateHighlightedIndices(-1, -1, -1, 1000);
        updateSortedIndices([]);
        

    }

    render() {

        return (
            <button onClick={this.sort.bind(this)}  disabled={this.props.currentlySorting}>Quick Sort</button>
        )
    }

}

QuickSort.propTypes = {
    arr: PropTypes.array.isRequired,
    updateArr: PropTypes.func.isRequired
}

export default QuickSort
