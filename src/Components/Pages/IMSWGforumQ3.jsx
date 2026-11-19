import React from 'react';
import ForumRegistration from '../ui/ForumRegistration';

// Set to false to open registration for this forum.
const REGISTRATION_CLOSED = true;

const IMSWGforumQ3 = () => (
  <ForumRegistration
    ns="imswgForumQ3"
    endpoint="https://api.gogmi.org.gh/api/imswg-forum-q3.php"
    closed={REGISTRATION_CLOSED}
  />
);

export default IMSWGforumQ3;
