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


//Send Connection Request
1 Create a new model
2 Imported to request file
3. write api logic


