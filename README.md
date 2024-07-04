## Dependencies
### Initialize a new Node.js project.
```bash
npm init -y
```
### Install necessary dependencies.
```bash
npm install express mysql ejs bcryptjs express-session express-validator
```
## import the mysql file in database
## to run the project locally
```bash
node server.js
```
## create a database
```bash
CREATE DATABASE unesco;

USE unesco;

CREATE TABLE members (
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    regno INT NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

```

####

#  Software Requirements Specification (SRS) Document
##  KYU UNESCO Club Website
________________________________________
## 1.Introduction
### 1.1 Purpose
The purpose of this document is to provide a detailed Software Requirements Specification (SRS) for the UNESCO Kirinyaga University Club Website. This document outlines the functional and non-functional requirements, system architecture, and overall design considerations for the website.
### 1.2 Scope
The website aims to enhance the UNESCO Club's outreach and engagement by providing a comprehensive platform for activities and initiatives. It will serve as an online presence for the club, facilitating communication, collaboration, and information dissemination among members and the broader community.
### 1.3 Definitions, Acronyms, and Abbreviations
•	UNESCO: United Nations Educational, Scientific and Cultural Organization
•	KYU: Kirinyaga University
•	SRS: Software Requirements Specification
•	UI/UX: User Interface/User Experience
### 1.4 References
•	Project Proposal Document
•	IEEE SRS Standard Template
________________________________________
## 2. Overall Description
### 2 .1 Product Perspective
The UNESCO Kirinyaga University Club website is a standalone web application designed to provide information, resources, and a platform for interaction among club members and the wider community.
## 2.2 Product Functions
The main functionalities include:
•	Interactive Homepage
•	About Us Section
•	Activities Page
•	Resources and Publications
•	Member Portal
•	Gallery and News Feed
•	Partner Portal
•	Donation Platform
## 2.3 User Classes and Characteristics
•	Club Members: Access to member-specific content and directories.
•	University Community: General access to information, events, and resources.
•	External Stakeholders: Information about the club's activities and partnership opportunities.
•	Administrators: Manage content, user access, and site maintenance.
### 2.4 Operating Environment
The website will operate in standard web browsers (Chrome, Firefox, Safari, Edge) and be compatible with both desktop and mobile devices.
### 2.5 Design and Implementation Constraints
•	Use of Node.js and Express for backend development.
•	Use of MySQL or MariaDB for database management.
•	Compliance with web accessibility standards.
•	Security measures for user data protection.
## 2.6 Assumptions and Dependencies
•	Availability of server and hosting services.
•	Timely provision of content and resources by the club members.
•	Availability of required development tools and technologies.
________________________________________
### 3. Specific Requirements
## 3.1 Functional Requirements
## 3.1.1 Interactive Homepage
•	Description: Displays the club’s mission, vision, and upcoming events.
•	Inputs: None.
•	Outputs: Dynamic content including mission statement, vision, and event details.
•	Functionalities:
o	Display latest news and updates.
o	Highlight upcoming events.
### 3.1.2 About Us Section
•	Description: Provides information about the club’s history, structure, and membership.
•	Inputs: Administrator inputs data regarding the club’s history and structure.
•	Outputs: Static and dynamic content on the About Us page.
•	Functionalities:
o	Display historical data.
o	Provide details of the club’s structure and membership.
### 3.1.3 Activities Page
•	Description: Displays a calendar of upcoming and past events.
•	Inputs: Event data input by administrators.
•	Outputs: Calendar view of events.
•	Functionalities:
o	Add, update, and delete event information.
o	View past and upcoming events.
### 3.1.4 Resources and Publications
•	Description: Shares downloadable resources, such as reports and research papers.
•	Inputs: Administrator uploads resources.
•	Outputs: List of downloadable resources.
•	Functionalities:
o	Upload and manage resources.
o	Allow users to download resources.
### 3.1.5 Member Directory
•	Description: Connects members with each other and provides contact information for club officers.
•	Inputs: Membership data input by administrators.
•	Outputs: List of members with contact information.
•	Functionalities:
o	Add, update, and remove member information.
o	Provide search functionality for members.
### 3.1.6 Gallery and News Feed
•	Description: Showcases club activities, achievements, and news articles.
•	Inputs: Media and news content uploaded by administrators.
•	Outputs: Gallery view of images and list of news articles.
•	Functionalities:
o	Upload and manage images.
o	Add, update, and delete news articles.
### 3.1.7 Partner Portal
•	Description: Establishes connections with external partners.
•	Inputs: Partner data input by administrators.
•	Outputs: List of partners.
•	Functionalities:
o	Add, update, and remove partner information.
o	Provide contact information for partners.
### 3.1.8 Donation Platform
•	Description: Provides a secure mechanism for financial contributions.
•	Inputs: Donation information input by users.
•	Outputs: Confirmation of donations.
•	Functionalities:
o	Process donations securely.
o	Track donation history.
### 3.2 Non-Functional Requirements
#3.2.1 Performance Requirements
•	The website should load within 3 seconds for the homepage.
•	The system should handle up to 1,000 concurrent users without performance degradation.
### 3.2.2 Security Requirements
•	Use HTTPS for secure communication.
•	Implement user authentication and authorization.
•	Regular security audits and updates.
### 3.2.3 Usability Requirements
•	The website should be easy to navigate with a clear and intuitive layout.
•	Ensure accessibility compliance (WCAG 2.1).
### 2.4 Maintainability Requirements
•	Code should be modular and follow best practices for maintainability.
•	Documentation should be provided for all major components.
### 3.2.5 Scalability Requirements
•	The system should be able to scale to accommodate increasing numbers of users and data.
________________________________________
## 4. System Architecture
### 4.1 Overview
The system architecture consists of a client-server model:
•	Frontend: HTML, CSS, JavaScript (React.js or similar framework).
•	Backend: Node.js with Express framework.
•	Database: MySQL or MariaDB.
### 4.2 Database Design
•	Tables:
o	Users (id, name, email, password, role)
o	Events (id, title, description, date, location)
o	News (id, title, content, published_date)
o	Members (id, first_name, last_name, email, joined_date)
o	Contacts (id, name, email, message, sent_date)
o	Partners (id, name, contact_info)
o	Donations (id, donor_name, amount, date)
________________________________________
### 5. Implementation Plan
### 5.1 Development Phases
1.	Content Development: Collect and curate content.
2.	Website Design: Create wireframes and design mockups.
3.	Technical Setup: Set up environment, install dependencies.
4.	Frontend Development: Implement UI components.
5.	Backend Development: Implement server-side logic and database interactions.
6.	Integration: Integrate frontend with backend.
7.	Testing: Conduct unit, integration, and user acceptance testing.
8.	Deployment: Deploy to a live server.
9.	Maintenance: Ongoing updates and maintenance.
### 5.2 Timeline
•	Week 1-2: Planning and design.
•	Week 3-4: Content development and frontend implementation.
•	Week 5-6: Backend development and integration.
•	Week 7: Testing.
•	Week 8: Deployment and launch.
•	Ongoing: Maintenance and updates.
________________________________________
## 6. Evaluation and Sustainability
### 6.1 Evaluation Criteria
•	Website Traffic: Monitor using tools like Google Analytics.
•	Member Participation: Track user engagement and activity.
•	Feedback: Collect and analyse user feedback.
•	Collaborations: Measure the number of partnerships and collaborations.
### 6.2 Sustainability Plan
•	Establish a website management team.
•	Regularly update content and features.
•	Ensure ongoing technical support and maintenance.
________________________________________
## 7. Conclusion
The UNESCO Kirinyaga University Club website will provide a valuable platform for promoting education, science, culture, and sustainable development. By leveraging this digital initiative, the club aims to enhance its outreach, engage with stakeholders, and contribute to the university community and beyond.

