Auth Router
/post Signup
/post Login
/post Logout

Profile Router
/patch /profile/edit
/patch /profile/changePassword
/get /profile/view

ConnetctionRequest Router
/post /request/sendConnectionRequest/interested/:userId
/post /request/sendConnectionRequest/ignored/:userId
/post /request/review/accept/:requestId
/post /request/review/reject/:requestId


userRouter
/get /user/feed
/get /user/connections
/get /user/requests

