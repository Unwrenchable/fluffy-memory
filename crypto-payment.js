// Multi-Payment System - ALL Forms of Payment
// Tech-forward company accepting crypto, cards, digital wallets, and more

class MultiPaymentSystem {
    constructor() {
        // ALL supported payment methods
        this.paymentMethods = {
            // Cryptocurrency (Future-forward)
            crypto: {
                name: 'Cryptocurrency',
                icon: '₿',
                methods: {
                    bitcoin: { name: 'Bitcoin', symbol: 'BTC', icon: '₿' },
                    ethereum: { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ' },
                    usdc: { name: 'USD Coin', symbol: 'USDC', icon: '$' },
                    usdt: { name: 'Tether', symbol: 'USDT', icon: '$' },
                    litecoin: { name: 'Litecoin', symbol: 'LTC', icon: 'Ł' },
                    dogecoin: { name: 'Dogecoin', symbol: 'DOGE', icon: 'Ð' }
                },
                processor: 'Coinbase Commerce / BitPay',
                instant: true
            },
            
            // Credit/Debit Cards
            cards: {
                name: 'Credit & Debit Cards',
                icon: '💳',
                methods: {
                    visa: { name: 'Visa', icon: '💳' },
                    mastercard: { name: 'Mastercard', icon: '💳' },
                    amex: { name: 'American Express', icon: '💳' },
                    discover: { name: 'Discover', icon: '💳' },
                    jcb: { name: 'JCB', icon: '💳' },
                    dinersclub: { name: 'Diners Club', icon: '💳' }
                },
                processor: 'Stripe / Square',
                instant: true
            },
            
            // Digital Wallets (Tech-forward)
            digital_wallets: {
                name: 'Digital Wallets',
                icon: '📱',
                methods: {
                    applepay: { name: 'Apple Pay', icon: '🍎' },
                    googlepay: { name: 'Google Pay', icon: '🔵' },
                    paypal: { name: 'PayPal', icon: 'P' },
                    venmo: { name: 'Venmo', icon: 'V' },
                    cashapp: { name: 'Cash App', icon: '$' },
                    zelle: { name: 'Zelle', icon: 'Z' }
                },
                processor: 'Multiple processors',
                instant: true
            },
            
            // Buy Now Pay Later (Accessibility)
            bnpl: {
                name: 'Buy Now, Pay Later',
                icon: '⏱️',
                methods: {
                    affirm: { name: 'Affirm', icon: 'A', installments: '4 payments' },
                    klarna: { name: 'Klarna', icon: 'K', installments: '4 payments' },
                    afterpay: { name: 'Afterpay', icon: 'A', installments: '4 payments' },
                    sezzle: { name: 'Sezzle', icon: 'S', installments: '4 payments' }
                },
                processor: 'Integrated BNPL',
                instant: false,
                note: 'Split payment into 4 interest-free installments'
            },
            
            // Bank Transfers
            bank: {
                name: 'Bank Transfer / ACH',
                icon: '🏦',
                methods: {
                    ach: { name: 'ACH Transfer', icon: '🏦', time: '3-5 days' },
                    wire: { name: 'Wire Transfer', icon: '🏦', time: '1-2 days' },
                    plaid: { name: 'Instant Bank Transfer (Plaid)', icon: '🏦', time: 'Instant' }
                },
                processor: 'Plaid / Stripe',
                instant: false
            },
            
            // International
            international: {
                name: 'International Payments',
                icon: '🌍',
                methods: {
                    wise: { name: 'Wise (TransferWise)', icon: '🌍' },
                    payoneer: { name: 'Payoneer', icon: '🌍' },
                    westernunion: { name: 'Western Union', icon: '🌍' }
                },
                processor: 'Various',
                instant: false
            }
        };

        // Donation tiers (all payment methods)
        this.donationTiers = {
            coffee: {
                name: 'Coffee',
                amount: 5,
                description: 'Buy us a coffee',
                icon: '☕',
                popular: false
            },
            support: {
                name: 'Support',
                amount: 25,
                description: 'Support the mission',
                icon: '❤️',
                popular: true
            },
            champion: {
                name: 'Champion',
                amount: 100,
                description: 'Champion supporter',
                icon: '🏆',
                popular: false
            },
            custom: {
                name: 'Custom',
                amount: null,
                description: 'Choose amount',
                icon: '💝',
                popular: false
            }
        };

        // Premium services (optional, NOT required)
        this.premiumServices = {
            consultation: {
                name: 'Expert Consultation',
                price: 49,
                duration: '1 hour',
                description: 'One-on-one video call with medical assistance expert',
                features: [
                    'Personalized strategy session',
                    'Document review',
                    'Application guidance',
                    'Q&A about your situation'
                ],
                paymentPlans: true
            },
            document_service: {
                name: 'Professional Document Prep',
                price: 99,
                duration: 'One-time',
                description: 'We prepare all your documents professionally',
                features: [
                    'Complete form preparation',
                    'Custom appeal letters',
                    'RFC form completion',
                    'Document organization'
                ],
                paymentPlans: true
            },
            full_service: {
                name: 'Complete Assistance Package',
                price: 299,
                duration: 'Until approval',
                description: 'Full-service help from start to finish',
                features: [
                    'Everything included',
                    'Doctor finder assistance',
                    'Appointment support',
                    'Appeal help included',
                    'Unlimited consultations'
                ],
                paymentPlans: true,
                mostPopular: true
            }
        };
    }

    // Generate comprehensive payment page
    generatePaymentPage(type = 'donation', item = null) {
        const page = {
            title: type === 'donation' ? '💝 Support Our Free Service' : '⭐ Premium Services',
            subtitle: 'Choose ANY payment method that works for you',
            
            message: type === 'donation' 
                ? 'This tool connects people to FREE services. Support us to keep it free for everyone!'
                : 'Optional premium features for personalized help. Basic features remain 100% FREE.',
            
            paymentMethods: this.getAllPaymentMethods(),
            items: type === 'donation' ? this.donationTiers : this.premiumServices,
            
            benefits: type === 'donation' ? [
                '✅ Keep service free for everyone',
                '✅ Help more people find care',
                '✅ Add more features',
                '✅ Improve AI assistance'
            ] : [
                '✅ 30-day money back guarantee',
                '✅ Expert personalized help',
                '✅ Higher approval rates',
                '✅ Save time and stress'
            ],
            
            emphasis: '🔒 Secure checkout • All payment methods encrypted • No hidden fees'
        };
        
        return page;
    }

    // Get all payment methods organized
    getAllPaymentMethods() {
        return [
            {
                category: 'Instant Payment',
                icon: '⚡',
                methods: [
                    { type: 'crypto', name: 'Cryptocurrency', icon: '₿', instant: true, popular: true },
                    { type: 'card', name: 'Credit/Debit Card', icon: '💳', instant: true, popular: true },
                    { type: 'applepay', name: 'Apple Pay', icon: '🍎', instant: true },
                    { type: 'googlepay', name: 'Google Pay', icon: '🔵', instant: true },
                    { type: 'paypal', name: 'PayPal', icon: 'P', instant: true },
                    { type: 'venmo', name: 'Venmo', icon: 'V', instant: true },
                    { type: 'cashapp', name: 'Cash App', icon: '$', instant: true }
                ]
            },
            {
                category: 'Pay Over Time',
                icon: '📅',
                methods: [
                    { type: 'affirm', name: 'Affirm', icon: 'A', note: '4 interest-free payments' },
                    { type: 'klarna', name: 'Klarna', icon: 'K', note: '4 interest-free payments' },
                    { type: 'afterpay', name: 'Afterpay', icon: 'A', note: '4 interest-free payments' },
                    { type: 'sezzle', name: 'Sezzle', icon: 'S', note: '4 interest-free payments' }
                ]
            },
            {
                category: 'Bank Transfer',
                icon: '🏦',
                methods: [
                    { type: 'plaid', name: 'Instant Bank Transfer', icon: '🏦', instant: true },
                    { type: 'ach', name: 'ACH Transfer', icon: '🏦', note: '3-5 days' },
                    { type: 'wire', name: 'Wire Transfer', icon: '🏦', note: '1-2 days' }
                ]
            },
            {
                category: 'International',
                icon: '🌍',
                methods: [
                    { type: 'wise', name: 'Wise', icon: '🌍' },
                    { type: 'payoneer', name: 'Payoneer', icon: '🌍' }
                ]
            }
        ];
    }

    // Process payment with selected method
    processPayment(paymentMethod, amount, item) {
        // In production, integrate with payment processors:
        // - Stripe (cards, Apple Pay, Google Pay, ACH)
        // - Coinbase Commerce (crypto)
        // - PayPal (PayPal, Venmo)
        // - Square (Cash App)
        // - Affirm/Klarna/Afterpay (BNPL)
        
        const result = {
            success: true,
            method: paymentMethod,
            amount: amount,
            item: item,
            transactionId: this.generateTransactionId(),
            timestamp: new Date().toISOString(),
            status: 'processing',
            nextSteps: this.getNextSteps(paymentMethod)
        };
        
        // Method-specific processing
        if (paymentMethod.startsWith('crypto')) {
            result.cryptoDetails = this.processCryptoPayment(paymentMethod, amount);
        } else if (['affirm', 'klarna', 'afterpay', 'sezzle'].includes(paymentMethod)) {
            result.bnplDetails = this.processBNPLPayment(paymentMethod, amount);
        } else if (['ach', 'wire'].includes(paymentMethod)) {
            result.bankDetails = this.processBankPayment(paymentMethod, amount);
        } else {
            result.redirectUrl = this.getPaymentProcessorUrl(paymentMethod, amount);
        }
        
        return result;
    }

    // Process crypto payment
    processCryptoPayment(cryptoType, amount) {
        const crypto = cryptoType.replace('crypto-', '');
        
        return {
            currency: crypto.toUpperCase(),
            address: `DEMO_${crypto.toUpperCase()}_ADDRESS_12345`,
            amountCrypto: this.convertToCrypto(amount, crypto),
            qrCode: `qr-code-${crypto}`,
            expiresIn: 15,
            instructions: [
                `1. Open your ${crypto} wallet`,
                '2. Scan QR code or copy address',
                '3. Send exact amount shown',
                '4. Save transaction ID'
            ]
        };
    }

    // Process Buy Now Pay Later
    processBNPLPayment(provider, amount) {
        return {
            provider: provider,
            installments: 4,
            installmentAmount: (amount / 4).toFixed(2),
            schedule: this.generateBNPLSchedule(amount),
            interestFree: true,
            redirectUrl: `https://${provider}.com/checkout/demo`
        };
    }

    // Process bank transfer
    processBankPayment(method, amount) {
        return {
            method: method,
            amount: amount,
            routing: '123456789',
            account: '987654321',
            instructions: method === 'ach' 
                ? 'Link your bank account securely via Plaid'
                : 'Initiate wire transfer through your bank',
            processingTime: method === 'ach' ? '3-5 business days' : '1-2 business days'
        };
    }

    // Get payment processor redirect URL
    getPaymentProcessorUrl(method, amount) {
        const urls = {
            card: 'https://checkout.stripe.com/demo',
            paypal: 'https://www.paypal.com/checkoutnow/demo',
            venmo: 'https://venmo.com/pay/demo',
            cashapp: 'https://cash.app/pay/demo',
            applepay: 'apple-pay-sheet',
            googlepay: 'google-pay-sheet'
        };
        return urls[method] || 'https://checkout.demo';
    }

    // Generate BNPL payment schedule
    generateBNPLSchedule(amount) {
        const installment = (amount / 4).toFixed(2);
        const schedule = [];
        const today = new Date();
        
        for (let i = 0; i < 4; i++) {
            const dueDate = new Date(today);
            dueDate.setDate(today.getDate() + (i * 14)); // Every 2 weeks
            schedule.push({
                payment: i + 1,
                amount: installment,
                dueDate: dueDate.toLocaleDateString(),
                status: i === 0 ? 'due_today' : 'scheduled'
            });
        }
        
        return schedule;
    }

    // Convert USD to crypto
    convertToCrypto(usdAmount, crypto) {
        const rates = {
            bitcoin: 0.000025,
            ethereum: 0.00042,
            usdc: 1,
            usdt: 1,
            litecoin: 0.0125,
            dogecoin: 12.5
        };
        return ((usdAmount * (rates[crypto] || 1))).toFixed(8);
    }

    // Generate transaction ID
    generateTransactionId() {
        return 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    // Get next steps for payment method
    getNextSteps(method) {
        const steps = {
            crypto: ['Complete crypto payment', 'Transaction will be verified automatically', 'Confirmation email sent'],
            card: ['Enter card details', 'Payment processed instantly', 'Confirmation email sent'],
            bnpl: ['Complete application', 'Approved instantly', 'First payment due today'],
            default: ['Complete payment', 'Confirmation sent', 'Access granted immediately']
        };
        
        if (method.startsWith('crypto')) return steps.crypto;
        if (['affirm', 'klarna', 'afterpay', 'sezzle'].includes(method)) return steps.bnpl;
        if (['card', 'applepay', 'googlepay', 'paypal'].includes(method)) return steps.card;
        return steps.default;
    }

    // Generate payment options HTML
    generatePaymentOptionsHTML() {
        const methods = this.getAllPaymentMethods();
        let html = '<div class="payment-methods-container">';
        
        methods.forEach(category => {
            html += `<div class="payment-category">`;
            html += `<h3>${category.icon} ${category.category}</h3>`;
            html += `<div class="payment-options-grid">`;
            
            category.methods.forEach(method => {
                const popular = method.popular ? '<span class="badge-popular">Popular</span>' : '';
                const instant = method.instant ? '<span class="badge-instant">⚡ Instant</span>' : '';
                const note = method.note ? `<small>${method.note}</small>` : '';
                
                html += `
                    <button class="payment-method-btn" onclick="selectPaymentMethod('${method.type}')">
                        <span class="method-icon">${method.icon}</span>
                        <span class="method-name">${method.name}</span>
                        ${popular}${instant}
                        ${note}
                    </button>
                `;
            });
            
            html += `</div></div>`;
        });
        
        html += '</div>';
        return html;
    }

    // Thank you message
    generateThankYouMessage(type, amount, method) {
        return `
🎉 Payment Successful!

${type === 'donation' ? 'Thank you for your donation!' : 'Welcome to premium features!'}

Amount: $${amount}
Method: ${method}
Transaction ID: ${this.generateTransactionId()}

${type === 'donation' 
    ? 'Your support keeps this service FREE for everyone who needs help. You\'re making a real difference! ❤️'
    : 'You now have access to all premium features. We\'ll be in touch within 24 hours.'}

Confirmation email sent to your inbox.
        `;
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MultiPaymentSystem;
}

// Crypto Payment System - Specialized crypto handling
class CryptoPaymentSystem {
    constructor() {
        // Supported cryptocurrencies
        this.supportedCrypto = {
            bitcoin: {
                name: 'Bitcoin',
                symbol: 'BTC',
                icon: '₿',
                address: null, // Would be set by organization
                network: 'Bitcoin',
                explorer: 'https://blockchain.com/btc/address/'
            },
            ethereum: {
                name: 'Ethereum',
                symbol: 'ETH',
                icon: 'Ξ',
                address: null,
                network: 'Ethereum',
                explorer: 'https://etherscan.io/address/'
            },
            usdc: {
                name: 'USD Coin',
                symbol: 'USDC',
                icon: '$',
                address: null,
                network: 'Ethereum',
                explorer: 'https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48?a='
            },
            usdt: {
                name: 'Tether',
                symbol: 'USDT',
                icon: '$',
                address: null,
                network: 'Ethereum',
                explorer: 'https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7?a='
            }
        };

        // Donation tiers
        this.donationTiers = {
            small: {
                name: 'Coffee',
                amount: 5,
                description: 'Buy us a coffee - helps keep the service running',
                icon: '☕'
            },
            medium: {
                name: 'Support',
                amount: 25,
                description: 'Support the project - helps us help more people',
                icon: '❤️'
            },
            large: {
                name: 'Champion',
                amount: 100,
                description: 'Champion supporter - you\'re making a huge difference',
                icon: '🏆'
            },
            custom: {
                name: 'Custom Amount',
                amount: null,
                description: 'Choose your own amount',
                icon: '💝'
            }
        };

        // Premium features (optional - NOT required to use free services)
        this.premiumFeatures = {
            priority_support: {
                name: 'Priority Support',
                price: 49,
                description: 'One-on-one guidance from a medical assistance expert',
                duration: '1 month',
                features: [
                    'Direct message support',
                    'Personalized document review',
                    'Application strategy consultation',
                    'Priority response time'
                ]
            },
            document_prep: {
                name: 'Professional Document Preparation',
                price: 99,
                description: 'Expert help preparing all your documents',
                duration: 'One-time',
                features: [
                    'Professional review of all forms',
                    'Custom appeal letter writing',
                    'RFC form consultation',
                    'Document organization'
                ]
            },
            full_assistance: {
                name: 'Complete Application Assistance',
                price: 299,
                description: 'Full service help from start to finish',
                duration: 'Until approved',
                features: [
                    'Everything in other packages',
                    'Help finding doctors',
                    'Attendance at appointments (virtual)',
                    'Appeal assistance included',
                    'Ongoing support until approved'
                ]
            }
        };
    }

    // Generate donation page
    generateDonationPage() {
        return {
            title: '💝 Support This Free Service',
            message: `This tool is 100% FREE for everyone who needs help. 
                     
We connect people to free medical care, free dental clinics, disability benefits, and other assistance - ALL at no cost.

If this tool helped you, please consider supporting us so we can help more people!`,
            
            emphasis: 'IMPORTANT: All the medical services we connect you to (FQHCs, free clinics, charity care) remain completely FREE. This donation supports the tool itself.',
            
            tiers: this.donationTiers,
            cryptoOptions: this.supportedCrypto,
            
            whyDonate: [
                '✅ Keep the service free for everyone',
                '✅ Add more features and documents',
                '✅ Help more people find care',
                '✅ Improve AI assistance',
                '✅ Support server costs'
            ]
        };
    }

    // Generate premium features page
    generatePremiumFeaturesPage() {
        return {
            title: '⭐ Optional Premium Features',
            message: `ALL BASIC FEATURES REMAIN 100% FREE

The free version includes:
• Complete document library
• AI assistance
• Location finder
• Disability application help
• All forms and templates

Premium features are OPTIONAL for those who want extra personal help:`,
            
            features: this.premiumFeatures,
            cryptoOptions: this.supportedCrypto,
            
            guarantee: '30-Day Money Back Guarantee - If you\'re not satisfied, we\'ll refund 100%'
        };
    }

    // Process crypto payment/donation
    processCryptoPayment(crypto, amount, purpose) {
        // In production, would integrate with crypto payment processor
        // Options: Coinbase Commerce, BitPay, CoinGate, BTCPay Server
        
        const cryptoInfo = this.supportedCrypto[crypto];
        
        if (!cryptoInfo) {
            return {
                success: false,
                error: 'Cryptocurrency not supported'
            };
        }

        // Generate payment request
        return {
            success: true,
            paymentRequest: {
                crypto: cryptoInfo.name,
                symbol: cryptoInfo.symbol,
                amount: amount,
                amountCrypto: this.convertToCrypto(amount, crypto),
                address: cryptoInfo.address || 'DEMO_ADDRESS_12345',
                network: cryptoInfo.network,
                purpose: purpose,
                qrCode: this.generateQRCode(cryptoInfo.address, amount),
                instructions: this.getPaymentInstructions(cryptoInfo),
                expiresIn: 15, // minutes
                verificationLink: `${cryptoInfo.explorer}${cryptoInfo.address}`
            }
        };
    }

    // Convert USD to crypto (would use real-time pricing in production)
    convertToCrypto(usdAmount, crypto) {
        // Demo conversion rates - would use real API in production
        const rates = {
            bitcoin: 0.000025, // 1 BTC = ~$40,000
            ethereum: 0.00042,  // 1 ETH = ~$2,400
            usdc: 1,           // 1 USDC = $1
            usdt: 1            // 1 USDT = $1
        };
        
        const rate = rates[crypto] || 1;
        return (usdAmount * rate).toFixed(8);
    }

    // Generate QR code for payment (simplified)
    generateQRCode(address, amount) {
        // In production, would generate actual QR code
        return `qr-code-for-${address}-amount-${amount}`;
    }

    // Get payment instructions
    getPaymentInstructions(cryptoInfo) {
        return {
            steps: [
                '1. Open your crypto wallet',
                `2. Select ${cryptoInfo.name} (${cryptoInfo.symbol})`,
                '3. Scan QR code or copy address below',
                '4. Enter the exact amount shown',
                `5. Make sure you\'re on ${cryptoInfo.network} network`,
                '6. Confirm and send transaction',
                '7. Save transaction ID for your records'
            ],
            warning: `⚠️ IMPORTANT: Send only ${cryptoInfo.symbol} to this address. Sending other cryptocurrencies may result in loss of funds.`,
            support: 'Need help? Contact support@medicalhelper.org'
        };
    }

    // Verify payment (would integrate with blockchain API in production)
    verifyPayment(transactionId, crypto) {
        // In production, would check blockchain for confirmation
        return {
            verified: true, // Demo
            confirmations: 3,
            status: 'confirmed',
            message: 'Payment received! Thank you for your support.'
        };
    }

    // Generate thank you message
    generateThankYouMessage(donationType, amount) {
        const messages = {
            donation: `🎉 Thank you so much for your ${amount ? '$' + amount : ''} donation!

Your support helps us keep this service FREE for everyone who needs medical assistance.

Because of people like you, we can continue helping people find:
• Free medical care
• Free dental care  
• Disability benefits
• Insurance programs
• And so much more

You're making a real difference in people's lives. ❤️`,

            premium: `🎉 Welcome to Premium Features!

Your payment has been processed. You now have access to:
${this.getPremiumFeaturesList()}

We'll be in touch within 24 hours to get started.

Thank you for supporting our mission! ❤️`
        };

        return messages[donationType] || messages.donation;
    }

    getPremiumFeaturesList() {
        return Object.values(this.premiumFeatures)
            .map(f => `• ${f.name}`)
            .join('\n');
    }

    // Check if crypto payments are enabled
    isEnabled() {
        // Check if any addresses are configured
        return Object.values(this.supportedCrypto).some(c => c.address !== null);
    }

    // Generate donation widget
    generateDonationWidget() {
        return {
            html: `
                <div class="donation-widget">
                    <h3>💝 This Service is FREE</h3>
                    <p>If we helped you, consider supporting us!</p>
                    <button onclick="showDonationOptions()" class="btn-donate">
                        Donate with Crypto
                    </button>
                </div>
            `,
            css: `
                .donation-widget {
                    position: fixed;
                    bottom: 100px;
                    left: 20px;
                    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
                    padding: 1rem;
                    border-radius: 10px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    max-width: 250px;
                    z-index: 9999;
                }
                
                .donation-widget h3 {
                    color: white;
                    margin-bottom: 0.5rem;
                    font-size: 1rem;
                }
                
                .donation-widget p {
                    color: white;
                    margin-bottom: 1rem;
                    font-size: 0.9rem;
                }
                
                .btn-donate {
                    background: white;
                    color: #f6d365;
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 5px;
                    font-weight: 600;
                    cursor: pointer;
                    width: 100%;
                }
            `
        };
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CryptoPaymentSystem;
}
