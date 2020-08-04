import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class HeapSort extends Component {

    state = {
        heapSize: this.props.arr.length
    }


    sleep = delay => new Promise(resolve => setTimeout(resolve, delay))

    parent = (i) => {
        return (i === 0) ? 0 : Math.floor((i - 1)/2)
    }

    leftChild = (arr, i) => {
        return (2 * i + 1 < this.state.heapSize) ? (2 * i + 1) : -1
    }

    rightChild = (arr, i) => {
        return (2 * i + 2 < this.state.heapSize) ? (2 * i + 2) : -1
    }

    siftDown = async (arr, i) => {

        let {updateArr, updateSwapIndices} = this.props

        let lChild = this.leftChild(arr, i)
        if(lChild === -1)
            return Promise.resolve();
        else
        {
            let rChild = this.rightChild(arr ,i)
            let greaterChild = lChild
            if(rChild !== -1)
                greaterChild = (arr[lChild] >= arr[rChild]) ? lChild : rChild

            if(!this.props.skip)
            {
                updateSwapIndices(greaterChild, i, 'before');
                await this.sleep(this.props.delay);               
            }

            if(arr[greaterChild] > arr[i])
            {
                [arr[greaterChild], arr[i]] = [arr[i], arr[greaterChild]]
                //updateArr(arr)

                if(!this.props.skip)
                {
                    updateSwapIndices(greaterChild, i, 'after');
                    await this.sleep(this.props.delay);
                    updateSwapIndices(-1, -1, '');
                }
                
                await this.siftDown(arr, greaterChild)
            }

            else
            {
                if(!this.props.skip)
                {
                    updateSwapIndices(greaterChild, i, 'after');
                    await this.sleep(this.props.delay); 
                    updateSwapIndices(-1, -1, '');                 
                }
                
            }

        }

        return Promise.resolve();

    }

    buildHeap = async () => {

        let {arr, updateArr} = this.props

        for(let i = Math.floor((arr.length - 1) / 2); i >= 0; i--)
        {
            await this.siftDown(arr, i)
            //updateArr(arr)
        }

        return Promise.resolve();
    }


    sort = async () => {    

        let {arr, updateArr, updateHighlightedIndices, updateSwapIndices, updateParameters} = this.props

        updateParameters(false, 'heap'); // skip = false, currentlySorting = true

        this.state.heapSize = arr.length
        
        await this.buildHeap(arr);

        while(this.state.heapSize)
        {
            if(!this.props.skip)
            {
                updateHighlightedIndices(0, this.state.heapSize - 1, -1, this.state.heapSize - 1)
                await this.sleep(this.props.delay);                
            }


            [arr[0], arr[this.state.heapSize - 1]] = [arr[this.state.heapSize - 1], arr[0]];
            //updateArr(arr)

            if(!this.props.skip)
            {
                updateHighlightedIndices(this.state.heapSize - 1, 0, -1, this.state.heapSize - 1)
                await this.sleep(this.props.delay);
            }

            this.setState(prevState => ({heapSize : prevState.heapSize - 1}))

            if(!this.props.skip)
            {
                updateHighlightedIndices(-1, -1, -1, this.state.heapSize - 1)
                await this.sleep(this.props.delay);                
            }

            await this.siftDown(arr, 0, this.state.heapSize)
        }


        // Sorting complete
        updateSwapIndices(-1, -1, '');
        updateParameters(false, false);
        updateHighlightedIndices(-1, -1, -1, -1);
        await this.sleep(500, false)
        updateHighlightedIndices(-1, -1, -1, 1000);
        

    }

    render() {

        return (
            <button onClick={this.sort.bind(this)} disabled={this.props.currentlySorting}
            className={this.props.currentlySorting === 'heap' ? 'btn btn-success' : 'btn btn-secondary'}>Heap Sort</button>
        )
    }

}

HeapSort.propTypes = {
    arr: PropTypes.array.isRequired,
    updateArr: PropTypes.func.isRequired
}

export default HeapSort
