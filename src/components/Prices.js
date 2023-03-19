import React from 'react'

const Prices = () => {

    const featureList = [{
        id: 1,
        title: "Share card with anyone, Unlimited times"
    }, {
        id: 2,
        title: "Update card unlimited times"
    }, {
        id: 3,
        title: "Logo/Profile Photo"
    }, {
        id: 4,
        title: "Contact detail with address"
    }, {
        id: 5,
        title: "Save card on mobile home screen"
    }, {
        id: 6,
        title: "Social media links and share"
    }, {
        id: 7,
        title: "Photos in gallery"
    }, {
        id: 8,
        title: "Select design from available templates"
    }, {
        id: 9,
        title: "Videos in YouTube video gallery"
    }, {
        id: 10,
        title: "Only Products/Services list"
    }, {
        id: 11,
        title: "Payment detail section"
    }]

    return (
        <div id="plan" className=" bg-[#fefefe]  flex justify-center gap-3">
            <div className='space-y-4 mt-32 mb-20'>
                <h1 className='text-slate-700 text-center font-bold text-3xl'>Choose Your Plan</h1>
                <p className='text-xl font-semibold  p-5 text-center text-slate-800'
                >Create your own digital card with <span className='text-gray-700 font-black capitalize'>affordable prices</span></p>
                <div className='shadow-lg bg-slate-50 ring-2 ring-blue-400 mx-auto p-3 sm:w-[350px] w-[90%] h-auto'>
                    <h1 className='text-center text-slate-600 font-semibold text-2xl'>Standard</h1>
                    <p className='text-center mt-5 text-4xl text-gray-700 font-bold'>&#8377; 99 <span className='text-xl'>/month</span></p>
                    <div className='mt-5 flex flex-col p-4'>
                        {featureList.map((item) => (
                            <p key={item.id} className='text-left text-[1.1rem] pt-2 pb-2 font-sans font-semibold text-gray-700'> &#x2714; {item.title}</p>
                        ))}
                    </div>
                    <button className='py-4 block mx-auto px-5 hover:ring-2 rounded-md hover:ring-blue-400 bg-blue-400 text-white text-base hover:bg-blue-300 transition-all duration-100 ease-linear hover:text-gray-800'>Create Card</button>
                </div>

            </div>
        </div>
    )
}

export default Prices