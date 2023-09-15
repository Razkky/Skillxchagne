export const validateForm = (
    formData,
    setErrors
) => {
    const validationRules = {
      username: (value) => !value && 'Username is required.',
      password: (value) => !value && 'Password is required.',
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