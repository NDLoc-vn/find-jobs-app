export async function fetchJobs() {
  // delay de demo
  await new Promise(resolve => setTimeout(resolve, 1000));

  return [
    {
      title: "Junior Graphic Designer",
      company: "Google Inc.",
      salary: "$20,000 - $25,000",
      location: "Da Nang, Viet Nam"
    },
    {
      title: "Junior Graphic Designer",
      company: "Google Inc.",
      salary: "$20,000 - $25,000",
      location: "Da Nang, Viet Nam"
    },
    {
      title: "Junior Graphic Designer",
      company: "Google Inc.",
      salary: "$20,000 - $25,000",
      location: "Da Nang, Viet Nam"
    },
    {
      title: "Junior Graphic Designer",
      company: "Google Inc.",
      salary: "$20,000 - $25,000",
      location: "Da Nang, Viet Nam"
    },
    {
      title: "Junior Graphic Designer",
      company: "Google Inc.",
      salary: "$20,000 - $25,000",
      location: "Da Nang, Viet Nam"
    },
    {
      title: "Junior Graphic Designer",
      company: "Google Inc.",
      salary: "$20,000 - $25,000",
      location: "Da Nang, Viet Nam"
    },
  ];
}

export async function fetchCompanyAccount() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      name: "Google Inc.",
      email: "google@google.com",
      industry: "IT",
      phone: "0123456789",
      location: {
        city: "Đà Nẵng",
        address: "123 Nguyễn Lương Bằng",
      },
      website: "https://google.com",
    },
    {
      name: "Facebook Inc.",
      email: "facebook@facebook.com",
      industry: "IT",
      phone: "0123456789",
      location: {
        city: "Hà Nội",
        address: "456 Nguyễn Lương Bằng",
      },
      website: "https://facebook.com",
    }
  ]
}

export const predefinedSkills = [
  "React",
  "Vue",
  "Angular",
  "NodeJS",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "SASS",
  "LESS",
  "Bootstrap",
  "Material UI",
  "Ant Design",
  "Tailwind CSS",
  "Jest",
  "Mocha",
  "Chai",
  "Cypress",
  "Selenium",
  "Git",
  "Docker",
  "Kubernetes",
  "AWS",
  "Google Cloud",
  "Azure",
  "Firebase",
  "Heroku",
  "Netlify",
  "Vercel",
  "CI/CD",
  "Agile",

  "1React",
  "1Vue",
  "1Angular",
  "1NodeJS",
  "1Express",
  "1MongoDB",
  "1PostgreSQL",
  "1MySQL",
  "1TypeScript",
  "1JavaScript",
  "1HTML",
  "1CSS",
  "1SASS",
  "1LESS",
  "1Bootstrap",
  "1Material UI",
  "1Ant Design",
  "1Tailwind CSS",
  "1Jest",
  "1Mocha",
  "1Chai",
  "1Cypress",
  "1Selenium",
  "1Git",
  "1Docker",
  "1Kubernetes",
  "1AWS",
  "1Google Cloud",
  "1Azure",
  "1Firebase",
  "1Heroku",
  "1Netlify",
  "1Vercel",
  "1CI/CD",
  "1Agile",

  "2React",
  "2Vue",
  "2Angular",
  "2NodeJS",
  "2Express",
  "2MongoDB",
  "2PostgreSQL",
  "2MySQL",
  "2TypeScript",
  "2JavaScript",
  "2HTML",
  "2CSS",
  "2SASS",
  "2LESS",
  "2Bootstrap",
  "2Material UI",
  "2Ant Design",
  "2Tailwind CSS",
  "2Jest",
  "2Mocha",
  "2Chai",
  "2Cypress",
  "2Selenium",
  "2Git",
  "2Docker",
  "2Kubernetes",
  "2AWS",
  "2Google Cloud",
  "2Azure",
  "2Firebase",
  "2Heroku",
  "2Netlify",
  "2Vercel",
  "2CI/CD",
  "2Agile",

]