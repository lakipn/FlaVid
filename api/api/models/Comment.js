/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    userId: { type: 'string', required: true },
    firstName: { type: 'string', size: 256, required: true },
    lastName: { type: 'string', size: 256, required: true },
    body: { type: 'string', size: 8192, required: true },
    datePosted: { type: 'datetime', required: true, defaultsTo: (new Date()) },
    video: { model: 'Video', required: true }
  }

};
