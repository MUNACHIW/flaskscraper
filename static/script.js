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