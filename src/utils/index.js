export const formatNumber = population => population.toLocaleString();

export const getStringListOfAttr = (list, attr) => list.map(item => item[attr]).join(', ');
