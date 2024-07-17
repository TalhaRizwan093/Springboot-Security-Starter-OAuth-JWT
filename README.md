
# React + Spring Boot Authentication Application
#### Production Ready Spring Security for your new Project 🚀
This Project is a goto for your new enterprise level application based on springboot (Production ready framework of Java) with best practices followed. The authentication is based on **OAuth2** for authentication and **JWT** for authorization. There is a username password authentication flow as well login with google and github flow with a modulerized approach of adding any other OAuth2 authorization server like facebook etc.




## Getting Started

#### Spinning up the frontend

```bash
  cd React-Spring-Login
  npm install
  npm run dev
```

- The frontend is now ready and is running on [Home](http://localhost:5173/).
- You can access the login page [here](http://localhost:5173/login).

#### Spinning up the backend
Before building and running the backend we have to ensure that the application properties files has setup correctly and accordingly.

Following are the must have properties.

```bash
spring.application.name=OAuthSecurity

spring.security.oauth2.client.registration.google.client-id = {your_google_client_id}
spring.security.oauth2.client.registration.google.client-secret = {your_google_client_secret}

spring.security.oauth2.client.registration.github.client-id = {your_github_client_id}
spring.security.oauth2.client.registration.github.client-secret = {your_github_client_secret}

security.jwt.token.secret-key: {your-jwt-token-secret}
security.jwt.token.expire-length: {you-token-expiry-in-milliseconds}

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url = jdbc:mysql://localhost:3306/{your-desired-db}
spring.datasource.username = {your-mysql-username}
spring.datasource.password = {your-mysql-password}

spring.jpa.hibernate.ddl-auto = update
spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
```

Please add these app properties in your application and donot forget to replace the configurations {your-configs}.

After adding the application properties. Use the following commands to spin up the spring security project. 

```bash
  cd SpringSecurityOAuth2.0 with Google
  mvn spring-boot:run
```

- Backend is now ready to accept the requests.

Access the frontend to start using the proejct

    
## Regards

For support, email talharizwan.me@gmail.com \
If you like and using this project please donot Forget to Star it as it means alot to me.

## Authors

- [@TalhaRizwan093](https://www.github.com/TalhaRizwan093)

