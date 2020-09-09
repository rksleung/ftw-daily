import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { findOptionsForSelectFilter, findParentForSelectOption } from '../../util/search';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingTypeForm } from '../../forms';
import config from '../../config';

import css from './EditListingTypePanel.css';

const EditListingTypePanel = props => {
  const {
    className,
    rootClassName,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    params,
    categoryType,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { description, title, publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingTypePanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingTypePanel.createListingTitle" />
  );

  const getHandleChangedValueFn = useHistoryPush => {
    /*const { urlQueryParams, history, filterConfig } = this.props;

    return updatedURLParams => {
      const updater = prevState => {
        const mergedQueryParams = { ...urlQueryParams, ...prevState.currentQueryParams };
        return { currentQueryParams: { ...mergedQueryParams, ...updatedURLParams } };
      };

      const callback = () => {
        if (useHistoryPush) {
          const searchParams = this.state.currentQueryParams;
          const search = cleanSearchFromConflictingParams(searchParams, sortConfig, filterConfig);
          history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, search));
        }
      };

      this.setState(updater, callback);
    };*/
    return;
  };

  const filterId = 'category';
  const filter = config.custom.filters.find(f => f.id === filterId);
  const categoryHeaderOptions = findOptionsForSelectFilter(filterId, config.custom.filters, "");
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingTypeForm
        className={css.form}
        initialValues={{ category: categoryType }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const { category } = values;
          const updateValues = {
            categoryType: category,
          };

          onSubmit(updateValues);
        }}
        queryParamNames={filter.queryParamNames}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        categories={categoryHeaderOptions}
      />
    </div>
  );
};

EditListingTypePanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingTypePanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingTypePanel;
