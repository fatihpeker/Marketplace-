# Marketplace ()
Marketplace single page web application with Spring and React js.
include :
- Spring Data Jpa
- Spring Security
- Spring Validation
- mySQL
- JWT Token
- React Router
## Backend ()
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


