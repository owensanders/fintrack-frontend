// Clears all errors in the provided error object
export const resetFormErrors = (errors: Record<string, string[]>): void => {
    Object.keys(errors).forEach((key) => {
        errors[key] = [];
    });
};

// Processes and returns validation errors from an error response
export const processFormErrors = (error: any): Record<string, string[]> => {
    const errors: Record<string, string[]> = {};
    if (error?.response?.status === 422 && error.response.data?.errors) {
        Object.keys(error.response.data.errors).forEach((key) => {
            errors[key] = error.response.data.errors[key];
        });
    }
    return errors;
};
