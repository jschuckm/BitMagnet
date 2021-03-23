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
*  ![image](/uploads/bd5888e10fd894f763207fc6565ce43e/image.png)