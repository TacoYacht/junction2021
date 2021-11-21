
export function calculatePrice(original: number, condition: string): number {
    const priceMapping = {
        'New': 0.8, 
        'Excellent': 0.7, 
        'Good': 0.6, 
        'Decent': 0.5, 
        'Needs repair': 0.3
    }
    return original * priceMapping[condition];
}