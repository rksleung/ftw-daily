import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionCategory.css';
import config from '../../config';

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
//  const nameText = <span className={css.locationName}>{name}</span>;
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
  const { rootClassName, className, intl } = props;

  const classes = classNames(rootClassName || css.root, className);
  var linkParam = `?address=Vancouver%2C%20Canada&bounds=49.30958735%2C-122.92065933%2C49.0743493%2C-123.24180665&origin=49.30958735%2C-122.92065933`;
  if (config.geoLocation) {
    linkParam = `?address=${config.geoLocation.city}%2C%20${config.geoLocation.country}&bounds=49.30958735%2C-122.92065933%2C49.0743493%2C-123.24180665&origin=${config.geoLocation.latitude}%2C${config.geoLocation.longitude}`;
  }
  const filterId = 'category';
  const filter = config.custom.filters.find(f => f.id === filterId);
  const categoryTextArray = [];
  if (filter && filter.config && filter.config.options) {
    filter.config.options.map( o => {
      const categoryText = intl.formatMessage({ id: o.label });
      categoryTextArray[o.key] = categoryText;
    }, categoryTextArray );
  }
  const linkParamCategory = category => `${linkParam}&${filter.queryParamNames[0]}=${category}`; 
  return (
    <div className={classes}>

      <div className={css.locations}>
        {locationLink(
          categoryTextArray['gatherings'],
          categoryImage1,
          linkParamCategory('gatherings'),
        )}
        {locationLink(
          categoryTextArray['kids-things'],
          categoryImage2,
          linkParamCategory('kids-things'),
        )}
      </div>
      <div className={css.locations}>
        {locationLink(
          categoryTextArray['home-care'],
          categoryImage3,
          linkParamCategory('home-care'),
        )}
        {locationLink(
          categoryTextArray['electronics'],
          categoryImage4,
          linkParamCategory('electronics'),
        )}
      </div>
      <div className={css.locations}>
        {locationLink(
          categoryTextArray['travel-essentials'],
          categoryImage5,
          linkParamCategory('travel-essentials'),
        )}
        {locationLink(
          categoryTextArray['cooking-hobbies'],
          categoryImage6,
          linkParamCategory('cooking-hobbies'),
        )}
      </div>
      <div className={css.locations}>
        {locationLink(
          categoryTextArray['outdoor-gear'],
          categoryImage7,
          linkParamCategory('outdoor-gear'),
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
