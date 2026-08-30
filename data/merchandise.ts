export interface MerchItem {
  id: string
  name: string
  gradient: string
  image: string | null
  url: string | null
}

export const MERCH_ITEMS: MerchItem[] = [
  {
    id: 'keychain',
    name: 'DEC4IR 2026 Keychain',
    gradient: 'from-violet-900/70 to-purple-900/70',
    image: '/media/merch/dec4ir-keychain.png',
    url: 'https://shopee.com.my/product/1630383609/49051278865/'
  },
  {
    id: 'shirts',
    name: 'DEC4IR 2026 T-Shirts (Short & Long)',
    gradient: 'from-violet-900/70 to-purple-900/70',
    image: '/media/merch/dec4ir-shirts.png',
    url: 'https://my.shp.ee/wQwkQyz4'
  }
]

// Replace with actual Shoppee store URL when available
export const SHOPEE_URL = 'https://shopee.com.my/ketupartstudio'
