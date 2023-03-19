import React, { useState } from 'react'
import FaqList from './FaqList'

const FAQ = () => {
    const [faq, setFaq] = useState([{
        id: 1,
        question: "Q1. How can i create my Website?",
        answer: <div>
            To create a website, make sure that the following information is included. <br /> <br />
            <b>Your Logo</b><br />
            First and foremost, your business logo you can display this card here.<br /> <b>Social media button</b><br />Connect directly to your social media account with the help of social media buttons.<br /><b>Click to call</b><br />With the help of this digital card, your client will be able to call you on one click.<br /><br />To create a website, webcraft.com is the best platform to create one. With the help of this you can create elegant and multipurpose digital cards maker. Our webcraft.com also allows you to share your created card anytime anywhere
        </div>,
        open: true
    }, {
        id: 2,
        question: "Q2. What is difference between a Smart Digital Card and a Digital Business Profile?",
        answer: <div>
            <b>Smart Digital Card</b> <br />This card is quite similar to tradition visiting cards but this is in electronic form, which makes your work easier and faster. Your customer can contact you immediately with this vcard.<br /> <b>Digital Business Profile</b><br />In these cards you can add information about the facilities and services accessible to your clients or customers. You can keep different types of photo galleries related to your business and can also upload your youtube video for more reference or information in a mini website.<br />
        </div>,
        open: false
    }, {
        id: 3,
        question: "Q3. How and where can I save these card?",
        answer: "Yes! You can easily edit and modify your card whenever you want by logging in from the customer login panel all on your own! The card can be edited unlimited times!",
        open: false
    }, {
        id: 4,
        question: "Q4. How can I share or use these cards?",
        answer: "vCards are very easy to use, you just need to share the link after filling up all the relevant details. The specialty of this card is that you can use this digital form of card mostly anywhere and anytime.",
        open: false
    }, {
        id: 5,
        question: "Q5. Why use these Online Digital Card?",
        answer: "In Today’s era, everyone puts their business efforts digitally, so do the customers. And most importantly, customers will find your online digital card very convenient.",
        open: false
    }, {
        id: 6,
        question: "Q6. What are the advantages of a Web Maker?",
        answer: <div>
            Anyone can easily make these cards on our Web Maker, it’s easy to share your with business prospects and existing clients. Other major advantages are mentioned below:<br /><br /><b><ul><li>Great First Impact</li><li>Environment-friendly</li><li>Time Saving</li><li>Inexpensive</li><li>Single Platform</li><li>Easy Access</li><li>Easy Updating</li></ul></b>
        </div>,
        open: false
    }, {
        id: 7,
        question: "Q7. Why Digital Business Card?",
        answer: "WebsiteCraft is a visual tactic to demonstrate the business message with digital communication, which is in use nowadays. Yes, most corporate and executives are now keen on digital business cards for their sustainability.",
        open: false
    }])
    const toggleList = (id) => {
        setFaq(faq.map((item,) => {
            if (id === item.id)
                item.open = !item.open
            else
                item.open = false
            return item
        }))
    }
    return (
        <div className='bg-[#eee]  pt-10 pb-5'>
            <div className='sm:max-w-[80%] mx-auto max-w-[90%] mb-10'>
                <h1 className='text-gray-800 font-sans text-center text-5xl font-bold'>FAQ<span>s</span></h1>
                <div className='mt-12 space-y-5'>
                    {faq.map((item) => (
                        <FaqList key={item.id} faq={item} id={item.id} toggleFaq={toggleList} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FAQ