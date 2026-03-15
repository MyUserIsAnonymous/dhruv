// Sample coach data (replace with Notion API later)
const coaches = [
    {
        id: 1,
        name: "Sarah Johnson",
        specialty: "Life Coach",
        bio: "Helping professionals find balance and purpose",
        rate: 120,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
        email: "sarah@example.com"
    },
    {
        id: 2,
        name: "Mike Chen",
        specialty: "Business Coach",
        bio: "Scaling startups to 7 figures",
        rate: 150,
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
        email: "mike@example.com"
    },
    {
        id: 3,
        name: "Emma Davis",
        specialty: "Career Coach",
        bio: "Land your dream job with confidence",
        rate: 100,
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
        email: "emma@example.com"
    },
    {
        id: 4,
        name: "Dr. James Wilson",
        specialty: "Health Coach",
        bio: "Holistic wellness and nutrition expert",
        rate: 130,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        email: "james@example.com"
    }
];

// Display coaches
function displayCoaches(coachesToShow) {
    const grid = document.getElementById('coachesGrid');
    
    if (coachesToShow.length === 0) {
        grid.innerHTML = '<div class="loading">No coaches found</div>';
        return;
    }
    
    grid.innerHTML = coachesToShow.map(coach => `
        <div class="coach-card">
            <img src="${coach.image}" alt="${coach.name}" class="coach-image">
            <div class="coach-info">
                <h3 class="coach-name">${coach.name}</h3>
                <div class="coach-specialty">${coach.specialty}</div>
                <p class="coach-bio">${coach.bio}</p>
                <div class="coach-rate">$${coach.rate}/session</div>
                <button onclick="bookCoach(${coach.id})" class="book-btn">Book Session</button>
            </div>
        </div>
    `).join('');
}

// Filter coaches
function filterCoaches() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const specialty = document.getElementById('specialty').value;
    
    const filtered = coaches.filter(coach => {
        const matchesSearch = coach.name.toLowerCase().includes(searchTerm) ||
                             coach.bio.toLowerCase().includes(searchTerm);
        const matchesSpecialty = !specialty || coach.specialty === specialty;
        
        return matchesSearch && matchesSpecialty;
    });
    
    displayCoaches(filtered);
}

// Book coach
window.bookCoach = function(coachId) {
    const coach = coaches.find(c => c.id === coachId);
    localStorage.setItem('selectedCoach', JSON.stringify(coach));
    window.location.href = 'book.html';
};

// Event listeners
document.getElementById('search')?.addEventListener('input', filterCoaches);
document.getElementById('specialty')?.addEventListener('change', filterCoaches);

// Initial display
displayCoaches(coaches);
