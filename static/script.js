function submitForm() {
    // You can add the logic to handle form submission using AJAX or any backend technology here
    // For now, let's just log the form data to the console
    var formData = {
        name: document.getElementById('name').value,
        message: document.getElementById('message').value
    };

    console.log(formData);
};




// Get all the radio buttons
let radios = document.querySelectorAll('input[type="checkbox"]');

// Add a 'change' event listener to each radio button
radios.forEach(radio => {
    radio.addEventListener('change', function() {
        // When a radio button is selected, uncheck all other radio buttons
        radios.forEach(otherRadio => {
            if(otherRadio !== this) {
                otherRadio.checked = false;
            }
        });
    });
});



function showPreloader() {
    document.getElementById("preloader").style.display = "block";
}

document.getElementById('job-search-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    showPreloader(); // Show the preloader

    // Extract form data
    var formData = new FormData(this);

    // Construct the query string
    var queryString = new URLSearchParams();
    for (var pair of formData.entries()) {
        queryString.append(pair[0], pair[1]);
    }

    // Make the fetch request to the server
    fetch('/scrapejobs?' + queryString.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob(); // or .json() if the server responds with JSON
    })
    .then(blob => {
        // Hide the preloader
        document.getElementById("preloader").style.display = "none";

        // Create a URL for the blob
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "jobs.xlsx"; // or "jobs.csv" based on the response Content-Disposition header
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("preloader").style.display = "none";
    });
});


