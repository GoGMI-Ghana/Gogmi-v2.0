import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';
import Home from './Components/Pages/Home';
import AboutUs from './Components/Pages/AboutUs';
import Services from './Components/Pages/Services';
import Contact from './Components/Pages/Contact';
import Blog from './Components/Pages/Blog';
import BlogPost from './Components/Pages/BlogPost';
import Resources from './Components/Pages/Resources';
import NotFound from './Components/Pages/NotFound';
import Careers from './Components/Pages/CareersOpportunities';
import Membership from './Components/Pages/Membership';
import MediaGallery from './Components/Pages/MediaGallery';
import ExecutiveChairman from './Components/Pages/ExecutiveChairman';
import Partners from './Components/Pages/Partners';
import Advocacy from './Components/Pages/Advocacy';
import Research from './Components/Pages/Research';
import CapacityBuilding from './Components/Pages/CapacityBuilding';
import MaritimeSecurityAudit from './Components/Pages/MaritimeSecurityAudit';
import IMSWG from './Components/Pages/IMSWG';
import BlueCareerExpo from './Components/Pages/BlueCareerExpo';
import Secretariat from './Components/Pages/Secretariat';
import SHADE from './Components/Pages/Shade';
import Management from './Components/Pages/Management';
import AdvisoryBoard from './Components/Pages/AdvisoryBoard';
import Login from './Components/Pages/Login';
import IMSWGforum from './Components/Pages/IMSWGforum';
import IMSWGforumQ3 from './Components/Pages/IMSWGforumQ3';
import MaritimeGovernanceCourse from './Components/Pages/MaritimeGovernanceCourse';
import MarineCasualtyCourse from './Components/Pages/MarineCasualtyCourse';
import GulfSpectrumPodcast from './Components/Pages/GulfSpectrumPodcast';
import BlueWorldInitiative from './Components/Pages/BlueWorldInitiative';
import WYTEC from './Components/Pages/WYTEC';
import IMSWGEvents from './Components/Pages/IMSWGEvents';
import IMSWGsignup from './Components/Pages/IMSWGsignup';
import JournalistTraining from './Components/Pages/JournalistTraining';
import BlueBusinessDirectory from './Components/Pages/BlueBusinessDirectory';
import { Analytics } from '@vercel/analytics/react';
import Testimonials from './Components/Pages/Testimonials';
import ScrollToTopOnNavigate from './Components/ScrollToTopOnNavigate';
import Privacy from './Components/Pages/Privacy';
import Terms from './Components/Pages/Terms';
import ECOP from './Components/Pages/ECOP';
import Sitemap from './Components/Pages/Sitemap';
import MASSDI from './Components/Pages/MASSDI';
import BlueMentorship from './Components/Pages/BlueMentorship';
import GMAC from './Components/Pages/GMAC';
import NewsletterPost from './Components/Pages/NewsletterPost';
import MemberDashboard from './Components/Pages/MemberDashboard';
import OurMembers from './Components/Pages/OurMembers';




function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <ScrollToTopOnNavigate />
          <main className="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/advocacy" element={<Advocacy />} />
              <Route path="/services/research" element={<Research />} />
              <Route path="/services/capacitybuilding" element={<CapacityBuilding />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/*" element={<BlogPost />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/mediagallery" element={<MediaGallery />} />
              <Route path="/Partners" element={<Partners />} />
              <Route path="/CareersOpportunities" element={<Careers />} />
              <Route path="/ExecutiveChairman" element={<ExecutiveChairman />} />
              <Route path="/research/maritime-security-audit" element={<MaritimeSecurityAudit />} />
              <Route path="/imswg" element={<IMSWG />} />
              <Route path="/bluecareerexpo" element={<BlueCareerExpo />} />
              <Route path="/secretariat" element={<Secretariat />} />
              <Route path="/shade" element={<SHADE />} />
              <Route path="/management" element={<Management />} />
              <Route path="/advisoryboard" element={<AdvisoryBoard />} />
              <Route path="/imswg-forum" element={<IMSWGforum />} />
              <Route path="/imswg-forum-q3" element={<IMSWGforumQ3 />} />
              <Route path="/maritime-governance-course" element={<MaritimeGovernanceCourse />} />
              <Route path="/marine-casualty-course" element={<MarineCasualtyCourse />} />
              <Route path="/gulf-spectrum-podcast" element={<GulfSpectrumPodcast />} />
             <Route path="/blue-world-initiative" element={<BlueWorldInitiative />} />
              <Route path="/wytec" element={<WYTEC />} />
              <Route path="/imswg-events" element={<IMSWGEvents />} />
              <Route path="/imswg-signup" element={<IMSWGsignup />} />
               <Route path="/journalist-training" element={<JournalistTraining />} />
              <Route path="/blue-business-directory" element={<BlueBusinessDirectory />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/ecop" element={<ECOP />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/massdi" element={<MASSDI />} />
              <Route path="/blue-mentorship" element={<BlueMentorship />} />
              <Route path="/gmac" element={<GMAC />} />
              <Route path="/newsletter/:id" element={<NewsletterPost />} />
  
             

            
              
              {/* Simple login for returning members */}
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<MemberDashboard />} />
              <Route path="/our-members" element={<OurMembers />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
          <Analytics />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
