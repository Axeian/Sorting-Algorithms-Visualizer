import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class MergeSort extends Component {


    sleep = delay => new Promise(resolve => setTimeout(resolve, delay))

    merge = async (arr, beg, mid, end) => {

        let {updateArr, updateHighlightedIndices, updateSwapIndices, updateBorderedIndices} = this.props

        if(!this.props.skip)
        {
            let borderedIndices = Array.from({length: end-beg+1}, (x, i) => i + beg)
            await this.sleep(this.props.delay)
            updateBorderedIndices(borderedIndices)
            await this.sleep(this.props.delay)
        }


        let flag = 0
        if(arr.length === end-beg+1)
            flag = 1;

        let ptr1 = beg, ptr2 = mid + 1

        while(ptr1 < ptr2 && ptr2 <= end)
        {
            if(!this.props.skip)
            {
                updateHighlightedIndices(ptr1, ptr2, (flag) ? ptr1 : -1, 1000)
                await this.sleep(this.props.delay)              
            }


            if(arr[ptr1] >= arr[ptr2])
            {
                if(!this.props.skip)
                {
                    updateSwapIndices(ptr1, ptr2, 'before')
                    await this.sleep(this.props.delay)
                }

                let temp = arr[ptr2]
                for(let i = ptr2; i > ptr1; i--)
                {
                    arr[i] = arr[i - 1]
                    //updateArr(arr)
                }
                arr[ptr1] = temp

                if(!this.props.skip)
                {
                    updateSwapIndices(ptr1, ptr1 + 1, 'after')
                    await this.sleep(this.props.delay)
                    updateSwapIndices(-1, -1, '')                    
                }

                ptr2++;
            }
            ptr1++;
        }

        if(!this.props.skip)
        {
            updateBorderedIndices([])
            updateHighlightedIndices(-1, -1, (flag) ? arr.length : -1, 1000)
        }

        return Promise.resolve();
    }

    mergeSort = async (arr, beg, end) => {

        let {updateArr, updateSwapIndices} = this.props

        if(beg >= end)
            return Promise.resolve();

        if(end === beg + 1)
        {
            if(!this.props.skip)
            {
                updateSwapIndices(beg,end, 'before')
                await this.sleep(this.props.delay)
            }

            if(arr[beg] > arr[end])
            {
                [arr[beg], arr[end]] = [arr[end], arr[beg]]
                //updateArr(arr)
            }

            if(!this.props.skip)
            {
                updateSwapIndices(beg,end, 'after')
                await this.sleep(this.props.delay)
                updateSwapIndices(-1,-1, '')
            }

            return Promise.resolve();
        }

        let mid = Math.floor((beg + end) / 2)

        await this.mergeSort(arr, beg, mid)
        await this.mergeSort(arr, mid + 1, end)
        await this.merge(arr, beg, mid, end)

        return Promise.resolve();

    }


    sort = async () => {    

        let {arr, updateArr, updateParameters, updateHighlightedIndices, updateSwapIndices, updateBorderedIndices} = this.props

        updateParameters(false, 'merge'); // skip = false, currentlySorting = true

        await this.mergeSort(arr, 0, arr.length - 1)
        //updateArr(arr)

        // Sorting complete
        updateSwapIndices(-1, -1, '');
        updateParameters(false, false);
        updateBorderedIndices([]);
        updateHighlightedIndices(-1, -1, arr.length, 1000);
        await this.sleep(500, false)
        updateHighlightedIndices(-1, -1, -1, 1000);
        

    }

    render() {

        return (
            <button onClick={this.sort.bind(this)} disabled={this.props.currentlySorting}
            className={this.props.currentlySorting === 'merge' ? 'btn btn-success' : 'btn btn-secondary'}>Merge Sort</button>
        )
    }

}

MergeSort.propTypes = {
    arr: PropTypes.array.isRequired,
    updateArr: PropTypes.func.isRequired
}

export default MergeSort
