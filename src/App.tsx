import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ClientHome } from './components/ClientHome';
import { TourCatalog } from './components/TourCatalog';
import { TourDetailWithRecommendation } from './components/TourDetailWithRecommendation';
import { AdminDashboard } from './components/AdminDashboard';
import { MyBookingsModal } from './components/MyBookingsModal';
import { AuthModal } from './components/AuthModal';
import { AccountSwitcherModal } from './components/AccountSwitcherModal';
import { TestRunnerBuoi8 } from './components/TestRunnerBuoi8';
import { MinhChungModal } from './components/MinhChungModal';
import { Footer } from './components/Footer';
import { 
  Sun, 
  Moon, 
  Award, 
  Smartphone, 
  Tablet, 
  Monitor, 
  FileSpreadsheet, 
  CheckCheck 
} from 'lucide-react';
import { COURSE_HANDBOOK_USERS, DEFAULT_USER, DEFAULT_CUSTOMER_USER, DEFAULT_ADMIN_USER } from './data/mockUsers';
import { BookingRecord, AppUser } from './types/tour';
import { getSavedBookings, updateBookingStatus, getSavedWishlist } from './utils/bookingStore';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'tour-detail' | 'admin-dashboard' | 'buoi8'>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('view');
      if (p === 'catalog' || p === 'tour-detail' || p === 'admin-dashboard' || p === 'buoi8') return p;
    }
    return 'home';
  });
  const [activeNav, setActiveNav] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('view');
      if (p === 'catalog') return 'tour';
    }
    return 'home';
  });
  const [selectedTourId, setSelectedTourId] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const id = new URLSearchParams(window.location.search).get('tourId');
      if (id) return Number(id) || 1;
    }
    return 1;
  });
  const [catalogFilters, setCatalogFilters] = useState<{ type: string; destination: string; date: string }>({
    type: 'all',
    destination: '',
    date: ''
  });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('dulichso-theme') === 'dark';
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // User Account State - Supports Customer, Admin, and Guest Mode
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    const saved = localStorage.getItem('dulichso_current_user');
    if (saved) {
      if (saved === 'guest') return null;
      try {
        const parsed = JSON.parse(saved);
        const found = COURSE_HANDBOOK_USERS.find(u => u.id === parsed.id || u.email === parsed.email);
        return found || parsed;
      } catch (e) {
        return DEFAULT_CUSTOMER_USER;
      }
    }
    return DEFAULT_CUSTOMER_USER; // Mặc định là tài khoản Khách hàng VIP Trần Văn Nam để trải nghiệm duyệt & đặt tour
  });

  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAccountSwitcherOpen, setIsAccountSwitcherOpen] = useState(false);
  const [isMyBookingsModalOpen, setIsMyBookingsModalOpen] = useState(false);
  const [isMinhChungModalOpen, setIsMinhChungModalOpen] = useState(false);

  // Persisted bookings and wishlist counts
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    setBookings(getSavedBookings());
    setWishlist(getSavedWishlist());

    const savedTheme = localStorage.getItem('dulichso-theme');
    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get('view');
    if (viewParam === 'catalog' || viewParam === 'tour-detail' || viewParam === 'home') {
      setCurrentView(viewParam);
    }
    const tourIdParam = urlParams.get('tourId');
    if (tourIdParam) {
      setSelectedTourId(Number(tourIdParam) || 1);
    }
    const themeParam = urlParams.get('theme');
    if (themeParam === 'dark' || (!themeParam && savedTheme === 'dark')) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark');
    }

    (window as any).__setAppView = (view: 'home' | 'catalog' | 'tour-detail', tourId = 1) => {
      setCurrentView(view);
      setSelectedTourId(tourId);
    };
    (window as any).__setAppTheme = (dark: boolean) => {
      setIsDarkMode(dark);
      if (dark) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.classList.remove('dark');
      }
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.classList.add('dark');
        localStorage.setItem('dulichso-theme', 'dark');
        setToastMessage('Đã bật Chủ Đề Tối 🌙 (CSS tokens). Ấn F5 trang vẫn giữ nguyên màu!');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.classList.remove('dark');
        localStorage.setItem('dulichso-theme', 'light');
        setToastMessage('Đã bật Chủ Đề Sáng ☀️ (CSS tokens). Ấn F5 trang vẫn giữ nguyên màu!');
      }
      setTimeout(() => setToastMessage(null), 3500);
      return next;
    });
  };

  const handleQuickSwitchRole = (role: 'customer' | 'admin' | 'guest') => {
    if (role === 'guest') {
      setCurrentUser(null);
      localStorage.setItem('dulichso_current_user', 'guest');
      setToastMessage('Đang duyệt web ở Chế Độ Khách Vãng Lai (Guest)');
      if (currentView === 'admin-dashboard') {
        setCurrentView('home');
        setActiveNav('home');
      }
    } else if (role === 'customer') {
      setCurrentUser(DEFAULT_CUSTOMER_USER);
      localStorage.setItem('dulichso_current_user', JSON.stringify(DEFAULT_CUSTOMER_USER));
      setToastMessage(`Đã chuyển sang tài khoản Khách Hàng: ${DEFAULT_CUSTOMER_USER.name} (${DEFAULT_CUSTOMER_USER.roleTitle})`);
      if (currentView === 'admin-dashboard') {
        setCurrentView('home');
        setActiveNav('home');
      }
    } else if (role === 'admin') {
      setCurrentUser(DEFAULT_ADMIN_USER);
      localStorage.setItem('dulichso_current_user', JSON.stringify(DEFAULT_ADMIN_USER));
      setToastMessage(`Đã chuyển sang tài khoản Quản Trị: ${DEFAULT_ADMIN_USER.name} (${DEFAULT_ADMIN_USER.roleTitle})`);
    }
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLoginSuccess = (user: AppUser | null) => {
    if (!user) {
      setCurrentUser(null);
      localStorage.setItem('dulichso_current_user', 'guest');
      setToastMessage('Đang duyệt web ở Chế Độ Khách Vãng Lai (Guest)');
    } else {
      setCurrentUser(user);
      localStorage.setItem('dulichso_current_user', JSON.stringify(user));
      setToastMessage(`Đăng nhập thành công: ${user.name} (${user.roleTitle})`);
    }
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.setItem('dulichso_current_user', 'guest');
    setToastMessage('Đã đăng xuất! Chuyển về chế độ Khách Vãng Lai.');
    if (currentView !== 'home' && currentView !== 'catalog' && currentView !== 'tour-detail') {
      setCurrentView('home');
      setActiveNav('home');
    }
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAdmin = () => {
    if (!currentUser) {
      setToastMessage('Vui lòng đăng nhập tài khoản Quản trị viên để truy cập trang quản trị.');
      setAuthModalMode('login');
      setIsAuthModalOpen(true);
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    if (currentUser.role !== 'admin') {
      setToastMessage(`Tài khoản ${currentUser.name} không có quyền quản trị. Đang mở chọn tài khoản Quản trị viên.`);
      setAuthModalMode('login');
      setIsAuthModalOpen(true);
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    setCurrentView('admin-dashboard');
    setActiveNav('admin-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Nav handler
  const handleSelectNav = (nav: string) => {
    if (nav === 'home') {
      setCurrentView('home');
      setActiveNav('home');
    } else if (nav === 'tour') {
      setCatalogFilters({ type: 'tour', destination: '', date: '' });
      setCurrentView('catalog');
      setActiveNav('tour');
    } else if (nav === 'stay') {
      setCatalogFilters({ type: 'stay', destination: '', date: '' });
      setCurrentView('catalog');
      setActiveNav('stay');
    } else if (nav === 'ticket') {
      setCatalogFilters({ type: 'ticket', destination: '', date: '' });
      setCurrentView('catalog');
      setActiveNav('ticket');
    } else if (nav === 'experience') {
      setCatalogFilters({ type: 'experience', destination: '', date: '' });
      setCurrentView('catalog');
      setActiveNav('experience');
    } else if (nav === 'buoi8') {
      setCurrentView('buoi8');
      setActiveNav('buoi8');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    } else if (nav === 'admin-dashboard') {
      handleOpenAdmin();
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateCatalogFromHome = (type = 'all', destination = '', date = '') => {
    setCatalogFilters({ type, destination, date });
    setCurrentView('catalog');
    setActiveNav(type === 'all' ? 'tour' : type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTour = (tourId: number) => {
    setSelectedTourId(tourId);
    setCurrentView('tour-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 p-4 bg-emerald-600 text-white rounded-2xl shadow-2xl text-xs font-bold animate-fade-in flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Login / Logout & Real Website Controls */}
      <Header
        currentView={currentView}
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        onOpenAdmin={handleOpenAdmin}
        bookingsCount={bookings.length}
        onOpenMyBookings={() => {
          if (!currentUser) {
            setToastMessage('Vui lòng đăng nhập để xem các đơn tour đã đặt.');
            setAuthModalMode('login');
            setIsAuthModalOpen(true);
            setTimeout(() => setToastMessage(null), 3500);
            return;
          }
          setIsMyBookingsModalOpen(true);
        }}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => {
          setCatalogFilters({ type: 'all', destination: '', date: '' });
          setCurrentView('catalog');
          setActiveNav('tour');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        currentUser={currentUser}
        onOpenAccountSwitcher={() => setIsAccountSwitcherOpen(true)}
        onQuickSwitchRole={handleQuickSwitchRole}
        onLoginClick={(mode) => {
          setAuthModalMode(mode);
          setIsAuthModalOpen(true);
        }}
        onLogout={handleLogout}
      />


      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* VIEW 1: CLIENT HOME */}
        {currentView === 'home' && (
          <ClientHome
            onSelectTourDetail={handleSelectTour}
            onOpenBookingModal={(tour) => handleSelectTour(tour.id)}
            onNavigateCatalog={handleNavigateCatalogFromHome}
            onOpenAdmin={handleOpenAdmin}
          />
        )}

        {/* VIEW 2: FILTER & CATALOG */}
        {currentView === 'catalog' && (
          <TourCatalog
            initialType={catalogFilters.type}
            initialDestination={catalogFilters.destination}
            initialDate={catalogFilters.date}
            onSelectTour={handleSelectTour}
            onGoHome={() => {
              setCurrentView('home');
              setActiveNav('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 3: TOUR DETAIL & RECOMMENDATION */}
        {currentView === 'tour-detail' && (
          <TourDetailWithRecommendation
            tourId={selectedTourId}
            onGoHome={() => {
              setCurrentView('home');
              setActiveNav('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAdmin={handleOpenAdmin}
            onSelectOtherTour={handleSelectTour}
            currentUser={currentUser || undefined}
            onBookingCreated={(newBk) => {
              setBookings(getSavedBookings());
              setToastMessage(`Đã ghi nhận đơn hàng ${newBk.id} thành công!`);
              setTimeout(() => setToastMessage(null), 4000);
            }}
          />
        )}

        {/* VIEW 4: ADMIN DASHBOARD */}
        {currentView === 'admin-dashboard' && (
          <AdminDashboard 
            onBackToCustomer={() => {
              setCurrentView('home');
              setActiveNav('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 5: BUỔI 08 - MỐC M4 NGHIỆM THU & BÀN GIAO */}
        {currentView === 'buoi8' && (
          <TestRunnerBuoi8
            onNavigateHome={() => {
              setCurrentView('home');
              setActiveNav('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateCatalog={() => {
              setCatalogFilters({ type: 'all', destination: '', date: '' });
              setCurrentView('catalog');
              setActiveNav('tour');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateAdmin={handleOpenAdmin}
          />
        )}
      </main>

      {/* Professional E-Commerce Footer */}
      <Footer
        onNavigate={(view) => {
          if (view === 'admin-dashboard') {
            handleOpenAdmin();
          }
        }}
        onOpenMinhChung={() => setIsMinhChungModalOpen(true)}
      />

      {/* Minh Chung 9 Screens Modal */}
      <MinhChungModal
        isOpen={isMinhChungModalOpen}
        onClose={() => setIsMinhChungModalOpen(false)}
      />

      {/* Interactive My Bookings Drawer/Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsModalOpen}
        onClose={() => setIsMyBookingsModalOpen(false)}
        bookings={bookings}
        currentUser={currentUser || undefined}
        onSelectTour={(tId) => {
          handleSelectTour(tId);
          setIsMyBookingsModalOpen(false);
        }}
        onCancelHoldBooking={(bkId) => {
          updateBookingStatus(bkId, 'cancelled');
          setBookings(getSavedBookings());
          setToastMessage(`Đã hủy giữ chỗ đơn ${bkId} thành công.`);
          setTimeout(() => setToastMessage(null), 4000);
        }}
      />

      {/* Authentic Login & Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authModalMode}
        currentUser={currentUser}
      />

      {/* Quick Account Switcher Modal */}
      <AccountSwitcherModal
        isOpen={isAccountSwitcherOpen}
        onClose={() => setIsAccountSwitcherOpen(false)}
        currentUser={currentUser}
        onSelectUser={(user) => {
          handleLoginSuccess(user);
          setIsAccountSwitcherOpen(false);
        }}
      />
    </div>
  );
}
