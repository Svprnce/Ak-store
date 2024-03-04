const Carousel = () => {

    return (
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="1000">
                    <img src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/36edcda6bdf9ca8a.jpg?q=20" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                    <img src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/7fd0e4ab26429926.jpg?q=20" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item" data-bs-interval="1000">
                    <img src="https://rukminim2.flixcart.com/fk-p-flap/1000/170/image/3fdd64e1495a855a.jpeg?q=20" className="d-block w-100" alt="..."/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carousel