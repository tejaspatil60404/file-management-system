// backend/src/models/index.js

const sequelize = require('../config/db');
const User = require('./userModel');
const Event = require('./eventModel');
const CounsellorAssignment = require('./counsellorAssignmentModel');
const SadhanaRecord = require('./sadhanaRecordModel');
const GalleryItem = require('./galleryItemModel');
const Document = require('./documentModel');
const SundaySchool = require('./sundaySchoolModel');

// --- Define All Model Associations Here with Unique Aliases ---

// A User (as a Counsellor) can have many assignments.
User.hasMany(CounsellorAssignment, { foreignKey: 'counsellorId', as: 'AssignmentsGiven' });
CounsellorAssignment.belongsTo(User, { foreignKey: 'counsellorId', as: 'Counsellor' });

// A User (as a Counselee) can have one assignment.
User.hasOne(CounsellorAssignment, { foreignKey: 'userId', as: 'AssignmentAsCounselee' });
CounsellorAssignment.belongsTo(User, { foreignKey: 'userId', as: 'Counselee' });


// A User (as a Counsellor) can create many Sadhana records.
User.hasMany(SadhanaRecord, { foreignKey: 'counsellorId', as: 'AuthoredSadhanaRecords' });
SadhanaRecord.belongsTo(User, { foreignKey: 'counsellorId', as: 'AuthoringCounsellor' });

// A User (as a Counselee) can have many Sadhana records.
User.hasMany(SadhanaRecord, { foreignKey: 'userId', as: 'RecordsAsCounselee' });
SadhanaRecord.belongsTo(User, { foreignKey: 'userId', as: 'SubjectOfRecord' });


// An Event can have many Gallery Items.
Event.hasMany(GalleryItem, { foreignKey: 'eventId' });
GalleryItem.belongsTo(Event, { foreignKey: 'eventId' });


// A User can upload many Documents.
User.hasMany(Document, { foreignKey: 'uploaderId' });
Document.belongsTo(User, { foreignKey: 'uploaderId' });


// Export all models and the sequelize instance
module.exports = {
  sequelize,
  User,
  Event,
  CounsellorAssignment,
  SadhanaRecord,
  GalleryItem,
  Document,
  SundaySchool,
};
