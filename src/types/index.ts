// ==================== TENANT ====================
export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  planType: 'lite' | 'professional' | 'enterprise';
  maxEmployees: number;
  isActive: boolean;
  settings?: TenantSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantSettings {
  logo?: string;
  primaryColor?: string;
  language?: string;
  timezone?: string;
}

// ==================== USER & AUTH ====================
export interface User {
  id: string;
  tenantId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'user';
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  employee?: Employee;
}

export interface AuthSession {
  user: User;
  tenant: Tenant;
  accessToken: string;
  expiresAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
  tenantSubdomain?: string;
}

// ==================== ORGANIZATION ====================
export interface Department {
  id: string;
  tenantId: string;
  name: string;
  code?: string;
  parentDepartmentId?: string;
  parentDepartment?: Department;
  childDepartments?: Department[];
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    employees: number;
  };
}

export interface Position {
  id: string;
  tenantId: string;
  name: string;
  code?: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    employees: number;
  };
}

export interface Title {
  id: string;
  tenantId: string;
  name: string;
  code?: string;
  level?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    employees: number;
  };
}

export interface Employee {
  id: string;
  tenantId: string;
  employeeCode?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  departmentId?: string;
  department?: Department;
  positionId?: string;
  position?: Position;
  titleId?: string;
  title?: Title;
  managerId?: string;
  manager?: Employee;
  userId?: string;
  user?: User;
  jobStartDate?: Date;
  birthDate?: Date;
  gender?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ==================== COMPETENCY ====================
export interface CompetencyGroup {
  id: string;
  tenantId: string;
  name: string;
  code?: string;
  description?: string;
  gradingScaleId?: string;
  gradingScale?: GradingScale;
  color?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  competencies?: Competency[];
  _count?: {
    competencies: number;
  };
}

export interface Competency {
  id: string;
  tenantId: string;
  competencyGroupId: string;
  competencyGroup?: CompetencyGroup;
  name: string;
  code?: string;
  description?: string;
  targetValue?: number;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GradingScale {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  minValue: number;
  maxValue: number;
  isDefault: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  levels?: GradingLevel[];
}

export interface GradingLevel {
  id: string;
  gradingScaleId: string;
  value: number;
  label: string;
  description?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ==================== SKILL MATRIX ====================
export interface SkillMatrix {
  id: string;
  tenantId: string;
  name: string;
  departmentId?: string;
  department?: Department;
  evaluationFrequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  competencies?: SkillMatrixCompetency[];
  employees?: SkillMatrixEmployee[];
}

export interface SkillMatrixCompetency {
  id: string;
  skillMatrixId: string;
  competencyId: string;
  competency?: Competency;
  sortOrder: number;
  targetValue?: number;
  createdAt: Date;
}

export interface SkillMatrixEmployee {
  id: string;
  skillMatrixId: string;
  employeeId: string;
  employee?: Employee;
  createdAt: Date;
}

// ==================== EVALUATION ====================
export interface EvaluationPeriod {
  id: string;
  tenantId: string;
  name: string;
  code: string;
  periodType: 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  isClosed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployeeCompetencyValue {
  id: string;
  tenantId: string;
  employeeId: string;
  employee?: Employee;
  competencyId: string;
  competency?: Competency;
  evaluationPeriodId: string;
  evaluationPeriod?: EvaluationPeriod;
  targetValue?: number;
  actualValue?: number;
  notes?: string;
  evaluatedBy?: string;
  evaluatedAt?: Date;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ==================== MATRIX VIEW DATA ====================
export interface MatrixViewData {
  employees: Employee[];
  competencies: Competency[];
  values: Record<string, Record<string, EmployeeCompetencyValue>>; // employeeId -> competencyId -> value
  period: EvaluationPeriod;
}

// ==================== API TYPES ====================
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface FilterParams {
  search?: string;
  isActive?: boolean;
  departmentId?: string;
  positionId?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ==================== FORM TYPES ====================
export interface DepartmentFormData {
  name: string;
  code?: string;
  parentDepartmentId?: string;
  description?: string;
}

export interface PositionFormData {
  name: string;
  code?: string;
  description?: string;
}

export interface TitleFormData {
  name: string;
  code?: string;
  level?: number;
}

export interface EmployeeFormData {
  employeeCode?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  departmentId?: string;
  positionId?: string;
  titleId?: string;
  managerId?: string;
  jobStartDate?: string;
  birthDate?: string;
  gender?: string;
}

export interface CompetencyGroupFormData {
  name: string;
  code?: string;
  description?: string;
  gradingScaleId?: string;
  color?: string;
}

export interface CompetencyFormData {
  competencyGroupId: string;
  name: string;
  code?: string;
  description?: string;
  targetValue?: number;
}

export interface SkillMatrixFormData {
  name: string;
  departmentId?: string;
  evaluationFrequency: string;
  description?: string;
  competencyIds?: string[];
  employeeIds?: string[];
}

export interface EvaluationFormData {
  employeeId: string;
  competencyId: string;
  evaluationPeriodId: string;
  targetValue?: number;
  actualValue?: number;
  notes?: string;
}

// ==================== DASHBOARD STATS ====================
export interface DashboardStats {
  totalEmployees: number;
  totalDepartments: number;
  totalCompetencies: number;
  totalMatrices: number;
  averageCompetencyScore: number;
  pendingEvaluations: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'evaluation' | 'employee' | 'competency' | 'matrix';
  action: 'created' | 'updated' | 'deleted';
  description: string;
  timestamp: Date;
  userId: string;
  userName: string;
}

// ==================== REPORT TYPES ====================
export interface CompetencyReport {
  employee: Employee;
  competencyScores: {
    competency: Competency;
    targetValue: number;
    actualValue: number;
    gap: number;
  }[];
  averageScore: number;
  totalGap: number;
}

export interface DepartmentReport {
  department: Department;
  employeeCount: number;
  averageScore: number;
  competencyBreakdown: {
    competencyGroup: CompetencyGroup;
    averageScore: number;
  }[];
}
