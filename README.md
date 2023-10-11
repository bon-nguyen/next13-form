import React, { useState, useContext } from 'react';

// Create a new context for the form data
const FormContext = React.createContext();

// Create a custom hook to access the form context
export const useFormContext = () => useContext(FormContext);

function FormProvider({ children }) {
const [formData, setFormData] = useState({
username: '',
email: '',
password: '',
});

const handleChange = (e) => {
const { name, value } = e.target;
setFormData({
...formData,
[name]: value,
});
};

const handleSubmit = (e) => {
e.preventDefault();
// You can perform form validation here and submit the data to your server
console.log(formData);
};

const formContextValue = {
formData,
handleChange,
handleSubmit,
};

return (
<FormContext.Provider value={formContextValue}>
{children}
</FormContext.Provider>
);
}

function CustomForm() {
const { formData, handleChange, handleSubmit } = useFormContext();

return (

<div>
<h2>Registration Form</h2>
<form onSubmit={handleSubmit}>
<div>
<label htmlFor="username">Username:</label>
<input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
</div>
<div>
<label htmlFor="email">Email:</label>
<input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
</div>
<div>
<label htmlFor="password">Password:</label>
<input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
</div>
<div>
<button type="submit">Register</button>
</div>
</form>
</div>
);
}

export default function App() {
return (
<FormProvider>
<CustomForm />
</FormProvider>
);
}
