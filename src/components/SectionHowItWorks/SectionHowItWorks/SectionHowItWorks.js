import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../../util/reactIntl';
import classNames from 'classnames';

import { NamedLink } from '../../../components';

import css from './SectionHowItWorks.css';

const SectionHowItWorks = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionHowItWorks.titleLineOne" />
        <br />
        <div className={css.title_center}> <FormattedMessage id="SectionHowItWorks.titleLineTwo" /> </div>      
      </div>
      <p>
            <FormattedMessage id="SectionHowItWorks.part1Text" />
      </p>

      <div className={css.requestListingLink}>
        <NamedLink name="NewListingPage">
          <FormattedMessage id="SectionHowItWorks.requestListingLink" />
        </NamedLink>
      </div>
    </div>
  );
};

SectionHowItWorks.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionHowItWorks.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHowItWorks;
