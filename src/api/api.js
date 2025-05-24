const token = import.meta.env.VITE_TOKEN;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};
export const ApiCall = async (url) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${url}`,
      options
    );
    const convertedResponse = await response.json();
    return convertedResponse;
  } catch (error) {
    return error;
  }
};
