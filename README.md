
## Multiple Angular Attribute Directives

Youtube Presentation:\
https://youtu.be/77QQP_KnwQU

This presentation dives deep into AngularJS attribute directives by showing
them in action with a barebones 'City Government App'.

  - *Part 1:* General overview of $formatters and $parsers, which is AngularJS's
              method for presenting domain data in HTML views (formatting),
              and then parsing changed view data so that it can be updated
              back into the domain data.
  - *Part 2:* Exhibits a $parsers bug and then show solution.
  - *Part 3:* Exhibits code issue between `cash-format` attr directive and `year-processor`
              attr directive, which is that both directives are doing repeat code
              for formatting/parsing cash-based data. Presents 'single source of truth'
              fix by having both `cash-format` and `year-processor` directives
              work together, each solely owning their respective responsibilities.

### Article Links:

General explanation of Angular $formatters and $parsers:\
https://www.nadeau.tv/using-ngmodelcontroller-with-custom-directives/

Good article on compile, pre-link and link processing:\
https://www.jvandemo.com/the-nitty-gritty-of-compile-and-link-functions-inside-angularjs-directives/

Article that explains fix for $parsers bug:\
https://github.com/angular/angular.js/issues/12544

### Setup

    npm install
    webpack -w
    nodemon server/server.js
    http://localhost:8080
