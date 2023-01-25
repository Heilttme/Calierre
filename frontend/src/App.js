import { Home, Login, SignUp, Navigation, Footer, Customize, ForgotPassword, Activate, Profile, PasswordRestore, Pay, Destination, LeaveReview, Contact } from "./components"
import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import useStore from "./store";
import { useTranslation } from "react-i18next";


const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  const [userData, setUserData] = useState({
    id: null,
    username: "",
    email: "",
    image: "",
    orders: [],
    ordersForWriter: [],
    staff: false,
  })

  
  useEffect(() => {
    if (userData.staff === true) {
      const res = axios.post("http://127.0.0.1:8000/authentication/get_orders_from_users/", /*{id: userData.id}*/ ).then(data => setUserData(prev => ({...prev, ordersForWriter: data.data.orders})))
    }
  }, [userData.staff])
  
  const [menuOpened, setMenuOpened] = useState(false)

  const [orderData, setOrderData] = useState({
    title: "",
    content: "",
    details: "",
    mistakes: "",
    city: "Moscow",
    street: "",
    detailsForCourier: "",
    option: "",
    sealBasic: "",
    sealAdvanced: "",
    waxAdvanced: "",
  })

  const changeOrderData = (e) => {
    setOrderData(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  
  const authenticated = useStore(state => state.authenticated)
  const authorize = useStore(state => state.authorize)

  useEffect(() => {
    if (localStorage.getItem("access")) {
      authorize(true)
    }
  }, [])
  
  useEffect(() => {
    if (localStorage.getItem("access")){
      if (localStorage.getItem("refresh")) {
        const res = axios.post("http://127.0.0.1:8000/auth/jwt/refresh/", {refresh: localStorage.getItem("refresh")}).then(data => {
          localStorage.setItem("access", data.data.access)

          const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `JWT ${localStorage.getItem('access')}`,
              "Accept": "application/json"
            }
          }
           
          const res = axios.get("http://127.0.0.1:8000/auth/users/me/", config).then(data => {
            const resOrders = axios.post("http://127.0.0.1:8000/authentication/orders/", {id: data.data.id}).then(data2 => setUserData(prev => ({...prev, id: data.data.id, username: data.data.username, email: data.data.email, image: data.data.image, orders: data2.data.orders, staff: data.data.is_staff})))
          })
        })
      }
      
    } else {
      setUserData({
        username: "",
        email: "",
      })
    }

  }, [authenticated])

  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState(localStorage.getItem("language"))

  const changeLanguage = () => {
    if (localStorage.getItem("language") === "en") {
      localStorage.setItem("language", "ru")
      i18n.changeLanguage("ru")
      setLanguage("ru")
    } else {
      localStorage.setItem("language", "en")
      i18n.changeLanguage("en")
      setLanguage("en")
    }
  }

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"))
  }, [])

  
  return (
    <div className="app">
      <Navigation userData={userData} setMenuOpened={setMenuOpened} menuOpened={menuOpened} changeLanguage={changeLanguage} language={language} />
      <main>
        <Routes>
          <Route path="/" element={<Home userData={userData} />} />
          <Route path="/login" element={<Login authorize={authorize}/>} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/customize" element={<Customize setOrderData={setOrderData} orderData={orderData} changeOrderData={changeOrderData} />} />
          <Route path="/customize/destination" element={<Destination setOrderData={setOrderData} orderData={orderData} changeOrderData={changeOrderData} />} />
          <Route path="/customize/destination/payment" element={<Pay setOrderData={setOrderData} orderData={orderData} changeOrderData={changeOrderData} />} />
          <Route path="/reset" element={<ForgotPassword />} />
          <Route path="/activate/:uid/:token" element={<Activate/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/profile" element={<Profile userData={userData} authorize={authorize} setUserData={setUserData} />} /> 
          <Route path="password/reset/confirm/:uid/:token" element={<PasswordRestore userData={userData} />} />
        </Routes>
      </main>
      <Footer/>
    </div> 
  )
}

export default App;
