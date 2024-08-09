import React, { useEffect, useState } from "react"
import { headerItems } from "../constants/portfolio.constants"
import { IHeader } from "../interfaces/portfolio.interface"

function Header() {
  const [activeToggle, setActiveToggle] = useState(false)
  const [bgToggle, setBgToggle] = useState(false)

  const listenToScroll = () => {
    const scroll_position = window.scrollY
    if (scroll_position > 100) {
      setBgToggle(true)
    } else if (scroll_position <= 100) {
      setBgToggle(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll)
    return () => {
      window.removeEventListener("scroll", listenToScroll)
    }
  }, [])

  return (
    <section id="header">
      <div className={`header ${bgToggle ? "active" : "inactive"}`}>
        <div className="navbar">
          <div className="brand">
            <a href="#hero">
              <h1>
                <span>D</span>ipankar<span> S</span>aha
              </h1>
            </a>
          </div>
          <div className="nav_list">
            <div className={`hamburger ${activeToggle ? "active" : ""}`} onClick={() => setActiveToggle(!activeToggle)}>
              <div className="bar"></div>
            </div>
            <ul className={`${activeToggle ? "active" : ""}`} onClick={() => setActiveToggle(!activeToggle)}>
              {headerItems.map((item: IHeader) => (
                <li key={item.title}>
                  <a href={item.link} data-after={item.title}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header
