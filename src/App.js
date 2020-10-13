import React, { useState, useEffect } from 'react';
import './App.css';
import img1 from './images/img-1.png'
import img2 from './images/img-2.png'
import zoom_clone_img from './images/zoom-clone.png'
import madefru_img from './images/madefru-img.png'
import whatsapp_clone_img from './images/whatsapp-clone-img.png'
import portfolio_img from './images/portfolio_img.png'
import about_img from './images/about_img.jpg'
import qteksuite_img from './images/qteksuite.png'
import dipankars_resume from './images/Dipankars_Resume.pdf' 


function App() {
  const [activeToggle, setActiveToggle] = useState(false)
  const [bgToggle, setBgToggle] = useState(false)

  const listenToScroll = () => {
    const scroll_position = window.scrollY
    if (scroll_position > 100) {
      setBgToggle(true)
    }
    else if (scroll_position <= 100) {
      setBgToggle(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
    return () => {
      window.removeEventListener('scroll', listenToScroll)
    }
  }, [])

  return (
    <div className="app">
      {/* header */}
      <section id="header">
        <div className={`header container ${bgToggle ? "active" : "inactive"}`}>
          <div className="navbar">
            <div className="brand">
              <a href="#hero"><h1><span>D</span>ipankar<span> S</span>aha</h1></a>
            </div>
            <div className="nav_list">
              <div className={`hamburger ${activeToggle ? "active" : ""}`}
                onClick={() => setActiveToggle(!activeToggle)}>
                <div className="bar">

                </div>
              </div>
              <ul className={`${activeToggle ? "active" : ""}`}
                onClick={() => setActiveToggle(!activeToggle)}>
                <li><a href="#hero" data-after="Home">Home</a></li>
                <li><a href="#services" data-after="Services">Services</a></li>
                <li><a href="#projects" data-after="Projects">Projects</a></li>
                <li><a href="#about" data-after="About">About</a></li>
                <li><a href="#contact" data-after="Contact">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* hero section */}
      <section id="hero">
        <div className="hero container">
          <h1>Hello, <span></span></h1>
          <h1>My Name Is <span></span></h1>
          <h1>Dipankar <span></span></h1>
          <h1>I am a Full-stack software developer from west bengal, India.<span></span></h1>

          <a href="#projects" type="button" className="cta">Portfolio</a>
        </div>
      </section>
      {/* service section */}
      <section id="services">
        <div className="services container">
          <div className="service_top">
            <h1 className="section_title">Serv<span>ic</span>es</h1>
            <p>
              Freelance web designer & developer, I also develops desktop and mobile apps.
            </p>
          </div>
          <div className="service_bottom">
            <div className="service_item">
              <div className="icon"><img src="https://img.icons8.com/bubbles/50/000000/services.png" /></div>
              <h2>Requirment Analize</h2>
              <p>
                <ul>
                  <li>Understands and analizes the application requirement.</li>
                  <li>Documents the requirement with client consent.</li>
                </ul>
              </p>
            </div>
            <div className="service_item">
              <div className="icon"><img src="https://img.icons8.com/bubbles/50/000000/services.png" /></div>
              <h2>Front-end</h2>
              <p>
                <ul>
                  <li>Best implementation of web design using HTML, CSS, JAVASCRIPT, JQUERY, BOOTSTRAP</li>
                  <li>SPA development using REACT.JS, AXIOS, REDUX, MATERIAL UI</li>
                  <li>UI effects, animations and creating dynamic user experiences.</li>
                  <li>Fully responsive and mobile design</li>
                </ul>
              </p>
            </div>
            <div className="service_item">
              <div className="icon"><img src="https://img.icons8.com/bubbles/50/000000/services.png" /></div>
              <h2>Back-end</h2>
              <p>
                <ul>
                  <li>Fully dynamic website developent using core PHP, LARAVEL and MYSQL.</li>
                  <li>Ability to work on MONGODB, EXPRESS.JS and NODE.JS.</li>
                  <li>Ability to develop REST-full API's</li>
                  <li>Security and Payment gateway implementation.</li>
                </ul>
              </p>
            </div>
            <div className="service_item">
              <div className="icon"><img src="https://img.icons8.com/bubbles/50/000000/services.png" /></div>
              <h2>Deployment</h2>
              <p>
                <ul>
                  <li>I can make your website live by hosting on remote servers.</li>
                  <li>Ability to use git & github version control.</li>
                  <li>Ability to work with Firebase, Heroku services.</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* projects section */}
      <section id="projects">
        <div className="projects container">
          <div className="projects_herder">
            <h1 className="section_title">
              Recent<span> Projects</span>
            </h1>
          </div>
          <div className="all_projects">
            <div className="project_item">
              <div className="project_info">
                <h1>Zoom Video confrence app clone</h1>
                <h2>App Link - <a href="https://mysterious-beyond-96669.herokuapp.com" target="_blank">https://mysterious-beyond-96669.herokuapp.com</a></h2>
                <h2>Github Link - <a href="https://github.com/dip7501686040/zoom-clone" target="_blank">https://github.com/dip7501686040/zoom-clone</a></h2>
                <p>
                  <ul>
                    <li>Self project - Designed and developed a realtime video conference and chatting app</li>
                    <li>Front-end - JAVASCRIPT, EJS, HTML, CSS</li>
                    <li>Backend - JAVASCRIPT, NODE.JS, EXPRESS.JS</li>
                    <li>Connection - SOCKET.IO, PEER.JS</li>
                    <li>Version control & Deployment - GIT, HEROKU</li>
                  </ul>
                </p>
              </div>
              <div className="project_img">
                <img src={zoom_clone_img} alt="img" />
              </div>
            </div>
            <div className="project_item">
              <div className="project_info">
                <h1>MADEFRU ecommerce site for handicrafts</h1>
                <h2>App Link - <a href="https://madefru.com" target="_blank">https://madefru.com</a></h2>
                <h2>Github Link - <a href="- https://github.com/dip7501686040/madefru.com" target="_blank">https://github.com/dip7501686040/madefru.com</a></h2>
                <p>
                  <ul>
                    <li>Freelance - Designed and developed a ecommerce website for handicrafts.</li>
                    <li>Front-end - JAVASCRIPT, JQUERY, BOOTSTRAP, HTML, CSS</li>
                    <li>Backend - PHP</li>
                    <li>Database - MYSQL</li>
                    <li>Version control & Deployment - GIT, GITHUB, REMOTE SERVER</li>
                  </ul>
                </p>
              </div>
              <div className="project_img">
                <img src={madefru_img} alt="img" />
              </div>
            </div>
            <div className="project_item">
              <div className="project_info">
                <h1>Qteksuite a admin panel</h1>
                <p>
                  <ul>
                    <li>Freelance - Edited and updated a local shop's admin web application</li>
                    <li>Front-end - JAVASCRIPT, JQUERY, BOOTSTRAP, HTML, CSS</li>
                    <li>Backend - PHP</li>
                    <li>Database - MYSQL</li>
                    <li>Version control & Deployment - GIT, GITHUB, REMOTE SERVER</li>
                  </ul>
                </p>
              </div>
              <div className="project_img">
                <img src={qteksuite_img} alt="img" />
              </div>
            </div>
            <div className="project_item">
              <div className="project_info">
                <h1>Whatsapp clone</h1>
                <h2>App Link - <a href="https://whatsapp-react-frontend.web.app" target="_blank">https://whatsapp-react-frontend.web.app</a></h2>
                <p>
                  <ul>
                    <li>Self project - Designed and developed a realtime chatting app like whatsapp</li>
                    <li>Front-end - REACT.JS, JSX, CSS, AXIOS, MATERIAL UI</li>
                    <li>Back-end - NODE.JS, EXPRESS.JS, MONGOOSE, NODEMON</li>
                    <li>Database - MONGODB</li>
                    <li>Connection - PUSHER</li>
                    <li>Version control & Deployment - GIT, FIREBASE, HEROKU</li>
                  </ul>
                </p>
              </div>
              <div className="project_img">
                <img src={whatsapp_clone_img} alt="img" />
              </div>
            </div>
            <div className="project_item">
              <div className="project_info">
                <h1>JAPMAN credit/debit manage</h1>
                <p>
                  <ul>
                    <li>Freelance - Designed and developed a credit/ debit management SPA for local shop</li>
                    <li>Front-end - REACT.JS, JSX, CSS, AXIOS</li>
                    <li>Back-end - PHP LARAVEL</li>
                    <li>Database - MYSQL</li>
                    <li>Version control & Deployment - GIT, FIREBASE</li>
                  </ul>
                </p>
              </div>
              <div className="project_img">
                <img src={img1} alt="img" />
              </div>
            </div>
            <div className="project_item">
              <div className="project_info">
                <h1>Portfolio website</h1>
                <h2>App Link - <a href="http://dsaha7001.web.app" target="_blank">http://dsaha7001.web.app</a></h2>
                <p>
                  <ul>
                    <li>Self project - Designed and developed own portfolio website</li>
                    <li>Front-end - REACT.JS, JSX, CSS</li>
                    <li>Version control & Deployment - GIT, FIREBASE</li>
                  </ul>
                </p>
              </div>
              <div className="project_img">
                <img src={portfolio_img} alt="img" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* about section */}
      <section id='about'>
        <div className="about container">
          <div className="col_left">
            <div className="about_img">
              <img src={about_img} alt="" />
            </div>
          </div>
          <div className="col_right">
            <h1 className="section_title">
              about <span>me</span>
            </h1>
            <h2>Full-stack developer</h2>
            <p>I am a full-stack web devloper from west bengal, india.I have dicent amount of experience in web and mobile app development. I can be your web solution that provides great amount value to you.</p>
            <p><b>Skills - JAVASCRIPT, NODE.JS, REACT.JS, EXPRESS.JS, PHP, LARAVEL, REST API, JQUERY, BOOTSTRAP, HTML, CSS, JAVA, C, MYSQL, MONGODB</b></p>
            <a href={dipankars_resume} className="cta" download="Dipankar's Resume.pdf">Download Resume</a>
          </div>
        </div>
      </section>
      {/* contact section */}
      <section id="contact">
        <div className="contact container">
          <div>
            <h1 className="section_title">Contact <span>Info</span></h1>
          </div>
          <div className="contact_items">
            <div className="contact_item">
              <div className="icon"><img src="https://img.icons8.com/bubbles/50/000000/phone.png" /></div>
              <div className="contact_info">
                <h1>Phone</h1>
                <h2>+917001733750</h2>
              </div>
            </div>
            <div className="contact_item">
              <div className="icon"><img src="https://img.icons8.com/bubbles/50/000000/new-post.png" /></div>
              <div className="contact_info">
                <h1>Email</h1>
                <h2>dip7501686040@gmail.com</h2>
              </div>
            </div>
            <div className="contact_item">
              <div className="icon"><img src="https://img.icons8.com/bubbles/50/000000/map-marker.png" /></div>
              <div className="contact_info">
                <h1>Address</h1>
                <h2>Patiram, West Bengal, India</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* footer section */}
      <section id="footer">
        <div className="footer container">
          <div className="brand">
            <h1><span>D</span>ipankar<span> S</span>aha</h1>
            <h2>Your complete web solution</h2>
            <div className="social_icon">
              <div className="social_item">
                <a href="#"><img src="https://img.icons8.com/bubbles/50/000000/facebook-new.png" /></a>
              </div>
              <div className="social_item">
                <a href="#"><img src="https://img.icons8.com/bubbles/50/000000/instagram-new.png" /></a>
              </div>
              <div className="social_item">
                <a href="#"><img src="https://img.icons8.com/bubbles/50/000000/twitter.png" /></a>
              </div>
              <div className="social_item">
                <a href="#"><img src="https://img.icons8.com/bubbles/50/000000/facebook-new.png" /></a>
              </div>
            </div>
            <p>Copyright 2020 Dipankar Saha. All rights reserved</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
