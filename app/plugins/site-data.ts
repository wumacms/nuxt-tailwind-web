import type { ApiResponse } from '~/types'
import type { SiteDataBundle } from '~/composables/useSiteData'

export default defineNuxtPlugin(async () => {
  const siteData = useState<SiteDataBundle | null>('site-data', () => null)

  if (!siteData.value) {
    try {
      const res = await $fetch<ApiResponse<SiteDataBundle>>('/api/site-data')
      siteData.value = res.data
    } catch (err) {
      console.error('[site-data plugin] Failed to fetch /api/site-data:', err)
    }
  }
})
