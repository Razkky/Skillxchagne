export const validateForm = (
    formData,
    setErrors
) => {
    const validationRules = {
      username: (value) => !value && 'Username is required.',
      password: (value) => !value && 'Password is required.',
      confirmPassword: (value) => {
        if (!value) return 'Confirm Password is required.';
        if (value !== formData.password) return 'Passwords do not match.';
        return '';
      },
      email: (value) => !value && 'Email is required.',
      fullName: (value) => !value && 'Full Name is required.',
    };
  
    const newErrors = {};
  
    for (const fieldName in validationRules) {
      const errorMessage = validationRules[fieldName](formData[fieldName]);
      if (errorMessage) {
        newErrors[fieldName] = errorMessage;
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };