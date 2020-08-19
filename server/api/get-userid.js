const { getIntegrationSdk, handleError, serialize } = require('../api-util/sdk');

let name_id = [];

module.exports = (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).send('Missing query parameter: username.');
  }  
  console.log(`${Object.keys(name_id).length}`);

  if ( username in name_id ) {
    return res
      .status(200)
      .set('Content-Type', 'application/json')
      .send({ username: username, userid: name_id[username] })
      .end();
  }
  const sdk = getIntegrationSdk(req, res);
  sdk.users
    .query()
    .then(usersResponse => {
      const users = usersResponse.data.data;
      users.forEach(user => {
        const publicData = user.attributes.profile.publicData;
        const pub_username = publicData && publicData.username ? publicData.username : null;
        const userid = user.id;
        if (pub_username) {
          name_id[pub_username] = user.id;
        } 
      });
      if ( username in name_id ) {
        return res
          .status(200)
          .set('Content-Type', 'application/json')
          .send({ username: username, userid: name_id[username] })
          .end();
      } else {
        return res.status(400).send(`Invalid username: ${username}`);
      }
    })
    .catch(e => {
      handleError(res, e);
    });
};
