import React from 'react'
import Headline from './Headline'
import LayoutBox from './LayoutBox'
import Masonry from 'react-masonry-css'
import './masonry.css'
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'
const GallerySection = ({ theme, files }) => {

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    }
    return (
        <LayoutBox theme={theme}>
            <Headline title="Gallery" />
            <div id='usergallery' className='rounded-md p-5 w-full bg-gray-800 shadow-lg'>
                <Gallery>
                    <Masonry
                        breakpointCols={breakpoints}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column">
                        {
                            files.map((item, index) => (
                                <div className="cursor-pointer" key={index}>
                                    <Item original={item.encoded} key={index} width="1024" height="768"  >
                                        {({ ref, open }) => (
                                            <img ref={ref} onClick={open} alt="error" src={item.encoded} />
                                        )}
                                    </Item>
                                </div>
                            ))
                        }
                    </Masonry>
                </Gallery>
            </div>
        </LayoutBox>
    )
}

export default GallerySection