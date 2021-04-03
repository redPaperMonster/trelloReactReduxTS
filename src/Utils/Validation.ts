
export const fieldRequired = (value: string) => {
    if (typeof value === 'string') {
        return value.trim() ? undefined : "Required"
    }
    return "Required"
}
