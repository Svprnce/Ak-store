const Footer = () => {
    return (
        <div className="footer">
            <div className=" m-0 p-4 row">
                <div className="col">
                    <div className="h6">Links</div>
                    <ul>
                        <li>Home</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                    </ul>
                </div>
                <div className="col">
                    <div className="h6">Category</div>
                <ul>
                        <li>Electronics</li>
                        <li>Colthing</li>
                        <li>Gadgets</li>
                    </ul>
                </div>
                <div className="col">
                    <div className="h6">Address :</div>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate officia, repellendus error praesentium nesciunt laboriosam quas dolor quam sequi porro inventore libero, expedita facilis consequuntur.</p>
                </div>
            </div>
            <div className=" p-1 text-center border-top">
                <p> &#169; Copyright 2024 - Ak store</p>
            </div>
        </div>
    )
}

export default Footer