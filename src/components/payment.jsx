import { useSelector, useDispatch } from 'react-redux'
import { handlepayment } from '../../utils/fetch'
import {useNavigate} from 'react-router-dom'
import { clearcartinstate } from '../app/slices/userSlice'
//(state) => state.user.usercarts
const Paymentcomponent = () => {
   
    const orderinfo = useSelector((state) => state.orderstate.orderedinfo)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const loadrazorpay = (src)=>{
        return new Promise((resolve)=>{
            const script = document.createElement("script")
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script)
        })
    }
    
    var options = {
        "key": process.env.REACT_APP_RAZORPAY_KEYID, // Enter the Key ID generated from the Dashboard
        "amount": orderinfo.totalamount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Ak Store", //your business name
        "description": "Keep it Simple- Go Digital",
        "image": "https://https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png.com/your_logo",
        "order_id": orderinfo.paymentid, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response) {
            if(!response){
                console.log('error');
            }
            let orderidwithresponce = {
                ...response,
                orderid : orderinfo.orderid
            }
            handlepayment(orderidwithresponce).then((res)=>{
                //console.log(res);
                if(res){
                    dispatch(clearcartinstate())
                    navigate('/')
                }
            })
            //console.log(response);
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
        },
        
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            "name": "Ak Store", //your customer's name
            "email": "payment@akstore.com",
            "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Akstore Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };

   // console.log(rzp1);
   
   const handlepay = async (e)=>{
       e.preventDefault();
       const res = await loadrazorpay("https://checkout.razorpay.com/v1/checkout.js")
       var rzp1 = new Razorpay(options);
       rzp1.on('payment.failed', function (response) {
           alert(response.error.code);
           alert(response.error.description);
           alert(response.error.source);
           alert(response.error.step);
           alert(response.error.reason);
           alert(response.error.metadata.order_id);
           alert(response.error.metadata.payment_id);
       });
       if(!res){
            //console.log('error occured');
            return;
        }
        else{
           // console.log('ok');
        }
        rzp1.open();
    }
    return (
        <>
        <div className="w-100 text-center">

            <div className="btn btn-success mt-2" id='rzp-button1' onClick={(e)=>handlepay(e)}>Pay Now</div>
        </div>
        </>
    )
}

export default Paymentcomponent