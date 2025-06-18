// JavaScript for future interactivity 

// (All emoji-related code has been removed)

// If you have other unrelated features, keep them here.

document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.card');
    const cardFront = document.querySelector('.card-front');
    const cardBack = document.querySelector('.card-back');
    const form = document.getElementById('rsvpForm');
    const select = document.getElementById('attending');

    // Only add event listeners if elements exist
    if (cardFront) {
    cardFront.addEventListener('click', () => {
            if (card && !card.classList.contains('flipped')) {
            card.classList.add('flipped');
        }
    });
    }

    if (cardBack) {
    cardBack.addEventListener('click', (e) => {
        if (e.target.closest('form')) {
            return;
        }
            if (card) {
        card.classList.remove('flipped');
            }
    });
    }

    if (select) {
    select.addEventListener('change', function() {
        if (this.value) {
            this.classList.add('has-value');
        } else {
            this.classList.remove('has-value');
        }
    });
    }

    if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const formData = {
                name: form.name?.value?.trim() || '',
                email: form.email?.value?.trim() || '',
                attending: form.attending?.value || '',
                plusOnes: parseInt(form.plusOnes?.value) || 0
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.attending) {
            alert('Please fill in all required fields.');
            return;
        }

        // Here you would typically send this data to a server
        console.log('RSVP Submission:', formData);
        
        // Show success message
        alert('Thank you for your RSVP! We have received your response.');
        
        // Reset form and flip card back
        form.reset();
            if (select) {
        select.classList.remove('has-value');
            }
            if (card) {
        setTimeout(() => {
            card.classList.remove('flipped');
        }, 1000);
            }
    });
    }

    // Add floating labels behavior
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    inputs.forEach(input => {
        if (input) {
        input.setAttribute('placeholder', ' '); // Add empty placeholder for CSS selector
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded');
    const container = document.querySelector('.floating-emojis');
    const attendanceRadios = document.querySelectorAll('input[type="radio"][name="attendance"]');
    const plusoneRadios = document.querySelectorAll('input[type="radio"][name="plusone"]');
    const form = document.querySelector('.rsvp-form');
    const submitButton = document.querySelector('.submit-rsvp');
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    
    // Function to check if form is valid
    function checkFormValidity() {
        const isNameValid = nameInput.value.trim() !== '';
        const isEmailValid = emailInput.value.trim() !== '' && emailInput.value.includes('@');
        const isAttendanceSelected = [...attendanceRadios].some(radio => radio.checked);
        const isPlusOneSelected = [...plusoneRadios].some(radio => radio.checked);
        
        submitButton.disabled = !(isNameValid && isEmailValid && isAttendanceSelected && isPlusOneSelected);
    }
    
    // Add input event listeners to all form fields
    [nameInput, emailInput, ...attendanceRadios, ...plusoneRadios].forEach(input => {
        input.addEventListener('input', checkFormValidity);
        input.addEventListener('change', checkFormValidity);
    });
    
    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!submitButton.disabled) {
            const formData = new FormData();
            
            // Get form values
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const attendance = [...attendanceRadios].find(radio => radio.checked).value;
            const plusOne = [...plusoneRadios].find(radio => radio.checked).value;
            
            // Replace this URL with your Google Form submission URL
            const googleFormUrl = 'YOUR_GOOGLE_FORM_URL';
            
            // Map your form fields to Google Form field entries
            formData.append('entry.XXXXX', name);        // Replace XXXXX with your Google Form field ID
            formData.append('entry.XXXXX', email);       // Replace XXXXX with your Google Form field ID
            formData.append('entry.XXXXX', attendance);  // Replace XXXXX with your Google Form field ID
            formData.append('entry.XXXXX', plusOne);     // Replace XXXXX with your Google Form field ID
            
            try {
                // Submit to Google Form
                const response = await fetch(googleFormUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: formData
                });
                
                // Show success message
                alert('Thank you for your RSVP! We have received your response.');
                
                // Reset form
                form.reset();
                submitButton.disabled = true;
                
                // Remove selected class from all options
                document.querySelectorAll('.attendance-option').forEach(option => {
                    option.classList.remove('selected');
                });
                
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error submitting your RSVP. Please try again later.');
            }
        }
    });
}); 