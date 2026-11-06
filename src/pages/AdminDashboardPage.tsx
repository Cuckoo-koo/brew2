import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchSiteSettings,
  updateSiteSettings,
  fetchMediaAssets,
  addMediaAsset,
  deleteMediaAsset,
  fetchInquiries,
  SiteSettings,
  MediaAsset,
  CustomerInquiry,
  SUPABASE_SQL_SCHEMA,
} from '../lib/cmsDataService';
import { isSupabaseConfigured } from '../lib/supabaseClient';
import { MenuItem } from '../data/cafeData';
import {
  LayoutDashboard,
  Coffee,
  Image as ImageIcon,
  FileText,
  Settings as SettingsIcon,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Upload,
  Eye,
  ExternalLink,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Copy,
  User,
  Sparkles,
  RefreshCw,
  Menu as MenuIcon,
  Database,
  Lock,
} from 'lucide-react';

interface AdminDashboardPageProps {
  onReturnToSite: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onReturnToSite }) => {
  const { user, logout, updatePassword } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'content' | 'media' | 'settings'>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // CMS State
  const [products, setProducts] = useState<(MenuItem & { is_available: boolean })[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Product Modal State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<MenuItem & { is_available: boolean }> | null>(null);

  // Content Form State
  const [contentForm, setContentForm] = useState<Partial<SiteSettings>>({});

  // Password Update State
  const [newPassword, setNewPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null);

  // SQL Script Viewer Modal
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Search & Filter State
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');

  useEffect(() => {
    loadCmsData();
  }, []);

  const loadCmsData = async () => {
    setLoading(true);
    const [prods, settings, media, inqs] = await Promise.all([
      fetchProducts(),
      fetchSiteSettings(),
      fetchMediaAssets(),
      fetchInquiries(),
    ]);
    setProducts(prods);
    setSiteSettings(settings);
    setContentForm(settings);
    setMediaAssets(media);
    setInquiries(inqs);
    setLoading(false);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- Product Handlers ---
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || editingProduct.price === undefined) return;

    if (editingProduct.id) {
      await updateProduct(editingProduct.id, editingProduct);
      triggerToast(`Product "${editingProduct.name}" updated successfully.`);
    } else {
      await createProduct(editingProduct);
      triggerToast(`Product "${editingProduct.name}" created successfully.`);
    }
    setProductModalOpen(false);
    setEditingProduct(null);
    setHasUnpublishedChanges(true);
    loadCmsData();
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      await deleteProduct(id);
      triggerToast(`Product "${name}" removed.`);
      setHasUnpublishedChanges(true);
      loadCmsData();
    }
  };

  const handleToggleAvailability = async (product: MenuItem & { is_available: boolean }) => {
    const nextState = !product.is_available;
    await updateProduct(product.id, { is_available: nextState });
    triggerToast(`"${product.name}" marked as ${nextState ? 'Available' : 'Unavailable'}.`);
    setHasUnpublishedChanges(true);
    loadCmsData();
  };

  // --- Content Handlers ---
  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteSettings(contentForm);
    triggerToast('Website content draft saved.');
    setHasUnpublishedChanges(true);
    loadCmsData();
  };

  // --- Media Handlers ---
  const handleUploadMedia = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const url = event.target?.result as string;
      await addMediaAsset(file.name, url, `${Math.round(file.size / 1024)} KB`, file.type);
      triggerToast(`Image "${file.name}" uploaded to Media Library.`);
      setHasUnpublishedChanges(true);
      loadCmsData();
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteMedia = async (id: string, name: string) => {
    if (window.confirm(`Delete image "${name}" from Media Library?`)) {
      await deleteMediaAsset(id);
      triggerToast(`Media asset "${name}" deleted.`);
      loadCmsData();
    }
  };

  // --- Publish Changes ---
  const handlePublishAll = () => {
    setHasUnpublishedChanges(false);
    triggerToast('🎉 All CMS changes published live to storefront!');
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = productCategoryFilter === 'all' || p.category === productCategoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#1E1E1E] flex flex-col font-body">
      {/* Top Banner Status Bar */}
      <header className="bg-[#1E1E1E] text-white px-4 sm:px-8 py-3 flex items-center justify-between border-b border-white/10 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20"
            aria-label="Toggle Navigation Sidebar"
          >
            <MenuIcon className="w-5 h-5" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-heading font-bold text-sm sm:text-base text-white tracking-tight">
              The Daily Brew CMS
            </span>
          </div>
          <span className="text-[11px] bg-white/10 text-[#D9B382] px-2 py-0.5 rounded-md hidden sm:inline-block">
            {isSupabaseConfigured ? 'Supabase Cloud Connected' : 'Local Sandbox Store'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {hasUnpublishedChanges && (
            <button
              onClick={handlePublishAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D9B382] hover:bg-[#c49c6b] text-[#1E1E1E] font-bold text-xs transition-all shadow-sm active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Publish Changes</span>
            </button>
          )}

          <button
            onClick={onReturnToSite}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-gray-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">View Live Site</span>
          </button>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-medium transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-20 w-64 bg-white border-r border-[#D9B382]/30 flex flex-col justify-between transform transition-transform duration-200 ease-in-out ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-4 space-y-6 overflow-y-auto">
            {/* Owner Info Snippet */}
            <div className="p-3.5 rounded-2xl bg-[#FFF8F0] border border-[#D9B382]/40 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#6F4E37] text-[#FFF8F0] flex items-center justify-center font-bold font-mono text-sm shrink-0">
                DB
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-[#1E1E1E] truncate">{user?.name || 'Café Owner'}</p>
                <p className="text-[11px] text-[#6F4E37] truncate">{user?.email}</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="space-y-1">
              <button
                onClick={() => {
                  setActiveTab('overview');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'overview'
                    ? 'bg-[#6F4E37] text-white shadow-sm'
                    : 'text-gray-700 hover:bg-[#FFF8F0] hover:text-[#6F4E37]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
                <span>Dashboard Overview</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('products');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'products'
                    ? 'bg-[#6F4E37] text-white shadow-sm'
                    : 'text-gray-700 hover:bg-[#FFF8F0] hover:text-[#6F4E37]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Coffee className="w-4 h-4" aria-hidden="true" />
                  <span>Product Catalog</span>
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] bg-gray-100 text-gray-700 font-mono">
                  {products.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('content');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'content'
                    ? 'bg-[#6F4E37] text-white shadow-sm'
                    : 'text-gray-700 hover:bg-[#FFF8F0] hover:text-[#6F4E37]'
                }`}
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                <span>Website Content</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('media');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'media'
                    ? 'bg-[#6F4E37] text-white shadow-sm'
                    : 'text-gray-700 hover:bg-[#FFF8F0] hover:text-[#6F4E37]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-4 h-4" aria-hidden="true" />
                  <span>Media Library</span>
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] bg-gray-100 text-gray-700 font-mono">
                  {mediaAssets.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('settings');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'settings'
                    ? 'bg-[#6F4E37] text-white shadow-sm'
                    : 'text-gray-700 hover:bg-[#FFF8F0] hover:text-[#6F4E37]'
                }`}
              >
                <SettingsIcon className="w-4 h-4" aria-hidden="true" />
                <span>Settings & Profile</span>
              </button>
            </nav>
          </div>

          {/* Database Setup Button */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={() => setShowSqlModal(true)}
              className="w-full py-2 px-3 rounded-xl border border-[#D9B382]/50 bg-[#FFF8F0] hover:bg-[#D9B382]/20 text-[#6F4E37] text-xs font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Database className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Supabase SQL Schema</span>
            </button>
          </div>
        </aside>

        {/* Content View Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {loading ? (
            <div className="h-64 flex items-center justify-center text-sm text-gray-500">
              <RefreshCw className="w-5 h-5 animate-spin text-[#6F4E37] mr-2" />
              <span>Loading CMS store...</span>
            </div>
          ) : (
            <>
              {/* TAB 1: OVERVIEW ANALYTICS */}
              {activeTab === 'overview' && (
                <div className="space-y-6 max-w-6xl mx-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold font-heading text-[#1E1E1E]">Dashboard Overview</h2>
                      <p className="text-xs text-gray-500">Live operational metrics for The Daily Brew Chennai.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingProduct({});
                        setProductModalOpen(true);
                      }}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#6F4E37] text-white font-semibold text-xs shadow-sm hover:bg-[#5A3F2C]"
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                      <span>Add New Product</span>
                    </button>
                  </div>

                  {/* Analytics Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-[#D9B382]/40 shadow-xs">
                      <span className="text-xs text-gray-500 font-medium block mb-1">Total Products</span>
                      <span className="text-3xl font-extrabold text-[#1E1E1E] font-mono">{products.length}</span>
                      <span className="text-[11px] text-emerald-600 block mt-1 font-medium">
                        {products.filter((p) => p.is_available).length} Active on Menu
                      </span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#D9B382]/40 shadow-xs">
                      <span className="text-xs text-gray-500 font-medium block mb-1">Customer Inquiries</span>
                      <span className="text-3xl font-extrabold text-[#1E1E1E] font-mono">{inquiries.length}</span>
                      <span className="text-[11px] text-[#6F4E37] block mt-1 font-medium">
                        {inquiries.filter((i) => i.status === 'new').length} Pending Response
                      </span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#D9B382]/40 shadow-xs">
                      <span className="text-xs text-gray-500 font-medium block mb-1">Est. Daily Visitors</span>
                      <span className="text-3xl font-extrabold text-[#1E1E1E] font-mono">140+</span>
                      <span className="text-[11px] text-gray-500 block mt-1">Chennai Flagship Café</span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#D9B382]/40 shadow-xs">
                      <span className="text-xs text-gray-500 font-medium block mb-1">Media Assets</span>
                      <span className="text-3xl font-extrabold text-[#1E1E1E] font-mono">{mediaAssets.length}</span>
                      <span className="text-[11px] text-gray-500 block mt-1">Optimized Photography</span>
                    </div>
                  </div>

                  {/* Customer Inquiries Table */}
                  <div className="bg-white rounded-2xl border border-[#D9B382]/40 p-6 shadow-xs">
                    <h3 className="text-lg font-bold font-heading text-[#1E1E1E] mb-4">
                      Recent Table Reservations & Inquiries
                    </h3>
                    {inquiries.length === 0 ? (
                      <p className="text-xs text-gray-500">No customer inquiries received yet.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-gray-100 text-gray-500 font-semibold uppercase tracking-wider">
                              <th className="pb-3">Customer</th>
                              <th className="pb-3">Phone</th>
                              <th className="pb-3">Notes</th>
                              <th className="pb-3">Date</th>
                              <th className="pb-3">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 text-gray-700">
                            {inquiries.map((inq) => (
                              <tr key={inq.id} className="hover:bg-gray-50/50">
                                <td className="py-3 font-semibold text-[#1E1E1E]">{inq.name}</td>
                                <td className="py-3 font-mono">{inq.phone}</td>
                                <td className="py-3 max-w-xs truncate">{inq.notes || 'N/A'}</td>
                                <td className="py-3 font-mono">{new Date(inq.createdAt).toLocaleDateString()}</td>
                                <td className="py-3">
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF8F0] text-[#6F4E37] border border-[#D9B382]/40">
                                    {inq.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: PRODUCT CATALOG MANAGEMENT */}
              {activeTab === 'products' && (
                <div className="space-y-6 max-w-6xl mx-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold font-heading text-[#1E1E1E]">Product Catalog</h2>
                      <p className="text-xs text-gray-500">Create, update pricing, toggle availability, and edit items.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingProduct({
                          name: '',
                          category: 'coffee',
                          price: 150,
                          description: '',
                          is_available: true,
                        });
                        setProductModalOpen(true);
                      }}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#6F4E37] text-white font-semibold text-xs shadow-sm hover:bg-[#5A3F2C]"
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                      <span>Add New Product</span>
                    </button>
                  </div>

                  {/* Search & Filter Controls */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#D9B382]/40 shadow-xs">
                    <div className="relative w-full sm:w-72">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" aria-hidden="true" />
                      <input
                        type="text"
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        placeholder="Search product by name..."
                        className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
                      />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Filter className="w-4 h-4 text-gray-400" aria-hidden="true" />
                      <select
                        value={productCategoryFilter}
                        onChange={(e) => setProductCategoryFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
                      >
                        <option value="all">All Categories</option>
                        <option value="coffee">Hot Brews</option>
                        <option value="cold-beverages">Cold Brews</option>
                        <option value="food">Sandwiches & Bites</option>
                        <option value="desserts">Pastries & Desserts</option>
                      </select>
                    </div>
                  </div>

                  {/* Products Table */}
                  <div className="bg-white rounded-2xl border border-[#D9B382]/40 overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#FFF8F0] border-b border-[#D9B382]/30 text-[#6F4E37] font-semibold uppercase tracking-wider">
                          <tr>
                            <th className="p-4">Product</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Prep Time</th>
                            <th className="p-4">Availability</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-gray-700">
                          {filteredProducts.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50/50">
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                                  />
                                  <div>
                                    <span className="font-bold text-[#1E1E1E] block">{p.name}</span>
                                    <span className="text-[11px] text-gray-500 line-clamp-1 max-w-xs">{p.description}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 capitalize">{p.category}</td>
                              <td className="p-4 font-mono font-bold text-[#6F4E37]">₹{p.price}</td>
                              <td className="p-4">{p.prepTime}</td>
                              <td className="p-4">
                                <button
                                  onClick={() => handleToggleAvailability(p)}
                                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                                    p.is_available
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                      : 'bg-red-100 text-red-800 border border-red-300'
                                  }`}
                                >
                                  {p.is_available ? 'Available' : 'Unavailable'}
                                </button>
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => {
                                      setEditingProduct(p);
                                      setProductModalOpen(true);
                                    }}
                                    className="p-1.5 rounded-lg text-gray-600 hover:text-[#6F4E37] hover:bg-gray-100"
                                    aria-label={`Edit ${p.name}`}
                                  >
                                    <Edit2 className="w-4 h-4" aria-hidden="true" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(p.id, p.name)}
                                    className="p-1.5 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50"
                                    aria-label={`Delete ${p.name}`}
                                  >
                                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: WEBSITE CONTENT MANAGEMENT */}
              {activeTab === 'content' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div>
                    <h2 className="text-2xl font-bold font-heading text-[#1E1E1E]">Website Content Manager</h2>
                    <p className="text-xs text-gray-500">Update Hero headline, About philosophy story, Contact info & Footer text.</p>
                  </div>

                  <form onSubmit={handleSaveContent} className="space-y-6">
                    {/* Hero Section Card */}
                    <div className="bg-white rounded-2xl border border-[#D9B382]/40 p-6 shadow-xs space-y-4">
                      <h3 className="text-lg font-bold font-heading text-[#6F4E37]">Hero Section Content</h3>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Hero Headline</label>
                        <input
                          type="text"
                          value={contentForm.heroTitle || ''}
                          onChange={(e) => setContentForm({ ...contentForm, heroTitle: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#6F4E37]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Hero Description</label>
                        <textarea
                          rows={3}
                          value={contentForm.heroSubtitle || ''}
                          onChange={(e) => setContentForm({ ...contentForm, heroSubtitle: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#6F4E37]"
                        />
                      </div>
                    </div>

                    {/* About Section Card */}
                    <div className="bg-white rounded-2xl border border-[#D9B382]/40 p-6 shadow-xs space-y-4">
                      <h3 className="text-lg font-bold font-heading text-[#6F4E37]">About Section & Brand Story</h3>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Core Philosophy Quote</label>
                        <textarea
                          rows={3}
                          value={contentForm.aboutStory || ''}
                          onChange={(e) => setContentForm({ ...contentForm, aboutStory: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#6F4E37]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Extended Brand Story</label>
                        <textarea
                          rows={4}
                          value={contentForm.aboutExtended || ''}
                          onChange={(e) => setContentForm({ ...contentForm, aboutExtended: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#6F4E37]"
                        />
                      </div>
                    </div>

                    {/* Contact & Footer Card */}
                    <div className="bg-white rounded-2xl border border-[#D9B382]/40 p-6 shadow-xs space-y-4">
                      <h3 className="text-lg font-bold font-heading text-[#6F4E37]">Contact & Footer Details</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            value={contentForm.contactEmail || ''}
                            onChange={(e) => setContentForm({ ...contentForm, contactEmail: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Phone</label>
                          <input
                            type="text"
                            value={contentForm.contactPhone || ''}
                            onChange={(e) => setContentForm({ ...contentForm, contactPhone: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Location</label>
                          <input
                            type="text"
                            value={contentForm.contactLocation || ''}
                            onChange={(e) => setContentForm({ ...contentForm, contactLocation: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Footer Copyright Text</label>
                        <input
                          type="text"
                          value={contentForm.footerText || ''}
                          onChange={(e) => setContentForm({ ...contentForm, footerText: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-[#6F4E37] text-white font-semibold text-xs shadow-md hover:bg-[#5A3F2C]"
                    >
                      Save Content Changes
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 4: MEDIA LIBRARY */}
              {activeTab === 'media' && (
                <div className="space-y-6 max-w-6xl mx-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold font-heading text-[#1E1E1E]">Media Library</h2>
                      <p className="text-xs text-gray-500">Centralized image manager for café products & banners.</p>
                    </div>

                    <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#6F4E37] text-white font-semibold text-xs shadow-sm hover:bg-[#5A3F2C] cursor-pointer">
                      <Upload className="w-4 h-4" aria-hidden="true" />
                      <span>Upload Image</span>
                      <input type="file" accept="image/*" onChange={handleUploadMedia} className="hidden" />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {mediaAssets.map((asset) => (
                      <div key={asset.id} className="bg-white rounded-2xl border border-[#D9B382]/40 overflow-hidden shadow-xs group relative">
                        <div className="aspect-square bg-gray-100 overflow-hidden relative">
                          <img
                            src={asset.url}
                            alt={asset.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="p-3">
                          <p className="text-xs font-semibold text-[#1E1E1E] truncate">{asset.name}</p>
                          <p className="text-[10px] text-gray-400 font-mono mt-0.5">{asset.size}</p>
                        </div>
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleDeleteMedia(asset.id, asset.name)}
                            className="p-1.5 rounded-lg bg-red-600 text-white shadow-xs"
                            aria-label={`Delete ${asset.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: SETTINGS & SECURITY */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div>
                    <h2 className="text-2xl font-bold font-heading text-[#1E1E1E]">Owner Settings & Password</h2>
                    <p className="text-xs text-gray-500">Manage administrator profile credentials and database security policies.</p>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#D9B382]/40 p-6 shadow-xs space-y-4">
                    <h3 className="text-lg font-bold font-heading text-[#6F4E37]">Update Owner Password</h3>
                    {passwordStatus && (
                      <div className="p-3 rounded-xl bg-blue-50 text-blue-800 text-xs font-medium">
                        {passwordStatus}
                      </div>
                    )}
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const res = await updatePassword(newPassword);
                        if (res.success) {
                          setPasswordStatus('Password updated successfully.');
                          setNewPassword('');
                        } else {
                          setPasswordStatus(res.error || 'Failed to update password');
                        }
                      }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">New Password</label>
                        <input
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="At least 6 characters"
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#6F4E37] text-white text-xs font-semibold"
                      >
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E1E1E] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#D9B382]/40 flex items-center gap-3 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Product Create/Edit Modal */}
      {productModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto text-[#1E1E1E]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-lg font-bold font-heading">
                {editingProduct.id ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setProductModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  placeholder="e.g. Filter Coffee"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={editingProduct.category || 'coffee'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white"
                  >
                    <option value="coffee">Hot Brews</option>
                    <option value="cold-beverages">Cold Brews</option>
                    <option value="food">Sandwiches & Bites</option>
                    <option value="desserts">Pastries & Desserts</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingProduct.image || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  placeholder="/assets/aistudio/..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id="avail-chk"
                  type="checkbox"
                  checked={editingProduct.is_available ?? true}
                  onChange={(e) => setEditingProduct({ ...editingProduct, is_available: e.target.checked })}
                  className="rounded text-[#6F4E37] focus:ring-[#6F4E37]"
                />
                <label htmlFor="avail-chk" className="font-semibold cursor-pointer">Available on Live Menu</label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6F4E37] text-white font-semibold shadow-sm"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SQL Script Viewer Modal */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 text-[#1E1E1E]">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#6F4E37]" />
                <h3 className="text-lg font-bold font-heading">Supabase SQL Schema & RLS Script</h3>
              </div>
              <button onClick={() => setShowSqlModal(false)} className="p-1 text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-600 mb-3">
              Copy and paste this SQL script into your Supabase Dashboard's SQL Editor to provision tables and RLS security policies.
            </p>

            <pre className="flex-1 bg-[#1E1E1E] text-emerald-400 p-4 rounded-2xl overflow-y-auto font-mono text-[11px] leading-relaxed border border-gray-800 selection:bg-white/20">
              {SUPABASE_SQL_SCHEMA}
            </pre>

            <div className="pt-4 flex justify-between items-center">
              <span className="text-[11px] text-gray-500">Includes Row Level Security (RLS) policies.</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
                  setCopiedSql(true);
                  setTimeout(() => setCopiedSql(false), 2000);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6F4E37] text-white text-xs font-semibold shadow-sm hover:bg-[#5A3F2C]"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
