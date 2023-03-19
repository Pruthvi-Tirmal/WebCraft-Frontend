import React from 'react'
import { MagnifyingGlass } from 'react-loader-spinner'
const Loader = () => {
    return (
        <MagnifyingGlass
            visible={true}
            height="120"
            width="120"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{ margin: "auto" }}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor='#c0efff'
            color='#e15b64'
        />
    )
}

export default Loader