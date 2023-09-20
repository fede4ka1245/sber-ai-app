export const getObjectFromSearch = (search) => {
  if (!search) {
    return {};
  }

  return JSON.parse('{"' + decodeURI(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
}