export const handleApiError = (error) => {
    if (error.response) {
      const message = error.response.data?.message || 'An error occurred';
      const status = error.response.status;
      
      switch (status) {
        case 400:
          return `Invalid request: ${message}`;
        case 401:
          return 'Unauthorized access';
        case 403:
          return 'Access forbidden';
        case 404:
          return `Not found: ${message}`;
        case 500:
          return 'Server error occurred';
        default:
          return message;
      }
    } else if (error.request) {
      return 'No response from server';
    } else {
      return 'Request failed';
    }
  };