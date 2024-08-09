"use client"
import React from "react"
import Image from "next/image"
import Header from "../components/Header.component"
import Hero from "../components/Hero.component"
import Services from "../components/Services.component"
import Projects from "../components/Projects.component"
import About from "../components/About.component"
import Contact from "../components/Contact.component"
import Footer from "../components/Footer.component"

export default function Home() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Services />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
