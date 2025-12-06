import { reactive } from 'vue';

// 1. Define the Interface
export interface Route {
  id: number;
  from: string;
  to: string;
  date: string;
  price: number;
  duration: string;
  type: string;
}

export const store = reactive({
  // DATA: Initial Routes
  routes: [
    { id: 1, from: 'Phnom Penh', to: 'Siem Reap', date: '2023-12-10', price: 15, duration: '6h', type: 'Luxury Bus' },
    { id: 2, from: 'Phnom Penh', to: 'Sihanoukville', date: '2023-12-12', price: 12, duration: '4h', type: 'Minivan' },
    { id: 3, from: 'Siem Reap', to: 'Phnom Penh', date: '2023-12-15', price: 15, duration: '6h', type: 'Sleeper Bus' },
  ] as Route[],

  // DATA: Popular Destinations
  destinations: [
    { id: 1, name: 'Angkor Wat', location: 'Siem Reap', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Angkor_Wat.jpg/640px-Angkor_Wat.jpg' },
    { id: 2, name: 'National Museum', location: 'Phnom Penh', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/National_Museum_of_Cambodia_2013.jpg/640px-National_Museum_of_Cambodia_2013.jpg' },
    { id: 3, name: 'Royal Palace', location: 'Phnom Penh', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Royal_Palace_Phnom_Penh.jpg/640px-Royal_Palace_Phnom_Penh.jpg' },
  ],

  // LOGIC: Search
  // FIXED: Removed the unused 'date' parameter that was causing the error
  searchRoutes(from: string, to: string) {
    if (!from && !to) return this.routes;
    
    return this.routes.filter((r) => {
      const matchFrom = from ? r.from.toLowerCase().includes(from.toLowerCase()) : true;
      const matchTo = to ? r.to.toLowerCase().includes(to.toLowerCase()) : true;
      return matchFrom && matchTo;
    });
  },

  // LOGIC: Add Route
  // FIXED: Changed 'any' to 'Partial<Route>' to fix the strict type error
  addRoute(newRoute: Partial<Route>) {
    this.routes.push({
      id: Date.now(),
      from: newRoute.from || '',
      to: newRoute.to || '',
      date: newRoute.date || '',
      price: newRoute.price || 0,
      duration: newRoute.duration || '',
      type: newRoute.type || 'Standard'
    });
  }
});