export interface IHeader {
  title: string
  link: string
}

export interface IHero {
  id: number
  content: string
}

export interface IServices {
  id: number
  title: string
  icon: string
  descs: string[]
}

export interface IProjects {
  id: number
  title: string
  img: string
  links: IProjectsLinks[]
  descs: string[]
}
export interface IProjectsLinks {
  id: number
  title: string
  link: string
}

export interface IContact {
  id: number
  title: string
  icon: string
  text: string
}
export interface IFooterScialItem {
  id: number
  icon: string
  link: string
}
