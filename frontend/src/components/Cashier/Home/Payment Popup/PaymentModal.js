import axios from 'axios'
import React from 'react'
import './paymentmodal.css'

const PaymentModal = ({order,handleCancel}) => {
  console.log(order.uploadPayment)

  const approveButtonClicked = () => {
    axios.patch('http://localhost:5000/api/order/' + order._id,{
      ...order,
      status: "Paid"
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
    handleCancel(false)
  }

  const declineButtonClicked = () => {

  }
  return (
    <div className="popup-cont">
      <div className='pay-modal-cont'>
        <p className="close-btn-sm" onClick={() => handleCancel(false)}>X</p>
        <img src={`http://localhost:5000/${order.paymentPic}`} alt="" className='payment-img' />
        <div className="check-payment-btn-cont">
          <button className='approve-btn' onClick={() => approveButtonClicked()}>Approve</button>
          <button className='decline-btn' onClick={() => declineButtonClicked()}>Decline</button>
        </div>  
      </div>
    </div>
  )
}

export default PaymentModal