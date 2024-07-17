
# Spring Security Diving Deep

In this section we will dive deep into the springboot security and go through the detailed lifecycle of a request and response for the following flows.

1 JWT authorization filter flow and exception handling. \
2 For custome /login flow. \
3 For OAuth2 Authentication with google.


### JWT Auth Flow

- Every request to our spring web application will land into the JWT filter.
- If the request contains the JWT token in the header it will validate.
- And if the request doesnot contain the token other filters will be triggered.
- Suppose if the token is valid then the filter loading the user details.
- After that it is creating a UsernamepasswordAuthentication token by providing the user details.
- And adds the user into the security context holder.
- This way other filters will consider the request as authenticated and not trigger the authentication entry point or access denied exception.
- And after that the servelet dispactecher will dispatch the request to the controller which matches the request mapping.

Here is the detailed and indepth view of the JWT authentication flow.

(Figure goes here)

### Custom Login Flow

- Request to /login will be sent it will pass through the filters but will not get authentication as it is permited in any case.
- /login route needs login reques which demands username and password.
- After the successful hit to the endpoint, user service method authenticate will be called.
- It works as follows:
    - It creates a UsernamepasswordAuthenticationToken.
    - Authentication Managers authenticate method will use that token.
    - Authentication Manager will find the suitable provider for authenticating.
    - In our case DaoAuthenticationProvider will be used for authentication.
    - It will load the user details which will be from userdetails service implementation.
    - LoadUser method will be called and in our case it will load the user from the database.
    - The DaoAuthenticationProvider will authenticate the user and sends authentication object back to the authentication manage.
    - This way using authentication managers object we can check it isAuthenticated is true.
    - If it is true it means the user is authenticated.
    - Now we will generate the token and send token as a response.
    - If in some case the authentication is failed a BadCredentialsException will be thrown which will be handled by the RestControllerAdvice.

Here is the detailed and indepth view of the Custome login flow.

(Figure goes here)

### OAuth2 Login

- To login using OAuth2 we have to hit a specific url for the respective autherization servers like for google we will call.
    - /oauth2/authorization/google
- When user call this url it will pass through the filters.
- The OAuth2 Login filter will trigger the OAuth2 login flow.
- The following flow will then happen.
    - As external autherization servers are in this flow we will be redirected to external urls.
    - And on success we need to redirect back to our frontend.
    - Especially when we have session management set to stateless.
    - So we need to store the redirect_uri somewhere in order to refirect to it.
    - We used cookies http only cookies for this case.
    - AutherizationRequestRepository will come into place for handling this.
    - The request first lands to this repository and we are saving the request in the cookies using the saveAuthorizationRequest method.
    - After the request come back to our application the removeAuthorizationRequest will be called at that time we are returning the request as we recieved it previously.
    - After that our userInfo configuration comes into place and saves the authenticated user into the database.
    - And after that successhandler will generate the JWT token, take out the redirect_uri from the cookies and redirect the user to the url specifiec in redirect_url.

Here is the detailed and indepth view of OAuth2 Login flow.

(gifure goes here)