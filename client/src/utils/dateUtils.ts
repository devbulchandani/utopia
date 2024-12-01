export const getTimeStatus = (date: string) => {
    const eventTime = new Date(date).getTime();
    const now = new Date().getTime();
    const difference = eventTime - now;

    // Event is happening now (within 1 hour window)
    if (difference <= 0 && difference > -3600000) {
        return 'live';
    }

    // Event is starting soon (within next 24 hours)
    if (difference > 0 && difference <= 86400000) {
        return 'soon';
    }

    return difference > 0 ? 'upcoming' : 'past';
};

export const getRelativeTimeString = (date: string) => {
    const difference = new Date(date).getTime() - new Date().getTime();
    const hours = Math.abs(Math.floor(difference / (1000 * 60 * 60)));
    const days = Math.floor(hours / 24);

    if (difference > 0) {
        if (days > 0) {
            return `Starts in ${days} day${days === 1 ? '' : 's'}`;
        }
        return `Starts in ${hours} hour${hours === 1 ? '' : 's'}`;
    } else {
        if (days > 0) {
            return `${days} day${days === 1 ? '' : 's'} ago`;
        }
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    }
};