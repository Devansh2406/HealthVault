
export type DiseaseCategory = 'infectious' | 'chronic' | 'genetic' | 'deficiency' | 'mental' | 'other';
export type CurableStatus = 'yes' | 'no' | 'sometimes';

export interface TreatmentType {
    type: 'lifestyle' | 'medication_class' | 'therapy' | 'surgery';
    description: string;
}

export interface Disease {
    id: string;
    name: string;
    category: DiseaseCategory;
    short_description: string;
    common_symptoms: string[];
    risk_factors: string[];
    severity_levels: string[];
    is_curable: CurableStatus;
    treatment_knowledge: TreatmentType[];
    doctor_visit_trigger: string;
    emergency_trigger: string;
}

export const diseaseKnowledgeBase: Disease[] = [
    {
        id: 'asthma',
        name: 'Asthma',
        category: 'chronic',
        short_description: 'A condition in which your airways narrow and swell and may produce extra mucus.',
        common_symptoms: ['wheezing', 'breathlessness', 'chest tightness', 'coughing'],
        risk_factors: ['Exposure to allergens', 'Family history', 'Respiratory infections'],
        severity_levels: ['Intermittent', 'Mild persistent', 'Moderate persistent', 'Severe persistent'],
        is_curable: 'no',
        treatment_knowledge: [
            { type: 'medication_class', description: 'Bronchodilators, Corticosteroids' },
            { type: 'lifestyle', description: 'Identify and avoid triggers (dust, cold air, pollen)' }
        ],
        doctor_visit_trigger: 'If attacks increase in frequency or inhaler usage increases',
        emergency_trigger: 'Severe breathing difficulty, blue lips/fingernails, rapid pulse'
    },
    {
        id: 'diabetes_type_2',
        name: 'Type 2 Diabetes',
        category: 'chronic',
        short_description: 'A chronic condition that affects the way the body processes blood sugar (glucose).',
        common_symptoms: ['increased thirst', 'frequent urination', 'increased hunger', 'fatigue', 'blurred vision'],
        risk_factors: ['Obesity', 'Inactivity', 'Family history', 'Age > 45'],
        severity_levels: ['Pre-diabetes', 'Controlled', 'Uncontrolled', 'Complicated'],
        is_curable: 'no',
        treatment_knowledge: [
            { type: 'medication_class', description: 'Insulin, Oral hypoglycemics, Metformin' },
            { type: 'lifestyle', description: 'Healthy eating, regular exercise, weight monitoring' }
        ],
        doctor_visit_trigger: 'Symptoms of high/low blood sugar persisting, foot sores',
        emergency_trigger: 'Sweet fruit breath smell (Ketoacidosis), confusion, seizures'
    },
    {
        id: 'common_cold',
        name: 'Common Cold',
        category: 'infectious',
        short_description: 'A viral infection of your nose and throat (upper respiratory tract).',
        common_symptoms: ['runny nose', 'sore throat', 'cough', 'congestion', 'mild body aches', 'sneezing'],
        risk_factors: ['Close contact with infected', 'Weakened immune system', 'Season (winter)'],
        severity_levels: ['Mild'],
        is_curable: 'yes',
        treatment_knowledge: [
            { type: 'medication_class', description: 'Analgesics, Decongestants' },
            { type: 'lifestyle', description: 'Rest, hydration, warm saltwater gargle' }
        ],
        doctor_visit_trigger: 'Symptoms last > 10 days, high fever',
        emergency_trigger: 'Trouble breathing, dehydration signs'
    },
    {
        id: 'hypertension',
        name: 'Hypertension (High Blood Pressure)',
        category: 'chronic',
        short_description: 'A condition in which the force of the blood against the artery walls is too high.',
        common_symptoms: ['headache', 'shortness of breath', 'nosebleeds', 'flushing'],
        risk_factors: ['High salt diet', 'Obesity', 'Smoking', 'Stress', 'Age'],
        severity_levels: ['Elevated', 'Stage 1', 'Stage 2', 'Hypertensive crisis'],
        is_curable: 'no',
        treatment_knowledge: [
            { type: 'medication_class', description: 'Diuretics, Beta-blockers, ACE inhibitors' },
            { type: 'lifestyle', description: 'Low sodium diet, regular exercise, limiting alcohol' }
        ],
        doctor_visit_trigger: 'Consistently high readings despite lifestyle changes',
        emergency_trigger: 'Chest pain, severe headache, confusion (Hypertensive emergency)'
    },
    {
        id: 'migraine',
        name: 'Migraine',
        category: 'chronic',
        short_description: 'A headache of varying intensity, often accompanied by nausea and sensitivity to light and sound.',
        common_symptoms: ['severe throbbing pain', 'sensitivity to light', 'nausea', 'visual disturbances'],
        risk_factors: ['Hormonal changes', 'Stress', 'Certain foods/additives'],
        severity_levels: ['Episodic', 'Chronic'],
        is_curable: 'no',
        treatment_knowledge: [
            { type: 'medication_class', description: 'Pain relievers, Triptans' },
            { type: 'lifestyle', description: 'Stress management, sleep schedule, avoid triggers' }
        ],
        doctor_visit_trigger: 'Headaches trigger frequently or severity increases',
        emergency_trigger: 'Abrupt, severe headache (thunderclap), stiff neck, confusion'
    }
];
