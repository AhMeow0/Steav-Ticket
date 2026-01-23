import { defineStore } from 'pinia'

import angkorWat from '../assets/explore/siem_reab/angkor_wat.png'
import pubStreet from '../assets/explore/siem_reab/pub_street.png'
import museumAngkor from '../assets/explore/angkor-museum.png'
import nationalMuseum from '../assets/explore/national-museum.png'
import watPhnom from '../assets/explore/Wat-Phnom.png'
import royalPalace from '../assets/explore/royal-palace.png'
import centralMarket from '../assets/explore/central-macket.png'
import kohPenh from '../assets/explore/koh-pech.png'
import kohTaKiev from '../assets/explore/koh-ta-kiev.png'
import ochheauteal from '../assets/explore/ochheauteal.png'
import taplom from '../assets/explore/taplom.png'
import serendipity from '../assets/explore/serendipity.png'
import sokha from '../assets/explore/sokha-beach.png'
import toulsreang from '../assets/explore/toulsreang.png'
import kohrong from '../assets/explore/kohRong.png'
import angkorThom from '../assets/explore/angkor-thom.png'
import siemreapLake from '../assets/explore/siemreap-lake.png'
import kohRongSamloan from '../assets/explore/koh-rong-samloan.png'

export type Place = {
  title: string
  slug: string
  location: string
  image: string
  description: string
}

const siemReap: Place[] = [
  {
    title: 'Angkor Wat',
    slug: 'angkor-wat',
    location: 'Siem Reap',
    image: angkorWat,
    description:
      'Angkor Wat is the largest religious monument in the world and the most iconic symbol of Cambodia. Built in the early 12th century, this UNESCO World Heritage site is renowned for its grand scale, intricate bas-reliefs, and harmonious architecture. Originally constructed as a Hindu temple and later transformed into a Buddhist sanctuary, Angkor Wat reflects centuries of religious and cultural evolution. Visitors are drawn to its majestic towers, detailed stone carvings depicting epic stories, and unforgettable sunrise views that make it one of the most photographed landmarks in Southeast Asia.',
  },
  {
    title: 'Pub Street',
    slug: 'pub-street',
    location: 'Siem Reap',
    image: pubStreet,
    description:
      'Pub Street is the vibrant heart of Siem Reap’s nightlife and entertainment scene. As the sun sets, this lively street comes alive with colorful lights, music, and an energetic atmosphere. Lined with restaurants, bars, cafés, and street food vendors, Pub Street offers everything from traditional Khmer dishes to international cuisine. It is a popular gathering place for travelers and locals alike, making it the perfect spot to unwind, socialize, and experience the modern energy of Siem Reap after a day of temple exploration.',
  },
  {
    title: 'Museum of Angkor',
    slug: 'museum-angkor',
    location: 'Siem Reap',
    image: museumAngkor,
    description:
      'The Angkor National Museum provides an in-depth introduction to the history, culture, and artistic achievements of the Khmer civilization. Through well-designed exhibits, ancient artifacts, sculptures, and multimedia presentations, the museum explains the rise and fall of the Angkor Empire in an engaging and educational way. It is an ideal starting point for visitors who want to better understand the symbolism, architecture, and religious significance of the Angkor temples before exploring them in person.',
  },
  {
    title: 'Ta Prohm',
    slug: 'taplom',
    location: 'Siem Reap',
    image: taplom,
    description:
      'Ta Prohm is one of the most atmospheric temples in the Angkor complex, famous for its dramatic blend of nature and ancient architecture. Massive tree roots intertwine with stone walls, creating a mysterious and almost cinematic landscape. Unlike many other temples, Ta Prohm has been intentionally left in a semi-ruined state to preserve its original appearance. This unique setting allows visitors to experience the powerful force of nature reclaiming history, making it a favorite destination for photographers and explorers.',
  },
  {
    title: 'Angkor Thom',
    slug: 'angkor-thom',
    location: 'Siem Reap',
    image: angkorThom,
    description:
      'Angkor Thom was the last great capital of the Khmer Empire and remains one of the most impressive archaeological sites in Cambodia. Enclosed by massive stone walls and a wide moat, the city contains numerous temples, terraces, and monuments, including the famous Bayon Temple with its many smiling stone faces. Angkor Thom reflects the power and sophistication of the empire at its peak and offers visitors a fascinating glimpse into ancient urban planning, religious beliefs, and royal life.',
  },
  {
    title: 'Siem Reap Lake',
    slug: 'siemreap-lake',
    location: 'Siem Reap',
    image: siemreapLake,
    description:
      'Siem Reap Lake is a peaceful natural retreat located near the city, offering a relaxing escape from the busy tourist areas. Surrounded by greenery and open skies, the lake is an ideal spot for leisurely walks, quiet reflection, and scenic photography. Visitors often come here to enjoy calm sunsets, cool breezes, and a slower pace of life. It is a perfect destination for those looking to unwind and experience the tranquil side of Siem Reap.',
  },
]

const phnomPenh: Place[] = [
  {
    title: 'National Museum',
    slug: 'national-museum',
    location: 'Phnom Penh',
    image: nationalMuseum,
    description:
      'The National Museum of Cambodia is the country’s most important cultural institution, housing the world’s largest and finest collection of Khmer art and sculptures. The museum’s distinctive terracotta architecture surrounds a peaceful courtyard garden, creating a calm and reflective atmosphere. Inside, visitors can explore thousands of artifacts ranging from prehistoric times to the Angkorian period, offering deep insight into Cambodia’s artistic heritage, religious traditions, and historical development.',
  },
  {
    title: 'Wat Phnom',
    slug: 'wat-phnom',
    location: 'Phnom Penh',
    image: watPhnom,
    description:
      'Wat Phnom is a historic hilltop temple that stands as the spiritual and symbolic heart of Phnom Penh. According to legend, the city was founded after Lady Penh discovered sacred statues at this site. Today, the temple remains an important place of worship for locals who come to pray for good luck, success, and protection. Surrounded by gardens and shaded trees, Wat Phnom also offers a peaceful retreat and a glimpse into the origins of Cambodia’s capital.',
  },
  {
    title: 'Royal Palace',
    slug: 'royal-palace',
    location: 'Phnom Penh',
    image: royalPalace,
    description:
      'The Royal Palace of Phnom Penh is the official residence of the King of Cambodia and one of the city’s most impressive landmarks. Built in the 19th century, the palace complex features elegant Khmer architecture, golden spires, and beautifully landscaped gardens. Highlights include the Silver Pagoda, named for its floor of thousands of silver tiles, and its collection of royal treasures. A visit to the Royal Palace provides insight into Cambodia’s monarchy, traditions, and ceremonial life.',
  },
  {
    title: 'Central Market',
    slug: 'central-market',
    location: 'Phnom Penh',
    image: centralMarket,
    description:
      'Central Market, also known as Phsar Thmey, is a vibrant and iconic Art Deco landmark in the heart of Phnom Penh. Its distinctive dome-shaped design houses a bustling marketplace where visitors can find everything from fresh produce and local snacks to jewelry, clothing, and souvenirs. The market offers a lively glimpse into everyday life in the city and is an excellent place to experience local culture, practice bargaining, and sample Cambodian street food.',
  },
  {
    title: 'Koh Pich',
    slug: 'koh-pich',
    location: 'Phnom Penh',
    image: kohPenh,
    description:
      'Koh Pich, commonly known as Diamond Island, is a modern urban development located along the riverside of Phnom Penh. The area is known for its wide boulevards, exhibition halls, shopping spaces, and event venues that host concerts, festivals, and international expos. Popular among locals for evening walks and social gatherings, Koh Pich represents the contemporary and rapidly developing side of the capital city.',
  },
  {
    title: 'Tuol Sleng Museum',
    slug: 'tuol-sleng',
    location: 'Phnom Penh',
    image: toulsreang,
    description:
      'Tuol Sleng Genocide Museum, formerly known as S-21 prison, is one of the most important historical sites in Cambodia. Once a high school, it was converted into a detention and interrogation center during the Khmer Rouge regime. Today, the museum preserves photographs, documents, and personal stories that bear witness to the atrocities committed during this period. A visit to Tuol Sleng is a deeply moving and educational experience, offering reflection on Cambodia’s past and the resilience of its people.',
  },
]


const preahSihanouk: Place[] = [
  {
    title: 'Koh Takiev',
    slug: 'koh-takiev',
    location: 'Preah Sihanouk',
    image: kohTaKiev,
    description:
      'Koh Ta Kiev is a peaceful and relatively undeveloped island known for its untouched beaches, dense jungle, and laid-back atmosphere. Unlike more commercial islands, Koh Ta Kiev offers a rustic experience with simple bungalows, limited electricity, and a strong connection to nature. It is an ideal destination for travelers seeking quiet relaxation, ocean views, and a slower pace of life away from crowds and modern distractions.',
  },
  {
    title: 'Koh Rong',
    slug: 'koh-rong',
    location: 'Preah Sihanouk',
    image: kohrong,
    description:
      'Koh Rong is one of Cambodia’s most popular island destinations, famous for its long stretches of white sand beaches, crystal-clear turquoise waters, and vibrant island lifestyle. The island offers a mix of relaxation and adventure, with opportunities for swimming, snorkeling, kayaking, and boat tours. In the evening, certain areas of Koh Rong come alive with beach bars, music, and nightlife, making it a favorite choice for both backpackers and holidaymakers.',
  },
  {
    title: 'Otres Beach',
    slug: 'otres-beach',
    location: 'Preah Sihanouk',
    image: ochheauteal,
    description:
      'Otres Beach is a tranquil seaside destination known for its soft golden sand, calm waters, and relaxed atmosphere. Compared to the busier beaches nearby, Otres offers a more peaceful environment with beachfront cafés, small resorts, and open spaces ideal for walking and sunset views. It is a popular spot for couples and travelers looking to unwind, enjoy fresh seafood, and experience a quieter side of Sihanoukville’s coastline.',
  },
  {
    title: 'Serendipity Beach',
    slug: 'serendipity-beach',
    location: 'Preah Sihanouk',
    image: serendipity,
    description:
      'Serendipity Beach is one of the most lively and accessible beaches in Preah Sihanouk, attracting both tourists and locals. The beach is lined with restaurants, bars, and hotels, offering a wide range of dining and entertainment options. Known for its beautiful sunsets and energetic nightlife, Serendipity Beach is ideal for visitors who enjoy socializing, beach activities, and a vibrant coastal atmosphere.',
  },
  {
    title: 'Sokha Beach',
    slug: 'sokha-beach',
    location: 'Preah Sihanouk',
    image: sokha,
    description:
      'Sokha Beach is a clean, well-maintained, and relatively private beach area associated with luxury resorts in Preah Sihanouk. The beach is known for its fine white sand, calm waters, and peaceful surroundings, making it perfect for relaxation and leisurely swims. With fewer crowds and high standards of cleanliness, Sokha Beach appeals to visitors seeking comfort, privacy, and a premium beach experience.',
  },
  {
    title: 'Koh Rong Samloan',
    slug: 'koh-rong-samloan',
    location: 'Preah Sihanouk',
    image: kohRongSamloan,
    description:
      'Koh Rong Samloem is a serene and picturesque island ideal for travelers looking for tranquility and natural beauty. The island features pristine beaches, clear shallow waters, and excellent conditions for swimming, snorkeling, and kayaking. With limited development and a calm atmosphere, Koh Rong Samloem is perfect for peaceful escapes, romantic getaways, and reconnecting with nature in a stunning island setting.',
  },
]

export const usePlaceStore = defineStore('place', {
  state: () => ({
    siemReap,
    phnomPenh,
    preahSihanouk,
  }),
})
