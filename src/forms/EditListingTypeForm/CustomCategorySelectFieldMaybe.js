import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';
import { FormattedMessage } from '../../util/reactIntl';

import css from './EditListingTypeForm.css';

const CustomCategorySelectFieldMaybe = props => {
  const { name, id, categories, intl } = props;
  const categoryLabel = intl.formatMessage({
    id: 'EditListingTypeForm.categoryLabel',
  });
  const categoryPlaceholder = intl.formatMessage({
    id: 'EditListingTypeForm.categoryPlaceholder',
  });
  const categoryRequired = required(
    intl.formatMessage({
      id: 'EditListingTypeForm.categoryRequired',
    })
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
