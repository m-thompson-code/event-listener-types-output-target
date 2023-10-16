export const removeDuplicates = <T>(values: T[]) => {
    return [...new Set(values)];
};
