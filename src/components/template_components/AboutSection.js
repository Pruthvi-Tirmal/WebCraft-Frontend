import JoditEditor from 'jodit-react'
import React, { useState } from 'react'
import Headline from './Headline'
import LayoutBox from './LayoutBox'

export const AboutSection = ({ theme, aboutInfo }) => {
    return (
        <LayoutBox theme={theme}>
            <Headline title="About Company" />
            <div id='userabout' className='w-[95%] mx-auto bg-gray-800 text-white mt-4 rounded-lg shadow-lg h-auto p-4 px-8'>
                {
                    <div dangerouslySetInnerHTML={{ __html: aboutInfo }} />
                }

            </div>
        </LayoutBox>
    )
}
