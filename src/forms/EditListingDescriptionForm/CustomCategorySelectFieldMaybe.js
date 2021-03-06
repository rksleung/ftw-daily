import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';
import { FormattedMessage } from '../../util/reactIntl';
import { messageString } from '../../util/contextString';

import css from './EditListingDescriptionForm.css';

const CustomCategorySelectFieldMaybe = props => {
  const { name, id, categories, intl, categoryType } = props;
  const messageContext = messageString(categoryType);
  const categoryLabel = messageContext(intl, 'EditListingDescriptionForm.categoryLabel');
  const categoryPlaceholder = messageContext(intl, 'EditListingDescriptionForm.categoryPlaceholder');

  const categoryRequired = required(
    messageContext(intl, 'EditListingDescriptionForm.categoryRequired')
  );
  return categories ? (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={categoryLabel}
      validate={categoryRequired}
    >
      <option disabled value="">
        {categoryPlaceholder}
      </option>
      {categories.map(c => (
        <option key={c.key} value={c.key}>
          {intl.formatMessage({id: c.label})}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomCategorySelectFieldMaybe;
