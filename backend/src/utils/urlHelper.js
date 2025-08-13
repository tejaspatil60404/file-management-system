// backend/src/utils/urlHelper.js

// This function constructs the full URL for file paths.
const addBaseUrlToPath = (path) => {
  // Use the reliable BASE_URL from the .env file
  const baseUrl = process.env.BASE_URL;
  if (path && !path.startsWith('http') && baseUrl) {
    return `${baseUrl}${path}`;
  }
  return path;
};

// This function processes an array of items and updates a specific field with the full URL.
const processItems = (items, field) => {
  // Use .get({ plain: true }) to get a clean object from Sequelize that we can modify
  const plainItems = Array.isArray(items) 
    ? items.map(i => i.get({ plain: true })) 
    : items.get({ plain: true });

  if (Array.isArray(plainItems)) {
    return plainItems.map(item => {
      item[field] = addBaseUrlToPath(item[field]);
      return item;
    });
  }
  if (plainItems) { // Handle single object
    plainItems[field] = addBaseUrlToPath(plainItems[field]);
    return plainItems;
  }
  return plainItems;
};

module.exports = { processItems };