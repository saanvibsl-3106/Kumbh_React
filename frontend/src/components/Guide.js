import React from 'react';
import pryag from '../images/praygraj1.jpg'
import { Helmet } from 'react-helmet-async';

const Guide = () => {
    return (
        <div className="prayagraj-container">
            <Helmet>
                <title>Prayatak - Attractions </title>
            </Helmet>
            <div className="prayagraj-content">
                <h1 className="prayagraj-title">Explore the Sacred Splendor of Prayagraj</h1>
                <div className="guide-header">
                    <blockquote className="prayagraj-quote">
                        "Prayagraj, where history, spirituality, and culture converge at the sacred Triveni Sangam, beckons pilgrims and explorers alike to witness the extraordinary Maha Kumbh Mela 2025—a journey that reveals the soul of India through its ancient temples, historic landmarks, and vibrant heritage."
                    </blockquote>
                    <div className="prayagraj-image-container">
                        <img
                            src={pryag}
                            alt="View of Prayagraj"
                            className="prayagraj-image"
                        />
                    </div>
                </div>
                <div className="guide-p">
                    <p>
                        Prayagraj, holds a sacred significance as the confluence point of the Ganga, Yamuna, and Saraswati rivers, making it one of the pivotal destinations during the upcoming Maha Kumbh Mela in 2025. This historic city in the state of Uttar Pradesh is a veritable treasure trove for Hindu pilgrims and history enthusiasts alike. It offers a rich tapestry of ancient temples, monuments, and various tourist attractions. At the heart of Prayagraj lies the revered Triveni Sangam, where the three holy rivers meet, an absolute must-visit for anyone attending the Maha Kumbh Mela in 2025. However, Prayagraj has much more to offer, including:
                    </p>
                    <br>
                    </br>
                    <p>
                    <ul class="guide-list">
                        <li class="guide-item"><span class="guide-section-title">Temples:</span> Explore the spiritual heritage of Prayagraj by visiting temples like the Hanuman Mandir, Alopi Devi Mandir, and Mankameshwar Temple, each steeped in history and religious significance.</li>
                        <br>
                        </br>
                        <li class="guide-item"><span class="guide-section-title">Historical Landmarks:</span> Discover the Ashoka Pillar, an ancient edifice that stands as a testament to India's historical past and explore its inscriptions and significance.</li>
                        <br>
                        </br>
                        <li class="guide-item"><span class="guide-section-title">Colonial Architecture:</span> Prayagraj boasts a wealth of Colonial-era buildings, with the University of Allahabad Building and Swaraj Bhawan being notable examples. These structures provide a glimpse into the city's colonial history and architectural grandeur.</li>
                        <br>
                        </br>
                        <li class="guide-item"><span class="guide-section-title">Cultural Heritage:</span> Beyond the Maha Kumbh Mela, Prayagraj's cultural heritage is on full display. Immerse yourself in the local culture, art, and cuisine as you traverse the bustling streets and markets.</li>
                        <br>
                        </br>
                        <li class="guide-item"><span class="guide-section-title">Educational Institutions:</span> The city is also home to prestigious educational institutions, including the esteemed Allahabad University, which is considered the Oxford University of the east and has played a significant role in India's intellectual history.</li>
                    </ul>
                    </p>
                    <br>
                    </br>
                    <p>
                    Maha Kumbh 2025, a sacred pilgrimage and celebration of faith that draws millions of devotees and travelers from all corners of the globe. As you embark on this extraordinary journey, you'll discover a multitude of attractions that make the Maha Kumbh a truly unique and awe-inspiring event.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Guide;
