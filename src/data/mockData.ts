export type UserRole = 'admin' | 'vendor' | 'supervisor' | 'accounts';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

// Equipment/Vehicle categories for construction, mining, shipping
export const vehicleCategories = [
    // Mining & Earth Moving
    'Hyva', 'Dumper', 'Tipper', 'Excavator', 'Backhoe Loader', 'Bulldozer',
    'Wheel Loader', 'Motor Grader', 'Compactor / Roller',
    // Transport
    'Trailer', 'Flatbed Truck', 'Tanker', 'Water Tanker', 'Fuel Tanker',
    // Crane & Lifting
    'Mobile Crane', 'Tower Crane', 'Crawler Crane', 'Forklift',
    // Construction
    'Concrete Mixer', 'Transit Mixer', 'Boom Placer', 'Batching Plant',
    'Piling Rig', 'Rock Breaker', 'Drill Machine',
    // Others
    'Generator Set', 'Air Compressor', 'JCB', 'Poclain',
];

export const materialTypes = [
    'Overburden', 'Coal', 'Cement', 'Sand', 'Aggregate', 'Steel', 'Fly Ash',
    'Limestone', 'Iron Ore', 'Bauxite', 'Construction Material', 'Mixed',
];

export interface RequirementItem {
    id: string;
    vehicleCategory: string;
    capacity: string;
    quantityRequired: number;
    quantityAllocated: number;
    rateType: string;
}

export interface Requirement {
    id: string;
    projectName: string;
    clientName: string;
    siteLocation: string;
    materialType: string;
    items: RequirementItem[];
    reportingTime: string;
    dutyHours: string;
    dieselBy: string;
    paymentCycle: string;
    penaltyRule: string;
    startDate: string;
    endDate: string;
    replacementRequired: boolean;
    status: 'DRAFT' | 'LIVE' | 'AWARDED' | 'CLOSED';
    createdAt: string;
    bidsCount: number;
}

export interface Bid {
    id: string;
    requirementId: string;
    requirementItemId: string;
    vendorId: string;
    vendorName: string;
    vehicleCategory: string;
    vehiclesOffering: number;
    rate: number;
    joiningDays: number;
    vehicleAge: number;
    rating: number;
    distance: string;
    remarks: string;
    status: 'ACTIVE' | 'ACCEPTED' | 'REJECTED' | 'PARTIAL';
    createdAt: string;
}

export interface WorkOrder {
    id: string;
    requirementId: string;
    vendorId: string;
    vendorName: string;
    clientName: string;
    projectName: string;
    vehicleCategory: string;
    quantity: number;
    rate: number;
    rateType: string;
    validity: string;
    penaltyClause: string;
    paymentCycle: string;
    status: 'PENDING' | 'ACCEPTED' | 'ACTIVE' | 'EXPIRED';
    createdAt: string;
}

export interface Vehicle {
    id: string;
    vehicleNumber: string;
    vendorId: string;
    vendorName: string;
    driverName: string;
    driverLicense: string;
    fitnessExpiry: string;
    insuranceExpiry: string;
    category: string;
    capacity: string;
    assignedProject?: string;
    assignedRequirementId?: string;
    status: 'ACTIVE' | 'BREAKDOWN' | 'STANDBY' | 'REJECTED' | 'PENDING';
    photoUrl?: string;
}

export interface DailyOperation {
    id: string;
    vehicleNumber: string;
    vendorName: string;
    projectName: string;
    date: string;
    status: 'PRESENT' | 'ABSENT' | 'BREAKDOWN' | 'STANDBY';
    trips: number;
    extraTrips: number;
    remarks: string;
}

export interface BillingRecord {
    id: string;
    vendorId: string;
    vendorName: string;
    projectName: string;
    clientName: string;
    requirementId: string;
    month: string;
    totalTrips: number;
    rate: number;
    grossAmount: number;
    penaltyDeduction: number;
    dieselDeduction: number;
    extraShiftBonus: number;
    netAmount: number;
    status: 'GENERATED' | 'VERIFIED' | 'APPROVED' | 'PAID';
}

export const mockUsers: User[] = [
    { id: '1', name: 'Rajesh Kumar', email: 'admin@transport.com', role: 'admin' },
    { id: '2', name: 'Sunil Sharma', email: 'vendor@transport.com', role: 'vendor' },
    { id: '3', name: 'Amit Singh', email: 'supervisor@transport.com', role: 'supervisor' },
    { id: '4', name: 'Priya Gupta', email: 'accounts@transport.com', role: 'accounts' },
];

export const mockRequirements: Requirement[] = [
    {
        id: 'REQ-001', projectName: 'Pakri Barwadih Mine', clientName: 'NTPC Ltd',
        siteLocation: 'Jharkhand', materialType: 'Overburden',
        items: [
            { id: 'RI-001', vehicleCategory: 'Hyva', capacity: '20 Ton', quantityRequired: 25, quantityAllocated: 25, rateType: 'Per Trip' },
            { id: 'RI-002', vehicleCategory: 'Excavator', capacity: '210 LC', quantityRequired: 5, quantityAllocated: 5, rateType: 'Per Hour' },
            { id: 'RI-003', vehicleCategory: 'Water Tanker', capacity: '10000 Ltr', quantityRequired: 5, quantityAllocated: 5, rateType: 'Per Day' },
        ],
        reportingTime: '06:00 AM', dutyHours: '12hr', dieselBy: 'Company',
        paymentCycle: '30 days', penaltyRule: '₹500/day absence',
        startDate: '2026-03-01', endDate: '2026-06-30', replacementRequired: true,
        status: 'AWARDED', createdAt: '2026-02-15', bidsCount: 8,
    },
    {
        id: 'REQ-002', projectName: 'Godda Thermal Plant', clientName: 'Adani Power',
        siteLocation: 'Godda, Jharkhand', materialType: 'Coal',
        items: [
            { id: 'RI-004', vehicleCategory: 'Dumper', capacity: '32 Ton', quantityRequired: 15, quantityAllocated: 0, rateType: 'Per Day' },
            { id: 'RI-005', vehicleCategory: 'Wheel Loader', capacity: '3 Cu.m', quantityRequired: 3, quantityAllocated: 0, rateType: 'Per Hour' },
            { id: 'RI-006', vehicleCategory: 'Mobile Crane', capacity: '25 Ton', quantityRequired: 2, quantityAllocated: 0, rateType: 'Per Day' },
        ],
        reportingTime: '07:00 AM', dutyHours: '24hr', dieselBy: 'Vendor',
        paymentCycle: '15 days', penaltyRule: '₹1000/day absence',
        startDate: '2026-04-01', endDate: '2026-09-30', replacementRequired: true,
        status: 'LIVE', createdAt: '2026-02-18', bidsCount: 5,
    },
    {
        id: 'REQ-003', projectName: 'Amrapali Mine', clientName: 'Coal India',
        siteLocation: 'Singrauli, MP', materialType: 'Overburden',
        items: [
            { id: 'RI-007', vehicleCategory: 'Tipper', capacity: '16 Ton', quantityRequired: 10, quantityAllocated: 0, rateType: 'Per Trip' },
            { id: 'RI-008', vehicleCategory: 'JCB', capacity: '3DX', quantityRequired: 4, quantityAllocated: 0, rateType: 'Per Hour' },
        ],
        reportingTime: '06:30 AM', dutyHours: '12hr', dieselBy: 'Company',
        paymentCycle: '30 days', penaltyRule: '₹300/day absence',
        startDate: '2026-03-15', endDate: '2026-07-15', replacementRequired: false,
        status: 'DRAFT', createdAt: '2026-02-20', bidsCount: 0,
    },
    {
        id: 'REQ-004', projectName: 'Rajmahal OCP', clientName: 'ECL',
        siteLocation: 'Dumka, Jharkhand', materialType: 'Mixed',
        items: [
            { id: 'RI-009', vehicleCategory: 'Trailer', capacity: '40 Ton', quantityRequired: 8, quantityAllocated: 5, rateType: 'Per Ton' },
            { id: 'RI-010', vehicleCategory: 'Poclain', capacity: '220', quantityRequired: 3, quantityAllocated: 2, rateType: 'Per Hour' },
            { id: 'RI-011', vehicleCategory: 'Bulldozer', capacity: 'D6', quantityRequired: 2, quantityAllocated: 0, rateType: 'Per Hour' },
            { id: 'RI-012', vehicleCategory: 'Motor Grader', capacity: '180 HP', quantityRequired: 1, quantityAllocated: 1, rateType: 'Per Day' },
        ],
        reportingTime: '05:00 AM', dutyHours: '12hr', dieselBy: 'Company',
        paymentCycle: '15 days', penaltyRule: '₹700/day absence',
        startDate: '2026-03-10', endDate: '2026-08-10', replacementRequired: true,
        status: 'LIVE', createdAt: '2026-02-17', bidsCount: 11,
    },
    {
        id: 'REQ-005', projectName: 'Mumbai Coastal Road', clientName: 'L&T Construction',
        siteLocation: 'Mumbai, Maharashtra', materialType: 'Construction Material',
        items: [
            { id: 'RI-013', vehicleCategory: 'Transit Mixer', capacity: '6 Cu.m', quantityRequired: 12, quantityAllocated: 0, rateType: 'Per Trip' },
            { id: 'RI-014', vehicleCategory: 'Boom Placer', capacity: '36m', quantityRequired: 2, quantityAllocated: 0, rateType: 'Per Day' },
            { id: 'RI-015', vehicleCategory: 'Tower Crane', capacity: '10 Ton', quantityRequired: 3, quantityAllocated: 0, rateType: 'Per Month' },
            { id: 'RI-016', vehicleCategory: 'Piling Rig', capacity: '1200mm', quantityRequired: 2, quantityAllocated: 0, rateType: 'Per Day' },
        ],
        reportingTime: '06:00 AM', dutyHours: '24hr', dieselBy: 'Vendor',
        paymentCycle: '30 days', penaltyRule: '₹2000/day absence',
        startDate: '2026-04-15', endDate: '2027-04-14', replacementRequired: true,
        status: 'LIVE', createdAt: '2026-02-19', bidsCount: 3,
    },
];

export const mockBids: Bid[] = [
    // REQ-001 bids
    { id: 'BID-001', requirementId: 'REQ-001', requirementItemId: 'RI-001', vendorId: '2', vendorName: 'Sharma Transport', vehicleCategory: 'Hyva', vehiclesOffering: 10, rate: 1850, joiningDays: 2, vehicleAge: 2022, rating: 4.5, distance: '40km', remarks: 'New vehicles', status: 'ACCEPTED', createdAt: '2026-02-16' },
    { id: 'BID-002', requirementId: 'REQ-001', requirementItemId: 'RI-001', vendorId: '5', vendorName: 'Gupta Fleet Services', vehicleCategory: 'Hyva', vehiclesOffering: 15, rate: 1820, joiningDays: 3, vehicleAge: 2018, rating: 3.8, distance: '110km', remarks: 'Experienced drivers', status: 'PARTIAL', createdAt: '2026-02-16' },
    { id: 'BID-003', requirementId: 'REQ-001', requirementItemId: 'RI-001', vendorId: '6', vendorName: 'Singh Logistics', vehicleCategory: 'Hyva', vehiclesOffering: 10, rate: 1900, joiningDays: 1, vehicleAge: 2024, rating: 4.9, distance: '20km', remarks: 'Premium fleet', status: 'ACCEPTED', createdAt: '2026-02-16' },
    { id: 'BID-008', requirementId: 'REQ-001', requirementItemId: 'RI-002', vendorId: '8', vendorName: 'Heavy Equip India', vehicleCategory: 'Excavator', vehiclesOffering: 5, rate: 3500, joiningDays: 3, vehicleAge: 2023, rating: 4.6, distance: '50km', remarks: 'Komatsu PC210', status: 'ACCEPTED', createdAt: '2026-02-16' },
    { id: 'BID-009', requirementId: 'REQ-001', requirementItemId: 'RI-003', vendorId: '2', vendorName: 'Sharma Transport', vehicleCategory: 'Water Tanker', vehiclesOffering: 5, rate: 2800, joiningDays: 1, vehicleAge: 2021, rating: 4.5, distance: '40km', remarks: '10KL tankers', status: 'ACCEPTED', createdAt: '2026-02-16' },
    // REQ-002 bids
    { id: 'BID-004', requirementId: 'REQ-002', requirementItemId: 'RI-004', vendorId: '2', vendorName: 'Sharma Transport', vehicleCategory: 'Dumper', vehiclesOffering: 8, rate: 3200, joiningDays: 3, vehicleAge: 2021, rating: 4.5, distance: '60km', remarks: '32 ton capacity', status: 'ACTIVE', createdAt: '2026-02-19' },
    { id: 'BID-005', requirementId: 'REQ-002', requirementItemId: 'RI-004', vendorId: '7', vendorName: 'Rajput Carriers', vehicleCategory: 'Dumper', vehiclesOffering: 12, rate: 3100, joiningDays: 2, vehicleAge: 2020, rating: 4.2, distance: '85km', remarks: 'Coal transport specialist', status: 'ACTIVE', createdAt: '2026-02-19' },
    { id: 'BID-010', requirementId: 'REQ-002', requirementItemId: 'RI-005', vendorId: '8', vendorName: 'Heavy Equip India', vehicleCategory: 'Wheel Loader', vehiclesOffering: 3, rate: 4200, joiningDays: 4, vehicleAge: 2022, rating: 4.6, distance: '50km', remarks: 'CAT 950', status: 'ACTIVE', createdAt: '2026-02-19' },
    // REQ-004 bids
    { id: 'BID-006', requirementId: 'REQ-004', requirementItemId: 'RI-009', vendorId: '2', vendorName: 'Sharma Transport', vehicleCategory: 'Trailer', vehiclesOffering: 5, rate: 45, joiningDays: 2, vehicleAge: 2023, rating: 4.5, distance: '30km', remarks: 'Per ton rate', status: 'ACCEPTED', createdAt: '2026-02-18' },
    { id: 'BID-007', requirementId: 'REQ-004', requirementItemId: 'RI-010', vendorId: '8', vendorName: 'Heavy Equip India', vehicleCategory: 'Poclain', vehiclesOffering: 2, rate: 3800, joiningDays: 2, vehicleAge: 2022, rating: 4.6, distance: '50km', remarks: 'Tata Hitachi EX200', status: 'ACCEPTED', createdAt: '2026-02-18' },
    { id: 'BID-011', requirementId: 'REQ-004', requirementItemId: 'RI-009', vendorId: '7', vendorName: 'Rajput Carriers', vehicleCategory: 'Trailer', vehiclesOffering: 4, rate: 42, joiningDays: 3, vehicleAge: 2021, rating: 4.2, distance: '85km', remarks: 'Flatbed trailers', status: 'ACTIVE', createdAt: '2026-02-18' },
    { id: 'BID-012', requirementId: 'REQ-004', requirementItemId: 'RI-011', vendorId: '9', vendorName: 'Bharat Earthmovers', vehicleCategory: 'Bulldozer', vehiclesOffering: 2, rate: 5500, joiningDays: 5, vehicleAge: 2020, rating: 4.0, distance: '120km', remarks: 'D6 Cat', status: 'ACTIVE', createdAt: '2026-02-18' },
    // REQ-005 bids
    { id: 'BID-013', requirementId: 'REQ-005', requirementItemId: 'RI-013', vendorId: '10', vendorName: 'Metro Concrete Co.', vehicleCategory: 'Transit Mixer', vehiclesOffering: 8, rate: 2200, joiningDays: 2, vehicleAge: 2023, rating: 4.3, distance: '15km', remarks: 'Schwing Stetter', status: 'ACTIVE', createdAt: '2026-02-20' },
    { id: 'BID-014', requirementId: 'REQ-005', requirementItemId: 'RI-014', vendorId: '10', vendorName: 'Metro Concrete Co.', vehicleCategory: 'Boom Placer', vehiclesOffering: 2, rate: 8500, joiningDays: 3, vehicleAge: 2024, rating: 4.3, distance: '15km', remarks: '36m reach', status: 'ACTIVE', createdAt: '2026-02-20' },
];

export const mockWorkOrders: WorkOrder[] = [
    { id: 'WO-001', requirementId: 'REQ-001', vendorId: '2', vendorName: 'Sharma Transport', clientName: 'NTPC Ltd', projectName: 'Pakri Barwadih Mine', vehicleCategory: 'Hyva', quantity: 10, rate: 1850, rateType: 'Per Trip', validity: '01 Mar - 30 Jun 2026', penaltyClause: '₹500/day absence', paymentCycle: '30 days', status: 'ACTIVE', createdAt: '2026-02-17' },
    { id: 'WO-002', requirementId: 'REQ-001', vendorId: '6', vendorName: 'Singh Logistics', clientName: 'NTPC Ltd', projectName: 'Pakri Barwadih Mine', vehicleCategory: 'Hyva', quantity: 10, rate: 1900, rateType: 'Per Trip', validity: '01 Mar - 30 Jun 2026', penaltyClause: '₹500/day absence', paymentCycle: '30 days', status: 'ACTIVE', createdAt: '2026-02-17' },
    { id: 'WO-003', requirementId: 'REQ-001', vendorId: '5', vendorName: 'Gupta Fleet Services', clientName: 'NTPC Ltd', projectName: 'Pakri Barwadih Mine', vehicleCategory: 'Hyva', quantity: 5, rate: 1820, rateType: 'Per Trip', validity: '01 Mar - 30 Jun 2026', penaltyClause: '₹500/day absence', paymentCycle: '30 days', status: 'PENDING', createdAt: '2026-02-17' },
    { id: 'WO-004', requirementId: 'REQ-001', vendorId: '8', vendorName: 'Heavy Equip India', clientName: 'NTPC Ltd', projectName: 'Pakri Barwadih Mine', vehicleCategory: 'Excavator', quantity: 5, rate: 3500, rateType: 'Per Hour', validity: '01 Mar - 30 Jun 2026', penaltyClause: '₹500/day absence', paymentCycle: '30 days', status: 'ACTIVE', createdAt: '2026-02-17' },
    { id: 'WO-005', requirementId: 'REQ-001', vendorId: '2', vendorName: 'Sharma Transport', clientName: 'NTPC Ltd', projectName: 'Pakri Barwadih Mine', vehicleCategory: 'Water Tanker', quantity: 5, rate: 2800, rateType: 'Per Day', validity: '01 Mar - 30 Jun 2026', penaltyClause: '₹500/day absence', paymentCycle: '30 days', status: 'ACTIVE', createdAt: '2026-02-17' },
    { id: 'WO-006', requirementId: 'REQ-004', vendorId: '2', vendorName: 'Sharma Transport', clientName: 'ECL', projectName: 'Rajmahal OCP', vehicleCategory: 'Trailer', quantity: 5, rate: 45, rateType: 'Per Ton', validity: '10 Mar - 10 Aug 2026', penaltyClause: '₹700/day absence', paymentCycle: '15 days', status: 'ACTIVE', createdAt: '2026-02-18' },
    { id: 'WO-007', requirementId: 'REQ-004', vendorId: '8', vendorName: 'Heavy Equip India', clientName: 'ECL', projectName: 'Rajmahal OCP', vehicleCategory: 'Poclain', quantity: 2, rate: 3800, rateType: 'Per Hour', validity: '10 Mar - 10 Aug 2026', penaltyClause: '₹700/day absence', paymentCycle: '15 days', status: 'PENDING', createdAt: '2026-02-18' },
];

export const mockVehicles: Vehicle[] = [
    { id: 'V-001', vehicleNumber: 'JH-01-AB-1234', vendorId: '2', vendorName: 'Sharma Transport', driverName: 'Raju Yadav', driverLicense: 'DL-1234567', fitnessExpiry: '2026-12-31', insuranceExpiry: '2026-11-15', category: 'Hyva', capacity: '20 Ton', assignedProject: 'Pakri Barwadih Mine', assignedRequirementId: 'REQ-001', status: 'ACTIVE' },
    { id: 'V-002', vehicleNumber: 'JH-01-CD-5678', vendorId: '2', vendorName: 'Sharma Transport', driverName: 'Mohan Lal', driverLicense: 'DL-7654321', fitnessExpiry: '2026-08-20', insuranceExpiry: '2026-06-10', category: 'Hyva', capacity: '20 Ton', assignedProject: 'Pakri Barwadih Mine', assignedRequirementId: 'REQ-001', status: 'ACTIVE' },
    { id: 'V-003', vehicleNumber: 'JH-02-EF-9012', vendorId: '6', vendorName: 'Singh Logistics', driverName: 'Vikram Das', driverLicense: 'DL-9876543', fitnessExpiry: '2026-10-15', insuranceExpiry: '2027-01-20', category: 'Hyva', capacity: '20 Ton', assignedProject: 'Pakri Barwadih Mine', assignedRequirementId: 'REQ-001', status: 'BREAKDOWN' },
    { id: 'V-004', vehicleNumber: 'JH-03-GH-3456', vendorId: '6', vendorName: 'Singh Logistics', driverName: 'Arjun Thakur', driverLicense: 'DL-1122334', fitnessExpiry: '2026-05-01', insuranceExpiry: '2026-04-18', category: 'Hyva', capacity: '20 Ton', assignedProject: 'Pakri Barwadih Mine', assignedRequirementId: 'REQ-001', status: 'PENDING' },
    { id: 'V-005', vehicleNumber: 'BR-05-IJ-7890', vendorId: '5', vendorName: 'Gupta Fleet Services', driverName: 'Pappu Kumar', driverLicense: 'DL-5566778', fitnessExpiry: '2027-03-01', insuranceExpiry: '2027-02-15', category: 'Hyva', capacity: '20 Ton', assignedProject: 'Pakri Barwadih Mine', assignedRequirementId: 'REQ-001', status: 'STANDBY' },
    { id: 'V-006', vehicleNumber: 'JH-04-KL-2345', vendorId: '8', vendorName: 'Heavy Equip India', driverName: 'Suresh Pal', driverLicense: 'DL-9988776', fitnessExpiry: '2027-01-15', insuranceExpiry: '2027-03-20', category: 'Excavator', capacity: '210 LC', assignedProject: 'Pakri Barwadih Mine', assignedRequirementId: 'REQ-001', status: 'ACTIVE' },
    { id: 'V-007', vehicleNumber: 'JH-05-MN-6789', vendorId: '2', vendorName: 'Sharma Transport', driverName: 'Ravi Tiwari', driverLicense: 'DL-4455667', fitnessExpiry: '2026-09-30', insuranceExpiry: '2026-10-15', category: 'Water Tanker', capacity: '10000 Ltr', assignedProject: 'Pakri Barwadih Mine', assignedRequirementId: 'REQ-001', status: 'ACTIVE' },
    { id: 'V-008', vehicleNumber: 'JH-06-OP-1122', vendorId: '2', vendorName: 'Sharma Transport', driverName: 'Deepak Yadav', driverLicense: 'DL-7788990', fitnessExpiry: '2026-11-01', insuranceExpiry: '2026-12-20', category: 'Trailer', capacity: '40 Ton', assignedProject: 'Rajmahal OCP', assignedRequirementId: 'REQ-004', status: 'ACTIVE' },
];

export const mockOperations: DailyOperation[] = [
    { id: 'OP-001', vehicleNumber: 'JH-01-AB-1234', vendorName: 'Sharma Transport', projectName: 'Pakri Barwadih Mine', date: '2026-02-20', status: 'PRESENT', trips: 8, extraTrips: 1, remarks: '' },
    { id: 'OP-002', vehicleNumber: 'JH-01-CD-5678', vendorName: 'Sharma Transport', projectName: 'Pakri Barwadih Mine', date: '2026-02-20', status: 'PRESENT', trips: 7, extraTrips: 0, remarks: '' },
    { id: 'OP-003', vehicleNumber: 'JH-02-EF-9012', vendorName: 'Singh Logistics', projectName: 'Pakri Barwadih Mine', date: '2026-02-20', status: 'BREAKDOWN', trips: 0, extraTrips: 0, remarks: 'Engine issue' },
    { id: 'OP-004', vehicleNumber: 'JH-03-GH-3456', vendorName: 'Singh Logistics', projectName: 'Pakri Barwadih Mine', date: '2026-02-20', status: 'ABSENT', trips: 0, extraTrips: 0, remarks: 'Driver not available' },
    { id: 'OP-005', vehicleNumber: 'BR-05-IJ-7890', vendorName: 'Gupta Fleet Services', projectName: 'Pakri Barwadih Mine', date: '2026-02-20', status: 'STANDBY', trips: 0, extraTrips: 0, remarks: 'Waiting for allocation' },
    { id: 'OP-006', vehicleNumber: 'JH-04-KL-2345', vendorName: 'Heavy Equip India', projectName: 'Pakri Barwadih Mine', date: '2026-02-20', status: 'PRESENT', trips: 0, extraTrips: 0, remarks: '8hrs operation' },
    { id: 'OP-007', vehicleNumber: 'JH-06-OP-1122', vendorName: 'Sharma Transport', projectName: 'Rajmahal OCP', date: '2026-02-20', status: 'PRESENT', trips: 4, extraTrips: 0, remarks: '' },
];

export const mockBilling: BillingRecord[] = [
    { id: 'BILL-001', vendorId: '2', vendorName: 'Sharma Transport', projectName: 'Pakri Barwadih Mine', clientName: 'NTPC Ltd', requirementId: 'REQ-001', month: 'January 2026', totalTrips: 480, rate: 1850, grossAmount: 888000, penaltyDeduction: 5000, dieselDeduction: 0, extraShiftBonus: 18500, netAmount: 901500, status: 'PAID' },
    { id: 'BILL-002', vendorId: '6', vendorName: 'Singh Logistics', projectName: 'Pakri Barwadih Mine', clientName: 'NTPC Ltd', requirementId: 'REQ-001', month: 'January 2026', totalTrips: 650, rate: 1900, grossAmount: 1235000, penaltyDeduction: 3000, dieselDeduction: 0, extraShiftBonus: 28500, netAmount: 1260500, status: 'APPROVED' },
    { id: 'BILL-003', vendorId: '5', vendorName: 'Gupta Fleet Services', projectName: 'Pakri Barwadih Mine', clientName: 'NTPC Ltd', requirementId: 'REQ-001', month: 'January 2026', totalTrips: 390, rate: 1820, grossAmount: 709800, penaltyDeduction: 8000, dieselDeduction: 0, extraShiftBonus: 9100, netAmount: 710900, status: 'VERIFIED' },
    { id: 'BILL-004', vendorId: '2', vendorName: 'Sharma Transport', projectName: 'Pakri Barwadih Mine', clientName: 'NTPC Ltd', requirementId: 'REQ-001', month: 'February 2026', totalTrips: 320, rate: 1850, grossAmount: 592000, penaltyDeduction: 2500, dieselDeduction: 0, extraShiftBonus: 11100, netAmount: 600600, status: 'GENERATED' },
    { id: 'BILL-005', vendorId: '8', vendorName: 'Heavy Equip India', projectName: 'Pakri Barwadih Mine', clientName: 'NTPC Ltd', requirementId: 'REQ-001', month: 'January 2026', totalTrips: 0, rate: 3500, grossAmount: 525000, penaltyDeduction: 0, dieselDeduction: 0, extraShiftBonus: 0, netAmount: 525000, status: 'VERIFIED' },
    { id: 'BILL-006', vendorId: '2', vendorName: 'Sharma Transport', projectName: 'Rajmahal OCP', clientName: 'ECL', requirementId: 'REQ-004', month: 'January 2026', totalTrips: 180, rate: 45, grossAmount: 324000, penaltyDeduction: 3500, dieselDeduction: 0, extraShiftBonus: 4500, netAmount: 325000, status: 'GENERATED' },
];

export const dashboardStats = {
    admin: {
        totalRequirements: 5,
        liveRequirements: 3,
        totalVehicles: 52,
        activeVehicles: 44,
        pendingBids: 12,
        monthlyRevenue: 4323500,
    },
    vendor: {
        activeOrders: 4,
        vehiclesDeployed: 18,
        pendingPayments: 925600,
        totalEarnings: 2552500,
        openBids: 3,
    },
    supervisor: {
        vehiclesPresent: 38,
        vehiclesAbsent: 4,
        breakdowns: 3,
        standby: 3,
        pendingApprovals: 2,
    },
};

// Helper: get requirement details for a bid
export const getRequirementForBid = (bid: Bid) => {
    const req = mockRequirements.find(r => r.id === bid.requirementId);
    return req ? { projectName: req.projectName, clientName: req.clientName, siteLocation: req.siteLocation } : null;
};

// Form Select Options
export const DUTY_HOURS_OPTIONS = [
    { label: "12 Hours", value: "12" },
    { label: "24 Hours", value: "24" },
];

export const DIESEL_BY_OPTIONS = [
    { label: "Company", value: "company" },
    { label: "Vendor", value: "vendor" },
];

export const PAYMENT_CYCLE_OPTIONS = [
    { label: "15 Days", value: "15" },
    { label: "30 Days", value: "30" },
    { label: "45 Days", value: "45" },
];

export const RATE_TYPE_OPTIONS = [
    { label: "Per Trip", value: "per_trip" },
    { label: "Per Hour", value: "per_hour" },
    { label: "Per Day", value: "per_day" },
];
