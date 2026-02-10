/**
 * Team Slider Logic
 * Handles infinite scrolling, fade-and-slide transitions, and side previews.
 */

document.addEventListener('DOMContentLoaded', () => {
    const teamData = [
        {
            name: "Sunil Gajipara",
            // title: "Founder & Chairman",
            image: "assets/images/team/Sunil-Gajipara.png",
            quote: "At Blanca, we believe in creating not just structures but homes and spaces that nurture growth. Our future projects will continue to prioritize customer-centric designs, delivering quality, comfort, and sustainability in every square foot. My vision is to lead the real estate market with innovative concepts and provide a reliable, rewarding experience for investors and buyers alike."
        },
        {
            name: "Jayantibhai Gajipara",
            // title: "Co-Founder",
            image: "assets/images/team/Jayantibhai-Gajipara.png",
            quote: "With over four decades in the real estate industry, we understand that success lies in continuously adapting to the changing landscapes of urbanization. Our goal is to create properties that provide long-term value for investors and end users alike. Every brick we lay is backed by experience expertise and a commitment to excellence."
        },
        {
            name: "Nathabhai Gajera",
            // title: "Partner",
            image: "assets/images/team/Nathabhai.png",
            quote: "As we look to the future, we're focused on innovation and sustainability in every project. We want to build spaces that not only meet the highest standards but also leave a positive impact on the environment and society. Our commitment to responsible development ensures that our projects are both profitable for investors and fulfilling for end users."
        },
        {
            name: "Chimanlal Thakkar",
            // title: "Partner",
            image: "assets/images/team/Chimanbhai.png",
            quote: "I'm committed to building strong relationships with our investors by providing transparent investment opportunities that ensure high returns. Our future projects will be a blend of modern architecture advanced infrastructure and client-first approach. benefiting both our customers and stakeholders."
        },
        {
            name: "Vinubhai Gajera",
            // title: "Partner",
            image: "assets/images/team/Vinubhai-Gajera.png",
            quote: "I envision a future where our developments harmonize luxury with affordability, ensuring that our projects are accessible to a broader audience without compromising on quality. For investors, my focus is to guarantee sustainable growth through timely delivery and market adaptability."
        }
    ];

    let currentIndex = 0;
    const container = document.querySelector('.team-slider-main');
    const leftPreview = document.querySelector('.preview-left img');
    const rightPreview = document.querySelector('.preview-right img');
    const prevBtn = document.querySelector('.team-prev');
    const nextBtn = document.querySelector('.team-next');

    function updatePreviews() {
        const prevIndex = (currentIndex - 1 + teamData.length) % teamData.length;
        const nextIndex = (currentIndex + 1) % teamData.length;

        leftPreview.src = teamData[prevIndex].image;
        rightPreview.src = teamData[nextIndex].image;
    }

    function createMemberCard(index) {
        const member = teamData[index];
        const card = document.createElement('div');
        card.className = 'team-active-card';
        card.innerHTML = `
            <div class="team-member-img-wrap">
                <img src="${member.image}" alt="${member.name}">
            </div>
            <div class="team-member-content">
                <p class="team-member-quote">"${member.quote}"</p>
                <h3 class="team-member-name">${member.name}</h3>
                <div class="team-slider-nav">
                    <button class="team-nav-btn team-prev" aria-label="Previous member">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <button class="team-nav-btn team-next" aria-label="Next member">
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
        return card;
    }

    function switchMember(direction) {
        const oldCard = document.querySelector('.team-active-card');
        if (!oldCard) return;

        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % teamData.length;
            oldCard.classList.add('slide-out-left');
        } else {
            currentIndex = (currentIndex - 1 + teamData.length) % teamData.length;
            oldCard.classList.add('slide-out-right');
        }

        setTimeout(() => {
            oldCard.remove();
            const newCard = createMemberCard(currentIndex);
            newCard.classList.add(direction === 'next' ? 'slide-in-right' : 'slide-in-left');
            container.appendChild(newCard);
            
            attachListeners(newCard);
            updatePreviews();
        }, 800);
    }

    function attachListeners(parent) {
        parent.querySelector('.team-next').addEventListener('click', () => switchMember('next'));
        parent.querySelector('.team-prev').addEventListener('click', () => switchMember('prev'));
    }

    // Initial setup
    updatePreviews();
    const initialCard = createMemberCard(0);
    container.appendChild(initialCard);
    attachListeners(initialCard);
});
