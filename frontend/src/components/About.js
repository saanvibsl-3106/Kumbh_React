import React from 'react';
import { Helmet } from 'react-helmet-async';
import aboutImg from '../images/social-integration-working-team_23-2149341140.avif';

const AboutUs = () => {
    return (
        <div className="about-us-body">
            <Helmet>
                <title>Prayatak - About Us</title>
            </Helmet>
            <div className='about-us-main'>
                <section className="about-us-about-us">
                    <div className="about-us-content">
                        <h2>How It Started</h2>
                        <h1>Explore, Experience, and Reconnect</h1>
                        <p>
                            Welcome to Prayatak, your ultimate companion for an extraordinary Kumbh Mela experience. At Prayatak, we understand the spiritual, cultural, and logistical marvel that is the Kumbh Mela—a festival where millions come together in search of spiritual awakening, cultural connections, and unforgettable memories. Discover captivating stories and essential travel tips while staying connected and safe, knowing we’re here to help reunite people and belongings amid the festival’s vibrant chaos. Join us to make your Kumbh Mela experience unforgettable and stress-free.
                        </p>
                    </div>
                    <div className="about-us-image">
                        <img src={aboutImg} alt="Founders working together" />
                    </div>
                </section>

                <section className="about-us-stats">
                    <div className="about-us-stat">
                        <h3>3.5</h3>
                        <p>Years Experience</p>
                    </div>
                    <div className="about-us-stat">
                        <h3>23</h3>
                        <p>Project Challenge</p>
                    </div>
                    <div className="about-us-stat">
                        <h3>830+</h3>
                        <p>Positive Reviews</p>
                    </div>
                    <div className="about-us-stat">
                        <h3>100K</h3>
                        <p>Trusted Students</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
