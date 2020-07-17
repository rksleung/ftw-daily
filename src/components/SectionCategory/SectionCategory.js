import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionCategory.css';

import categoryImage1 from '../../assets/AdobeStock_85242588_6e65c381-bd40-4537-a3b3-208c28d4c246_1024x1024.jpeg';
import categoryImage2 from '../../assets/AdobeStock_84417253_b0a33943-676c-4ff5-85a7-7b01d60030c9_1024x1024.jpeg';
import categoryImage3 from '../../assets/AdobeStock_177826858_1024x1024.jpeg';
import categoryImage4 from '../../assets/AdobeStock_127710899_4dd63d0d-32ea-4fd1-82f8-f6d626abf555_1024x1024.jpeg';
import categoryImage5 from '../../assets/AdobeStock_105890066_1db88452-62f0-4011-91b2-84f32aeaf8cc_1024x1024.jpeg';
import categoryImage6 from '../../assets/AdobeStock_169513968_26f6e6ea-d380-44cb-81c4-3e8657ba0ed5_1024x1024.jpeg';
import categoryImage7 from '../../assets/AdobeStock_109204081_137abfce-f0c6-4710-b487-8f225a12c4f5_1024x1024.jpeg';

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(LocationImage);

const locationLink = (name, image, searchQuery) => {
  const nameText = <span className={css.locationName}>{name}</span>;
  return (
    <NamedLink name="SearchPage" to={{ search: searchQuery }} className={css.location}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <LazyImage src={image} alt={name} className={css.locationImage} />
        </div>
        <div className={css.text_center}>{name}</div>
      </div>
    </NamedLink>
  );
};

const SectionCategory = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>

      <div className={css.locations}>
        {locationLink(
          'GATHERINGS',
          categoryImage1,
          '?address=Helsinki%2C%20Finland&bounds=60.2978389%2C25.254484899999966%2C59.9224887%2C24.782875800000056&origin=60.16985569999999%2C24.93837910000002'
        )}
        {locationLink(
          'KIDS THINGS',
          categoryImage2,
          '?address=Rovaniemi%2C%20Finland&bounds=67.18452510000002%2C27.32667850000007%2C66.1553745%2C24.736871199999996&origin=66.50394779999999%2C25.729390599999988'
        )}
      </div>
      <div className={css.locations}>
        {locationLink(
          'HOME CARE',
          categoryImage3,
          '?address=Ruka%2C%20Finland&bounds=66.1704578%2C29.14246849999995%2C66.1614402%2C29.110453699999994&origin=66.16594940000002%2C29.12646110000003'
        )}
        {locationLink(
          'ELECTRONICS',
          categoryImage4,
          '?address=Ruka%2C%20Finland&bounds=66.1704578%2C29.14246849999995%2C66.1614402%2C29.110453699999994&origin=66.16594940000002%2C29.12646110000003'
        )}
      </div>
      <div className={css.locations}>
        {locationLink(
          'TRAVEL ESSENTIALS',
          categoryImage5,
          '?address=Ruka%2C%20Finland&bounds=66.1704578%2C29.14246849999995%2C66.1614402%2C29.110453699999994&origin=66.16594940000002%2C29.12646110000003'
        )}
        {locationLink(
          'COOKING & HOBBIES',
          categoryImage6,
          '?address=Ruka%2C%20Finland&bounds=66.1704578%2C29.14246849999995%2C66.1614402%2C29.110453699999994&origin=66.16594940000002%2C29.12646110000003'
        )}
      </div>
      <div className={css.locations}>
        {locationLink(
          'OUTDOOR GEARS',
          categoryImage7,
          '?address=Ruka%2C%20Finland&bounds=66.1704578%2C29.14246849999995%2C66.1614402%2C29.110453699999994&origin=66.16594940000002%2C29.12646110000003'
        )}
      </div>
    </div>
  );

  /*return (
    <LinkComponent {...LinkComponentProps} className={classes}>
      <div className={imageWrapperClasses}>
        <div className={css.aspectWrapper}>
          <img src={imageUrl} alt={imageAltText} className={css.image} />
        </div>
      </div>
      <div className={css.text}>{text}</div>
    </LinkComponent>
  );

      <div className={css.createListingLink}>
        <NamedLink name="NewListingPage">
          <FormattedMessage id="SectionHowItWorks.createListingLink" />
        </NamedLink>
      </div>
  
  return (
    <div className={classes}>

      <div className={`${css.layout5}  ${css.row}`}>
        <div className={css.columnwide}>
          <div className={css.block + ' ' + css.block1}>
            <NamedLink name="NewListingPage">
              <h2 className={css.blockTitle}>
                <FormattedMessage id="SectionCategory.part1Title" />
              </h2>
            </NamedLink>
          </div>
          <div className={css.block + ' ' + css.block2}>
            <NamedLink name="NewListingPage">
              <h2 className={css.blockTitle}>
                <FormattedMessage id="SectionCategory.part2Title" />
              </h2>
            </NamedLink>
          </div>
        </div>
        <div className={css.columnnarrow}>
          <div className={css.block + ' ' + css.block3}>
            <NamedLink name="NewListingPage">
              <h2 className={css.blockTitle}>
                <FormattedMessage id="SectionCategory.part3Title" />
              </h2>
            </NamedLink>
          </div>
          <div className={css.block + ' ' + css.block4}>
            <NamedLink name="NewListingPage">
              <h2 className={css.blockTitle}>
                <FormattedMessage id="SectionCategory.part4Title" />
              </h2>
            </NamedLink>
          </div>
          <div className={css.block + ' ' + css.block5}>
            <NamedLink name="NewListingPage">
              <h2 className={css.blockTitle}>
                <FormattedMessage id="SectionCategory.part5Title" />
              </h2>
            </NamedLink>
          </div>
        </div>
      </div>
    </div>
  );*/
};


SectionCategory.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionCategory.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionCategory;
