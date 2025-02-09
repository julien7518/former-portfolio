const person = {
  firstName: "Julien",
  lastName: "Fernandes",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Web Designer & Developer",
  location: "Paris, France",
  languages: ["French", "English", "Español"],
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/julien7518",
  },
  {
    name: "X",
    icon: "x",
    link: "https://x.com/julien_7518",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:julien.f2004@icloud.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name} - Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>{person.role}</>,
  subline: (
    <>
      I'm {person.firstName}, a creative developer who loves to create and develop his own projects.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  intro: {
    title: "Introduction",
    description: (
      <>
        I'm a {person.location.split(',')[0]}-based student in engineering with a passion for transforming challenges
        into simple and design solutions.
      </>
    ),
  },
  work: {
    display: false,
    title: "Work Experience",
    experiences: [
      {
        company: "",
        timeframe: "",
        role: "",
        achievements: [<></>, <></>]
      }
    ],
  },
  studies: {
    title: "Studies",
    institutions: [
      {
        name: "ESILV - École Supérieure d'Ingénieurs Léonard de Vinci",
        location: "Paris, France",
        description: <>Studied engineering and creative technology</>,
      },
      {
        name: "Dorset College",
        location: "Dublin, Irlande",
        description: <>International exchange, continue studying engineering during a semester abroad</>
      }
    ],
  },
  technologies: {
    title: "Techologies",
    techs: [
      {
        name: "React",
        icon: "/images/icons/react.svg",
        link: "https://www.react.dev/"
      },
      {
        name: "Next.js",
        icon: "/images/icons/nextjs.svg",
        link: "https://www.nextjs.org/"
      },
      {
        name: "Python",
        icon: "/images/icons/python.svg",
        link: "https://www.python.org/"
      },
      {
        name: "C++",
        icon: "/images/icons/cpp.svg",
        link: "https://isocpp.org/"
      }
    ]
  }
};

const work = {
  label: "Work",
  title: "My work",
  description: `Designed and developed projects by ${person.name}`,
};

const contact = {
  label: "Contact",
  title: "Contact me",
  description: `Contact ${person.name}, ${person.role}`,
}

export { person, social, home, about, work, contact };
