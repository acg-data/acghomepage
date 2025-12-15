import { Link, useLocation } from 'wouter';
import { useAuth, PartnerRoute } from '@/lib/auth';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useState } from 'react';
import { format } from 'date-fns';
import { 
  LogOut,
  ChevronRight,
  Mail,
  Building,
  Calendar,
  Search,
  Filter,
  Trash2,
  Check,
  Clock,
  MessageSquare,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { ContactSubmission } from '@shared/schema';

function AdminDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleLogout = async () => {
    await logout();
    setLocation('/');
  };

  const { data: contacts = [], isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ['/api/admin/contacts'],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest('PATCH', `/api/admin/contacts/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contacts'] });
      toast({ title: 'Status updated successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to update status', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/admin/contacts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contacts'] });
      toast({ title: 'Contact deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to delete contact', variant: 'destructive' });
    },
  });

  const filteredContacts = contacts.filter(contact => {
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = {
    all: contacts.length,
    pending: contacts.filter(c => c.status === 'pending').length,
    contacted: contacts.filter(c => c.status === 'contacted').length,
    closed: contacts.filter(c => c.status === 'closed').length,
  };

  const getStatusBadgeVariant = (status: string | null) => {
    switch (status) {
      case 'contacted': return 'default';
      case 'closed': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-aryo-offWhite">
      <nav className="bg-aryo-deepBlue px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-8 flex-wrap">
            <Link href="/" className="flex items-center" data-testid="link-home-logo">
              <img src="/api/aryo-logo" alt="Aryo Consulting Group" width={64} height={64} className="object-contain" />
            </Link>
            <span className="text-aryo-lightBlue/50 text-sm font-bold uppercase tracking-widest">Admin Panel</span>
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <Link href="/partner" className="text-aryo-lightBlue hover:text-white transition-colors text-sm" data-testid="link-partner-dashboard">
              Partner Dashboard
            </Link>
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
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-6 flex-wrap">
          <Link href="/" className="hover:text-aryo-deepBlue transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/partner" className="hover:text-aryo-deepBlue transition-colors">Partner</Link>
          <ChevronRight size={14} />
          <span className="text-aryo-deepBlue">Contact Management</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-serif text-aryo-deepBlue mb-2">Contact Submissions</h1>
          <p className="text-slate-500">View and manage all contact form submissions from your website.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-aryo-lightGrey p-4">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-aryo-deepBlue" />
              <div>
                <div className="text-2xl font-serif text-aryo-deepBlue">{statusCounts.all}</div>
                <p className="text-xs text-slate-500">Total Contacts</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-aryo-lightGrey p-4">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-amber-500" />
              <div>
                <div className="text-2xl font-serif text-aryo-deepBlue">{statusCounts.pending}</div>
                <p className="text-xs text-slate-500">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-aryo-lightGrey p-4">
            <div className="flex items-center gap-3">
              <MessageSquare size={20} className="text-aryo-teal" />
              <div>
                <div className="text-2xl font-serif text-aryo-deepBlue">{statusCounts.contacted}</div>
                <p className="text-xs text-slate-500">Contacted</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-aryo-lightGrey p-4">
            <div className="flex items-center gap-3">
              <Check size={20} className="text-aryo-greenTeal" />
              <div>
                <div className="text-2xl font-serif text-aryo-deepBlue">{statusCounts.closed}</div>
                <p className="text-xs text-slate-500">Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-aryo-lightGrey mb-6">
          <div className="p-4 border-b border-aryo-lightGrey flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-sm"
                data-testid="input-search"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-slate-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]" data-testid="select-status-filter">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ({statusCounts.all})</SelectItem>
                  <SelectItem value="pending">Pending ({statusCounts.pending})</SelectItem>
                  <SelectItem value="contacted">Contacted ({statusCounts.contacted})</SelectItem>
                  <SelectItem value="closed">Closed ({statusCounts.closed})</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-slate-500">Loading contacts...</div>
          ) : filteredContacts.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              {contacts.length === 0 
                ? "No contact submissions yet. They will appear here when people fill out your contact form."
                : "No contacts match your filters."}
            </div>
          ) : (
            <div className="divide-y divide-aryo-lightGrey">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="p-4 hover:bg-aryo-offWhite/50 transition-colors" data-testid={`contact-row-${contact.id}`}>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-[300px]">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-bold text-aryo-deepBlue">
                          {contact.firstName} {contact.lastName}
                        </h3>
                        <Badge variant={getStatusBadgeVariant(contact.status)}>
                          {contact.status || 'pending'}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Mail size={14} />
                          <a href={`mailto:${contact.email}`} className="hover:text-aryo-deepBlue transition-colors">
                            {contact.email}
                          </a>
                        </span>
                        <span className="flex items-center gap-1">
                          <Building size={14} />
                          {contact.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {contact.createdAt ? format(new Date(contact.createdAt), 'MMM d, yyyy h:mm a') : 'N/A'}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 bg-aryo-offWhite p-3 rounded">
                        {contact.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select 
                        value={contact.status || 'pending'} 
                        onValueChange={(status) => updateStatusMutation.mutate({ id: contact.id, status })}
                      >
                        <SelectTrigger className="w-[130px]" data-testid={`select-status-${contact.id}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this contact?')) {
                            deleteMutation.mutate(contact.id);
                          }
                        }}
                        data-testid={`button-delete-${contact.id}`}
                      >
                        <Trash2 size={16} className="text-slate-400 hover:text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  return (
    <PartnerRoute>
      <AdminDashboard />
    </PartnerRoute>
  );
}
