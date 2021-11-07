const form = document.querySelector('#form');
const formInputs = document.querySelectorAll('.form-control');
const formName = document.querySelector('#form-name');
const formSurname = document.querySelector('#form-surname');
const formEmail = document.querySelector('#form-email');
const formMessage = document.querySelector('#form-message');
const formButton = document.querySelector('#form-button');
const formStatus = document.querySelector('#form-status');

let formError = false;

const getFormValues = () => {
	formError = false;

	const { sanitizedName, sanitizedSurname, sanitizedEmail, sanitizedMessage } = sanitizeFormValues();

	return {
		name: sanitizedName,
		surname: sanitizedSurname,
		email: sanitizedEmail,
		message: sanitizedMessage,
	};
};

const sanitizeFormValues = () => {
	return {
		sanitizedName: DOMPurify.sanitize(formName.value),
		sanitizedSurname: DOMPurify.sanitize(formSurname.value),
		sanitizedEmail: DOMPurify.sanitize(formEmail.value),
		sanitizedMessage: DOMPurify.sanitize(formMessage.value),
	};
};

const validateFormValues = () => {
	const { sanitizedName, sanitizedSurname, sanitizedEmail, sanitizedMessage } = sanitizeFormValues();

	const name = validator.isEmpty(sanitizedName)
		? handleError(formName, 'We just want to know your name')
		: sanitizedName;

	const surname = validator.isEmpty(sanitizedSurname)
		? handleError(formSurname, 'And your surname will be handy')
		: sanitizedSurname;

	const email =
		validator.isEmpty(sanitizedEmail) || !validator.isEmail(sanitizedEmail)
			? handleError(formEmail, 'But please enter a valid email so we can contact you')
			: sanitizedEmail;

	const message = validator.isEmpty(sanitizedMessage)
		? handleError(formMessage, 'And give us some words about you')
		: sanitizedMessage;

	return {
		name,
		surname,
		email,
		message,
	};
};

const handleError = (place, err) => {
	formError = true;
	formButton.disabled = true;
	place.classList.add('error');
	formButton.classList.add('error');
	formStatus.classList.add('error');
	formStatus.classList.add('active');
	place.value = err;
};

const handleFormInputs = () => {
	const successes = document.querySelectorAll('.success');
	formStatus.innerHTML = '';
	formStatus.className = '';
	formButton.disabled = false;

	successes.forEach((success) => {
		success.value = '';
		success.classList.remove('success');
	});

	if (formError) {
		const errors = document.querySelectorAll('.error');
		formButton.disabled = false;
		errors.forEach((error) => {
			error.value = '';
			error.classList.remove('error');
		});
		formError = false;
	}
};

const handleSuccess = () => {
	formStatus.innerHTML = 'Form has been successfully sent!';
	formStatus.classList.add('success');
	formStatus.classList.add('active');
	formButton.classList.add('success');

	formInputs.forEach((input) => {
		input.value = '';
		input.classList.add('success');
		formButton.disabled = true;
	});
};

const submitForm = (e) => {
	e.preventDefault();
	validateFormValues();

	if (formError) {
		console.error('Failed to send a request to the server');
		formStatus.innerHTML = 'Please fix';
	} else {
		const formValues = getFormValues();

		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: `form-name=${form.getAttribute('name')}&${new URLSearchParams(formValues).toString()}`,
		})
			.then(() => handleSuccess())
			.catch((error) => console.error(error));
	}
};

form.addEventListener('change', getFormValues);
form.addEventListener('submit', submitForm);
formInputs.forEach((formInput) => formInput.addEventListener('click', handleFormInputs));
