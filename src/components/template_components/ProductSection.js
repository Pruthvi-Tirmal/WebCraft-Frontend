import React from 'react'
import Headline from './Headline'
import LayoutBox from './LayoutBox'
import Masonry from 'react-masonry-css'
import './masonry.css'
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'
const ProductSection = ({ theme, productsInfo, files, whatsappNumber }) => {
    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    }
    return (
        <LayoutBox theme={theme}>
            <Headline title="Products And Services Information" />
            <div id='userproducts' className='w-[95%] mx-auto mt-4 rounded-lg relative shadow-lg text-white min-h-[20vh] bg-gray-800'>
                <div className='p-4 px-8'>
                    {
                        <div dangerouslySetInnerHTML={{ __html: productsInfo }} />
                    }
                </div>
                <div className='p-5'>
                    <Gallery>

                        <Masonry
                            breakpointCols={breakpoints}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column">
                            {
                                files?.map((item, index) => (
                                    <div className="cursor-pointer flex flex-col items-center space-y-3" key={index}>
                                        <Item original={item.encoded} key={index} width="1024" height="768"  >
                                            {({ ref, open }) => (
                                                <img ref={ref} onClick={open} alt="error" src={item.encoded} />
                                            )}
                                        </Item>
                                        <a href={`https://wa.me/${whatsappNumber}?text=Hi, I am interested in your product/service no.${index + 1}, please provide more details`} className={`px-7 py-2 text-lg rounded-full hover:scale-95 cursor-pointer transform duration-150 ease-in transition-all shadow-lg ${theme}`}>
                                            Enquiry
                                        </a>
                                    </div>
                                ))
                            }
                        </Masonry>
                    </Gallery>
                </div>
            </div>
        </LayoutBox>
    )
}

export default ProductSection