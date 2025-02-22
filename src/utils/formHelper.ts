// Clears all errors in the provided error object
export const resetFormErrors = (errors: Record<string, string[]>): void => {
    Object.keys(errors).forEach((key) => {
        errors[key] = [];
    });
};

export const processFormErrors = (error: any): Record<string, string[]> => {
    const errors: Record<string, string[]> = {};

    if (error?.response?.status === 422 && error.response.data?.errors) {
        Object.keys(error.response.data.errors).forEach((key) => {
            errors[key] = error.response.data.errors[key];
        });
    }

    if (error?.response?.status === 403) {
        errors.general = ["You don't have permission to perform this action."];
    }

    if (error?.response?.status === 401) {
        errors.general = [error?.response?.data?.error];
    }

    if (error?.response?.status === 500 || error?.response?.status === 404) {
        if (error.response.data?.errors) {
            Object.keys(error.response.data.errors).forEach((key) => {
                errors[key] = error.response.data.errors[key];
            });
        } else {
            errors.general = ["There was an error when trying to make this request, please try again."];
        }
    }

    if (!Object.keys(errors).length && error?.response?.data?.message) {
        errors.general = [error.response.data.message];
    }

    return errors;
};
