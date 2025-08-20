const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SundaySchool = sequelize.define('SundaySchool', {
    upcomingEventTitle: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Upcoming Event Title' },
    upcomingEventDescription: { type: DataTypes.TEXT, allowNull: false, defaultValue: 'Details about the upcoming event.' },
    upcomingEventDate: { type: DataTypes.DATE, allowNull: true },
    upcomingEventImage: { type: DataTypes.STRING, allowNull: true },
    timetableJson: { type: DataTypes.TEXT, allowNull: false, defaultValue: '[]', 
        get() { const rawValue = this.getDataValue('timetableJson'); return rawValue ? JSON.parse(rawValue) : []; },
        set(value) { this.setDataValue('timetableJson', JSON.stringify(value)); }
    },
});

module.exports = SundaySchool;