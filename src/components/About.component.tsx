import Image from "next/image"
import React from "react"
import { aboutContent } from "../constants/portfolio.constants"

function About() {
  return (
    <section id="about">
      <div className="about container">
        <div className="col_left">
          <div className="about_img">
            <Image alt="" width={300} height={300} src={aboutContent.img} />
          </div>
        </div>
        <div className="col_right">
          <h1 className="section_title">
            about <span>me</span>
          </h1>
          <h2>{aboutContent.title}</h2>
          <p>{aboutContent.desc}</p>
          <p>
            <b>
              Skills -{" "}
              {aboutContent.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </b>
          </p>
          <a href={aboutContent.resumeLink} className="cta" download={aboutContent.resumeTitle}>
            Download Resume
          </a>
        </div>
      </div>
    </section>
  )
}

export default About
