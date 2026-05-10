export interface MerchItem {
  id: string
  name: string
  gradient: string
  image: string | null
}

export const MERCH_ITEMS: MerchItem[] = [
  {
    id: 'tshirt',
    name: 'DEC4IR 2026 T-Shirt',
    gradient: 'from-cyan-900/70 to-blue-900/70',
    image: null,
  },
  {
    id: 'cap',
    name: 'DEC4IR Official Cap',
    gradient: 'from-blue-900/70 to-indigo-900/70',
    image: null,
  },
  {
    id: 'bag',
    name: 'Drone Kit Bag',
    gradient: 'from-violet-900/70 to-purple-900/70',
    image: null,
  },
  {
    id: 'notebook',
    name: 'Competition Notebook',
    gradient: 'from-indigo-900/70 to-cyan-900/70',
    image: null,
  },
]

// Replace with actual Shopify store URL when available
export const SHOPIFY_URL = 'https://dec4ir.myshopify.com'
