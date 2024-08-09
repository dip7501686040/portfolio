import React from "react"
import { heroContents } from "../constants/portfolio.constants"
import { IHero } from "../interfaces/portfolio.interface"

function Hero() {
  return (
    <section id="hero">
      <div className="hero container">
        {heroContents.map((heroContent: IHero) => (
          <h1 key={heroContent.id}>
            {heroContent.content} <span></span>
          </h1>
        ))}
        <a href="#projects" type="button" className="cta">
          Portfolio
        </a>
      </div>
    </section>
  )
}

export default Hero
