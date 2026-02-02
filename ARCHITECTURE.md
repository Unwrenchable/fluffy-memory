# Application Architecture

## Visual Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                     Medical Assistance Helper                    │
│                        (index.html)                              │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                ┌──────────────┴──────────────┐
                │                              │
         ┌──────▼──────┐              ┌───────▼────────┐
         │  CSS Modules │              │  JS Modules    │
         │  /css/       │              │  /js/          │
         └──────┬───────┘              └───────┬────────┘
                │                               │
    ┌───────────┴───────────┐      ┌───────────┴────────────┐
    │                       │      │                         │
┌───▼───┐  ┌──────┐  ┌────▼──┐  ┌─▼──────┐  ┌──────────┐ ┌─▼──────────┐
│ Base  │  │Layout│  │Header │  │ Core   │  │ Features │ │ Security   │
│ Styles│  │Grid  │  │ Nav   │  │ Logic  │  │ AI/Forms │ │ Password   │
└───────┘  └──────┘  └───────┘  └────────┘  └──────────┘ └────────────┘
```

## Module Dependencies

### CSS Loading Order
```
styles.css (master)
    ↓
    ├─→ base.css         (foundation)
    ├─→ layout.css       (structure)
    ├─→ header.css       (navigation)
    ├─→ buttons.css      (interactions)
    ├─→ cards.css        (containers)
    ├─→ forms.css        (inputs)
    ├─→ components.css   (UI elements)
    ├─→ ai-widget.css    (AI features)
    ├─→ sections.css     (page-specific)
    └─→ responsive.css   (mobile overrides)
```

### JavaScript Loading Order
```
index.html
    ↓
    ├─→ document-password-protection.js (security module)
    ├─→ auth.js                         (authentication)
    ├─→ user-data-manager.js            (data storage)
    ├─→ config.js                       (configuration)
    ├─→ email-system.js                 (email functionality)
    ├─→ location-services.js            (geolocation)
    ├─→ comprehensive-intake.js         (questionnaire)
    ├─→ condition-categorizer.js        (medical categories)
    ├─→ xai-huggingface-integration.js  (AI integration)
    ├─→ ai-assistant.js                 (AI chat)
    ├─→ disability-doctor-finder.js     (doctor search)
    ├─→ document-library.js             (document templates)
    ├─→ smart-search.js                 (intelligent search)
    ├─→ crypto-payment.js               (payments)
    ├─→ pwa-install.js                  (PWA features)
    └─→ script.js                       (main application)
```

## Data Flow

### Document Generation with Password Protection

```
User Action
    ↓
┌───────────────────────────────────┐
│ 1. User clicks "Generate Document"│
└───────────┬───────────────────────┘
            ↓
┌───────────────────────────────────┐
│ 2. Check if profile exists        │
│    (user-data-manager.js)         │
└───────────┬───────────────────────┘
            ↓
┌───────────────────────────────────┐
│ 3. Fill template with user data   │
│    (document-library.js)          │
└───────────┬───────────────────────┘
            ↓
┌───────────────────────────────────┐
│ 4. Show document in modal         │
│    (index.html)                   │
└───────────┬───────────────────────┘
            ↓
┌───────────────────────────────────┐
│ 5. User clicks "Download"         │
└───────────┬───────────────────────┘
            ↓
┌───────────────────────────────────┐
│ 6. Show password modal            │
│    (document-password-protection) │
└───────────┬───────────────────────┘
            ↓
    ┌───────┴────────┐
    │                │
┌───▼─────┐    ┌────▼─────┐
│ Skip    │    │ Set      │
│ Password│    │ Password │
└───┬─────┘    └────┬─────┘
    │               │
    ↓               ↓
┌───────┐    ┌──────────────┐
│ Plain │    │ Encrypt      │
│ .txt  │    │ XOR + Base64 │
└───┬───┘    └──────┬───────┘
    │               │
    │               ↓
    │        ┌──────────────┐
    │        │ Wrap in HTML │
    │        │ w/ Password  │
    │        │ Entry UI     │
    │        └──────┬───────┘
    │               │
    └───────┬───────┘
            ↓
    ┌───────────────┐
    │ Download File │
    └───────────────┘
```

## Component Interaction

### AI Assistant Integration
```
User Query
    ↓
┌─────────────────────┐
│ ai-assistant.js     │
│ (Chat Interface)    │
└─────────┬───────────┘
          ↓
┌─────────────────────────────┐
│ xai-huggingface-integration │
│ (Dual AI System)            │
└─────────┬───────────────────┘
          ↓
    ┌─────┴─────┐
    │           │
┌───▼──┐   ┌───▼──────┐
│ X.AI │   │HuggingFace│
│(Grok)│   │  Models   │
└───┬──┘   └───┬───────┘
    │          │
    └────┬─────┘
         ↓
    ┌─────────┐
    │ Response│
    └─────────┘
```

### Authentication Flow
```
User Login
    ↓
┌──────────────┐
│ auth.js      │
└──────┬───────┘
       ↓
┌──────────────────┐
│ user-data-manager│
│ (LocalStorage)   │
└──────┬───────────┘
       ↓
┌──────────────────┐
│ Session Created  │
│ Auto-save Started│
└──────────────────┘
```

## Security Architecture

### Password Protection Flow

```
┌─────────────────────────────────────────────────────┐
│              Client-Side Encryption                  │
├─────────────────────────────────────────────────────┤
│                                                      │
│  1. User Password Input                             │
│      ↓                                               │
│  2. Hash Password (for verification)                │
│      ↓                                               │
│  3. XOR Encrypt Content                             │
│      ↓                                               │
│  4. Base64 Encode                                   │
│      ↓                                               │
│  5. Embed in Self-Contained HTML                    │
│      ↓                                               │
│  6. Download Encrypted File                         │
│                                                      │
├─────────────────────────────────────────────────────┤
│              Decryption (In Downloaded File)         │
├─────────────────────────────────────────────────────┤
│                                                      │
│  1. User Opens HTML File                            │
│      ↓                                               │
│  2. Password Entry Interface                        │
│      ↓                                               │
│  3. Hash Input Password                             │
│      ↓                                               │
│  4. Compare Hash (verification)                     │
│      ↓                                               │
│  5. If Match: Decrypt with Password                 │
│      ↓                                               │
│  6. Display Decrypted Content                       │
│                                                      │
└─────────────────────────────────────────────────────┘

No Server Required - Everything Happens in Browser
```

## Performance Considerations

### CSS Module Benefits
- **Caching**: Each module cached separately
- **Parallel Loading**: Browser can load modules concurrently
- **Selective Updates**: Only modified modules need cache invalidation

### JavaScript Organization
- **Lazy Loading**: Modules loaded as needed
- **Code Splitting**: Features can be separated in future
- **Maintenance**: Easier to optimize individual modules

## Browser Compatibility

### Supported Features
- ✅ @import in CSS (all modern browsers)
- ✅ ES6 JavaScript (Chrome 51+, Firefox 54+, Safari 10+)
- ✅ LocalStorage (all modern browsers)
- ✅ Crypto API (for future AES encryption)
- ✅ Service Workers (for PWA features)

### Fallbacks
- CSS: Graceful degradation for older browsers
- JavaScript: Feature detection for unsupported APIs
- PWA: Works as regular website if SW not supported

## Scalability

### Current Structure
- ✅ Easy to add new CSS modules
- ✅ Easy to add new JS features
- ✅ Clear separation of concerns
- ✅ Ready for component-based architecture

### Future Enhancements
- 🔄 Component-based HTML templates
- 🔄 Build system for optimization
- 🔄 TypeScript for type safety
- 🔄 Automated testing suite
- 🔄 CI/CD pipeline

---

**Version**: 2.0.0
**Last Updated**: 2026-02-02
