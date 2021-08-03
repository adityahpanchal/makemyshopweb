import { API } from "../../../Backend"

const PaymentPage = () =>{

    const loadRazorPay = () =>{
        return new Promise((resolve, reject) =>{
            const script = document.createElement('script')
            script.src = 'https://checkout.razorpay.com/v1/checkout.js'
            script.onload = () =>{
                console.log('script done')
                resolve(true)
            }
            script.onerror = () =>{
                console.log('script done')
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }
    

    const displayRazorPay = async() =>{
        
        const res = await loadRazorPay()
        if(!res){
            alert('Rezorpay SDK failed to load')
        }

        const orderIdReq = await fetch(`${API}/razorpay`, {
            method: "POST"
        }).then(t => t.json())
        // console.log(orderIdReq)

        const options = {
            key: "rzp_test_D4ryD7Fh2aEnqp",
            amount: orderIdReq.paymentObj.amount, 
            currency: orderIdReq.paymentObj.currency,
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: orderIdReq.paymentObj.id, 
            handler: function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
                console.log(response)
            },
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9999999999"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#FF6A00"
            }
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    return(
        <div className="row" style={{marginTop: '40vh'}}>
            <div className="mx-auto card p-3 col-4">
                <button className="btn btn-success col-3 mx-auto" onClick={() => displayRazorPay()}>Pay Now</button>
            </div>
        </div>
    )
}

export default PaymentPage