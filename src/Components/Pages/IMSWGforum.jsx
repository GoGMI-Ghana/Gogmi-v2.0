import React from 'react';
import ForumRegistration from '../ui/ForumRegistration';

// Set to false to open registration for this forum.
const REGISTRATION_CLOSED = true;

const IMSWGforum = () => (
  <ForumRegistration
    ns="imswgForum"
    endpoint="https://api.gogmi.org.gh/api/imswg-forum.php"
    closed={REGISTRATION_CLOSED}
  />
);

export default IMSWGforum;
