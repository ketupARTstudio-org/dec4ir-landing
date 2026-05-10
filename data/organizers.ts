export interface Organizer {
  id: string
  name: string
  nameBM: string
  shortName: string
  logo: string | null
  url: string
}

export const ORGANIZERS: Organizer[] = [
  {
    id: 'utm',
    name: 'Universiti Teknologi Malaysia',
    nameBM: 'Universiti Teknologi Malaysia',
    shortName: 'UTM',
    logo: '/logos/organizers/utm.png',
    url: 'https://www.utm.my',
  },
  {
    id: 'moe',
    name: 'Ministry of Education Malaysia',
    nameBM: 'Kementerian Pendidikan Malaysia',
    shortName: 'MOE / KPM',
    logo: '/logos/organizers/moe.png',
    url: 'https://www.moe.gov.my',
  },
]
