<b>Access Database<b><br/>
1. Access team server 
    *  tema Server address: coms-319-g14.cs.iastate.edu
    *  ID and PW are your net ID and PW
2. type "mysql -u g14 -p" and then you can see "Enter password" 
3. Enter password "bitMagnet"
4. type "use Users;"
5. type "select * from account;" <- you can see all user account. 
6. To exit, presss "ctrl + z"

<b>Register backend part<b><br/>
*  Use POST method 
*  port number: 8000
*  endpoint address is /auth/register 
*  if it works well, it returns JSON format like below
{
    "insertID": true,
    "message": "User registered"
}
*  if the user id is used by another user, it returns JSON format like below
{
    "insertID": false,
    "message": "That user ID is already in use"
}

<b>Login backend part<b><br/>
*  Use POST method 
*  port number: 8000
*  endpoint address is /auth/login 
*  if it works well, it returns JSON format like below
{
    "loginStatus": true,
    "message": "login successful"
}
*  if the user input wrong ID or PW, it returns JSON format like below
{
    "loginStatus": false,
    "message": "wrong ID or Password"
}