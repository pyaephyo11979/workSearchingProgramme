export function formatDate(time) {
    const date = new Date(time);

    const options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    };

    return date.toLocaleString("en-US", options);
}
