/**
 * MMBT Projects Database
 *
 * A visual archive of chaos — editorial fashion & culture projects
 */

export const projects = {
  'raw-screaming-beans': {
    id: 'raw-screaming-beans',
    name: 'RAW',
    client: 'Screaming Beans',
    description:
      'A brutal exploration of visual tension through black-and-white compositions. The project distorts everyday symbols — coffee, consumption, desire — into something unsettling and visceral. Between fetish and discomfort, each visual plays with contrast, repetition, and raw typography to create an immediate emotional response. No storytelling, no explanation — just impact.',
    year: 'MMXXIV',
    category: 'Art Direction',
    tags: ['branding', 'visual identity', 'experimental', 'print'],
    images: [
      'screaming-beans/screaming-beans-13.jpg',
      'screaming-beans/screaming-beans-1.jpg',
      'screaming-beans/screaming-beans-2.jpg',
      'screaming-beans/screaming-beans-3.jpg',
      'screaming-beans/screaming-beans-4.jpg',
      'screaming-beans/screaming-beans-5.jpg',
      'screaming-beans/screaming-beans-6.jpg',
      'screaming-beans/screaming-beans-7.jpg',
      'screaming-beans/screaming-beans-8.jpg',
      'screaming-beans/screaming-beans-9.jpg',
      'screaming-beans/screaming-beans-10.jpg',
      'screaming-beans/screaming-beans-11.jpg',
      'screaming-beans/screaming-beans-12.jpg',
      'screaming-beans/screaming-beans-14.jpg',
      'screaming-beans/screaming-beans-15.jpg',
      'screaming-beans/screaming-beans-16.jpg',
      'screaming-beans/screaming-beans-17.jpg',
    ],
    featured_img: 'screaming-beans/screaming-beans-13.jpg',
    featured: true,
  },
  mmbt: {
    id: 'mmbt',
    name: 'Manifesto',
    client: 'MMBT',
    description:
      'Don’t ask. Take. Make it loud. Make it wrong. Make it impossible to ignore. No permission. No safety. No excuses. If it scares you, do it. If they don’t get it, push harder. MMBT isn’t here to fit. It’s here to force.',
    year: '',
    category: 'Art Direction',
    tags: ['branding', 'identity system', 'typography', 'experimental', 'fashion'],
    images: [
      'mmbt/MMBT_PRESENTATION.15.jpeg',
      'mmbt/MMBT_PRESENTATION.4.jpeg',
      'mmbt/MMBT_PRESENTATION.5.jpeg',
      'mmbt/MMBT_PRESENTATION.7.jpeg',
      'mmbt/MMBT_PRESENTATION.8.jpeg',
      'mmbt/MMBT_PRESENTATION.9.jpeg',
      'mmbt/MMBT_PRESENTATION.10.jpeg',
      'mmbt/MMBT_PRESENTATION.11.jpeg',
      'mmbt/MMBT_PRESENTATION.12.jpeg',
      'mmbt/MMBT_PRESENTATION.13.jpeg',
      'mmbt/MMBT_PRESENTATION.14.jpeg',
    ],
    featured_img: 'mmbt/MMBT_PRESENTATION.15.jpeg',
    featured: true,
  },
  'sakamara-first-campaign': {
    id: 'sakamara-first-campaign',
    name: 'DROP 01',
    client: 'SAKAMARA',
    description:
      'MMBT created the first campaign for SAKAMARA. Built for fighters. Shaped with artists.',
    year: 'MMXXIV',
    category: 'Art Direction',
    tags: ['campaign', 'fashion', 'sportswear', 'jiu-jitsu', 'branding', 'photography'],
    images: [
      'sakamara/SAKAMARA_1.jpg',
      'sakamara/SAKAMARA_2.jpg',
      'sakamara/SAKAMARA_3.jpg',
      'sakamara/SAKAMARA_4.jpg',
      'sakamara/SAKAMARA_5.jpg',
      'sakamara/SAKAMARA_6.jpg',
      'sakamara/SAKAMARA_7.jpg',
      'sakamara/SAKAMARA_9.jpg',
      'sakamara/SAKAMARA_10.jpg',
      'sakamara/SAKAMARA_11.jpg',
      'sakamara/SAKAMARA_Dojo.jpg',
      'sakamara/SAKAMARA_Dojo1.jpg',
      'sakamara/SAKAMARA_etiquette.jpg',
      'sakamara/SAKAMARA_graf.jpg',
    ],
    featured_img: 'sakamara/SAKAMARA_Dojo.jpg',
    featured: true,
  },

  // Add more projects here following the same structure
  // 'project-slug': {
  //   id: 'project-slug',
  //   name: 'Project Name',
  //   client: 'Client Name',
  //   description: 'Project description...',
  //   year: 'MMXXV',
  //   category: 'Category',
  //   tags: ['tag1', 'tag2'],
  //   images: ['image-1.jpg', 'image-2.jpg'],
  //   featured: false,
  // },
}

/**
 * Links & Social Media
 */
export const socialLinks = {
  instagram: {
    name: 'Instagram',
    url: 'https://instagram.com/mmbt',
    handle: '@mmbt',
  },
  twitter: {
    name: 'Twitter',
    url: 'https://twitter.com/mmbt',
    handle: '@mmbt',
  },
  // Add more social platforms as needed
  // behance: {
  //   name: 'Behance',
  //   url: 'https://behance.net/mmbt',
  //   handle: 'mmbt',
  // },
}

/**
 * Helper Functions
 */

// Get all projects as an array
export const getAllProjects = () => {
  return Object.values(projects)
}

// Get featured projects only
export const getFeaturedProjects = () => {
  return Object.values(projects).filter((project) => project.featured)
}

// Get project by ID
export const getProjectById = (id) => {
  return projects[id] || null
}

// Get projects by category
export const getProjectsByCategory = (category) => {
  return Object.values(projects).filter((project) => project.category === category)
}

// Get projects by tag
export const getProjectsByTag = (tag) => {
  return Object.values(projects).filter((project) => project.tags.includes(tag))
}

// Get all unique categories
export const getAllCategories = () => {
  const categories = Object.values(projects).map((project) => project.category)
  return [...new Set(categories)].filter(Boolean)
}

// Get all unique tags
export const getAllTags = () => {
  const tags = Object.values(projects).flatMap((project) => project.tags || [])
  return [...new Set(tags)]
}
