# 🤝 Contributing to MetaVerse Hub

Thank you for your interest in contributing to MetaVerse Hub! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Setup Development Environment
1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/metaverse-hub.git
   cd metaverse-hub
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Set up environment**
   ```bash
   cp .env.example .env.local
   ```
5. **Start development server**
   ```bash
   npm run dev
   ```

## 📝 How to Contribute

### 🐛 Reporting Bugs
1. Check existing issues first
2. Create a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details

### ✨ Suggesting Features
1. Check existing feature requests
2. Create a new issue with:
   - Clear feature description
   - Use case and benefits
   - Possible implementation approach

### 🔧 Code Contributions

#### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

#### Commit Messages
Follow conventional commits:
```
type(scope): description

Examples:
feat(shop): add product filtering
fix(payment): resolve PayPal integration issue
docs(readme): update installation instructions
```

#### Pull Request Process
1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow existing code style
   - Add tests if applicable
   - Update documentation

3. **Test your changes**
   ```bash
   npm run lint
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Use clear title and description
   - Reference related issues
   - Add screenshots for UI changes

## 🎨 Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type when possible

### React Components
- Use functional components with hooks
- Follow naming conventions (PascalCase)
- Keep components focused and reusable

### Styling
- Use Tailwind CSS classes
- Follow existing design patterns
- Ensure responsive design

### File Structure
```
app/
├── components/          # Reusable UI components
├── lib/                # Utility functions
├── (pages)/            # App router pages
└── globals.css         # Global styles
```

## 🧪 Testing

### Manual Testing
- Test all payment flows
- Verify responsive design
- Check browser compatibility

### Areas to Test
- Shopping cart functionality
- Payment method selection
- Form validation
- Mobile responsiveness

## 📚 Documentation

### When to Update Docs
- New features
- API changes
- Configuration updates
- Deployment instructions

### Documentation Files
- `README.md` - Main project documentation
- `DEPLOYMENT.md` - Deployment instructions
- `CONTRIBUTING.md` - This file
- Code comments for complex logic

## 🎯 Priority Areas

We especially welcome contributions in:

### 🛒 E-commerce Features
- Product search and filtering
- User accounts and profiles
- Order history
- Wishlist functionality

### 💳 Payment Integration
- Additional payment methods
- Payment security improvements
- International currency support

### 🎨 UI/UX Improvements
- Accessibility enhancements
- Performance optimizations
- Mobile experience
- Animation refinements

### 🔧 Technical Improvements
- Code optimization
- Test coverage
- Error handling
- SEO improvements

## ❓ Questions?

- Create an issue for questions
- Check existing discussions
- Review documentation first

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to MetaVerse Hub! 🚀**