// Location-Based Services & Uninsured/Dental Program Helper
// Helps users with no insurance and specific needs like dental care

class LocationBasedServices {
    constructor() {
        this.userLocation = null;
        
        // Programs specifically for people with NO insurance
        this.uninsuredPrograms = {
            emergency_care: [
                {
                    name: 'Emergency Medicaid',
                    description: 'Immediate coverage for emergency medical conditions',
                    eligibility: 'Anyone in medical emergency, regardless of immigration status',
                    coverage: 'Emergency room visits, emergency surgery, labor and delivery',
                    howToApply: 'Apply at the hospital during emergency',
                    noQuestionsAsked: true
                },
                {
                    name: 'Hill-Burton Free Care',
                    description: 'Hospitals that received federal construction funds MUST provide free care',
                    eligibility: 'Income-based, but many qualify',
                    coverage: 'Hospital care, nursing home care',
                    howToApply: 'Ask hospital if they participate in Hill-Burton program',
                    noQuestionsAsked: false,
                    website: 'hrsa.gov/get-health-care/affordable/hill-burton'
                },
                {
                    name: 'Charity Care Programs',
                    description: 'Non-profit hospitals MUST provide charity care by law',
                    eligibility: 'Usually 200-400% of poverty level',
                    coverage: 'Full hospital services, often 100% free',
                    howToApply: 'Request financial counselor at any non-profit hospital',
                    noQuestionsAsked: false
                }
            ],
            primary_care: [
                {
                    name: 'Federally Qualified Health Centers (FQHC)',
                    description: 'Sliding scale fees - as low as $0-$25 per visit',
                    eligibility: 'EVERYONE served, regardless of insurance or ability to pay',
                    coverage: 'Primary care, dental, mental health, prescriptions',
                    howToApply: 'Walk in or call',
                    noQuestionsAsked: true,
                    findNearYou: 'findahealthcenter.hrsa.gov'
                },
                {
                    name: 'Free Clinics',
                    description: 'Completely free medical care',
                    eligibility: 'Usually for uninsured low-income',
                    coverage: 'Basic medical care, prescriptions',
                    howToApply: 'Find free clinic in your area',
                    noQuestionsAsked: true,
                    findNearYou: 'freeclinics.com'
                },
                {
                    name: 'County Health Departments',
                    description: 'Low-cost or free care based on income',
                    eligibility: 'County residents',
                    coverage: 'Primary care, vaccinations, STD testing, family planning',
                    howToApply: 'Contact your county health department',
                    noQuestionsAsked: false
                }
            ],
            prescriptions: [
                {
                    name: 'Prescription Assistance Programs',
                    description: 'Drug companies give free medications',
                    eligibility: 'Usually 200-400% poverty level, no insurance for that drug',
                    coverage: 'Free brand-name medications',
                    howToApply: 'needymeds.org or rxassist.org',
                    noQuestionsAsked: false
                },
                {
                    name: '$4 Generic Programs',
                    description: 'Walmart, Kroger, Costco $4 generics',
                    eligibility: 'Anyone',
                    coverage: '30-day supply of generic medications',
                    howToApply: 'Just ask pharmacist',
                    noQuestionsAsked: true
                },
                {
                    name: 'GoodRx/RxSaver',
                    description: 'Discount coupons, often cheaper than insurance',
                    eligibility: 'Anyone',
                    coverage: 'Up to 80% off prescriptions',
                    howToApply: 'Download app or print coupon',
                    noQuestionsAsked: true
                }
            ]
        };

        // DENTAL CARE PROGRAMS - Critical need
        this.dentalPrograms = {
            emergency_dental: [
                {
                    name: 'Dental Schools',
                    description: 'Dental students provide care at 50-75% discount',
                    eligibility: 'Anyone - NO insurance needed',
                    coverage: 'Full dental services including extractions, fillings, dentures',
                    cost: 'Heavily discounted',
                    noQuestionsAsked: true,
                    findNearYou: 'Search "[your city] dental school clinic"',
                    urgent: 'Usually can get emergency appointments within days'
                },
                {
                    name: 'Mission of Mercy (MOM) Events',
                    description: 'FREE dental care events - extractions, fillings, cleanings',
                    eligibility: 'First come, first served - NO insurance, NO income requirements',
                    coverage: 'ALL dental services FREE',
                    cost: 'COMPLETELY FREE',
                    noQuestionsAsked: true,
                    findNearYou: 'missionofmercy.org or search "[your state] free dental clinic events"',
                    urgent: 'People line up overnight - arrive EARLY'
                },
                {
                    name: 'Remote Area Medical (RAM)',
                    description: 'FREE medical AND dental care events',
                    eligibility: 'NO questions asked - just show up',
                    coverage: 'Dental extractions, fillings, cleanings, dentures',
                    cost: 'COMPLETELY FREE',
                    noQuestionsAsked: true,
                    findNearYou: 'ramusa.org',
                    urgent: 'Check schedule for events in your area'
                },
                {
                    name: 'Donated Dental Services (DDS)',
                    description: 'Volunteer dentists provide FREE comprehensive care',
                    eligibility: 'Disabled, elderly, or medically fragile with low income',
                    coverage: 'EVERYTHING - crowns, bridges, dentures, implants',
                    cost: 'COMPLETELY FREE',
                    noQuestionsAsked: false,
                    website: 'nfdh.org/donated-dental-services',
                    urgent: 'Waiting list but worth it - full dental restoration FREE'
                }
            ],
            ongoing_dental: [
                {
                    name: 'Federally Qualified Health Centers (FQHC) Dental',
                    description: 'Many FQHCs have dental clinics',
                    eligibility: 'Everyone served, sliding scale fees',
                    coverage: 'Full dental services',
                    cost: 'Based on income, can be $0-$50',
                    noQuestionsAsked: true,
                    findNearYou: 'findahealthcenter.hrsa.gov (check "dental services")'
                },
                {
                    name: 'Dental Lifeline Network',
                    description: 'Connect with volunteer dentists',
                    eligibility: 'Disabled, elderly, or medically fragile',
                    coverage: 'Comprehensive dental care',
                    cost: 'FREE',
                    noQuestionsAsked: false,
                    website: 'dentallifeline.org'
                },
                {
                    name: 'United Way 211',
                    description: 'Call 211 to find local dental assistance',
                    eligibility: 'Varies by program',
                    coverage: 'Referrals to local programs',
                    cost: 'Varies',
                    noQuestionsAsked: false,
                    phone: 'Dial 211 from any phone'
                },
                {
                    name: 'State Dental Association Programs',
                    description: 'Many states have "Donated Dental" or "Give Kids a Smile" programs',
                    eligibility: 'Varies by state',
                    coverage: 'Free or reduced cost dental',
                    cost: 'Varies',
                    noQuestionsAsked: false,
                    findNearYou: 'Search "[your state] dental association charity care"'
                }
            ],
            dentures: [
                {
                    name: 'Smiles Change Lives / America\'s Dentists Care Foundation',
                    description: 'FREE dentures for qualifying individuals',
                    eligibility: 'Low income, must apply',
                    coverage: 'Dentures',
                    cost: 'FREE',
                    noQuestionsAsked: false,
                    website: 'adcf.org'
                },
                {
                    name: 'Dental Schools for Dentures',
                    description: 'Dental students make dentures at huge discount',
                    eligibility: 'Anyone',
                    coverage: 'Full or partial dentures',
                    cost: '$300-$800 (vs $2000-$4000 regular cost)',
                    noQuestionsAsked: true
                },
                {
                    name: 'Aspen Dental Denture Program',
                    description: 'Some locations offer payment plans',
                    eligibility: 'Anyone',
                    coverage: 'Dentures',
                    cost: 'Payment plans available',
                    noQuestionsAsked: true
                }
            ]
        };

        // Location-based facility types
        this.facilityTypes = {
            'fqhc': {
                name: 'Community Health Center (FQHC)',
                icon: '🏥',
                services: 'Medical, Dental, Mental Health',
                cost: 'Sliding scale $0-$100',
                acceptsUninsured: true
            },
            'free_clinic': {
                name: 'Free Clinic',
                icon: '🏥',
                services: 'Basic medical care',
                cost: 'FREE',
                acceptsUninsured: true
            },
            'dental_school': {
                name: 'Dental School Clinic',
                icon: '🦷',
                services: 'All dental services',
                cost: '50-75% discount',
                acceptsUninsured: true
            },
            'hospital': {
                name: 'Non-Profit Hospital',
                icon: '🏥',
                services: 'Emergency & charity care',
                cost: 'Charity care available',
                acceptsUninsured: true
            },
            'pharmacy': {
                name: 'Low-Cost Pharmacy',
                icon: '💊',
                services: '$4 generics',
                cost: '$4-$25',
                acceptsUninsured: true
            }
        };
    }

    // Get user's location
    async getUserLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.userLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        resolve(this.userLocation);
                    },
                    (error) => {
                        console.log('Location error:', error);
                        reject(error);
                    }
                );
            } else {
                reject(new Error('Geolocation not supported'));
            }
        });
    }

    // Set location manually (ZIP code or city)
    setLocationManually(zipOrCity) {
        // In production, would geocode this
        this.userLocation = {
            zipOrCity: zipOrCity,
            manual: true
        };
        return this.userLocation;
    }

    // Generate uninsured pathway
    generateUninsuredPathway(userNeeds) {
        const pathway = {
            title: 'Your Path to Care WITHOUT Insurance',
            subtitle: 'Step-by-step guide to get the care you need for FREE or low cost',
            urgentCare: [],
            ongoingCare: [],
            prescriptions: [],
            specialNeeds: []
        };

        // Urgent medical needs
        pathway.urgentCare = [
            {
                step: 1,
                action: 'Emergency Room (if life-threatening)',
                details: 'By law, ERs MUST treat you regardless of insurance or ability to pay',
                cost: 'Apply for Emergency Medicaid or charity care WHILE at hospital',
                location: 'Nearest hospital emergency room'
            },
            {
                step: 2,
                action: 'Find Nearest Community Health Center (FQHC)',
                details: 'These clinics serve EVERYONE - uninsured, low income, homeless, immigrants',
                cost: 'Sliding scale: $0-$25 per visit based on income',
                location: 'findahealthcenter.hrsa.gov',
                services: 'Medical, dental, mental health, prescriptions'
            }
        ];

        // Ongoing care
        pathway.ongoingCare = [
            {
                step: 1,
                action: 'Establish care at FQHC',
                why: 'They become your medical home - ongoing care for life',
                cost: 'Based on income, many pay $0'
            },
            {
                step: 2,
                action: 'Request charity care at local non-profit hospital',
                why: 'Non-profit hospitals MUST provide charity care by law',
                howTo: 'Ask for "financial counselor" or "charity care application"',
                cost: 'Often 100% free if income qualifies'
            },
            {
                step: 3,
                action: 'Check county health department',
                why: 'Low-cost preventive care, vaccinations',
                cost: 'Free or very low cost'
            }
        ];

        // Prescriptions
        pathway.prescriptions = this.uninsuredPrograms.prescriptions;

        // Special needs
        if (userNeeds && userNeeds.includes('dental')) {
            pathway.specialNeeds.push({
                need: 'DENTAL CARE',
                urgency: 'HIGH',
                options: this.dentalPrograms.emergency_dental
            });
        }

        return pathway;
    }

    // Generate dental care pathway
    generateDentalPathway(severity) {
        const pathway = {
            title: 'Getting Dental Care When You Have NO Insurance',
            subtitle: 'Programs that WILL help you - many ask NO questions',
            immediate: [],
            comprehensive: [],
            dentures: []
        };

        // Immediate options
        pathway.immediate = [
            {
                priority: 'HIGHEST',
                option: 'Find Mission of Mercy or RAM Event',
                description: 'COMPLETELY FREE dental care - extractions, fillings, cleanings',
                eligibility: 'NO questions asked - just show up',
                cost: 'FREE',
                howTo: [
                    'Google: "[your state] mission of mercy dental"',
                    'Google: "[your state] remote area medical"',
                    'These are FREE dental events - people get thousands of dollars of work done FREE',
                    'Arrive EARLY (people camp overnight)',
                    'Bring ID but NO income verification needed'
                ],
                websites: ['missionofmercy.org', 'ramusa.org']
            },
            {
                priority: 'HIGH',
                option: 'Dental School Emergency Clinic',
                description: '50-75% discount, emergency appointments available',
                eligibility: 'Anyone',
                cost: 'Heavily discounted',
                howTo: [
                    'Google: "[your city] dental school"',
                    'Call and ask for emergency appointment',
                    'Explain you have no insurance and need help',
                    'They are there to LEARN - they NEED patients'
                ]
            },
            {
                priority: 'MEDIUM',
                option: 'FQHC Dental Clinic',
                description: 'Sliding scale, as low as $0-$50',
                eligibility: 'Everyone served',
                cost: 'Based on income',
                howTo: [
                    'Go to: findahealthcenter.hrsa.gov',
                    'Check "Dental Services" box',
                    'Call and make appointment'
                ]
            }
        ];

        // Comprehensive care
        pathway.comprehensive = [
            {
                option: 'Donated Dental Services',
                description: 'FREE comprehensive dental restoration',
                eligibility: 'Disabled, elderly, or medically fragile with low income',
                coverage: 'EVERYTHING - crowns, bridges, dentures, implants ALL FREE',
                cost: 'COMPLETELY FREE',
                howTo: [
                    'Apply at: nfdh.org/donated-dental-services',
                    'There is a waiting list but worth it',
                    'Volunteer dentists donate their time',
                    'You can get $20,000+ of dental work FREE'
                ]
            },
            {
                option: 'Dental Lifeline Network',
                description: 'Connects you with volunteer dentists',
                eligibility: 'Disabled, elderly, medically fragile',
                cost: 'FREE',
                website: 'dentallifeline.org'
            }
        ];

        // Dentures specifically
        if (severity === 'need_dentures') {
            pathway.dentures = this.dentalPrograms.dentures;
        }

        return pathway;
    }

    // Find nearest facilities by type
    findNearestFacilities(type, location) {
        // In production, would use actual geolocation API
        // For now, return instructions on how to find
        const facilityInfo = this.facilityTypes[type];
        
        return {
            facilityType: facilityInfo,
            searchInstructions: this.getSearchInstructions(type, location),
            nationalResources: this.getNationalResources(type)
        };
    }

    getSearchInstructions(type, location) {
        const loc = location?.zipOrCity || 'your ZIP code';
        
        const instructions = {
            'fqhc': `1. Go to: findahealthcenter.hrsa.gov\n2. Enter: ${loc}\n3. Filter by services you need (medical, dental, mental health)`,
            'free_clinic': `1. Go to: freeclinics.com\n2. Enter: ${loc}\n3. Call to verify services and hours`,
            'dental_school': `1. Google: "dental school near ${loc}"\n2. Look for: "[City] School of Dentistry Patient Care"\n3. Call their patient clinic`,
            'hospital': `1. Google: "non-profit hospital ${loc}"\n2. Ask for "financial counselor" or "charity care"\n3. Request application`,
            'pharmacy': `1. Walmart, Kroger, Costco all have $4 generic programs\n2. Ask pharmacist for "$4 generic list"\n3. Use GoodRx app for additional savings`
        };
        
        return instructions[type] || 'Search online for facilities near you';
    }

    getNationalResources(type) {
        const resources = {
            'fqhc': ['findahealthcenter.hrsa.gov', 'Call: 1-877-464-4772'],
            'free_clinic': ['freeclinics.com', 'nafc.org'],
            'dental_school': ['Search: ADA Commission on Dental Accreditation schools'],
            'hospital': ['Ask any hospital for financial counselor'],
            'pharmacy': ['needymeds.org', 'rxassist.org', 'goodrx.com']
        };
        
        return resources[type] || [];
    }

    // Generate location-based recommendations
    generateLocationRecommendations(userNeeds, location) {
        const recommendations = {
            closestFacilities: [],
            stepByStep: [],
            callToday: []
        };

        // Prioritize based on needs
        if (userNeeds.uninsured) {
            recommendations.closestFacilities.push({
                type: 'FQHC',
                why: 'Serves everyone regardless of insurance',
                find: this.findNearestFacilities('fqhc', location)
            });
        }

        if (userNeeds.dental || userNeeds.noTeeth) {
            recommendations.closestFacilities.push({
                type: 'Dental School or Free Dental Event',
                why: 'Cheapest/free dental care available',
                find: this.findNearestFacilities('dental_school', location)
            });
            
            recommendations.callToday.push({
                action: 'Check for Mission of Mercy events',
                why: 'Completely FREE dental care',
                how: 'Google: "[your state] mission of mercy dental"'
            });
        }

        if (userNeeds.prescriptions) {
            recommendations.closestFacilities.push({
                type: 'Low-Cost Pharmacy',
                why: '$4 generics',
                find: this.findNearestFacilities('pharmacy', location)
            });
        }

        return recommendations;
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LocationBasedServices;
}
