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
  Users,
  FileText,
  Plus,
  Edit,
  Eye,
  EyeOff,
  ArrowLeft,
  Save,
  X
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
import type { ContactSubmission, BlogPost } from '@shared/schema';

type AdminTab = 'contacts' | 'blog';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function BlogEditor({ post, onClose }: { post?: BlogPost; onClose: () => void }) {
  const { toast } = useToast();
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [author, setAuthor] = useState(post?.author || '');
  const [authorTitle, setAuthorTitle] = useState(post?.authorTitle || '');
  const [category, setCategory] = useState(post?.category || 'Insights');
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || '');
  const [published, setPublished] = useState(post?.published ?? false);
  const [autoSlug, setAutoSlug] = useState(!post);

  const createMutation = useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      return apiRequest('POST', '/api/admin/blog', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog'] });
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      toast({ title: 'Blog post created successfully' });
      onClose();
    },
    onError: () => {
      toast({ title: 'Failed to create blog post', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      return apiRequest('PUT', `/api/admin/blog/${post!.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog'] });
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      toast({ title: 'Blog post updated successfully' });
      onClose();
    },
    onError: () => {
      toast({ title: 'Failed to update blog post', variant: 'destructive' });
    },
  });

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (autoSlug) {
      setSlug(generateSlug(val));
    }
  };

  const handleSubmit = () => {
    if (!title || !excerpt || !content || !author || !slug || !category) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    const data = {
      title,
      slug,
      excerpt,
      content,
      author,
      authorTitle: authorTitle || null,
      category,
      imageUrl: imageUrl || null,
      published,
      publishedAt: published ? (post?.publishedAt || new Date().toISOString()) : null,
    };
    if (post) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onClose} className="flex items-center gap-2 text-aryo-deepBlue hover:text-aryo-teal transition-colors text-sm" data-testid="button-back-blog-list">
          <ArrowLeft size={16} />
          Back to Blog Posts
        </button>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setPublished(!published)} data-testid="button-toggle-publish">
            {published ? <><Eye size={16} className="mr-2" /> Published</> : <><EyeOff size={16} className="mr-2" /> Draft</>}
          </Button>
          <Button onClick={handleSubmit} disabled={isPending} data-testid="button-save-blog">
            <Save size={16} className="mr-2" />
            {isPending ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
          </Button>
        </div>
      </div>

      <div className="bg-white border border-aryo-lightGrey p-6 space-y-4">
        <div>
          <label className="block text-sm font-bold text-aryo-deepBlue mb-1">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full border border-aryo-lightGrey px-4 py-2 text-sm focus:outline-none focus:border-aryo-teal"
            placeholder="Blog post title"
            data-testid="input-blog-title"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-aryo-deepBlue mb-1">
            Slug *
            {!post && (
              <button
                type="button"
                onClick={() => setAutoSlug(!autoSlug)}
                className="ml-2 text-xs font-normal text-aryo-teal hover:underline"
              >
                {autoSlug ? '(auto)' : '(manual)'}
              </button>
            )}
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => { setAutoSlug(false); setSlug(e.target.value); }}
            className="w-full border border-aryo-lightGrey px-4 py-2 text-sm focus:outline-none focus:border-aryo-teal"
            placeholder="url-friendly-slug"
            data-testid="input-blog-slug"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-aryo-deepBlue mb-1">Excerpt *</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full border border-aryo-lightGrey px-4 py-2 text-sm focus:outline-none focus:border-aryo-teal resize-y"
            placeholder="Short description for cards and SEO"
            data-testid="input-blog-excerpt"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold text-aryo-deepBlue mb-1">Author *</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border border-aryo-lightGrey px-4 py-2 text-sm focus:outline-none focus:border-aryo-teal"
              placeholder="Author name"
              data-testid="input-blog-author"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-aryo-deepBlue mb-1">Author Title</label>
            <input
              type="text"
              value={authorTitle}
              onChange={(e) => setAuthorTitle(e.target.value)}
              className="w-full border border-aryo-lightGrey px-4 py-2 text-sm focus:outline-none focus:border-aryo-teal"
              placeholder="e.g. Managing Partner"
              data-testid="input-blog-author-title"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-aryo-deepBlue mb-1">Category *</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-aryo-lightGrey px-4 py-2 text-sm focus:outline-none focus:border-aryo-teal"
              placeholder="e.g. M&A Strategy"
              data-testid="input-blog-category"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-aryo-deepBlue mb-1">Featured Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border border-aryo-lightGrey px-4 py-2 text-sm focus:outline-none focus:border-aryo-teal"
            placeholder="https://example.com/image.jpg (optional)"
            data-testid="input-blog-image-url"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-aryo-deepBlue mb-1">Content * (Markdown or HTML)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            className="w-full border border-aryo-lightGrey px-4 py-2 text-sm font-mono focus:outline-none focus:border-aryo-teal resize-y"
            placeholder="Write your blog post content here. Supports markdown (## headings, ### subheadings) and HTML."
            data-testid="input-blog-content"
          />
        </div>
      </div>
    </div>
  );
}

function BlogManagement() {
  const { toast } = useToast();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/admin/blog'],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/admin/blog/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog'] });
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      toast({ title: 'Blog post deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to delete blog post', variant: 'destructive' });
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      return apiRequest('PUT', `/api/admin/blog/${id}`, {
        published,
        publishedAt: published ? new Date().toISOString() : null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog'] });
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      toast({ title: 'Post status updated' });
    },
    onError: () => {
      toast({ title: 'Failed to update post', variant: 'destructive' });
    },
  });

  if (isCreating) {
    return <BlogEditor onClose={() => setIsCreating(false)} />;
  }

  if (editingPost) {
    return <BlogEditor post={editingPost} onClose={() => setEditingPost(null)} />;
  }

  const filteredPosts = posts.filter(post => {
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'published' && post.published) ||
      (statusFilter === 'draft' && !post.published);
    const matchesSearch = searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const publishedCount = posts.filter(p => p.published).length;
  const draftCount = posts.filter(p => !p.published).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-aryo-deepBlue mb-2">Blog Management</h1>
          <p className="text-slate-500">Create and manage blog posts for your website.</p>
        </div>
        <Button onClick={() => setIsCreating(true)} data-testid="button-new-blog-post">
          <Plus size={16} className="mr-2" />
          New Blog Post
        </Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-aryo-lightGrey p-4">
          <div className="flex items-center gap-3">
            <FileText size={20} className="text-aryo-deepBlue" />
            <div>
              <div className="text-2xl font-serif text-aryo-deepBlue">{posts.length}</div>
              <p className="text-xs text-slate-500">Total Posts</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-aryo-lightGrey p-4">
          <div className="flex items-center gap-3">
            <Eye size={20} className="text-aryo-greenTeal" />
            <div>
              <div className="text-2xl font-serif text-aryo-deepBlue">{publishedCount}</div>
              <p className="text-xs text-slate-500">Published</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-aryo-lightGrey p-4">
          <div className="flex items-center gap-3">
            <EyeOff size={20} className="text-amber-500" />
            <div>
              <div className="text-2xl font-serif text-aryo-deepBlue">{draftCount}</div>
              <p className="text-xs text-slate-500">Drafts</p>
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
              placeholder="Search by title, author, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm"
              data-testid="input-blog-search"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]" data-testid="select-blog-status-filter">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All ({posts.length})</SelectItem>
                <SelectItem value="published">Published ({publishedCount})</SelectItem>
                <SelectItem value="draft">Draft ({draftCount})</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Loading blog posts...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            {posts.length === 0
              ? "No blog posts yet. Click 'New Blog Post' to create one."
              : "No posts match your filters."}
          </div>
        ) : (
          <div className="divide-y divide-aryo-lightGrey">
            {filteredPosts.map((post) => (
              <div key={post.id} className="p-4 hover:bg-aryo-offWhite/50 transition-colors" data-testid={`blog-row-${post.id}`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-[300px]">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-bold text-aryo-deepBlue">{post.title}</h3>
                      <Badge variant={post.published ? 'default' : 'outline'}>
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                      <span className="text-xs text-aryo-greenTeal font-bold uppercase tracking-wider">{post.category}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2 line-clamp-2">{post.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.createdAt ? format(new Date(post.createdAt), 'MMM d, yyyy') : 'N/A'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {Math.ceil(post.content.split(' ').length / 200)} min read
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {post.published && (
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/insights/${post.slug}`} data-testid={`button-view-${post.id}`}>
                          <Eye size={16} className="text-slate-400" />
                        </Link>
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => togglePublishMutation.mutate({ id: post.id, published: !post.published })} data-testid={`button-toggle-${post.id}`}>
                      {post.published ? <EyeOff size={16} className="text-slate-400" /> : <Eye size={16} className="text-aryo-greenTeal" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setEditingPost(post)} data-testid={`button-edit-${post.id}`}>
                      <Edit size={16} className="text-slate-400" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this blog post?')) {
                          deleteMutation.mutate(post.id);
                        }
                      }}
                      data-testid={`button-delete-blog-${post.id}`}
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
  );
}

function ContactManagement() {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

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
    <div>
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
  );
}

function AdminDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<AdminTab>('contacts');

  const handleLogout = async () => {
    await logout();
    setLocation('/');
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
          <span className="text-aryo-deepBlue">Admin</span>
        </div>

        <div className="flex gap-1 mb-8 border-b border-aryo-lightGrey">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-6 py-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === 'contacts'
                ? 'border-aryo-deepBlue text-aryo-deepBlue'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
            data-testid="tab-contacts"
          >
            <span className="flex items-center gap-2">
              <Mail size={16} />
              Contacts
            </span>
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-6 py-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === 'blog'
                ? 'border-aryo-deepBlue text-aryo-deepBlue'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
            data-testid="tab-blog"
          >
            <span className="flex items-center gap-2">
              <FileText size={16} />
              Blog Posts
            </span>
          </button>
        </div>

        {activeTab === 'contacts' ? <ContactManagement /> : <BlogManagement />}
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
