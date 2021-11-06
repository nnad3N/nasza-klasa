const form = document.querySelector('#form');
const formInputs = document.querySelectorAll('.form-control');
const formName = document.querySelector('#form-name');
const formSurname = document.querySelector('#form-surname');
const formEmail = document.querySelector('#form-email');
const formMessage = document.querySelector('#form-message');
const formButton = document.querySelector('#form-button');

let formError = false;

const getFormValues = () => {
	formError = false;

	const { sanitizedName, sanitizedSurname, sanitizedEmail, sanitizedMessage } =
		sanitizeFormValues();

	return {
		name: sanitizedName,
		surname: sanitizedSurname,
		email: sanitizedEmail,
		message: sanitizedMessage,
	};
};

const sanitizeFormValues = () => {
	return {
		sanitizedName: validator.escape(`${formName.value}`),
		sanitizedSurname: validator.escape(`${formSurname.value}`),
		sanitizedEmail: validator.escape(`${formEmail.value}`),
		sanitizedMessage: validator.escape(`${formMessage.value}`),
	};
};

const validateFormValues = () => {
	const { sanitizedName, sanitizedSurname, sanitizedEmail, sanitizedMessage } =
		sanitizeFormValues();
	const name = validator.isEmpty(sanitizedName)
		? errorHandler(formName, 'We just want to know your name')
		: sanitizedName;

	const surname = validator.isEmpty(sanitizedSurname)
		? errorHandler(formSurname, 'And your surname will be handy')
		: sanitizedSurname;

	const email =
		validator.isEmpty(sanitizedEmail) || !validator.isEmail(sanitizedEmail)
			? errorHandler(
					formEmail,
					'But please enter a valid email so we can contact you'
			  )
			: sanitizedEmail;

	const message = validator.isEmpty(sanitizedMessage)
		? errorHandler(formMessage, 'And give us some words about you')
		: sanitizedMessage;

	return {
		name,
		surname,
		email,
		message,
	};
};

const errorHandler = (place, err) => {
	formError = true;
	place.className = 'error';
	formButton.className = 'error';
	place.value = err;
};

const handleFormInputs = () => {
	if (formError) {
		const errors = document.querySelectorAll('.error');
		errors.forEach((error) => {
			error.classList.remove('error');
			error.value = '';
		});
		formError = false;
	}
};

const encode = (data) => {
	return Object.keys(data)
		.map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
		.join('&');
};

const submitForm = (e) => {
	e.preventDefault();
	validateFormValues();

	if (formError) {
		console.log('formError');
	} else {
		const formValues = getFormValues();
		console.log(new URLSearchParams(formValues).toString());
		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams(formValues).toString(),
		})
			.then(() => console.log('Form successfully submitted'))
			.catch((error) => alert(error));

		// fetch('/', {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		// 	body: formData,
		// })
		// 	.then(() => console.log('Form successfully submitted'))
		// 	.catch((error) => alert(error));
	}
};

form.addEventListener('change', getFormValues);
form.addEventListener('submit', submitForm);
formInputs.forEach((formInput) =>
	formInput.addEventListener('click', handleFormInputs)
);
