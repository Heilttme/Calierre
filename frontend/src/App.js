import { Home, Login, SignUp, Navigation, Footer, Customize, ForgotPassword, Activate, Profile, PasswordRestore, Pay, Destination, LeaveReview, Contact, Vacations, DeliveryTime, SuccessfulPayment } from "./components"
import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import useStore from "./store";
import { useTranslation } from "react-i18next";

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const [blurred, setBlurred] = useState(false)

  const [userData, setUserData] = useState({
    id: null,
    username: "",
    email: "",
    image: "",
    orders: [],
    ordersForWriter: [],
    ordersForPrinter: [],
    staff: false,
    printer: false,
  })

  useEffect(() => {
    if (userData.staff === true) {
      const res = axios.post("/authentication/get_orders_from_users/", /*{id: userData.id}*/ ).then(data => setUserData(prev => ({...prev, ordersForWriter: data.data.orders, ordersForPrinter: data.data.orders})))
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
    flat: "",
    detailsForCourier: "",
    option: "",
    sealBasic: "",
    sealAdvanced: "",
    waxAdvanced: "",
    dateTime: "",
    phone: "",
    sameDay: false
  })

  const changeOrderData = (e) => {
    setOrderData(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  
  const authenticated = useStore(state => state.authenticated)
  const authorize = useStore(state => state.authorize)

  // useEffect(() => {
  //   if (localStorage.getItem("access")) {
  //   }
  // }, [])
  
  useEffect(() => {
    if (localStorage.getItem("access")){
      if (localStorage.getItem("refresh")) {
        const res = axios.post("/auth/jwt/refresh/", {refresh: localStorage.getItem("refresh")}).then(data => {
          localStorage.setItem("access", data.data.access)

          const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `JWT ${localStorage.getItem('access')}`,
              "Accept": "application/json"
            }
          }
           
          const res = axios.get("/auth/users/me/", config).then(data => {
            authorize(true)
            const resOrders = axios.post("/authentication/orders/", {id: data.data.id}).then(data2 => setUserData(prev => ({...prev, id: data.data.id, username: data.data.username, email: data.data.email, image: "https://api.calierre.ru/media/pfps/" + data.data.image.split("/")[data.data.image.split("/").length - 1], orders: data2.data.orders, staff: data.data.is_staff, printer: data.data.is_printer})))
          })
        })
      }
      
    } else {
      setUserData({
        id: null,
        username: "",
        email: "",
        image: "",
        orders: [],
        ordersForWriter: [],
        staff: false,
        printer: false
      })
    }

  }, [authenticated])

  useEffect(() => {
    localStorage.setItem("language", "ru")
  }, [])

  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState("ru")

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
    <div className="app" onClick={() => setMenuOpened(false)}>
      <Navigation userData={userData} setMenuOpened={setMenuOpened} menuOpened={menuOpened} changeLanguage={changeLanguage} language={language} />
      <main >
        <Routes>
          <Route path="/" element={<Home userData={userData} />} />
          <Route path="/login" element={<Login authorize={authorize} authenticated={authenticated}/>} />
          <Route path="/sign_up" element={<SignUp authenticated={authenticated} />} />
          <Route path="/order" element={<Customize setOrderData={setOrderData} orderData={orderData} changeOrderData={changeOrderData} authenticated={authenticated} />} />
          <Route path="/order/delivery" element={<Destination setOrderData={setOrderData} orderData={orderData} changeOrderData={changeOrderData} />} />
          <Route path="/order/delivery/payment" element={<Pay setOrderData={setOrderData} orderData={orderData} changeOrderData={changeOrderData} setBlurred={setBlurred} userData={userData} />} />
          <Route path="/reset" element={<ForgotPassword />} />
          <Route path="/activate/:uid/:token" element={<Activate/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/vacations" element={<Vacations/>} />
          <Route path="/profile" element={<Profile userData={userData} authorize={authorize} setUserData={setUserData} />} /> 
          <Route path="password/reset/confirm/:uid/:token" element={<PasswordRestore userData={userData} />} />
          <Route path="/success_order" element={<SuccessfulPayment />} />
        </Routes>
      </main>
      <Footer/>
    </div> 
  )
}

export default App;
