export const resetFormErrors = (errors: Record<string, string[]>) => {
    Object.keys(errors).forEach((key) => {
        errors[key] = [];
    })
}