# Marketplace 
Marketplace single page web application with Spring and React js.
include :
- Spring Data Jpa
- Spring Security
- Spring Validation
- mySQL
- JWT Token
- React Router
- 
## Backend 
### Model package
- BaseEntity ve Person Superclass. Person inherit BaseEntity.
- Products and Role is entity that inherit from BaseEntity.
- User and Seller is entity that inherit from Person.
- RoleType is an Enum.
### Repository package
### security package
### annotation package
### service and impl package
- ProductService
- RoleService
- UserService
- SellerService
- UserDetailsServiceImple
### shared package
- packege for every model properties that no problem to see by user
### controller package
- ProductController
- UserController
- AdminController
- AuthController
### exception_error package

## Frontend
### pages package
- login.js for sing in
- main.js first page to see
- register.js for sing up
### userPages package
- product.js, seller.js, favoriteList.js and blackList.js pages for the user to use 
### blackList package
- add, dell button pages and is in process
### favoriteList package
- add, dell button pages and is in process
### api package
- authRequest.js page that include sing in and sing up request with fetch method
### component package
- Input, search, topMenu etc.
### adminPages package
- product, seller and user pages for admin.
- addProduct.js and addSeller.js pages
### adminComponent package
- delete product, seller and user button component.
- update product and seller button component.
### adminRequest package
- add, delete and update pages for send request with fetch method. 



