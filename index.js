/*You will create a small single-page web application. The topic and content of this application:::::::: 
is entirely up to you; be creative!:::::::::::::::::::
Your work will be graded according to the technical requirements listed in the following section.::::::
 Creativity and effort always work in your favor, so feel free to go beyond the scope of the listed:::: 
 requirements if you have the time.:::::::::::::::
Keep things simple. Like most projects you will encounter, you should finish the absolute minimum:::
 requirements first, and then add additional features and complexity if you have the time to do so.::: 
 This will also help you understand what you can get done in a specific allotment of time if you were::: 
 to be asked to do something similar in the future.:::::::
Once you have an idea in mind, approach your design through the user's perspective. User experience::::
 is one of the most important aspects of successful web design. If users enjoy their time on with::::
  your application, they are more likely to trust whatever services or information you offer, and::: 
  more likely to come back and use the application again in the future.:::
Since topic and content are secondary to functionality for this assessment, we have included some::::
 resources below for free content that you can use to populate your application. Once you have gotten::::
  your functionality in place, you can return and fill in the content with something interesting.*/
  
  
// Cache elements using getElementById and querySelector
document.addEventListener('DOMContentLoaded', () => {});
const continentFilter = document.getElementById('continent-filter');
const monumentsContainer = document.getElementById('monuments');
const monumentInfo = document.getElementById('monument-info');
const monumentName = document.getElementById('monument-name');
const monumentLocation = document.getElementById('monument-location');
const monumentDescription = document.getElementById('monument-description');
const monumentYear = document.getElementById('monument-year');
const closeInfoBtn = document.getElementById('close-info');
const loadingDiv = document.querySelector('#loading');


/* I've been trying to commit these changesblah*/
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Populate the continent filter (example)
    const uniqueContinents = ['all', ...new Set(data.map(item => item.continent))]; // Get unique continents
    uniqueContinents.forEach(continent => {
      const option = document.createElement('option');
      option.value = continent;
      option.textContent = continent.charAt(0).toUpperCase() + continent.slice(1); // Capitalize first letter
      continentFilter.appendChild(option);
    });

    // Function to display monuments
    const displayMonuments = (monumentsToDisplay) => {
      let htmlContent = '<ul class="monument-list">';
      monumentsToDisplay.forEach(item => {
        htmlContent += `<li class="monument-item">- ${item.name} - ${item.location}</li>`;
      });
      htmlContent += '</ul>';
      monumentsContainer.innerHTML = htmlContent;
    };

    // Initial display of all monuments
    displayMonuments(data);

    // Event listener for continent filter
    continentFilter.addEventListener('change', (e) => {
      const selectedContinent = e.target.value;
      if (selectedContinent === 'all') {
        displayMonuments(data); // Show all monuments
      } else {
        const filteredMonuments = data.filter(item => item.continent === selectedContinent);
        displayMonuments(filteredMonuments); // Show filtered monuments
      }
    });
  })
  .catch(error => console.error('Error fetching JSON:', error));


// Parent-child-sibling navigation example
const controlsDiv = document.querySelector('.controls');
const firstControlChild = controlsDiv.firstElementChild; // Locate-me button
const lastControlChild = controlsDiv.lastElementChild; // Continent filter
const headerSibling = controlsDiv.nextElementSibling; // Main element

const elements = {
    header: document.querySelector('header'),
    controls: document.querySelector('.controls'),
    map: document.getElementById('map'),
   
};

// Create elements dynamically
const newMonumentTag = document.createElement('span');
newMonumentTag.textContent = 'NEW!';
newMonumentTag.classList.add('tag');
document.querySelector('header h1').appendChild(newMonumentTag);


//Batch Dom updates
const fragment = document.createDocumentFragment();
['Pyramid', 'Colosseum', 'Great Wall'].forEach((monument) => {
    const li = document.createElement('li');
    li.textContent = monument;
    fragment.appendChild(li);
});
document.querySelector('#monument-list').appendChild(fragment);

// Modify content and styles in response to interactions
locateMeBtn.addEventListener('click', () => {
    loadingDiv.classList.remove('hidden');
    setTimeout(() => {
        loadingDiv.classList.add('hidden');
        monumentInfo.classList.remove('hidden');
        monumentName.textContent = 'Eiffel Tower';
        monumentLocation.textContent = 'Paris, France';
        monumentDescription.textContent = 'Iconic iron tower built for the 1889 World\'s Fair';
        monumentYear.textContent = 'Built: 1889';
    }, 1500);
});

closeInfoBtn.addEventListener('click', () => {
    monumentInfo.classList.add('hidden');
});

// Event-based validation for continent filter
continentFilter.addEventListener('change', (e) => {
    if (e.target.value === 'all') {
        alert('Showing monuments from all continents');
    } else {
        alert(`Filtering monuments from ${e.target.value}`);
    }
});

// Modal interactions
aboutBtn.addEventListener('click', () => {
    aboutModal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
    aboutModal.classList.add('hidden');
});

// BOM usage examples
console.log(`Window width: ${window.innerWidth}`);
window.addEventListener('resize', () => {
    console.log(`New window width: ${window.innerWidth}`);
});

// Form validation example (could be added to HTML)
const form = document.createElement('form');
const input = document.createElement('input');
input.setAttribute('type', 'email');
input.setAttribute('required', '');
input.setAttribute('placeholder', 'Enter your email');
form.appendChild(input);
document.querySelector('footer').appendChild(form);

// Event-based form validation
input.addEventListener('input', (e) => {
    const errorSpan = e.target.nextElementSibling;
    if (!e.target.validity.valid) {
      errorSpan.textContent = 'Please enter a valid email';
    } else {
      errorSpan.textContent = '';
    }
  });