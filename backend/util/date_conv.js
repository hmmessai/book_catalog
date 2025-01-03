const humanReadableDate = (dateString) => {
    const date = new Date(dateString); 

    if (dateString == null){
        return null;
    }

    const humanReadableDate = date.toLocaleString('en-US', {
        weekday: 'long',    // Day of the week (e.g., 'Monday')
        year: 'numeric',    // Full year (e.g., '2024')
        month: 'long',      // Full month name (e.g., 'December')
        day: 'numeric',     // Day of the month (e.g., '26')
        hour: '2-digit',    // Hour (e.g., '03')
        minute: '2-digit',  // Minute (e.g., '30')
        second: '2-digit',  // Second (e.g., '00')
        hour12: true        // 12-hour clock (AM/PM)
    });

    return humanReadableDate;
}

const remainingDays = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    
    const differenceInMs = date - today;
    
    const millisecondsInOneDay = 1000 * 60 * 60 * 24;
    
    return Math.ceil(differenceInMs / millisecondsInOneDay);
}

module.exports = { humanReadableDate, remainingDays };