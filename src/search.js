/*

Naming convention: 
  - "item" used as name for each entry in data - user may have been a better name. 
  - for keys and values the initial i and q for "item" and "query" has been prefixed.
  - the object inside an object is referred to as a "deepObject"

Notes: this solution is built on the assumption that queries/items will never be more than
2 objects deep. 

If the solution was required to be 3 or N objects deep, a solution that is recursive and calls
itself could be used. This would be less readable and unnecessary for the current test cases.

*/

// remove dot notation from queries
// normalizeQuery allows for two dot notation and or Objects with the same keys to be used, i.e:
//  {
//     "settings.live": true,
//     "settings.lastActive": '2021-02-16'
//  }
const normalizeQuery = (query) => {
  const newQuery = {};
  Object.entries(query).forEach(([qKey, qResult]) => {
    // normalize dot notation by splitting string and reentering as object into query
    const [qKey0, qKey1] = qKey.split(".");

    if (qKey1 !== undefined) {
      Object.assign(newQuery, { [qKey0]: { [qKey1]: qResult } });
    } else {
      Object.assign(newQuery, { [qKey]: qResult });
    }
  });

  return newQuery;
};

// returns true or false
const isItemMatch = (item, query) => {
  let valid = true;

  Object.entries(query).forEach(([qKey, qValue]) => {
    const iValue = item[qKey];

    if (typeof qValue === "object") {
      // repeat - could be recursive
      Object.entries(qValue).forEach(([qDeepKey, qDeepValue]) => {
        const iDeepValue = item[qKey][qDeepKey];
        if (iDeepValue !== qDeepValue) valid = false;
      });
    } else {
      if (iValue !== qValue) valid = false;
    }
  });

  return valid;
};

const search = (data, query) => {
  // if is empty array return all data
  if (Array.isArray(query) && query.length === 0) return data;

  const matches = [];
  query = normalizeQuery(query);

  data.forEach((item) => {
    if (isItemMatch(item, query)) matches.push(item);
  });

  return matches;
};

module.exports = search;
