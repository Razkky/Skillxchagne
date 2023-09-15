export async function POST(requestBody) {
  const url = process.env.REACT_APP_SIGNUP_URL;
  let result = {
    response: null,
    errorMessage: '',
    status: 0, // Add a status field to capture the HTTP status code
  };

  try {
    console.log('Posting to API');
    console.log(requestBody);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log(response);

    // Capture the HTTP status code
    result.status = response.status;
    // if (response.status === 201)
    // if (response.status === 409)
    // if (response.status === 500)
    if (response.status === 201) {
      console.log('Success');
      const data = await response.json();
      console.log(data);
      result.response = data;
    } else if (response.status === 409) {
      console.log('Conflict');
      const data = await response.json();
      console.log(data);
      result.errorMessage = data.message;
    } else if (response.status === 500) {
      console.log('Internal Server Error');
      const data = await response.json();
      console.log(data);
      result.errorMessage = data.message;
    } else {
      console.log('Unknown Error');
      const data = await response.json();
      console.log(data);
      result.errorMessage = data.message;
    }
    return result;
  } catch (error) {
    console.error('An error occurred:', error);
    return result;
  }
}
