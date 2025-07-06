let currentUserId = 0;

module.exports = {
  generateUserId: function (userContext, events, done) {
    userContext.vars.userId = currentUserId;
    currentUserId++;
    return done();
  },
};