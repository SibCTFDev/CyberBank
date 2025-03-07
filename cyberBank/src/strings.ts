enum Const {
    BAD_REQUEST = 'Invalid parameters',
    INVALID_CREDENTIALS = 'Invalid credentials',
    SERVER_ERROR = 'Error during the operation processing',
    DB_REQUEST_ERROR = 'Unable to request data',
    BAD_SESSION = 'Undefined session',
    USER_EXISTS = 'Such user is already exist',
    UNABLE_TO_CREATE_USER = 'Unable to create user. Please try again',
    LIMIT_OVER = 'Product creation limit is over',
    LOGIN_SUCCESS = 'Logged in successfully',
    LOGOUT_SUCCESS = 'Logged out successfully',
    DATA_SOURCE_INITIALIZED = 'Data Source has been initialized',
    DATA_SOURCE_NOT_INITIALIZED = 'Error during Data Source initialization',
}

export default Const;