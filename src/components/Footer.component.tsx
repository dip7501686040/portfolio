import React from "react"
import { footerSocialItems } from "../constants/portfolio.constants"
import { IFooterScialItem } from "../interfaces/portfolio.interface"

function Footer() {
  return (
    <section id="footer">
      <div className="footer">
        <div className="brand">
          <h1>
            <span>D</span>ipankar<span> S</span>aha
          </h1>
          <h2>Your complete web solution</h2>
          <div className="social_icon">
            {footerSocialItems.map((item: IFooterScialItem) => (
              <div className="social_item">
                <a href={item.link}>
                  <img alt="" width={10} height={10} src={item.icon} />
                </a>
              </div>
            ))}
          </div>
          <p>Copyright 2020 Dipankar Saha. All rights reserved</p>
        </div>
      </div>
    </section>
  )
}

export default Footer
