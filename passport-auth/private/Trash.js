/**
 * Inside session, info from first arrival until session ends is recorded
 * All user activities are recorded through the sessionID
 * A single user can have multiple sessions within a short time
 * A cookie is a small file that stores pieces of data gathered per session
 * 
 * Curl Command:
 * curl.exe -X GET http://localhost:3002 -c my-cookie.txt (overrides)
 * curl.exe -X GET http://localhost:3002 -b my-cookie.txt (refresh/check-if-existing)
 */
