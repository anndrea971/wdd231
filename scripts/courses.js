const courses = [
    { subject: 'CSE', number: 110, title: 'Intro to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: false },
    { subject: 'WDD', number: 131, title: 'Web Frontend I', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Web Frontend II', credits: 2, completed: false },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false }
];

function displayCourses(filteredCourses) {
    const container = document.querySelector("#course-list");
    container.innerHTML = "";

    filteredCourses.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        if (course.completed) card.classList.add("completed");
        
        card.innerHTML = `<span>${course.subject} ${course.number}</span>`;
        container.appendChild(card);
    });

    // Reduce function to calculate dynamic credits
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.querySelector("#total-credits").textContent = totalCredits;
}

// Event Listeners
document.querySelector("#all").addEventListener("click", () => displayCourses(courses));
document.querySelector("#cse").addEventListener("click", () => {
    displayCourses(courses.filter(c => c.subject === 'CSE'));
});
document.querySelector("#wdd").addEventListener("click", () => {
    displayCourses(courses.filter(c => c.subject === 'WDD'));
});

// Initial load
displayCourses(courses);