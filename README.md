# 🍳 Cook-Up - Recipe Sharing Platform

A modern web application for sharing and discovering delicious recipes. Cook-Up allows users to post their favorite recipes, browse through community submissions, and connect with fellow cooking enthusiasts.

## 🚀 Features

- **User Registration & Authentication**: Secure login and registration system
- **Recipe Posting**: Share your favorite recipes with the community
- **Recipe Browsing**: Explore recipes shared by other users
- **Admin Dashboard**: Administrative controls for managing content
- **Contact Form**: Get in touch with the Cook-Up team
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: PHP
- **Database**: MySQL
- **Styling**: Custom CSS with modern design principles
- **Icons**: Boxicons

## 📁 Project Structure

```
COOK-UP/
├── index.html              # Homepage - Welcome page with navigation
├── account.html            # User login/registration page
├── register.html           # User registration form
├── recipes.html            # Recipe browsing page
├── post-recipes.html       # Recipe submission form
├── contact.html            # Contact information page
├── admin_dashboard.php     # Admin panel for content management
├── stlye.css              # Main stylesheet with responsive design
├── config.php             # Database configuration
├── login_handler.php      # User authentication logic
├── register_handler.php   # User registration logic
├── setup_db.php           # Database initialization script
├── test_config.php        # Database connection testing
├── logout.php             # User logout functionality
└── images/                # Static assets and images
    ├── Cook-Up Logo.png
    ├── pexels-pixabay-326281.jpg
    └── other images...
```

## 🚀 Getting Started

### Prerequisites
- Web server (Apache/Nginx)
- PHP 7.4 or higher
- MySQL 5.7 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dikshantka/CookUp.git
   cd CookUp
   ```

2. **Set up the database**
   - Create a MySQL database named `cookup`
   - Update database credentials in `config.php`
   - Run `setup_db.php` to initialize the database tables

3. **Configure the web server**
   - Point your web server to the project directory
   - Ensure PHP is properly configured

4. **Test the setup**
   - Navigate to `test_config.php` to verify database connection
   - Visit `index.html` to access the homepage

## 📱 Pages Overview

### 🏠 Homepage (`index.html`)
- Welcome screen with Cook-Up branding
- Navigation menu to all sections
- Call-to-action button to get started

### 👤 Account Management
- **Login/Register** (`account.html`): User authentication
- **Registration** (`register.html`): New user signup
- **Admin Dashboard** (`admin_dashboard.php`): Content management

### 🍽️ Recipe Features
- **Browse Recipes** (`recipes.html`): Explore community recipes
- **Post Recipes** (`post-recipes.html`): Share your culinary creations

### 📞 Contact (`contact.html`)
- Contact information and support

## 🎨 Design Features

- **Modern UI/UX**: Clean, intuitive interface
- **Responsive Design**: Mobile-friendly layout
- **Custom Styling**: Unique visual identity
- **Interactive Elements**: Hover effects and transitions
- **Professional Branding**: Consistent color scheme and typography

## 🔧 Configuration

### Database Setup
1. Update `config.php` with your database credentials:
   ```php
   $servername = "localhost";
   $username = "your_username";
   $password = "your_password";
   $dbname = "cookup";
   ```

2. Run the setup script:
   ```
   http://your-domain/setup_db.php
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**sharielachavez-dotcom**
**Dikshantka**
**ConnorSinger**
- GitHub: [@sharielachavez-dotcom](https://github.com/sharielachavez-dotcom)
- GitHub: [@Dikshantka](https://github.com/Dikshantka)
- GitHub: [@ConnorSinger](https://github.com/ConnorSinger)
## 🙏 Acknowledgments

- Thanks to the open-source community for inspiration
- Special thanks to contributors and testers
- Images courtesy of Pexels and other free resources

---

### 🔮 Future Enhancements

- [ ] User favorites system
- [ ] Recipe rating and reviews
- [ ] Advanced search and filtering
- [ ] Social media integration
- [ ] Mobile app development
- [ ] Recipe recommendation engine

**Happy Cooking! 🍳✨**
