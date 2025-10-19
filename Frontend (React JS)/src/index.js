import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './kilimanjaro-routes/SelectedRoute.css';
import './trip-details/TripDetails.css'
import './fonts/IndonesiaMerdeka/Indonesia-Merdeka.ttf'
import './fonts/Montserrat/Montserrat-VariableFont_wght.ttf'
import './fonts/Journal/JOURNAL.TTF'
import './fonts/EgyptianNights/EgyptianNights.ttf'
import './fonts/MamakiloDecorative/MamakiloDecorative.ttf'
import './fonts/MamakiloBlack/MamakiloBlack.ttf'
import App from './App';
import AllRoutes from './AllRoutes';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import NorthernCircuitRoute from './kilimanjaro-routes/NorthernCircuitRoute';
import LemoshoRoute from './kilimanjaro-routes/LemoshoRoute';
import MachameRoute from './kilimanjaro-routes/MachameRoute';
import RongaiRoute from './kilimanjaro-routes/RongaiRoute';
import MaranguRoute from './kilimanjaro-routes/MaranguRoute';
import UmbweRoute from './kilimanjaro-routes/UmbweRoute';
import BookNow from './BookNow';
import ConfirmMpesaCode from './ConfirmMpesaCode';
import AdminLogin from './Admin/AdminLogin';
import AdminHome from './Admin/AdminHome';
import AdminClients from './Admin/AdminClients';
import AdminMpesaPayments from './Admin/AdminMpesaPayments';
import AdminCardPayments from './Admin/AdminCardPayments';
import AdminTripDates from './Admin/AdminTripDates';
import AdminAddTripDate from './Admin/admin-add-edit-trip-dates/AdminAddTripDate';
import AdminEditTripDate from './Admin/admin-add-edit-trip-dates/AdminEditTripDate';
import AdminCrew from './Admin/AdminCrew';
import AdminAddCrew from './Admin/admin-add-edit-crew/AdminAddCrew';
import AdminEditCrew from './Admin/admin-add-edit-crew/AdminEditCrew';
import AboutUs from './footer-pages/about-us/AboutUs';
import ContactUs from './footer-pages/contact-us/ContactUs';
import BookingTerms from './footer-pages/booking-terms/BookingTerms';
import FAQ from './footer-pages/FAQs/FAQ';
import OurCrew from './footer-pages/our-crew/OurCrew';
import WhatToExpect from './footer-pages/what-to-expect/WhatToExpect';
import ScrollToTop from './ScrollToTop';
import Tipping from './footer-pages/tipping/Tipping';
import ChogoriaRoute from './kenya-routes/ChogoriaRoute';
import NaroMoruRoute from './kenya-routes/NaroMoruRoute';
import SirimonRoute from './kenya-routes/SirimonRoute';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path='/' index element={<App />} />

          <Route path='/routes' index element={<AllRoutes />} />
          <Route path='/about-us' index element={<AboutUs />} />
          <Route path='/contact-us' index element={<ContactUs />} />
          <Route path='/terms-and-conditions' index element={<BookingTerms />} />
          <Route path='/frequently-asked-questions' index element={<FAQ />} />
          <Route path='/our-crew' index element={<OurCrew />} />
          <Route path='/what-to-expect' index element={<WhatToExpect />} />
          <Route path='/tipping' index element={<Tipping />} />

          <Route path='/routes/selected/northern-circuit-route' index element={<NorthernCircuitRoute />} />
          <Route path='/routes/selected/lemosho-route' index element={<LemoshoRoute />} />
          <Route path='/routes/selected/machame-route' index element={<MachameRoute />} />
          <Route path='/routes/selected/rongai-route' index element={<RongaiRoute />} />
          <Route path='/routes/selected/marangu-route' index element={<MaranguRoute />} />
          <Route path='/routes/selected/umbwe-route' index element={<UmbweRoute />} />
          
          <Route path='/routes/selected/mt-kenya/chogoria-route' index element={<ChogoriaRoute />} />
          <Route path='/routes/selected/mt-kenya/naro-moru-route' index element={<NaroMoruRoute />} />
          <Route path='/routes/selected/mt-kenya/sirimon-route' index element={<SirimonRoute />} />

          <Route path='/book-now' index element={<BookNow />} />
          <Route path='/confirm-mpesa-code' index element={<ConfirmMpesaCode />} />
          

          <Route path='/admin/login' index element={<AdminLogin />} />
          <Route path='/admin/home' index element={<AdminHome />} />
          <Route path='/admin/clients' index element={<AdminClients />} />
          <Route path='/admin/mpesa-payments' index element={<AdminMpesaPayments />} />
          <Route path='/admin/card-payments' index element={<AdminCardPayments />} />
          <Route path='/admin/home/trip-dates' index element={<AdminTripDates />} />
          <Route path='/admin/home/crew' index element={<AdminCrew />} />
          
          <Route path='/admin/home/crew/add-crew' index element={<AdminAddCrew />} />
          <Route path='/admin/home/crew/edit-crew' index element={<AdminEditCrew />} />
          <Route path='/admin/home/trip-dates/add-date' index element={<AdminAddTripDate />} />
          <Route path='/admin/home/trip-dates/edit-date' index element={<AdminEditTripDate />} />

        </ Routes>

      </ScrollToTop>
    </ BrowserRouter>
  </CookiesProvider>
);



