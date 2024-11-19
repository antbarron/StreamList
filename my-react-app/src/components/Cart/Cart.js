import { useState, useEffect } from 'react';
import list from '../data'; // Import the list
import './Cart.css';

const Cart = () => {
    const [selectedStreamingPlan, setSelectedStreamingPlan] = useState(null);
    const [selectedStreamListPlan, setSelectedStreamListPlan] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [salesTax, setSalesTax] = useState(0);
    const [paymentInfo, setPaymentInfo] = useState({
        name: '',
        cardNumber: '',
        expiration: '',
        cvv: '',
    });

    const streamingPlans = [
        { name: 'Individual Plan', price: 9.99 },
        { name: 'Friendly Plan', price: 14.99 },
        { name: 'Family Plan', price: 19.99 },
    ];

    const salesTaxRate = 0.0725;

    const handleStreamingPlanSelect = (plan) => {
        setSelectedStreamingPlan(plan);
        updateTotalPrice(plan, selectedStreamListPlan);
    };

    const handleStreamListPlanSelect = (plan) => {
        setSelectedStreamListPlan(plan);
        updateTotalPrice(selectedStreamingPlan, plan);
    };
  // Load selections from local storage
  useEffect(() => {
    const storedStreamingPlan = JSON.parse(localStorage.getItem('selectedStreamingPlan'));
    const storedStreamListPlan = JSON.parse(localStorage.getItem('selectedStreamListPlan'));
// If a streaming plan was found in local storage, update the component's state with the stored value
    if (storedStreamingPlan) setSelectedStreamingPlan(storedStreamingPlan);
    if (storedStreamListPlan) setSelectedStreamListPlan(storedStreamListPlan);
}, []);// Empty dependency array ensures this effect runs only once, when the component mounts

// Save selections to local storage whenever they change
useEffect(() => {
//Save the current selected streaming plan to local storage as a JSON string
    localStorage.setItem('selectedStreamingPlan', JSON.stringify(selectedStreamingPlan));
    localStorage.setItem('selectedStreamListPlan', JSON.stringify(selectedStreamListPlan));
}, [selectedStreamingPlan, selectedStreamListPlan]);// Dependency array: this effect runs whenever selectedStreamingPlan or selectedStreamListPlan changes

    const updateTotalPrice = (streamingPlan, streamListPlan) => {
        const streamingPrice = streamingPlan ? streamingPlan.price : 0;
        const streamListPrice = streamListPlan ? streamListPlan.price : 0;
        const subtotal = streamingPrice + streamListPrice;
        const tax = subtotal * salesTaxRate;
        setTotalPrice(subtotal + tax);
        setSalesTax(tax);
    };

   const handlePaymentChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cardNumber') {
            const formattedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
            setPaymentInfo({ ...paymentInfo, [name]: formattedValue });
        } else if (name === 'expiration') {
            const formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2').slice(0, 5);
            setPaymentInfo({ ...paymentInfo, [name]: formattedValue });
        } else if (name === 'cvv') {
            const formattedValue = value.replace(/\D/g, '').slice(0, 3);
            setPaymentInfo({ ...paymentInfo, [name]: formattedValue });
        } else {
            setPaymentInfo({ ...paymentInfo, [name]: value });
        }
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
        console.log('Payment Information:', paymentInfo);
    };
    // Function to clear selections
    const handleClearSelections = () => {
        setSelectedStreamingPlan(null);
        setSelectedStreamListPlan(null);
        setTotalPrice(0);
        setSalesTax(0);
        localStorage.removeItem('selectedStreamingPlan');
        localStorage.removeItem('selectedStreamListPlan');
    };
    return (
        <div id="cart">
            {/* Left Side - Plans */}
            <div className="plans-section" >
                <div className="section">
                    <h1>Customer Plans</h1>
                    <p><b>Ready to Experience More?</b></p>
                    <p>At EZTechMovie, we offer streaming plans designed to fit your lifestyle. Whether you're an individual streamer or part of a family of movie lovers, our plans deliver quality, convenience, and entertainment.</p>
                </div>

                <div className="section">
                    <h2>Streaming Experience Plans</h2>
                    <ul className="streaming-plans-list">
                    {streamingPlans.map((plan, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        name="streamingPlan"
                                        checked={selectedStreamingPlan?.name === plan.name}
                                        onChange={() => handleStreamingPlanSelect(plan)}
                                    />
                                    {plan.name} - ${plan.price.toFixed(2)}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="section">
                    <h2>StreamList Experience Plans (Minimum)</h2>
                     <ul>
                     {/*Iterates over list array of different plans, map() generates <li> element for each list item */}
                     {/* Each(<li>) uses plan.id as a unique key prop, corresponding to the `id` property of the plan object from `data.js` */}
                     {list.map((plan) => (
                            <li key={plan.id}>
                                <label>
                                    <input
                                        type="radio"
                                        name="streamListPlan"
                                        checked={selectedStreamListPlan?.service === plan.service}
                                        onChange={() => handleStreamListPlanSelect(plan)}
                                    />
                                    {/* Display an image, service name, and price of the StreamList plan */}
                                    <img src={plan.img} alt={plan.service}  />
                                    {plan.service} - ${plan.price.toFixed(2)} <br/>
                                    <small>{ } - {plan.serviceInfo}</small>{/* Display additional service information */}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                
            </div>

            {/* Right Side - Payment Details */}
            <div className="section payment-details" >
            <h2>Your Cart</h2>
                    <ul>
                    <p><b>Item Summary:</b></p>
                        {selectedStreamingPlan && (
                            <li>{selectedStreamingPlan.name} - ${selectedStreamingPlan.price.toFixed(2)}</li>
                        )}
                        {selectedStreamListPlan && (
                            <li>{selectedStreamListPlan.service} - ${selectedStreamListPlan.price.toFixed(2)}</li>
                        )}
                        <p><b>Subtotal: ${((totalPrice / (1 + salesTaxRate))).toFixed(2)}</b></p>
                        <p><b>Sales Tax (7.25%): ${salesTax.toFixed(2)}</b></p>
                        <p><b>Total Price: ${totalPrice.toFixed(2)}</b></p>
                    </ul>
                    {/* Button to clear selections */}
                <button onClick={handleClearSelections} >
                    Clear Selections
                </button>
                <div className="payment-details">
                <h2>Payment Details</h2>
                <form onSubmit={handlePaymentSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name on Card"
                        value={paymentInfo.name}
                        onChange={handlePaymentChange}
                        required
                    />
                    <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        required
                    />
                    <input
                        type="text"
                        name="expiration"
                        placeholder="Expiration Date (MM/YY)"
                        value={paymentInfo.expiration}
                        onChange={handlePaymentChange}
                        required
                    />
                    <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={paymentInfo.cvv}
                        onChange={handlePaymentChange}
                        required
                    />
                    <button type="submit" >Complete Order</button> {/* Added width and padding */}
                </form>
                </div>

            </div>
        </div>
    );
};

export default Cart;
