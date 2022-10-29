import React, { useState } from 'react'
import './transferpayment.css'
import bcaicon from '../../../assets/BCA.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const TransferPayment = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [image,setImage] = useState()
  const [status,setStatus] = useState(user.status)
  const [userData,setuserData] = useState(user)
  const navigate = useNavigate()
  const onInputChange = (e) => {
    setImage(e.target.files[0])
  }
  const handleUpload = () => {
    const formData = new FormData()
    formData.append('image',image)
    axios.put('http://localhost:5000/api/order/' + user._id,formData,{
      headers:{
        "Content-type" : "multipart/form-data"
      }
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
    setStatus('Checking Payment')
    setuserData({...user,status})
    localStorage.setItem('user', JSON.stringify(userData))
    navigate('/')
  }
  return (
    <div className='paymentdetail-cont'>
      <div className="payment-header">
        <img src={bcaicon} alt="" className='payment-header-img' />
        <p className="payment-header-ttl">BCA <br /> <span>Bank Transfer</span></p>
      </div>
      <div className="paymentdetail-amount">
        <p className="total-payment-ttl">Total Pembayaran</p>
        <p className="total-payment-amount">Rp.{user.total}</p>
        <p className="payment-instruction">Bayar pesanan sesuai jumlah diatas </p>
        <p className="payment-desc">Segera  lakukan pembayaran anda setelah melakukan checkout.Jika dalam waktu 15 menit bukti transfer belum diunggah, maka order dianggap batal dan anda akan dikembalikan ke menu utama</p>
      </div>
      <div className="payment-step-cont">
        <p className="payment-step-ttl">Cara Pembayaran</p>
        <p className='payment-step'>1.Gunakan ATM/ iBanking / mBanking untuk melakukan transfer ke rekening berikut ini:</p>
        <div className="bank-detail">
          <p>BCA:</p>
          <p>No.Rekening : <span>777-27893133</span></p>
          <p>Nama Rekening : <span>KONA GELATO</span></p>
        </div>
        <p className="payment-step">2.Silahkan upload bukti pembayaran dalam 15 menit <br />
        3.Demi kemanan transaksi dimohon untuk tidak memberikan bukti transfer kepada siapapun,selain mengupload via website KONA</p>
      </div>
      <div className="upload-btn-cont">
        <div className="timer-cont">
          <p className='timer'>Selesaikan Dalam 15:00</p>
        </div>
        <div className="uploadbtn-cont">
          <input type="file" className='file' name='file' onChange={onInputChange}/>
          <button className='upload-btn' onClick={() => handleUpload()}>Upload Bukti Transfer</button>
        </div>
      </div>
    </div>
  )
}

export default TransferPayment