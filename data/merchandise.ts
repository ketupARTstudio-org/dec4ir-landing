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
    image: '/media/merch/dec4ir-keychain.jpg',
    url: 'https://shopee.com.my/DEC4IR-Stainless-Key-Ring-Keychain-i.1630383609.49051278865?extraParams=%7B%22display_model_id%22%3A360114462537%2C%22model_selection_logic%22%3A3%7D'
  },
]

// Replace with actual Shoppee store URL when available
export const SHOPEE_URL = 'https://shopee.com.my/ketupartstudio'
