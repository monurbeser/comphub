import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Building2, Briefcase, Award, 
  Grid3X3, FileBarChart, Settings, LogOut, Menu, X,
  Plus, Edit, Trash2, Search, ChevronDown,
  TrendingUp, Calendar, Target, CheckCircle2,
  Download, Filter, Eye, Save
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

// ==================== MOCK DATA ====================
const mockDepartments = [
  { id: '1', name: 'Engineering', code: 'ENG', employeeCount: 45, isActive: true },
  { id: '2', name: 'Product', code: 'PRD', employeeCount: 12, isActive: true },
  { id: '3', name: 'Design', code: 'DSN', employeeCount: 8, isActive: true },
  { id: '4', name: 'Marketing', code: 'MKT', employeeCount: 15, isActive: true },
];

const mockPositions = [
  { id: '1', name: 'Software Engineer', code: 'SE', employeeCount: 25 },
  { id: '2', name: 'Senior Software Engineer', code: 'SSE', employeeCount: 15 },
  { id: '3', name: 'Engineering Manager', code: 'EM', employeeCount: 5 },
  { id: '4', name: 'Product Manager', code: 'PM', employeeCount: 8 },
];

const mockTitles = [
  { id: '1', name: 'Junior', level: 1 },
  { id: '2', name: 'Mid-Level', level: 2 },
  { id: '3', name: 'Senior', level: 3 },
  { id: '4', name: 'Lead', level: 4 },
];

const mockEmployees = [
  { id: '1', firstName: 'John', lastName: 'Smith', email: 'john@company.com', department: 'Engineering', position: 'Senior Software Engineer', title: 'Senior', isActive: true },
  { id: '2', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@company.com', department: 'Engineering', position: 'Software Engineer', title: 'Mid-Level', isActive: true },
  { id: '3', firstName: 'Michael', lastName: 'Brown', email: 'michael@company.com', department: 'Product', position: 'Product Manager', title: 'Senior', isActive: true },
  { id: '4', firstName: 'Emily', lastName: 'Davis', email: 'emily@company.com', department: 'Design', position: 'UX Designer', title: 'Lead', isActive: true },
];

const mockCompetencyGroups = [
  { id: '1', name: 'Technical Skills', code: 'TECH', color: '#3b82f6', competencyCount: 8 },
  { id: '2', name: 'Soft Skills', code: 'SOFT', color: '#8b5cf6', competencyCount: 6 },
  { id: '3', name: 'Leadership', code: 'LEAD', color: '#10b981', competencyCount: 5 },
];

const mockCompetencies = [
  { id: '1', name: 'JavaScript/TypeScript', groupId: '1', groupName: 'Technical Skills', targetValue: 4 },
  { id: '2', name: 'React/Next.js', groupId: '1', groupName: 'Technical Skills', targetValue: 4 },
  { id: '3', name: 'Node.js/Backend', groupId: '1', groupName: 'Technical Skills', targetValue: 3 },
  { id: '4', name: 'Communication', groupId: '2', groupName: 'Soft Skills', targetValue: 4 },
  { id: '5', name: 'Problem Solving', groupId: '2', groupName: 'Soft Skills', targetValue: 4 },
  { id: '6', name: 'Team Management', groupId: '3', groupName: 'Leadership', targetValue: 3 },
];

const mockMatrixData = {
  employees: ['John S.', 'Sarah J.', 'Michael B.', 'Emily D.'],
  competencies: ['JavaScript', 'React', 'Node.js', 'Communication', 'Problem Solving'],
  values: [
    [5, 5, 4, 4, 5],
    [4, 4, 3, 4, 4],
    [3, 3, 2, 5, 5],
    [2, 3, 2, 5, 4],
  ]
};

const mockPeriods = [
  { id: '1', name: 'Q4 2024', code: '2024-Q4', isActive: true, isClosed: false },
  { id: '2', name: 'Q3 2024', code: '2024-Q3', isActive: false, isClosed: true },
];

// ==================== COMPONENTS ====================
const Sidebar = ({ activeMenu, setActiveMenu, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'positions', label: 'Positions', icon: Briefcase },
    { id: 'competencies', label: 'Competencies', icon: Award },
    { id: 'matrix', label: 'Skill Matrix', icon: Grid3X3 },
    { id: 'evaluation', label: 'Evaluation', icon: Target },
    { id: 'reports', label: 'Reports', icon: FileBarChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />}
      <aside className={`fixed top-0 left-0 z-50 h-full w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-20 flex items-center px-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">CompetencyHub</h1>
              <p className="text-xs text-slate-400">Skills Management</p>
            </div>
          </div>
          <button className="ml-auto lg:hidden p-2 hover:bg-slate-700/50 rounded-lg" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveMenu(item.id); setIsOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeMenu === item.id ? 'bg-gradient-to-r from-blue-600/30 to-transparent text-white border-l-2 border-blue-500' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50">
          <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-semibold">AC</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Acme Corp</p>
                <p className="text-xs text-slate-400">Lite Plan</p>
              </div>
              <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                <LogOut className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const Header = ({ title, setIsSidebarOpen }) => (
  <header className="h-20 flex items-center justify-between px-6 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-30">
    <div className="flex items-center gap-4">
      <button className="lg:hidden p-2 hover:bg-slate-700/50 rounded-lg" onClick={() => setIsSidebarOpen(true)}>
        <Menu className="w-6 h-6 text-slate-300" />
      </button>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800/60 rounded-xl border border-slate-700">
        <Search className="w-4 h-4 text-slate-400" />
        <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-400 w-48" />
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 rounded-xl border border-slate-700 cursor-pointer">
        <Calendar className="w-4 h-4 text-blue-400" />
        <span className="text-sm text-white">Q4 2024</span>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </div>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
        <span className="text-white font-semibold text-sm">JD</span>
      </div>
    </div>
  </header>
);

const StatCard = ({ title, value, change, trend, icon: Icon, color = 'blue' }) => {
  const colors = { blue: 'from-blue-500 to-blue-600', emerald: 'from-emerald-500 to-emerald-600', amber: 'from-amber-500 to-amber-600', purple: 'from-purple-500 to-purple-600' };
  return (
    <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {change && <div className={`flex items-center gap-1 mt-2 text-sm ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}><TrendingUp className="w-4 h-4" /><span>{change}</span></div>}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

const DataTable = ({ columns, data, onEdit, onDelete }) => (
  <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-800/40">
            {columns.map((col, i) => <th key={i} className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">{col.header}</th>)}
            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t border-slate-700/50 hover:bg-slate-700/30">
              {columns.map((col, j) => <td key={j} className="px-6 py-4 text-sm text-slate-200">{col.render ? col.render(row) : row[col.key]}</td>)}
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button onClick={() => onEdit?.(row)} className="p-2 hover:bg-slate-600/50 rounded-lg"><Edit className="w-4 h-4 text-slate-400 hover:text-blue-400" /></button>
                  <button onClick={() => onDelete?.(row)} className="p-2 hover:bg-slate-600/50 rounded-lg"><Trash2 className="w-4 h-4 text-slate-400 hover:text-red-400" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-700/50 rounded-lg"><X className="w-5 h-5 text-slate-400" /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const MatrixCell = ({ value, onClick }) => {
  const colors = { 0: 'bg-slate-700/50 text-slate-400', 1: 'bg-red-500/20 text-red-300', 2: 'bg-orange-500/20 text-orange-300', 3: 'bg-yellow-500/20 text-yellow-300', 4: 'bg-lime-500/20 text-lime-300', 5: 'bg-emerald-500/20 text-emerald-300' };
  return <button onClick={onClick} className={`w-12 h-12 flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer hover:ring-2 hover:ring-blue-500/50 hover:scale-110 ${colors[value || 0]}`}>{value || '-'}</button>;
};

// ==================== PAGES ====================
const DashboardPage = () => {
  const chartData = [{ name: 'Technical', avg: 4.2 }, { name: 'Soft Skills', avg: 4.5 }, { name: 'Leadership', avg: 3.8 }];
  const pieData = [{ name: 'Expert', value: 25, color: '#10b981' }, { name: 'Advanced', value: 35, color: '#3b82f6' }, { name: 'Competent', value: 25, color: '#f59e0b' }, { name: 'Developing', value: 15, color: '#ef4444' }];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Employees" value="102" change="+12%" trend="up" icon={Users} color="blue" />
        <StatCard title="Competencies" value="23" change="+3" trend="up" icon={Award} color="emerald" />
        <StatCard title="Avg. Score" value="4.1" change="+0.3" trend="up" icon={Target} color="amber" />
        <StatCard title="Pending" value="18" icon={CheckCircle2} color="purple" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Competency Scores</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="#334155" /><XAxis dataKey="name" stroke="#94a3b8" fontSize={12} /><YAxis stroke="#94a3b8" fontSize={12} domain={[0, 5]} /><Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} /><Bar dataKey="avg" fill="#3b82f6" radius={[4, 4, 0, 0]} /></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">{pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}</Pie><Legend formatter={(value) => <span className="text-slate-300">{value}</span>} /></PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const EmployeesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const columns = [
    { key: 'name', header: 'Employee', render: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center"><span className="text-white text-sm font-medium">{row.firstName[0]}{row.lastName[0]}</span></div>
        <div><p className="font-medium text-white">{row.firstName} {row.lastName}</p><p className="text-xs text-slate-400">{row.email}</p></div>
      </div>
    )},
    { key: 'department', header: 'Department' },
    { key: 'position', header: 'Position' },
    { key: 'isActive', header: 'Status', render: (row) => <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${row.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>{row.isActive ? 'Active' : 'Inactive'}</span> },
  ];
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-slate-400">Manage your workforce</p>
        <button onClick={() => setShowModal(true)} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/25 flex items-center gap-2"><Plus className="w-5 h-5" />Add Employee</button>
      </div>
      <DataTable columns={columns} data={mockEmployees} onEdit={() => {}} onDelete={() => {}} />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Employee">
        <div className="space-y-4">
          <input type="text" placeholder="First Name" className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600 rounded-xl text-white placeholder-slate-400 outline-none focus:border-blue-500" />
          <input type="text" placeholder="Last Name" className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600 rounded-xl text-white placeholder-slate-400 outline-none focus:border-blue-500" />
          <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600 rounded-xl text-white placeholder-slate-400 outline-none focus:border-blue-500" />
          <div className="flex justify-end gap-3 pt-4"><button onClick={() => setShowModal(false)} className="px-6 py-3 bg-slate-700/80 text-slate-100 font-semibold rounded-xl border border-slate-600">Cancel</button><button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl flex items-center gap-2"><Save className="w-4 h-4" />Save</button></div>
        </div>
      </Modal>
    </div>
  );
};

const DepartmentsPage = () => {
  const columns = [
    { key: 'code', header: 'Code', render: (row) => <span className="font-mono text-blue-400">{row.code}</span> },
    { key: 'name', header: 'Name', render: (row) => <span className="font-medium text-white">{row.name}</span> },
    { key: 'employeeCount', header: 'Employees', render: (row) => <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">{row.employeeCount}</span> },
  ];
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-slate-400">Organization structure</p>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl flex items-center gap-2"><Plus className="w-5 h-5" />Add Department</button>
      </div>
      <DataTable columns={columns} data={mockDepartments} onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
};

const PositionsPage = () => {
  const columns = [
    { key: 'code', header: 'Code', render: (row) => <span className="font-mono text-blue-400">{row.code}</span> },
    { key: 'name', header: 'Name', render: (row) => <span className="font-medium text-white">{row.name}</span> },
    { key: 'employeeCount', header: 'Employees', render: (row) => <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">{row.employeeCount}</span> },
  ];
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-slate-400">Job positions</p>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl flex items-center gap-2"><Plus className="w-5 h-5" />Add Position</button>
      </div>
      <DataTable columns={columns} data={mockPositions} onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
};

const CompetenciesPage = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <p className="text-slate-400">Define competencies</p>
      <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl flex items-center gap-2"><Plus className="w-5 h-5" />Add Competency</button>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {mockCompetencyGroups.map((group) => (
        <div key={group.id} className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl">
          <div className="p-4 border-b border-slate-700 flex items-center gap-3">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: group.color }} />
            <h3 className="font-semibold text-white">{group.name}</h3>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-600/50 text-slate-300">{group.competencyCount}</span>
          </div>
          <div className="p-4 space-y-2">
            {mockCompetencies.filter(c => c.groupId === group.id).map((comp) => (
              <div key={comp.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/30">
                <span className="text-slate-200">{comp.name}</span>
                <span className="text-xs text-slate-400">Target: {comp.targetValue}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SkillMatrixPage = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <p className="text-slate-400">Employee skill visualization</p>
      <div className="flex gap-3">
        <button className="px-6 py-3 bg-slate-700/80 text-slate-100 font-semibold rounded-xl border border-slate-600 flex items-center gap-2"><Download className="w-4 h-4" />Export</button>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl flex items-center gap-2"><Plus className="w-5 h-5" />New Matrix</button>
      </div>
    </div>
    <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 flex flex-wrap items-center gap-6">
      <span className="text-sm text-slate-400">Legend:</span>
      {[{ v: 1, l: 'Beginner' }, { v: 2, l: 'Developing' }, { v: 3, l: 'Competent' }, { v: 4, l: 'Advanced' }, { v: 5, l: 'Expert' }].map((level) => (
        <div key={level.v} className="flex items-center gap-2"><MatrixCell value={level.v} /><span className="text-sm text-slate-300">{level.l}</span></div>
      ))}
    </div>
    <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-800/40">
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Employee</th>
            {mockMatrixData.competencies.map((c, i) => <th key={i} className="px-3 py-4 text-center text-xs font-medium text-slate-400">{c}</th>)}
            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Avg</th>
          </tr>
        </thead>
        <tbody>
          {mockMatrixData.employees.map((emp, ei) => {
            const avg = (mockMatrixData.values[ei].reduce((a, b) => a + b, 0) / mockMatrixData.values[ei].length).toFixed(1);
            return (
              <tr key={ei} className="border-t border-slate-700/50 hover:bg-slate-700/20">
                <td className="px-6 py-4 font-medium text-white">{emp}</td>
                {mockMatrixData.values[ei].map((v, ci) => <td key={ci} className="px-3 py-2 text-center"><MatrixCell value={v} /></td>)}
                <td className="px-6 py-4 text-center"><span className={`font-bold ${parseFloat(avg) >= 4 ? 'text-emerald-400' : parseFloat(avg) >= 3 ? 'text-yellow-400' : 'text-red-400'}`}>{avg}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

const EvaluationPage = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <p className="text-slate-400">Evaluation management</p>
      <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl flex items-center gap-2"><Plus className="w-5 h-5" />New Period</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {mockPeriods.map((p) => (
        <div key={p.id} className={`bg-slate-800/60 backdrop-blur-xl border rounded-2xl p-6 ${p.isActive ? 'border-blue-500/50' : 'border-slate-700/50'}`}>
          <div className="flex items-start justify-between">
            <div><h3 className="font-semibold text-white">{p.name}</h3><p className="text-sm text-slate-400 font-mono">{p.code}</p></div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-600/50 text-slate-300'}`}>{p.isActive ? 'Active' : 'Closed'}</span>
          </div>
          {p.isActive && <button className="mt-4 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm">Enter Data</button>}
        </div>
      ))}
    </div>
  </div>
);

const ReportsPage = () => (
  <div className="space-y-6">
    <p className="text-slate-400">Generate reports</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[{ title: 'Gap Analysis', icon: Target }, { title: 'Progress Report', icon: TrendingUp }, { title: 'Department Overview', icon: Building2 }, { title: 'Matrix Export', icon: Grid3X3 }].map((r, i) => (
        <div key={i} className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/30 cursor-pointer group">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center"><r.icon className="w-6 h-6 text-blue-400" /></div>
            <div><h3 className="font-semibold text-white group-hover:text-blue-400">{r.title}</h3></div>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg text-sm flex items-center gap-1"><Eye className="w-4 h-4" />View</button>
            <button className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg text-sm flex items-center gap-1"><Download className="w-4 h-4" />Export</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SettingsPage = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Organization Settings</h3>
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-slate-300 mb-2">Organization Name</label><input type="text" defaultValue="Acme Corporation" className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600 rounded-xl text-white outline-none focus:border-blue-500" /></div>
          <div><label className="block text-sm font-medium text-slate-300 mb-2">Subdomain</label><input type="text" defaultValue="acme" className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600 rounded-xl text-white outline-none focus:border-blue-500" /></div>
        </div>
        <div className="mt-6 pt-6 border-t border-slate-700 flex justify-end"><button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl">Save Changes</button></div>
      </div>
      <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Current Plan</h3>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-500/20 border border-blue-500/30">
          <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Lite</p>
          <p className="text-slate-400 mt-2">$29/month</p>
        </div>
        <button className="w-full mt-4 px-6 py-3 bg-slate-700/80 text-slate-100 font-semibold rounded-xl border border-slate-600">Upgrade Plan</button>
      </div>
    </div>
  </div>
);

// ==================== MAIN APP ====================
export default function CompetencyHubApp() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const titles = { dashboard: 'Dashboard', employees: 'Employees', departments: 'Departments', positions: 'Positions', competencies: 'Competencies', matrix: 'Skill Matrix', evaluation: 'Evaluation', reports: 'Reports', settings: 'Settings' };
  const pages = { dashboard: <DashboardPage />, employees: <EmployeesPage />, departments: <DepartmentsPage />, positions: <PositionsPage />, competencies: <CompetenciesPage />, matrix: <SkillMatrixPage />, evaluation: <EvaluationPage />, reports: <ReportsPage />, settings: <SettingsPage /> };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="lg:pl-72">
        <Header title={titles[activeMenu]} setIsSidebarOpen={setIsSidebarOpen} />
        <main className="p-6">{pages[activeMenu]}</main>
      </div>
    </div>
  );
}
