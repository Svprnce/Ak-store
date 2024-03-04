import { useEffect, useState } from "react"

const Scrolltotop = () => {
    const [showbtn, setshowbtn] = useState(false)

    useEffect(() => {

        const handlescroll = () => {
            window.scrollY > 300 ? setshowbtn(true) : setshowbtn(false)
        }
        
        window.addEventListener('scroll', handlescroll)

        return () => {
            window.removeEventListener('scroll', handlescroll)
        }
    }, [])

    const scrolltotop = (e) => {
        window.scroll({ top: 0, behavior: 'smooth' })
    }
    return (
        showbtn && (<div className="scrolltotop" onClick={(e) => scrolltotop(e)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
        </svg></div>)
    )
}

export default Scrolltotop