import HanumanTemple from '../images/HanumanTemple.jpg';
import Akshyavat from '../images/AkshayvatTemple.jpg'; 
import SaraswatiKoopImage from '../images/SaraswatiKoop.jpg';
import MankameshwarTempleImage from '../images/MankameshwarTemple.jpg';
import BharadwajAshramImage from '../images/Bhardwajashram.jpg';
import ShringverpurImage from '../images/Shringverpur.png';
import SacredBathingRitualsImage from '../images/Bathing.png';
import AkharaCampsImage from '../images/Akhara.png';
import SpiritualDiscoursesImage from '../images/Satsang.png';
import CulturalPerformancesImage from '../images/Cultural.png';
import YogaMeditationImage from '../images/Yoga.png';
import CraftAndFoodBazaarsImage from '../images/Craft.png'; // Placeholder for image
import CulturalProcessionsImage from '../images/Processions.png'; // Placeholder for image
import EnvironmentalInitiativesImage from '../images/Environmental.png'; // Placeholder for image
import ArtInstallationsImage from '../images/Craft.png'; // Placeholder for image
import GangaAartiImage from '../images/Aartionghats.jpg'; // Placeholder for image

const attractionsData = {
  "Sankatmochan Hanuman Temple": {
    title: "Sankatmochan Hanuman Temple",
    description:
      "In Daraganj locality, on the bank of the Ganga, is the Sankatmochan Hanuman Temple. It is said that Saint Samarth Guru Ramdasji had established the idol of Lord Hanuman here. The idols of Shiva-Parvati, Ganesh, Bhairav, Durga, Kali, and Navgrah are also enshrined in the premises of the temple. Nearby are Shri Ram-Janki temples and HaritMadhava temple.",
    image: HanumanTemple,
  },
  "Aarti on the Ghats": {
    title: "Aarti on the Ghats",
    description:
      "End your day with the mesmerizing Ganga Aarti ceremony on the riverbanks. The sight of thousands of lamps illuminating the sky and the soul-stirring chants create an unforgettable spiritual experience.",
    image: GangaAartiImage,
  },
  "Akshayvat & Patalpuri Temple": {
      title: "Akshayvat & Patalpuri Temple",
      description: "Akshayvat “the indestructible Banyan tree” is a sacred fig tree mentioned in Hindu mythology, and in Hindu texts. The Akshaya Vat tree has been mentioned in great details by historians and travelers such as the Buddhist Pilgrim Hieun-tsang and the archaeologist, Alexander Cunningham. The tree is significant, for it is where Rama, Lakshman and Sitathe protagonists of the Ramayana are said to have rested during their exile from Ayodhya. Patalpuri Temple : Patalpuri Temple is one of the oldest temples in India dating back to the vedic period. This beautifully decorated underground temple is built within the Allahabad fort close to the immortal tree Akshayvat.",
      image: Akshyavat
},
  "Saraswati Koop": {
    title: "Saraswati Koop",
    description:
      "The Saraswati Koop refurbishment for Maha Kumbh Mela 2025 is a monumental initiative aimed at restoring and enhancing the spiritual significance of the sacred well. The project involves meticulous restoration efforts to preserve its historical and cultural importance, ensuring pilgrims experience a profound connection during the revered event.",
    image: SaraswatiKoopImage,
  },
  "Mankameshwar Temple": {
    title: "Mankameshwar Temple",
    description:
      "It is situated near Minto Park on the west of the fort along the Yamuna River. It has a black stone lingam and statues of Ganesh and Nandi. There is a grand statue of Hanuman and an ancient peepal tree near the temple.",
    image: MankameshwarTempleImage,
  },
  "Maha Rishi Bharadwaj Ashram": {
    title: "Maha Rishi Bharadwaj Ashram",
    description:
      "Associated with Sage Bharadwaj, this is a renowned religious place. During the time of Sage Bharadwaj, it was famous as an educational center. It is believed that Lord Rama visited this place with Sitaji and Lakshmanji while proceeding to Chitrakoot during his exile. At present, there are temples of Bharadwajeshwar Mahadeva, Sage Bharadwaj, TeertharajPrayag, and Goddess Kali. Nearby is the beautiful Bharadwaj Park.",
    image: BharadwajAshramImage,
  },
  "Shringverpur": {
    title: "Shringverpur",
    description:
      "Shringverpur holds significance as a site approximately 45 km away on the Lucknow Road in Prayagraj. According to legend, this is where Lord Ram, accompanied by Goddess Sita and Lakshman Ji, crossed the Ganga River during their exile. In the Ramayana, Shringverpur is depicted as the capital of Nishadraj's kingdom. Excavations revealed the temple of Shringi Rishi, believed to have lent its name to the city. A platform marks the spot where Nishadraj washed Lord Ram's feet, a sacred act symbolizing devotion.",
    image: ShringverpurImage,
  },
  "The Sacred Bathing Rituals": {
    title: "The Sacred Bathing Rituals",
    description:
      "One of the most profound experiences at Maha Kumbh is taking part in the holy bathing rituals at the confluence of the Ganges, Yamuna, and Saraswati rivers. Witness the spectacle of millions of pilgrims immersing themselves in the sacred waters, seeking spiritual purification and blessings.",
    image: SacredBathingRitualsImage,
  },
  "Akhara Camps": {
    title: "Akhara Camps",
    description:
      "The Akhara camps are where spiritual seekers, sadhus, and ascetics gather to discuss philosophy, engage in meditation, and share their wisdom. Explore these camps to engage in enlightening conversations and witness the ascetic lifestyle up close.",
    image: AkharaCampsImage,
  },
  "Spiritual Discourses and Satsang’s": {
    title: "Spiritual Discourses and Satsang’s",
    description:
      "Maha Kumbh offers an unparalleled opportunity to attend spiritual discourses and satsangs led by renowned saints, gurus, and scholars. These gatherings provide profound insights into the ancient wisdom and teachings of Hinduism.",
    image: SpiritualDiscoursesImage,
  },
  "Cultural Performances": {
    title: "Cultural Performances",
    description:
      "Immerse yourself in the rich cultural tapestry of India at Maha Kumbh. Enjoy classical music and dance performances, folk art exhibitions, and traditional theater. The vibrant displays of India's diverse heritage are a visual and auditory feast.",
    image: CulturalPerformancesImage,
  },
  "Yoga and Meditation Retreats": {
    title: "Yoga and Meditation Retreats",
    description:
      "Discover inner peace and rejuvenation through yoga and meditation retreats held throughout the festival. Experienced instructors guide participants in achieving physical, mental, and spiritual harmony.",
    image: YogaMeditationImage,
  },
  "Craft and Food Bazaars": {
    title: "Craft and Food Bazaars",
    description:
      "Explore the bustling bazaars, where artisans showcase their craftsmanship, from intricate jewelry to handwoven textiles. Savor the flavors of India at the food stalls, offering a diverse range of regional delicacies.",
    image: CraftAndFoodBazaarsImage,
  },
  "Cultural Processions and Parades": {
    title: "Cultural Processions and Parades",
    description:
      "Be part of colorful processions and parades that showcase the cultural diversity of India. These processions often feature elephants, horses, chariots, and beautifully adorned participants.",
    image: CulturalProcessionsImage,
  },
  "Environmental Initiatives": {
    title: "Environmental Initiatives",
    description:
      "Maha Kumbh 2025 places a strong emphasis on sustainability and environmental conservation. Participate in tree-planting drives, clean-up efforts, and awareness campaigns to contribute to the preservation of this sacred environment.",
    image: EnvironmentalInitiativesImage,
  },
  "Art Installations and Exhibitions": {
    title: "Art Installations and Exhibitions",
    description:
      "Marvel at the art installations and exhibitions that celebrate the spiritual and cultural heritage of India. These displays are a testament to the artistic creativity and devotion of the people.",
    image: ArtInstallationsImage,
  },
};

export default attractionsData;
