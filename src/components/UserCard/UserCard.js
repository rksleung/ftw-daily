import React, { Component } from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { truncate } from 'lodash';
import classNames from 'classnames';
import { AvatarLarge, NamedLink, InlineTextButton } from '../../components';
import { ensureUser, ensureCurrentUser } from '../../util/data';
import * as propTypes from '../../util/propTypes';

import css from './UserCard.css';

// Approximated collapsed size so that there are ~three lines of text
// in the desktop layout in the host section of the ListingPage.
const BIO_COLLAPSED_LENGTH = 170;

const truncated = s => {
  return truncate(s, {
    length: BIO_COLLAPSED_LENGTH,

    // Allow truncated text end only in specific characters. This will
    // make the truncated text shorter than the length if the original
    // text has to be shortened and the substring ends in a separator.
    //
    // This ensures that the final text doesn't get cut in the middle
    // of a word.
    separator: /\s|,|\.|:|;/,
    omission: '…',
  });
};

class ExpandableBio extends Component {
  constructor(props) {
    super(props);
    this.state = { expand: false };
  }
  render() {
    const { expand } = this.state;
    const { className, bio } = this.props;
    const truncatedBio = truncated(bio);

    const handleShowMoreClick = () => {
      this.setState({ expand: true });
    };
    const showMore = (
      <InlineTextButton className={css.showMore} onClick={handleShowMoreClick}>
        <FormattedMessage id="UserCard.showFullBioLink" />
      </InlineTextButton>
    );
    return (
      <p className={className}>
        {expand ? bio : truncatedBio}
        {bio !== truncatedBio && !expand ? showMore : null}
      </p>
    );
  }
}

ExpandableBio.defaultProps = { className: null };

ExpandableBio.propTypes = {
  className: string,
  bio: string.isRequired,
};

const UserCard = props => {
  const { rootClassName, className, user, currentUser } = props;
  const ensuredUser = ensureUser(user);
  const ensuredCurrentUser = ensureCurrentUser(currentUser);
  const isCurrentUser =
    ensuredUser.id && ensuredCurrentUser.id && ensuredUser.id.uuid === ensuredCurrentUser.id.uuid;
  const { displayName, bio } = ensuredUser.attributes.profile;

  const hasBio = !!bio;
  const classes = classNames(rootClassName || css.root, className);
  const linkClasses = classNames(css.links, {
    [css.withBioMissingAbove]: !hasBio,
  });
  return (
    <div className={classes}>
      <div className={css.content}>
        <AvatarLarge className={css.avatar} user={user} />
        <div className={css.info}>
          <h3 className={css.heading}>
            <FormattedMessage id="UserCard.heading" values={{ name: displayName }} />
          </h3>
          {hasBio ? <ExpandableBio className={css.desktopBio} bio={bio} /> : null}
          <p className={linkClasses}>
            {ensuredUser.id ? (
              <NamedLink
                className={css.link}
                name="ProfilePage"
                params={{ id: ensuredUser.id.uuid }}
              >
                <FormattedMessage id="UserCard.viewProfileLink" />
              </NamedLink>
            ) : null}
            {isCurrentUser ? <span className={css.linkSeparator}>•</span> : null}
            {isCurrentUser ? (
              <NamedLink className={css.link} name="ProfileSettingsPage">
                <FormattedMessage id="UserCard.editProfileLink" />
              </NamedLink>
            ) : null}
          </p>
        </div>
      </div>
      {hasBio ? <ExpandableBio className={css.mobileBio} bio={bio} /> : null}
    </div>
  );
};

UserCard.defaultProps = {
  rootClassName: null,
  className: null,
};

UserCard.propTypes = {
  rootClassName: string,
  className: string,
  user: propTypes.user,
  currentUser: propTypes.currentUser,
};

export default UserCard;
