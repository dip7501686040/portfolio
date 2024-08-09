import Image from "next/image"
import React from "react"
import { projects } from "../constants/portfolio.constants"
import { IProjects, IProjectsLinks } from "../interfaces/portfolio.interface"

function Projects() {
  return (
    <section id="projects">
      <div className="projects container">
        <div className="projects_herder">
          <h1 className="section_title">
            Recent<span> Projects</span>
          </h1>
        </div>
        <div className="all_projects">
          {projects.map((project: IProjects) => (
            <div key={project.id} className="project_item">
              <div className="project_info">
                <h1>{project.title}</h1>
                {project.links.map((link: IProjectsLinks) => (
                  <h2 key={link.id}>
                    <>{link.title}</>
                    <a href={link.link} target="_blank">
                      {link.link}
                    </a>
                  </h2>
                ))}
                <div className="project_desc">
                  <ul>
                    {project.descs.map((desc: string) => (
                      <li key={desc}>{desc}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="project_img">
                <Image alt="" width={300} height={300} src={project.img} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
