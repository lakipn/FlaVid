/**
 * Video.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: { type: 'string', size: 256, required: true },
    description: { type: 'string', size: 2048, defaultsTo: '' },
    userId : { type: 'string', size: 2048, defaultsTo: '' },
    duration: { type: 'integer', required: true },
    categories: { collection: 'Videoscategory', via: 'video' },
    viewsCount: { type: 'integer', defaultsTo: 0 },
    commentsCount: {type: 'integer', defaultsTo: 0 },
    sourceName: { type: 'string', size: 256, required: true },
    sourceUrl: { type: 'string', size: 1024, required: true },
    url: { type: 'string', size: 1024, required: true },
    likes: { collection: 'Like', via: 'video' },
    comments: { collection: 'Comment', via: 'video' },
    dateUploaded: { type: 'datetime', defaultsTo: new Date() },
    showcaseImages: { collection: 'Videoshowcaseimage', via: 'video' },
    hd: { type: 'boolean', defaultsTo: 'false' },
    vr: { type: 'boolean', defaultsTo: 'false' }
  }

};

