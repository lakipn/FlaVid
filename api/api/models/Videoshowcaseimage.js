/**
 * Videoshowcaseimage.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    alttext: { type: 'string', size: 256, required: true, defaultsTo: '' },
    url: { type: 'string', size: 1024, required: true, defaultsTo: '' },
    video: { model: 'Video', required: true }
  }

};

