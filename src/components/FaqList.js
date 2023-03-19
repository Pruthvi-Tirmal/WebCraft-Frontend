import React from 'react'

const FaqList = ({ faq, toggleFaq, id }) => {
    return (
        <div className={"p-5 bg-[#fff] cursor-pointer rounded-md shadow-md border faq "} onClick={() => toggleFaq(id)}>
            <div className={'transition-all duration-100 ease-linear relative font-semibold text-xl pr-[80px] after:absolute after:top-[50%] after:right-0 after:-translate-y-[50%] after:w-[30px] h-auto ' + (faq.open ? " after:content-['-'] mb-[15px]" : "after:content-['+']")}>
                {faq.question}
            </div>
            <div className={' overflow-y-hidden transition-all ease-linear duration-100' + (faq.open ? " max-h-[1000px] opacity-1" : " opacity-0 max-h-0")}>
                {faq.answer}
            </div>
        </div>
    )
}

export default FaqList