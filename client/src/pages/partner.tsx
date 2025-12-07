import { Link, useLocation } from 'wouter';
import { useAuth, ProtectedRoute } from '@/lib/auth';
import { 
  LayoutDashboard, 
  FileText, 
  TrendingUp, 
  Users, 
  Calendar, 
  Settings,
  LogOut,
  ChevronRight,
  Download,
  Clock
} from 'lucide-react';

function PartnerDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout();
    setLocation('/');
  };

  const engagements = [
    { name: 'Q4 Financial Audit', status: 'In Progress', completion: 65, dueDate: 'Dec 20, 2024' },
    { name: 'M&A Due Diligence', status: 'Review', completion: 90, dueDate: 'Dec 15, 2024' },
    { name: 'Digital Transformation', status: 'Planning', completion: 25, dueDate: 'Jan 30, 2025' },
  ];

  const recentDocuments = [
    { name: 'Strategic Assessment Report', date: 'Dec 5, 2024', type: 'PDF' },
    { name: 'Operational Metrics Dashboard', date: 'Dec 3, 2024', type: 'XLSX' },
    { name: 'Board Presentation Draft', date: 'Dec 1, 2024', type: 'PPTX' },
  ];

  return (
    <div className="min-h-screen bg-aryo-offWhite">
      <nav className="bg-aryo-deepBlue px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3" data-testid="link-home-logo">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
                <path d="M10 80 L40 10 L70 80" stroke="white" strokeWidth="8" strokeLinecap="square"/>
                <path d="M25 55 L55 55" stroke="white" strokeWidth="8"/>
                <rect x="75" y="50" width="6" height="30" fill="#ADD6DE" />
                <rect x="83" y="35" width="6" height="45" fill="#47B5CB" />
                <rect x="91" y="20" width="6" height="60" fill="#4EB9A7" />
              </svg>
              <span className="font-sans font-extrabold text-xl tracking-wide text-white">ARYO</span>
            </Link>
            <span className="text-aryo-lightBlue/50 text-sm font-bold uppercase tracking-widest">Partner Portal</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-white text-sm">{user?.fullName}</span>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-aryo-lightBlue hover:text-white transition-colors text-sm"
              data-testid="button-logout"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
          <Link href="/" className="hover:text-aryo-deepBlue transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-aryo-deepBlue">Partner Dashboard</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-serif text-aryo-deepBlue mb-2">Welcome back, {user?.fullName?.split(' ')[0]}</h1>
          <p className="text-slate-500">Here's an overview of your active engagements and resources.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-aryo-lightGrey p-6">
            <div className="flex items-center justify-between mb-4">
              <LayoutDashboard size={24} className="text-aryo-deepBlue" />
              <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">Active</span>
            </div>
            <div className="text-3xl font-serif text-aryo-deepBlue mb-1">3</div>
            <p className="text-sm text-slate-500">Active Engagements</p>
          </div>
          <div className="bg-white border border-aryo-lightGrey p-6">
            <div className="flex items-center justify-between mb-4">
              <FileText size={24} className="text-aryo-deepBlue" />
              <span className="text-xs font-bold text-aryo-teal uppercase tracking-widest">New</span>
            </div>
            <div className="text-3xl font-serif text-aryo-deepBlue mb-1">12</div>
            <p className="text-sm text-slate-500">Documents Available</p>
          </div>
          <div className="bg-white border border-aryo-lightGrey p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp size={24} className="text-aryo-deepBlue" />
            </div>
            <div className="text-3xl font-serif text-aryo-deepBlue mb-1">$2.4M</div>
            <p className="text-sm text-slate-500">Value Identified</p>
          </div>
          <div className="bg-white border border-aryo-lightGrey p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar size={24} className="text-aryo-deepBlue" />
            </div>
            <div className="text-3xl font-serif text-aryo-deepBlue mb-1">5</div>
            <p className="text-sm text-slate-500">Upcoming Meetings</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white border border-aryo-lightGrey p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif text-aryo-deepBlue">Active Engagements</h2>
              <button className="text-xs font-bold text-aryo-deepBlue uppercase tracking-widest hover:text-aryo-teal transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {engagements.map((engagement, i) => (
                <div key={i} className="border border-aryo-lightGrey p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-aryo-deepBlue">{engagement.name}</h3>
                    <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 ${
                      engagement.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                      engagement.status === 'Review' ? 'bg-amber-50 text-amber-600' :
                      'bg-slate-50 text-slate-600'
                    }`}>
                      {engagement.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      Due: {engagement.dueDate}
                    </span>
                  </div>
                  <div className="h-2 bg-aryo-lightGrey rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-aryo-greenTeal transition-all"
                      style={{ width: `${engagement.completion}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">{engagement.completion}% complete</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-aryo-lightGrey p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif text-aryo-deepBlue">Recent Documents</h2>
              <button className="text-xs font-bold text-aryo-deepBlue uppercase tracking-widest hover:text-aryo-teal transition-colors">
                View Library
              </button>
            </div>
            <div className="space-y-4">
              {recentDocuments.map((doc, i) => (
                <div key={i} className="flex items-center justify-between border border-aryo-lightGrey p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-aryo-offWhite flex items-center justify-center">
                      <FileText size={20} className="text-aryo-deepBlue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-aryo-deepBlue text-sm">{doc.name}</h3>
                      <p className="text-xs text-slate-500">{doc.date} - {doc.type}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-aryo-offWhite transition-colors">
                    <Download size={16} className="text-aryo-deepBlue" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <button className="bg-white border border-aryo-lightGrey p-6 text-left hover:border-aryo-deepBlue transition-colors group">
            <Users size={24} className="text-aryo-deepBlue mb-4" />
            <h3 className="font-bold text-aryo-deepBlue mb-2">Team Directory</h3>
            <p className="text-sm text-slate-500 mb-4">View your dedicated ARYO team and contact information.</p>
            <span className="text-xs font-bold text-aryo-deepBlue uppercase tracking-widest group-hover:text-aryo-teal transition-colors flex items-center gap-2">
              View Team <ChevronRight size={14} />
            </span>
          </button>
          <button className="bg-white border border-aryo-lightGrey p-6 text-left hover:border-aryo-deepBlue transition-colors group">
            <Calendar size={24} className="text-aryo-deepBlue mb-4" />
            <h3 className="font-bold text-aryo-deepBlue mb-2">Schedule Meeting</h3>
            <p className="text-sm text-slate-500 mb-4">Book time with your engagement lead or team members.</p>
            <span className="text-xs font-bold text-aryo-deepBlue uppercase tracking-widest group-hover:text-aryo-teal transition-colors flex items-center gap-2">
              Schedule <ChevronRight size={14} />
            </span>
          </button>
          <button className="bg-white border border-aryo-lightGrey p-6 text-left hover:border-aryo-deepBlue transition-colors group">
            <Settings size={24} className="text-aryo-deepBlue mb-4" />
            <h3 className="font-bold text-aryo-deepBlue mb-2">Account Settings</h3>
            <p className="text-sm text-slate-500 mb-4">Manage your profile, notifications, and preferences.</p>
            <span className="text-xs font-bold text-aryo-deepBlue uppercase tracking-widest group-hover:text-aryo-teal transition-colors flex items-center gap-2">
              Settings <ChevronRight size={14} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Partner() {
  return (
    <ProtectedRoute>
      <PartnerDashboard />
    </ProtectedRoute>
  );
}
