export const ROVERS = Object.freeze([
  {
    id: 'sojourner',
    name: 'Sojourner',
    body: 'Mars',
    agency: 'NASA / JPL',
    launchDate: 'December 4, 1996',
    landingDate: 'July 4, 1997',
    landingSite: 'Ares Vallis',
    landingMethod: 'Airbag-assisted descent',
    description: 'The first rover to explore another planet, delivered by the Mars Pathfinder lander.',
    animation: {
      type: 'airbag',
      accent: '#ef9b68',
      stages: ['Atmospheric entry', 'Airbags inflate', 'Bounce and settle', 'Ramp deployment']
    }
  },
  {
    id: 'spirit',
    name: 'Spirit',
    body: 'Mars',
    agency: 'NASA / JPL',
    launchDate: 'June 10, 2003',
    landingDate: 'January 4, 2004',
    landingSite: 'Gusev Crater',
    landingMethod: 'Airbag-assisted descent',
    description: 'Spirit searched for evidence of past water activity during a surface mission designed for 90 sols.',
    animation: {
      type: 'airbag',
      accent: '#e7865a',
      stages: ['Atmospheric entry', 'Airbags inflate', 'Bounce and settle', 'Rover wakes']
    }
  },
  {
    id: 'opportunity',
    name: 'Opportunity',
    body: 'Mars',
    agency: 'NASA / JPL',
    launchDate: 'July 7, 2003',
    landingDate: 'January 25, 2004',
    landingSite: 'Meridiani Planum',
    landingMethod: 'Airbag-assisted descent',
    description: 'Opportunity operated for nearly 14 years and found compelling evidence of ancient water on Mars.',
    animation: {
      type: 'airbag',
      accent: '#f2ae72',
      stages: ['Atmospheric entry', 'Airbags inflate', 'Bounce and settle', 'Rover wakes']
    }
  },
  {
    id: 'curiosity',
    name: 'Curiosity',
    body: 'Mars',
    agency: 'NASA / JPL',
    launchDate: 'November 26, 2011',
    landingDate: 'August 6, 2012',
    landingSite: 'Gale Crater',
    landingMethod: 'Parachute and sky crane',
    description: 'The car-sized rover landed inside Gale Crater to study whether ancient Mars could have supported life.',
    animation: {
      type: 'sky-crane',
      accent: '#ef9b68',
      stages: ['Atmospheric entry', 'Parachute descent', 'Sky crane lowers rover', 'Wheels down']
    }
  },
  {
    id: 'perseverance',
    name: 'Perseverance',
    body: 'Mars',
    agency: 'NASA / JPL',
    launchDate: 'July 30, 2020',
    landingDate: 'February 18, 2021',
    landingSite: 'Jezero Crater',
    landingMethod: 'Parachute and sky crane',
    description: 'Perseverance searches for signs of ancient microbial life and collects samples for possible future return.',
    animation: {
      type: 'sky-crane',
      accent: '#d8a36a',
      stages: ['Atmospheric entry', 'Parachute descent', 'Sky crane lowers rover', 'Wheels down']
    }
  },
  {
    id: 'zhurong',
    name: 'Zhurong',
    body: 'Mars',
    agency: 'CNSA',
    launchDate: 'July 23, 2020',
    landingDate: 'May 14, 2021',
    landingSite: 'Utopia Planitia',
    landingMethod: 'Parachute and powered descent',
    description: 'China’s first Mars rover studied the surface and shallow subsurface of Utopia Planitia.',
    animation: {
      type: 'parachute',
      accent: '#c76843',
      stages: ['Atmospheric entry', 'Parachute descent', 'Powered descent', 'Touchdown']
    }
  },
  {
    id: 'lunokhod-1',
    name: 'Lunokhod 1',
    body: 'Moon',
    agency: 'Soviet Academy of Sciences',
    launchDate: 'November 10, 1970',
    landingDate: 'November 17, 1970',
    landingSite: 'Mare Imbrium',
    landingMethod: 'Luna 17 soft landing and ramp deployment',
    description: 'The first successful remote-controlled rover to operate on another world.',
    animation: {
      type: 'lunar-ramp',
      accent: '#d6d2c7',
      stages: ['Lunar descent', 'Soft landing', 'Ramp deploys', 'Rover rolls out']
    }
  },
  {
    id: 'lunokhod-2',
    name: 'Lunokhod 2',
    body: 'Moon',
    agency: 'Soviet Academy of Sciences',
    launchDate: 'January 8, 1973',
    landingDate: 'January 15, 1973',
    landingSite: 'Le Monnier crater',
    landingMethod: 'Luna 21 soft landing and ramp deployment',
    description: 'Lunokhod 2 travelled across the lunar surface and returned a large volume of scientific data.',
    animation: {
      type: 'lunar-ramp',
      accent: '#c6d1d6',
      stages: ['Lunar descent', 'Soft landing', 'Ramp deploys', 'Rover rolls out']
    }
  },
  {
    id: 'apollo-lunar-roving-vehicle',
    name: 'Apollo Lunar Roving Vehicle',
    body: 'Moon',
    agency: 'NASA',
    launchDate: 'July 26, 1971',
    landingDate: 'July 30, 1971',
    landingSite: 'Hadley–Apennine region',
    landingMethod: 'Apollo 15 lunar module landing and ramp deployment',
    description: 'The battery-powered Lunar Roving Vehicle extended the astronauts’ range during Apollo 15, 16, and 17.',
    verificationNote: 'TODO: The dates describe Apollo 15, the first mission to deploy the vehicle; verify the preferred vehicle-level date.',
    animation: {
      type: 'lunar-ramp',
      accent: '#f2c879',
      stages: ['Lunar descent', 'Lunar module lands', 'Ramp deploys', 'Rover rolls out']
    }
  },
  {
    id: 'yutu',
    name: 'Yutu',
    body: 'Moon',
    agency: 'CNSA',
    launchDate: 'December 1, 2013',
    landingDate: 'December 14, 2013',
    landingSite: 'Mare Imbrium',
    landingMethod: 'Chang’e 3 soft landing and ramp deployment',
    description: 'Yutu was China’s first lunar rover and explored the surface near the Chang’e 3 lander.',
    animation: {
      type: 'lunar-ramp',
      accent: '#e8dfc8',
      stages: ['Lunar descent', 'Soft landing', 'Ramp deploys', 'Rover rolls out']
    }
  },
  {
    id: 'yutu-2',
    name: 'Yutu-2',
    body: 'Moon',
    agency: 'CNSA',
    launchDate: 'December 7, 2018',
    landingDate: 'January 3, 2019',
    landingSite: 'Von Kármán crater',
    landingMethod: 'Chang’e 4 soft landing and ramp deployment',
    description: 'Yutu-2 became the first rover to explore the far side of the Moon.',
    animation: {
      type: 'lunar-ramp',
      accent: '#c9d7d4',
      stages: ['Lunar descent', 'Soft landing', 'Ramp deploys', 'Rover rolls out']
    }
  },
  {
    id: 'pragyan',
    name: 'Pragyan',
    body: 'Moon',
    agency: 'ISRO',
    launchDate: 'July 14, 2023',
    landingDate: 'August 23, 2023',
    landingSite: 'Shiv Shakti Point',
    landingMethod: 'Vikram lander soft landing and ramp deployment',
    description: 'Pragyan explored the lunar south polar region as part of India’s Chandrayaan-3 mission.',
    animation: {
      type: 'lunar-ramp',
      accent: '#d8a36a',
      stages: ['Lunar descent', 'Soft landing', 'Ramp deploys', 'Rover rolls out']
    }
  }
]);

export function getRover(id) {
  return ROVERS.find((rover) => rover.id === id);
}
