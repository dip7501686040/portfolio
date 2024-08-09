import React from "react"
import { services } from "../constants/portfolio.constants"
import { IServices } from "../interfaces/portfolio.interface"

function Services() {
  return (
    <section id="services">
      <div className="services container">
        <div className="service_top">
          <h1 className="section_title">
            Serv<span>ic</span>es
          </h1>
          <p>Freelance web designer & developer, I also develops desktop and mobile apps.</p>
        </div>
        <div className="service_bottom">
          {services.map((service: IServices) => (
            <div className="service_item" key={service.id}>
              <div className="icon">
                <img alt="" src={service.icon} />
              </div>
              <h2>{service.title}</h2>
              <div>
                <ul>
                  {service.descs.map((desc: string) => (
                    <li key={desc}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
