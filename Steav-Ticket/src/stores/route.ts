import { defineStore } from 'pinia'
import axios from 'axios'

export const useRouteStore = defineStore('routeStore', {
  state: () => ({
    routes: [] as any[],
    origins: [] as string[],
    destinations: [] as string[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchRoutes() {
      this.loading = true
      this.error = null

      try {
        // ✔ This is your real backend endpoint
        const res = await axios.get('http://localhost:3000/api/routes')

        this.routes = res.data

        const o = new Set<string>()
        const d = new Set<string>()

        this.routes.forEach((r: any) => {
          if (r.origin) o.add(r.origin)
          if (r.destination) d.add(r.destination)
        })

        this.origins = [...o]
        this.destinations = [...d]

      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to load routes'
      } finally {
        this.loading = false
      }
    }
  }
})
