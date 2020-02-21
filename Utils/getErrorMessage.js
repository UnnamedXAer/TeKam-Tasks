export default function getErrorMessage(err) {
    let message;
    if (err.isAxiosError) {
        if (err.response) {
            const { status, data } = err.response;
            if (status) {
                message = getMessageByStatus(status);
            }
            else {
                message = data;
            }
        }
    }
    if (!message) {
        message = 'Sorry, somethig went wrong. Please refresh and try again.';
    }
    return message;
}

function getMessageByStatus(status) {
    if (status === 404) {
        return "Sorry, error 404 - resources not found.";
    }
    else if (status === 401) {
        return 'Unuthorized access.';
    }
    else if (status === 502) {
        return 'Sorry, we cannot reach the server';
    }
}