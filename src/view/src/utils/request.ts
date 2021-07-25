export function request(
  url: string,
  method = 'GET',
  data: Object | null = null
) {
  try {
    const headers = new Headers();
    let body;

    if (data) {
      headers.append('Content-Type', 'application/json');

      body = JSON.stringify(data);
    }

    return fetch(`${process.env.REACT_APP_HOSTNAME}${url}`, {
      method,
      headers,
      body,
    });
  } catch (error) {
    console.warn('Error: ', error);
  }

  return Promise.reject();
}
