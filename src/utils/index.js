export const createPageUrl = (pageName) => {
  const routes = {
    'Scanner': '/scanner',
    'TopOpportunities': '/top-opportunities', 
    'Analytics': '/analytics'
  };
  return routes[pageName] || '/';
};
