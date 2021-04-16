const bottle = require('bottlejs').pop('app-express');
const dbContext = require('../database/models');

const AuthController = require('./controllers/auth.controller');
const EventController = require('./controllers/events.controller');
const BookingController = require('./controllers/bookings.controller');

const AuthService = require('./services/auth.service');
const EventService = require('./services/event.service');
const BookingsService = require('./services/bookings.service');

const { UserValidator, BookingValidator, EventValidator } = require('./validations');

// User
bottle.factory('AuthService', function AccountServiceInit(container) {
	return new AuthService(dbContext.User);
});

bottle.factory('AuthController', function AuthControllerInit(container) {
	return new AuthController(container.AuthService);
});

bottle.factory('UserValidator', function AuthValidatorInit() {
	return new UserValidator();
});

// Event
bottle.factory('EventService', function EventServiceInit(container) {
	return new EventService(dbContext.Event, dbContext.User);
});

bottle.factory('EventController', function EventControllerInit(container) {
	return new EventController(container.EventService);
});

bottle.factory('EventValidator', function EventValidatorInit() {
	return new EventValidator();
});

// Booking
bottle.factory('BookingService', function BookingServiceInit(container) {
	return new BookingsService(dbContext.Booking);
});

bottle.factory('BookingController', function BookingControllerInit(container) {
	return new BookingController(container.BookingService);
});

bottle.factory('BookingValidator', function BookingValidatorInit() {
	return new BookingValidator();
});

module.exports = bottle;
