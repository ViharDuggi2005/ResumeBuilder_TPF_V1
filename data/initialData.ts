import type { ResumeData } from '../types';

export const initialResumeData: ResumeData = {
  personalDetails: {
    name: 'JOHN DOE',
    photo: 'https://via.placeholder.com/130x140.png?text=',
    degree: 'B.Tech - Computer Science and Engineering',
    gender: 'Male',
    dob: '06/09/2005',
    email: 'tp@nitt.edu',
    contact: '+91-431-2501081',
    logo: 'https://via.placeholder.com/144x144.png?text=',
  },
  education: [
    { id: 'edu1', year: '2023-Present', degree: 'B.Tech- CSE', institution: 'NIT, Trichy', grade: '9.2' },
    { id: 'edu2', year: '2023', degree: 'Class XII', institution: 'Delhi Public School, R. K. Puram', grade: '97.2%' },
    { id: 'edu3', year: '2021', degree: 'Class X', institution: 'Delhi Public School, R. K. Puram', grade: '98.8%' },
  ],
  internships: [
    {
      id: 'int1',
      title: 'Research Internship at Indian Institute of Technology Guwahati',
      date: 'Jun 2025 - Present',
      description: 'Working as a research intern on the project Air to Water Generator. I simulated a model in Dymola to extract water from humid air with the purpose of satisfying water requirements in coastal regions.',
    },
    {
      id: 'int2',
      title: 'Internship at AHODS Technologies Private Limited',
      date: 'Jun 2025 - Aug 2025',
      description: "Collaborated with IIT Delhi on a project to enhance onboard hydrogen production for vehicles. Conducted a literature review on electrolysis methods to propose cost-effective solutions.",
    },
  ],
  achievements: [
    { id: 'ach1', description: 'Secured <b>Rank 2</b> in Cyber Olympiad(IFCO) in the Zonal level conducted by International Olympiad Foundation in 2022.' },
    { id: 'ach2', description: 'Achieved <b>Top 5%</b> in the national competitive programming contest CodeSprint 2023.' },
    { id: 'ach3', description: '<b>IBPC Meritorious Student Award</b> in 2021 and 2023.' },
  ],
  projects: [
    {
      id: 'proj1',
      name: 'RideNITT',
      date: 'January 2025 - March 2025',
      description: 'Developed RideNitt, a ride-sharing platform for students, using React.js, Tailwind CSS, and an Express.js backend with PostgreSQL, featuring Google OAuth2 and Leaflet.js for routing.',
    },
    {
      id: 'proj2',
      name: 'Weather App',
      date: 'May 2025',
      description: 'Developed a Weather App that displays the weather of 3 cities on the home page. It also displays the weather of any city searched for in the search box. It displays temperature, feels like temperature, humidity, and wind speed. The front end is made using HTML, CSS, and JavaScript. The API used to get weather data is Weather API by WeatherAPI.com.',
    },
     {
      id: 'proj3',
      name: 'Chatty',
      date: 'June 2025',
      description: 'Built Chatty, a real-time chat application with one-on-one messaging and online status, using the MERN stack with Socket.io, JWT for security, and Zustand for state management.',
    },
  ],
  skills: [
      { id: 'skill1', category: 'Programming Languages', skills: 'C++, C, JavaScript, HTML, CSS' },
      { id: 'skill2', category: 'Frameworks/Libraries', skills: 'React.js, Socket.io' },
      { id: 'skill3', category: 'Tools', skills: 'Visual Studio Code, Git, GitHub, Node.js' },
      { id: 'skill4', category: 'Other Softwares', skills: 'Figma, Photoshop' },
  ],
  positions: [
    { id: 'pos1', title: 'Associate, The Product Folks NITT', date: 'May 2025-Present', description: 'As a member of the Product Management Club of NIT Trichy, I take part in upskilling sessions and work on case studies, projects, and product decks.'},
    { id: 'pos2', title: 'Manager, Marketing, Festember', date: 'Mar 2024 - Present', description: 'Worked as a Marketing Manager of Festember\'24, the annual cultural festival of NIT Trichy. Executed the task of establishing partnerships with various companies through effective communication and negotiation strategies.'},
  ],
  activities: [
      { id: 'act1', title: 'Social Activities', description: 'A volunteer under the HumaNITTy programme, NIT Trichy chapter, which aims at visiting local old age homes and orphanages and spending quality time with them.\nConducted Breast Cancer Awareness during my tenure as an A-Flight NCC Cadet at NIT Trichy.'},
      { id: 'act2', title: 'Cultural Activities', description: 'Secured 1st position in Pixel Pirates event of Pragyan in 2023.\nParticipated in the Republic Day Parade of NIT Trichy in 2024.\nDAN 1 - Black Belt Holder in Karate'},
      { id: 'act3', title: 'Sports Activities', description: 'Participated in 10K sportsfete marathon'},
  ]
};