/**
 * SelectMultipleFilter needs to parse values from format
 * "has_all:a,b,c,d" or "a,b,c,d"
 */
export const parseSelectFilterOptions = uriComponentValue => {
  const startsWithHasAll = uriComponentValue && uriComponentValue.indexOf('has_all:') === 0;
  const startsWithHasAny = uriComponentValue && uriComponentValue.indexOf('has_any:') === 0;

  if (startsWithHasAll) {
    return uriComponentValue.substring(8).split(',');
  } else if (startsWithHasAny) {
    return uriComponentValue.substring(8).split(',');
  } else {
    return uriComponentValue.split(',');
  }
};

/**
 * Check if any of the filters (defined by filterIds) have currently active query parameter in URL.
 */
export const isAnyFilterActive = (filterIds, urlQueryParams, filterConfigs) => {
  const getQueryParamKeysOfGivenFilters = (keys, config) => {
    const isFilterIncluded = filterIds.includes(config.id);
    const addedQueryParamNamesMaybe = isFilterIncluded ? config.queryParamNames : [];
    return [...keys, ...addedQueryParamNamesMaybe];
  };
  const queryParamKeysOfGivenFilters = filterConfigs.reduce(getQueryParamKeysOfGivenFilters, []);

  const paramEntries = Object.entries(urlQueryParams);
  const activeKey = paramEntries.find(entry => {
    const [key, value] = entry;
    return queryParamKeysOfGivenFilters.includes(key) && value != null;
  });
  return !!activeKey;
};

/**
 * Check if the filter is currently active.
 */
export const findOptionsForSelectFilter = (filterId, filters, hier_parent) => {
  const filter = filters.find(f => f.id === filterId);
  if ((hier_parent || hier_parent === "") && filter && filter.config && filter.config.options) {
    const hier_nodes = filter.config.hierarchy.filter(f => f.parent === hier_parent);
    return [ ...filter.config.options.filter(k => hier_nodes.find(f => f.key === k.key && !f.label)),
             ...hier_nodes.filter(f => f.label) ];
  } else {
    return filter && filter.config && filter.config.options ? filter.config.options : [];
  }
};

export const findParentForSelectOption = (filterId, filters, optionId) => {
  const filter = filters.find(f => f.id === filterId);
  if (filter && filter.config && filter.config.options && filter.config.hierarchy) {
    const option = filter.config.hierarchy.filter(f => f.key === optionId);
    return option && option.length > 0 && option[0].parent ? option[0].parent : null;
  }
  return null;
};
