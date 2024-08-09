import React from "react"
import { contactContent } from "../constants/portfolio.constants"
import { IContact } from "../interfaces/portfolio.interface"

function Contact() {
  return (
    <section id="contact">
      <div className="contact container">
        <div>
          <h1 className="section_title">
            Contact <span>Info</span>
          </h1>
        </div>
        <div className="contact_items">
          {contactContent.map((item: IContact) => (
            <div key={item.id} className="contact_item">
              <div className="icon">
                <img alt="" width={10} height={10} src={item.icon} />
              </div>
              <div className="contact_info">
                <h1>{item.title}</h1>
                <h2>{item.text}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
