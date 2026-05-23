export type OrganizerTier = 'main' | 'strategic'

export interface Organizer {
  id: string
  tier: OrganizerTier
  name: string
  nameBM: string
  shortName: string
  logo: string | null
  url: string
}

export const ORGANIZERS: Organizer[] = [
  {
    id: 'moe',
    tier: 'main',
    name: 'Ministry of Education Malaysia',
    nameBM: 'Kementerian Pendidikan Malaysia',
    shortName: 'MOE / KPM',
    logo: '/logos/organizers/logo-KPM-bm-white.png',
    url: 'https://www.moe.gov.my',
  },
  {
    id: 'utm',
    tier: 'main',
    name: 'Universiti Teknologi Malaysia',
    nameBM: 'Universiti Teknologi Malaysia',
    shortName: 'UTM',
    logo: '/logos/organizers/logo-UTM-standard.png',
    url: 'https://www.utm.my',
  },
  {
    id: 'sitc',
    tier: 'strategic',
    name: 'Sport Innovation & Technology Center',
    nameBM: 'Pusat Inovasi & Teknologi Sukan',
    shortName: 'SITC',
    logo: '/logos/strategic-partners/logo-SITC.png',
    url: 'https://research.utm.my/sitc/',
  },
  {
    id: 'ihuEn',
    tier: 'strategic',
    name: 'Institute of Human Centered Engineering',
    nameBM: 'Institut Kejuruteraan Berpusatkan Manusia',
    shortName: 'iHumEn',
    logo: '/logos/strategic-partners/logo-iHuEn.png',
    url: 'https://research.utm.my/ihumen/',
  },
  {
    id: 'dronecraft',
    tier: 'strategic',
    name: 'Dronecraft Solutions',
    nameBM: 'Dronecraft Solutions',
    shortName: 'Dronecraft',
    logo: '/logos/strategic-partners/logo-Dronecraft.png',
    url: '#',
  },
  {
    id: 'ketupART',
    tier: 'strategic',
    name: 'KetupART Studio',
    nameBM: 'KetupART Studio',
    shortName: 'KetupART',
    logo: '/logos/strategic-partners/logo-KetupART-Studio-Standard-2.png',
    url: 'https://www.ketupartstudio.com',
  },
]
