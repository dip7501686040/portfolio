import { title } from "process"

export const headerItems = [
  {
    title: "Home",
    link: "#hero"
  },
  {
    title: "About",
    link: "#about"
  },
  {
    title: "Projects",
    link: "#projects"
  },
  {
    title: "Contact",
    link: "#contact"
  }
]

export const heroContents = [
  {
    id: 1,
    content: "Hello, "
  },
  {
    id: 2,
    content: "My Name Is "
  },
  {
    id: 3,
    content: "Dipankar "
  },
  {
    id: 4,
    content: "I am a full-stack software developer from kolkata, India."
  }
]

export const services = [
  {
    id: 1,
    title: "Requirment Analize",
    icon: "https://img.icons8.com/bubbles/50/000000/services.png",
    descs: ["Understands and analizes the application requirement.", "Documents the requirement with client consent."]
  },
  {
    id: 2,
    title: "Front-end",
    icon: "https://img.icons8.com/bubbles/50/000000/services.png",
    descs: [
      "Best implementation of web design using HTML, CSS, JAVASCRIPT, JQUERY, BOOTSTRAP",
      "SPA development using REACT.JS, AXIOS, REDUX, MATERIAL UI",
      "UI effects, animations and creating dynamic user experiences.",
      "Fully responsive and mobile design"
    ]
  },
  {
    id: 3,
    title: "Back-end",
    icon: "https://img.icons8.com/bubbles/50/000000/services.png",
    descs: [
      "Fully dynamic website developent using core PHP, LARAVEL and MYSQL.",
      "Ability to work on MONGODB, EXPRESS.JS and NODE.JS.",
      "Ability to develop REST-full API's",
      "Security and Payment gateway implementation."
    ]
  },
  {
    id: 4,
    title: "Deployment",
    icon: "https://img.icons8.com/bubbles/50/000000/services.png",
    descs: ["I can make your website live by hosting on remote servers.", "Ability to use git & github version control.", "Ability to work with Firebase, Heroku services."]
  }
]

export const projects = [
  {
    id: 1,
    title: "A one to one Video conference app like zoom",
    img: "/zoom-clone.png",
    links: [
      // {
      //   id: 1,
      //   title: "App Link - ",
      //   link: "https://mysterious-beyond-96669.herokuapp.com"
      // },
      {
        id: 2,
        title: "Github Link - ",
        link: "https://github.com/dip7501686040/zoom-clone"
      }
    ],
    descs: [
      "Self project - Designed and developed a realtime video conference app",
      "Front-end - JAVASCRIPT, EJS, HTML, CSS",
      "Backend - JAVASCRIPT, NODE.JS, EXPRESS.JS",
      "Connection - SOCKET.IO, PEER.JS",
      "Version control & Deployment - GIT, GITHUB"
    ]
  },
  {
    id: 2,
    title: "MADEFRU a small ecommerce site for handicrafts",
    img: "/madefru-img.png",
    links: [
      // {
      //   id: 1,
      //   title: "App Link - ",
      //   link: "https://madefru.com"
      // },
      {
        id: 2,
        title: "Github Link - ",
        link: "https://github.com/dip7501686040/madefru.com"
      }
    ],
    descs: [
      "Freelance - Designed and developed a ecommerce website for handicrafts.",
      "Front-end - JAVASCRIPT, JQUERY, BOOTSTRAP, HTML, CSS",
      "Backend - PHP",
      "Database - MYSQL",
      "Version control & Deployment - GIT, GITHUB"
    ]
  },
  {
    id: 3,
    title: "Qteksuite a local shop's admin panel",
    img: "/qteksuite.png",
    links: [],
    descs: [
      "Freelance - Developed new features and fixed existing issues for a local shop's admin web application",
      "Front-end - JAVASCRIPT, JQUERY, BOOTSTRAP, HTML, CSS",
      "Backend - PHP",
      "Database - MYSQL",
      "Version control & Deployment - GIT, GITHUB, REMOTE SERVER"
    ]
  },
  {
    id: 4,
    title: "Whatsapp clone",
    img: "/whatsapp-clone-img.png",
    links: [
      // {
      //   id: 1,
      //   title: "App Link - ",
      //   link: "https://whatsapp-clone-dip7501686040.herokuapp.com"
      // },
      {
        id: 2,
        title: "Github Link - ",
        link: "https://github.com/dip7501686040/whatsapp_clone"
      }
    ],
    descs: [
      "Self project - Designed and developed a realtime chatting app like whatsapp",
      "Front-end - REACT.JS, JSX, CSS, AXIOS, MATERIAL UI",
      "Back-end - NODE.JS, EXPRESS.JS, MONGOOSE, NODEMON",
      "Database - MONGODB",
      "Connection - PUSHER",
      "Version control & Deployment - GIT, FIREBASE, HEROKU"
    ]
  },
  {
    id: 5,
    title: "JAPMAN credit/debit manager SPA",
    img: "/img-1.png",
    links: [],
    descs: [
      "Freelance - Designed and developed a credit/ debit management SPA for local shop",
      "Front-end - REACT.JS, JSX, CSS, AXIOS",
      "Back-end - PHP LARAVEL",
      "Database - MYSQL",
      "Version control & Deployment - GIT, FIREBASE"
    ]
  },
  {
    id: 6,
    title: "Portfolio website",
    img: "/portfolio_img.png",
    links: [
      // {
      //   id: 1,
      //   title: "App Link - ",
      //   link: "https://dip7501686040.github.io/portfolio"
      // },
      {
        id: 2,
        title: "Github Link - ",
        link: "https://github.com/dip7501686040/portfolio"
      }
    ],
    descs: ["Self project - Designed and developed own portfolio website", "Front-end - REACT.JS, JSX, CSS", "Version control & Deployment - GIT, FIREBASE"]
  }
]

export const aboutContent = {
  title: "Full-stack developer",
  img: "/about_img.jpg",
  desc: "Hi there, I am a Passionate fullstack web developer with core skills of - react, angular, nodejs, laravel having 5+ years experience on mentioned skills, with deep knowledge of developing and maintaining bussiness web applications. I am a b.tech graduate on Information technology from west bengal, India. I have specialized skills in web & Mobile development as follows, Looking forward to hear from you and excited to develop something awesome and valuable.",
  skills: ["JAVASCRIPT, ", "NODE.JS, ", "REACT.JS, ", "EXPRESS.JS, ", "PHP, ", "LARAVEL, ", "REST API, ", "JQUERY, ", "BOOTSTRAP, ", "HTML, ", "CSS, ", "JAVA, ", "C, ", "MYSQL, ", "MONGODB"],
  resumeLink: "/dipankar_resume.pdf",
  resumeTitle: "Dipankar's Resume.pdf"
}
export const contactContent = [
  {
    id: 1,
    title: "Phone",
    icon: "https://img.icons8.com/bubbles/50/000000/phone.png",
    text: "+917001733750"
  },
  {
    id: 2,
    icon: "https://img.icons8.com/bubbles/50/000000/new-post.png",
    title: "Email",
    text: "dip7501686040@gmail.com"
  },
  {
    id: 3,
    icon: "https://img.icons8.com/bubbles/50/000000/map-marker.png",
    title: "Address",
    text: "Kolkata, India"
  }
]
export const footerSocialItems = [
  {
    id: 1,
    icon: "https://img.icons8.com/bubbles/50/000000/facebook-new.png",
    link: "#"
  },
  {
    id: 2,
    icon: "https://img.icons8.com/bubbles/50/000000/instagram-new.png",
    link: "#"
  }
]
