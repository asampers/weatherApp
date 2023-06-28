const apiTermSetter = (searchTerm, city, extras) => {
  const getCity = () => city;

  const getSearchTerm = () => searchTerm;

  const getExtras = () => extras;

  return { getCity, getSearchTerm, getExtras };
};

export { apiTermSetter };
