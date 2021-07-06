<p align="center">
  <a href="#" rel="noopener">
 <img width=200px src="https://res.cloudinary.com/www-cengkuru-com/image/upload/v1625573017/logos/sisocs-logo.png" alt="Project logo"></a>
</p>

<h3 align="center">SISOCS APP</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)]()
[![CoST-International - sisocs3.0](https://img.shields.io/static/v1?label=CoST-International&message=sisocs3.0&color=blue&logo=github)](https://github.com/CoST-International/sisocs3.0)
[![stars - sisocs3.0](https://img.shields.io/github/stars/CoST-International/sisocs3.0?style=social)](https://github.com/CoST-International/sisocs3.0)
[![forks - sisocs3.0](https://img.shields.io/github/forks/CoST-International/sisocs3.0?style=social)](https://github.com/CoST-International/sisocs3.0)

</div>

---

<p align="center"> Few lines describing your project.
    <br> 
</p>

## 📝 Table of Contents

- [Description and Context](#description)
- [Installing](#deployment)
- [Additional Information](#additional)
- [Usage](#usage)
- [Built Using](#built_using)
- [Our Pledge](#pledge)
- [Our Standards](#standards)
- [Scope](#scope)
- [Enforcement](#enforcement)
- [Getting Involved](#Contributing)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)
- [License](#license)
- [Limitation of responsibilities ](#limitation)

## 🧐 Description <a name = "descriptiont"></a>

The Information and Monitoring System for Supervision of Works and Contracts (SISOCS) was established as a subsystem of the Ministry of Infrastructure and Public Services' State Hiring and Procurement System, Honduomrpas (INSEP).

Through SISOCS, you can track the physical and financial status of projects. You also get a summary with basic information on project planning, procurement processes, contract management, as well as images and the projects' geographic position. Additionally, you can download related public data in a variety of formats, including xlsx, csv, and JSON.




## 🚀 Installing <a name = "deployment"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

```
- MySQL 5+
- NodeJs
- PHP 7.4+
- Composer
```

<img width="100%" src="https://res.cloudinary.com/www-cengkuru-com/image/upload/v1625596291/diagrams/sisocs-layout.jpg" alt="Project logo">

The SISOCS is a loosely coupled platform comprised of three stand-alone subsystems. They communicate with one another and with the database through the API.

Follow these steps to install the SISOCS on your local server


Cloning the Application
```
$ git clone https://github.com/CoST-International/sisocs3.0.git
$ This will clone the user interfaces and the API

```
Running the Public Platform
```
$ cd ../path/to/the/file/user-interfaces/public
$ Then run npm install
$ ng serve --open

```

Running the Admin Platform
```
$ cd ../path/to/the/file/user-interfaces/admin
$ Then run npm install
$ ng serve --open

```

Running the API
```
$ cd ../path/to/the/file/api
$ Then run composer Install
$ php artisan serve

```


## ⛏️ Built Using <a name = "built_using"></a>

<p align="left"> <a href="https://angular.io" target="_blank"> <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://laravel.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-plain-wordmark.svg" alt="laravel" width="40" height="40"/> </a> <a href="https://tailwindcss.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a> </p>


- [MySQL](https://www.mysql.com/) - Database
- [Laravel](https://laravel.com/) - Server Framework
- [Angular](https://angular.io/) - Web Framework

## ✍️ Our Pledge <a name = "pledge"></a>

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our portal and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## Our Standards <a name = "standards"></a>

Examples of behaviour that contributes to creating a positive environment include:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community.
- Showing empathy towards other community members

Examples of unacceptable behaviour by participants include:
- The use of sexualized language or imagery and unwelcome sexual attention or advances
- Trolling, insulting/derogatory comments, and personal or political attacks.
- Public or private harassment
- Publishing others' private information, such as a physical or electronic address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting.

## Scope <a name = "scope"></a>

This Code of Conduct applies both within IDP and CoST repositories spaces and in public spaces when an individual is representing CoST or its community. Examples of representing CoST or community include using an official e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event.

Representation of a CoST may be further defined and clarified by the IDP maintainers.

## Enforcement <a name = "enforcement"></a>

Instances of abusive, harassing, or otherwise unacceptable behaviour may be reported by contacting this repository's maintainer or at opencode@infrastructuretransparency.org

All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances. The CoST team is obligated to maintain confidentiality regarding the reporter of an incident.

The IDP maintainers who do not follow or enforce the Code of Conduct may face temporary or permanent repercussions as determined by CoST.


## Getting Involved <a name = "contributing"></a>


Infrastructure Disclosure Platforms (IDP) is CoST- the Infrastructure Transparency Initiative- effort to support CoST Members and other partners to contribute, explore and reuse open-source digital tools, which can be used in the design and implementation of the CoST disclosure journey aiming to improve transparency and accountability in the infrastructure sector around the world.

CoST believes that open-source codes developed by our members or partners should be publicly available to help us to contribute to delivering quality infrastructure, strengthening economies, and improving lives.

Therefore, CoST encourages those who contribute to the improvement of these digital tools, to share them with the IPD manager. If when reusing this digital tool, you consider that:

- Have added some new functionality with which you add value for more people to reuse,
- Have made the tool more versatile to support new updates,
- Have fixed some existing bugs,
- Or have simply improved the user interface or documentation of it.


CoST encourages you to return the progress made to the repository. Follow these steps to contribute to the digital tool:

- Fork the repository.
- Develop the new functionality or make the changes you create that add value to the tool.
- Make a "pull request" documenting in detail the proposed changes in the repository.
- In such case, your name will be registered in the list of attributions.
If you have not contributed to the repository, but the tool has been helpful to you, we at CoST would love to hear the experience. Tell us about your experience in an Issue or via email to opencode@infrastructuretransparency.org

### Using the issue tracker

You can also use the issue tracker to suggest feature requests, report bugs, and ask questions.
This is also a great way to connect with the developers of the project as well
as others who are interested in this solution.


## Acknowledgements <a name = "acknowledgement"></a>

- The Government of Honduras

Tell us in the "pull request" your username and organization to add it to the list of contributions in the Readme.md.



## License <a name = "license"></a>

GNU GPLv3

Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.

Released under [GPL](http://creativecommons.org/licenses/by/4.0/) by [@CoST-International](https://github.com/CoST-International).

##  Limitation of responsibilities <a name = "limitation"></a>

CoST is not responsible, under any circumstance, for damage or compensation, moral or patrimonial; direct or indirect; accessory or special; or by way of consequence, foreseen or unforeseen, that could arise:

- Under any concept of intellectual property, negligence, or detriment of another part theory. 
- Following the use of this Digital Tool, including, but not limited to defects in the Digital Tool, or the loss or inaccuracy of data of any kind. The foregoing includes expenses or damages associated with communication failures and / or malfunctions of computers, linked to the use of this Digital Tool.

