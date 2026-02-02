// User Data Manager
// Stores and retrieves user intake questionnaire data for auto-filling documents

class UserDataManager {
    constructor() {
        this.storageKey = 'medicalAssistant_intakeData';
        this.profileData = this.loadProfile();
    }

    // Load profile from localStorage
    loadProfile() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        }
        return null;
    }

    // Save profile to localStorage
    saveProfile(profileData) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(profileData));
            this.profileData = profileData;
            return true;
        } catch (error) {
            console.error('Error saving profile:', error);
            return false;
        }
    }

    // Check if profile exists
    hasProfile() {
        return this.profileData !== null && this.profileData.complete === true;
    }

    // Get profile data
    getProfile() {
        return this.profileData;
    }

    // Clear profile
    clearProfile() {
        try {
            localStorage.removeItem(this.storageKey);
            this.profileData = null;
            return true;
        } catch (error) {
            console.error('Error clearing profile:', error);
            return false;
        }
    }

    // Extract document-ready data from intake profile
    getDocumentData() {
        if (!this.hasProfile()) {
            return {};
        }

        const profile = this.profileData;
        const documentData = {};

        // Personal Information
        if (profile.personalInfo) {
            documentData.firstName = profile.personalInfo.first_name || '';
            documentData.preferredName = profile.personalInfo.preferred_name || profile.personalInfo.first_name || '';
            documentData.name = documentData.firstName;
            documentData.ageRange = profile.personalInfo.age_range || '';
            documentData.state = profile.personalInfo.location_state || '';
        }

        // Medical Information
        if (profile.medicalInfo) {
            documentData.primaryCondition = profile.medicalInfo.primary_condition || '';
            documentData.otherConditions = profile.medicalInfo.other_conditions || '';
            documentData.conditions = this.formatConditionsList(
                documentData.primaryCondition,
                documentData.otherConditions
            );
            documentData.diagnosisDate = profile.medicalInfo.diagnosis_date || '';
            documentData.conditionProgression = profile.medicalInfo.getting_worse || '';
            documentData.isTerminal = profile.medicalInfo.terminal === 'Yes';
        }

        // Doctors and Treatment
        if (profile.doctorsInfo) {
            documentData.hasSpecialist = profile.doctorsInfo.has_specialist || '';
            documentData.specialistTypes = profile.doctorsInfo.specialist_types || '';
            documentData.doctorSupport = profile.doctorsInfo.doctor_support || '';
            documentData.treatmentsTried = profile.doctorsInfo.treatment_tried || [];
            documentData.medicationSideEffects = profile.doctorsInfo.medication_side_effects || '';
        }

        // Daily Functioning
        if (profile.functioningInfo) {
            documentData.workStatus = profile.functioningInfo.work_status || '';
            documentData.stoppedWorkWhen = profile.functioningInfo.stopped_work_when || '';
            documentData.badDaysPerWeek = profile.functioningInfo.bad_days || '';
            documentData.concentrationTime = profile.functioningInfo.concentration_time || '';
            documentData.physicalLimitations = profile.functioningInfo.physical_limits || [];
            documentData.cognitiveProblems = profile.functioningInfo.cognitive_problems || '';
            documentData.dailyHelpNeeded = profile.functioningInfo.daily_help_needed || [];
            documentData.restFrequency = profile.functioningInfo.need_rest || '';
        }

        // Previous Attempts
        if (profile.previousAttempts) {
            documentData.appliedBefore = profile.previousAttempts.applied_before || '';
            documentData.denialReason = profile.previousAttempts.denial_reason || '';
            documentData.confusionLevel = profile.previousAttempts.confusion_level || '';
        }

        // Goals and Urgency
        if (profile.goalsInfo) {
            documentData.primaryGoal = profile.goalsInfo.primary_goal || '';
            documentData.urgencyLevel = profile.goalsInfo.urgency_level || '';
            documentData.financialSituation = profile.goalsInfo.financial_situation || '';
        }

        // Support System
        if (profile.supportInfo) {
            documentData.hasSupportPerson = profile.supportInfo.has_support_person || '';
            documentData.needsAdvocate = profile.supportInfo.needs_advocate || '';
        }

        return documentData;
    }

    // Format conditions list for documents
    formatConditionsList(primary, other) {
        if (!primary) return '';
        
        let conditions = primary;
        if (other && other.trim()) {
            conditions += ', ' + other;
        }
        return conditions;
    }

    // Format physical limitations for documents
    formatPhysicalLimitations(limitations) {
        if (!limitations || limitations.length === 0) {
            return 'None specified';
        }
        return limitations.join(', ');
    }

    // Format daily help needed for documents
    formatDailyHelp(helpNeeded) {
        if (!helpNeeded || helpNeeded.length === 0) {
            return 'None';
        }
        if (helpNeeded.includes('None - I can do everything')) {
            return 'None - able to perform all activities';
        }
        return helpNeeded.join(', ');
    }

    // Generate functional limitations description
    generateFunctionalLimitationsText() {
        if (!this.hasProfile()) {
            return '';
        }

        const profile = this.profileData;
        const limitations = [];

        // Physical limitations
        if (profile.functioningInfo?.physical_limits && profile.functioningInfo.physical_limits.length > 0) {
            limitations.push('Physical Limitations:');
            profile.functioningInfo.physical_limits.forEach(limit => {
                limitations.push(`- ${limit}`);
            });
        }

        // Cognitive issues
        if (profile.functioningInfo?.cognitive_problems && 
            profile.functioningInfo.cognitive_problems !== 'No cognitive problems') {
            limitations.push('\nCognitive/Mental Limitations:');
            limitations.push(`- ${profile.functioningInfo.cognitive_problems}`);
            if (profile.functioningInfo.concentration_time) {
                limitations.push(`- Can only concentrate for: ${profile.functioningInfo.concentration_time}`);
            }
        }

        // Rest needs
        if (profile.functioningInfo?.need_rest && 
            profile.functioningInfo.need_rest !== 'Rarely need to rest') {
            limitations.push('\nRest Requirements:');
            limitations.push(`- Need to rest: ${profile.functioningInfo.need_rest}`);
        }

        // Bad days
        if (profile.functioningInfo?.bad_days) {
            limitations.push('\nSymptom Variability:');
            limitations.push(`- Bad days per week: ${profile.functioningInfo.bad_days}`);
        }

        // Daily help needed
        if (profile.functioningInfo?.daily_help_needed && 
            !profile.functioningInfo.daily_help_needed.includes('None - I can do everything')) {
            limitations.push('\nDaily Activities Requiring Assistance:');
            profile.functioningInfo.daily_help_needed.forEach(activity => {
                limitations.push(`- ${activity}`);
            });
        }

        return limitations.join('\n');
    }

    // Generate medications and side effects text
    generateMedicationText() {
        if (!this.hasProfile()) {
            return '';
        }

        const profile = this.profileData;
        const text = [];

        if (profile.doctorsInfo?.medication_side_effects) {
            text.push(`Medication Side Effects: ${profile.doctorsInfo.medication_side_effects}`);
        }

        if (profile.doctorsInfo?.treatment_tried) {
            text.push('\nTreatments Tried:');
            if (Array.isArray(profile.doctorsInfo.treatment_tried)) {
                profile.doctorsInfo.treatment_tried.forEach(treatment => {
                    text.push(`- ${treatment}`);
                });
            } else {
                text.push(`- ${profile.doctorsInfo.treatment_tried}`);
            }
        }

        return text.join('\n');
    }

    // Generate work history summary
    generateWorkHistorySummary() {
        if (!this.hasProfile()) {
            return '';
        }

        const profile = this.profileData;
        const summary = [];

        if (profile.functioningInfo?.work_status) {
            summary.push(`Current Work Status: ${profile.functioningInfo.work_status}`);
            
            if (profile.functioningInfo.stopped_work_when) {
                summary.push(`Stopped Working: ${profile.functioningInfo.stopped_work_when}`);
            }
            
            if (profile.functioningInfo.work_status.includes('stopped working')) {
                summary.push('\nReason for Stopping Work:');
                summary.push('Unable to continue working due to medical condition(s) and limitations.');
            }
        }

        return summary.join('\n');
    }

    // Get appeal-specific information
    getAppealInformation() {
        if (!this.hasProfile()) {
            return {};
        }

        const profile = this.profileData;
        const appealInfo = {};

        if (profile.previousAttempts?.denial_reason) {
            appealInfo.denialReason = profile.previousAttempts.denial_reason;
        }

        if (profile.previousAttempts?.applied_before) {
            appealInfo.appliedBefore = profile.previousAttempts.applied_before;
        }

        // Generate reasons for appeal
        appealInfo.reasonsForAppeal = [];
        
        if (profile.medicalInfo?.getting_worse === 'Getting significantly worse' || 
            profile.medicalInfo?.getting_worse === 'Slowly getting worse') {
            appealInfo.reasonsForAppeal.push('My condition has worsened since the initial decision');
        }

        if (profile.functioningInfo?.bad_days === 'Every day' || 
            profile.functioningInfo?.bad_days === '5-6 days') {
            appealInfo.reasonsForAppeal.push('The severity and frequency of my symptoms were not fully considered');
        }

        if (profile.doctorsInfo?.medication_side_effects === 'Yes, severe side effects' ||
            profile.doctorsInfo?.medication_side_effects === 'Yes, moderate side effects') {
            appealInfo.reasonsForAppeal.push('Medication side effects significantly impact my ability to function');
        }

        return appealInfo;
    }

    // Get summary for user display
    getProfileSummary() {
        if (!this.hasProfile()) {
            return null;
        }

        const data = this.getDocumentData();
        return {
            name: data.name || 'Unknown',
            state: data.state || 'Not provided',
            primaryCondition: data.primaryCondition || 'Not specified',
            completionDate: this.profileData.completedAt || 'Unknown',
            hasData: true
        };
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserDataManager;
}
