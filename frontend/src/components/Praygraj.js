import React from 'react';
import pryag from '../images/praygraj.jpg'
import { Helmet } from 'react-helmet-async';


const Prayagraj = () => {
    return (
        <div className="prayagraj-container">
            <Helmet>
                <title>Prayatak - History </title>
            </Helmet>
            <div className="prayagraj-content">
                <h1 className="prayagraj-title">About Prayagraj</h1>
                <div className="guide-header">
                    <blockquote className="prayagraj-quote">
                        "The site at which Prayagraj(Allahabad) stands has been in the occupation of the civilised race long before the first faint beginnings of authentic history. While its contemporaries in the pre-historic age are now gone forever, Babylon and Carthage, Thebes and Memphis have perished to rise no more, the Prayag of the ancient Indian mythology stands like the Indraprastha of the Mahabahrata, where it did five thousand years ago"
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
                    In 600 BC, there was a kingdom covering the part of present district of Prayagraj. It was called ‘Vatsa’ with capital as ‘Kaushambi’, the remains of which still lies south-west of Prayagraj. Gautama Buddha also honoured this city with his three visits. After this, the region came under the Mauryan rule, Kaushambi was made the headquarters of one of the provincials of ‘Ashoka’. Under his instructions two monolithic pillars were erected at Kaushambi one of which was later shifted to Prayagraj.
                    </p>
                    <br>
                    </br>
                    <p>
                    Mauryan antiquities and remains have been excavated at Bhita, another important site in the district. After the Mauryas, the Sungas ruled over Vatsa or Prayagraj region. This is apparent from many Sunga artefacts found in the Prayagraj district. After Sunga’s, Kushan’s came into power- a seal of Kanishka and a unique image inscription was found during the second year of his reign at Kaushambi. Gupta period objects have also been found in Kaushambi, Bhita and Jhunsi. On the body of Ashoka Pillar there is an engraved line of ‘prashasthi’ of Samudra Gupta, while at Jhunsi there exists a well named ‘Samudrakupa’ named after him. On the downfall of the Gupta’s, the fate of Prayagraj receded into oblivion. Huien Tsang visited Prayagraj in the 7th century AD and described ‘Prayag’ as a great city of idolaters’, implying that Brahminical ascendancy has been retained at the time of his visit.
                    </p>
                    <br>
                    </br>
                    <p>
                    In 1540, Sher Shah became the ruler of Hindustan; it was at this time that the old Grant Trunk road from Agra to Kara and then eastwards to Prayagraj, Jhunsi, and Jaunpur was laid out.

A battle was fought between Akbar and the rebel governor of Jaunpur in 1567 at the village Mankarwal, one of the dependencies of Jhunsi and Prayag known as ‘Ilahabas’. After the victory Akbar marched in a single day to Prayag and rested for two days before marching to Varanasi, it was then he realised the importance of building a fort at this strategic place.

Akbar revisited Prayag in 1575 and laid the foundation of an imperial city, which he called ‘Ilahabas’. The new city soon became a favourite place of pilgrimage under Akbar’s rule. The city grew rapidly in importance and before the end of Akbar’s reign increased to a considerable size and importance.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Prayagraj;
