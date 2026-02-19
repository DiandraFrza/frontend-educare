const getImagePrefix = () => {
    // Return empty string for both dev and production
    // since we're deploying to Netlify root domain
    return "";
};

export { getImagePrefix };
