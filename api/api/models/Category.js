/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: { type: 'string', size: 256, required: true, defaultsTo: '' },
    description: { type: 'string', size: 1024, required: true, defaultsTo: '' },
    videosCount: { type: 'integer', defaultsTo: 0 },
    featuredImageSrc: { type: 'string', defaultsTo: '' }
  }

};

