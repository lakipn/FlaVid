/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    firstName: { type: 'string', size: 256 },
    lastName: { type: 'string', size: 256 },
    username: { type: 'string', size: 256, required: true }, // required
    password: { type: 'string', size: 512, required: true }, // required
    email: { type: 'string', size: 256, required: true }, // required
    profilePictureUrl: { type: 'string', size: 1024 }, // required
    coverPictureUrl: { type: 'string', size: 1024 }, // required
    birthday: { type: 'date', required: true }, // required
    gender: { type: 'string', enum: ['guy', 'girl', 'couple', 'transgender'], required: true, defaultsTo: 'male' }, // required, enum
    relationshipStatus: { type: 'string', enum: ['single', 'taken', 'open'], required: true }, // enum
    interestedIn: { type: 'string', enum: ['guys', 'girls', 'both'], required: true }, // required, enum
    personalWebsite: { type: 'string', size: 1024 },
    hometown: { type: 'string', size: 128 },
    currentCity: { type: 'string', size: 128 },
    country: { type: 'string', size: 128 },
    workOccupation: { type: 'string', size: 256 },
    workCompany: { type: 'string', size: 256 },
    educationSchool: { type: 'string', size: 256 },
    aboutMe: { type: 'string', size: 1024 },
    interestsAndHobbies: { type: 'string', size: 512 },
    favoriteMoviesAndTvShows: { type: 'string', size: 512 },
    favoriteMusic: { type: 'string', size: 512 },
    favoriteBooks: { type: 'string', size: 512 }
    //turnOns: { type: 'string', size: 512 },
    //turnOffs: { type: 'string', size: 512 },
  }
};

